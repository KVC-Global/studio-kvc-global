/**
 * patch-kvc-support.mjs
 * Populates the kvcSupportSection on all onlineWolverhamptonPage documents
 * that currently have no title or items set.
 *
 * Run: node scripts/patch-kvc-support.mjs
 * (requires SANITY_TOKEN env var with write permissions, or uses the CLI auth)
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'eh8b0fvx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  // Token picked from env — set SANITY_TOKEN before running, or it will
  // fall back to the CLI session token automatically when run via `sanity exec`.
  token: process.env.SANITY_TOKEN,
})

const DEFAULT_TITLE = 'Vì sao học qua KVC Global?'
const DEFAULT_ITEMS = [
  'Tư vấn lựa chọn chương trình phù hợp.',
  'Hỗ trợ hồ sơ nhập học.',
  'Hướng dẫn học tập trực tuyến.',
  'Theo dõi tiến độ học.',
  'Hỗ trợ thực hiện luận văn (Dissertation).',
  'Đồng hành cho đến khi nhận bằng.',
]

async function main() {
  // Fetch all Wolverhampton page documents
  const docs = await client.fetch(
    `*[_type == "onlineWolverhamptonPage"]{_id, language, kvcSupportSection}`,
  )

  console.log(`Found ${docs.length} onlineWolverhamptonPage document(s).`)

  for (const doc of docs) {
    const existingTitle = doc.kvcSupportSection?.title
    const existingItems = doc.kvcSupportSection?.items

    // Only patch fields that are empty / missing
    const patch = {}

    if (!existingTitle) {
      patch['kvcSupportSection.title'] = DEFAULT_TITLE
    }

    if (!existingItems || existingItems.length === 0) {
      patch['kvcSupportSection.items'] = DEFAULT_ITEMS
    }

    if (Object.keys(patch).length === 0) {
      console.log(`  [${doc.language ?? doc._id}] Already has content — skipping.`)
      continue
    }

    await client.patch(doc._id).set(patch).commit()
    console.log(
      `  [${doc.language ?? doc._id}] ✅ Patched: ${Object.keys(patch).join(', ')}`,
    )
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
