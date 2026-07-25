import {readFile} from 'node:fs/promises'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-18'})
const websiteRoot = resolve(process.cwd(), '../kvc-website')
const dryRun = process.argv.includes('--dry-run')

const readJson = async (path: string) => JSON.parse(await readFile(path, 'utf8'))

async function imageValue(relativePath: string) {
  const path = resolve(websiteRoot, 'public', relativePath)
  const filename = basename(path)
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    {filename},
  )
  if (existing) return {_type: 'image', asset: {_type: 'reference', _ref: existing}}
  if (dryRun) return undefined
  const asset = await client.assets.upload('image', await readFile(path), {filename})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

const ref = (id: string, index: number) => ({
  _type: 'reference',
  _key: `${id.replace(/[^a-zA-Z0-9]/g, '').slice(-18)}${index}`,
  _ref: id,
})

async function references(type: string, language?: string) {
  const docs = await client.fetch<Array<{_id: string}>>(
    `*[_type == $type && (!defined($language) || !defined(language) || language == $language)] | order(_createdAt asc){_id}`,
    {type, language: language || null},
  )
  return docs.map((document, index) => ref(document._id, index))
}

function items(dictionary: any) {
  const reasons = Object.values(dictionary.whyProcess.reasons).map((reason: any, index) => ({
    _type: 'homepageReason',
    _key: `reason${index}`,
    icon: ['Shield', 'Award', 'Globe', 'Handshake'][index],
    ...reason,
  }))
  const steps = Object.values(dictionary.whyProcess.steps).map((step: any, index) => ({
    _type: 'homepageProcessStep',
    _key: `step${index}`,
    icon: ['MessageCircle', 'ClipboardList', 'FolderOpen', 'Send', 'BadgeCheck'][index],
    ...step,
  }))
  const reviews = Object.values(dictionary.testimonials.google.reviews).map((review: any, index) => ({
    _type: 'homepageGoogleReview',
    _key: `review${index}`,
    initial: review.name.charAt(0),
    color: ['#1D427C', '#C8913C', '#1A4D7A'][index],
    ...review,
  }))
  return {reasons, steps, reviews}
}

async function seed(language: 'vi' | 'en', dictionary: any, images: Record<string, any>) {
  const t = dictionary
  const {reasons, steps, reviews} = items(t)
  const services = await references('service', language)
  const partners = await references('partner')
  const testimonials = await references('testimonial', language)
  const document = {
    _id: `drafts.home-page-${language}`,
    _type: 'homePage',
    language,
    heroSection: {
      _type: 'homepageHero',
      titleLine1: t.hero.title1,
      titleLine2: t.hero.title2,
      description: t.hero.description,
      primaryButtonLabel: t.hero.btnStudyWork,
      primaryButtonHref: '#du-hoc',
      secondaryButtonLabel: t.hero.btnIncorporate,
      secondaryButtonHref: '#mo-cong-ty',
      backgroundImage: images.hero,
      backgroundImageAlt: '',
    },
    statsSection: {
      _type: 'homepageStats',
      items: [
        {_type: 'homepageStat', _key: 'clients', value: '10,000+', label: t.stats.clients, icon: 'Users'},
        {_type: 'homepageStat', _key: 'success', value: '98%', label: t.stats.successRate, icon: 'CheckCircle2'},
        {_type: 'homepageStat', _key: 'partners', value: '150+', label: t.stats.partners, icon: 'Landmark'},
        {_type: 'homepageStat', _key: 'experience', value: '13+', label: t.stats.experience, icon: 'Star'},
      ],
    },
    partnersSection: {_type: 'homepagePartners', title: t.partners.title, partners},
    aboutSection: {
      _type: 'homepageAbout', eyebrow: t.about.tagline, title: t.about.title,
      description: t.about.description, image: images.about, imageAlt: t.about.altImage1,
      ctaLabel: t.about.btn, ctaHref: `/${language}/gioi-thieu`,
    },
    servicesSection: {
      _type: 'homepageServices', eyebrow: t.services.tagline, title: t.services.title, services,
    },
    whyProcessSection: {
      _type: 'homepageWhyProcess',
      why: {_type: 'object', eyebrow: t.whyProcess.whyTagline, title: t.whyProcess.whyTitle, cta: t.whyProcess.cta, reasons},
      process: {_type: 'object', eyebrow: t.whyProcess.processTagline, title: t.whyProcess.processTitle, ariaLabel: t.whyProcess.processAriaLabel, steps},
    },
    testimonialsSection: {
      _type: 'homepageTestimonials', eyebrow: t.testimonials.tagline, title: t.testimonials.title,
      testimonials,
      googleReviews: {_type: 'object', rating: 4.8, reviewCount: 500, reviewUrl: 'https://www.google.com/search?q=KVC+Global+reviews', reviews},
    },
    seo: {
      _type: 'homepageSeo',
      title: language === 'en'
        ? 'KVC Global — Study in Singapore, Online Courses, Training Employment Pass'
        : 'KVC Global — Du học Singapore, Khóa học Online, Training Employment Pass',
      description: language === 'en'
        ? 'Shape your future with KVC Global — a leading provider of study in Singapore, international online courses, and Training Employment Pass.'
        : 'Định hướng tương lai của bạn với KVC Global — đơn vị hàng đầu về du học Singapore, chương trình khóa học online quốc tế, và Training Employment Pass.',
      image: images.social,
    },
  }
  if (dryRun) {
    console.log(JSON.stringify({language, id: document._id, services: services.length, partners: partners.length, testimonials: testimonials.length}, null, 2))
    return
  }
  await client.createIfNotExists({_id: document._id, _type: 'homePage', language})
  const {_id, _type, ...fields} = document
  await client.patch(_id).setIfMissing(fields).commit()
  console.log(`Seeded ${_id}`)
}

async function main() {
  const dictionaries = {
    vi: await readJson(resolve(websiteRoot, 'messages/vi.json')),
    en: await readJson(resolve(websiteRoot, 'messages/en.json')),
  }
  const images = {
    hero: await imageValue('du-lich-singapore-3-ngay-2-dem-cover.webp'),
    about: await imageValue('images/singapore-merlion-sunset.jpg'),
    social: await imageValue('images/thumb-sharing.png'),
  }
  await seed('vi', dictionaries.vi, images)
  await seed('en', dictionaries.en, images)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
