import { createClient } from '@sanity/client'

const token = 'sk4nX26LNSq9wbGyNDOw9ecFpSYblJjhbH5z9O73bY2ArjVyYLNBHxlJBy4AVT4Vafuj4G7zhnCjvYXAN'

const client = createClient({
  projectId: 'eh8b0fvx',
  dataset: 'production',
  apiVersion: '2026-07-18',
  token,
  useCdn: false,
})

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

async function main() {
  console.log('Fetching subpages with client token...')
  const pages = await client.fetch(`
    *[_type in ["workPassPage", "studyAbroadPage", "uniMasterPage", "privateStudyPage", "publicStudyPage"]]{
      _id,
      _type,
      language,
      servicesSection
    }
  `)

  console.log(`Found ${pages.length} pages. Migrating related services...`)

  for (const page of pages) {
    const services = page.servicesSection?.services
    if (!services || !Array.isArray(services)) {
      continue
    }

    const language = page.language || 'vi'
    let hasChanges = false
    const newServices = []

    for (const item of services) {
      if (item._type === 'reference') {
        newServices.push(item)
        continue
      }

      const title = item.title
      if (!title) {
        newServices.push(item)
        continue
      }

      const ctaText = item.ctaText || item.cta || (language === 'en' ? 'Learn more' : 'Tìm hiểu ngay')
      const icon = item.icon || 'GraduationCap'
      const href = item.href || '#'

      const docId = `related-service-${language}-${slugify(title)}`

      console.log(`Migrating inline item "${title}" [${language}] -> document ${docId}`)

      const doc = {
        _id: docId,
        _type: 'relatedService',
        language,
        title,
        ctaText,
        icon,
        href,
      }

      // Create document if not exists
      await client.createIfNotExists(doc)

      newServices.push({
        _key: item._key || Math.random().toString(36).substring(2, 9),
        _type: 'reference',
        _ref: docId,
      })
      hasChanges = true
    }

    if (hasChanges) {
      console.log(`Patching document ${page._id}...`)
      await client
        .patch(page._id)
        .set({'servicesSection.services': newServices})
        .commit()
    }
  }

  console.log('Migration completed successfully!')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
