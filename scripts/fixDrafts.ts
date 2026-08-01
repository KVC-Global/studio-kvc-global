import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'eh8b0fvx',
  dataset: 'production',
  apiVersion: '2026-07-18',
  token:
    process.env.SANITY_AUTH_TOKEN ||
    'skPtRYVIXonREO1fJDQiiS7nK8SdI0gsT68Z57h8dlta8ilNXWDI9HaIIY3ayFHN2CEXXRULZcbW3X7ZiW35cdO1uJ4Xpl1gkqkcncpOL34s4NKhaqJiV9BGLtvmbaYpvzIsBxpCez54HT6pZK3dYKghQ0Ns4dixcALBVL1m5BihAlJgAwUM',
  useCdn: false,
})

async function fixDrafts() {
  console.log('--- Checking for all draft documents in Sanity Cloud ---')
  const drafts = await client.fetch<Array<{_id: string; _type: string}>>(
    `*[_id match "drafts.*"]{ _id, _type }`,
  )
  console.log('Found draft documents:', drafts)

  for (const draft of drafts) {
    console.log(`Deleting draft: ${draft._id} (type: ${draft._type})`)
    await client.delete(draft._id)
  }

  // Also check if any old online-program-* documents exist and delete them if needed
  const oldDocs = await client.fetch<Array<{_id: string; _type: string}>>(
    `*[_type == "onlineProgramPage"]{ _id, _type }`,
  )
  console.log('Found old onlineProgramPage documents:', oldDocs)
  for (const doc of oldDocs) {
    console.log(`Deleting old document: ${doc._id}`)
    await client.delete(doc._id)
  }

  console.log('--- All drafts & obsolete onlineProgramPage documents deleted! ---')
}

fixDrafts().catch((err) => {
  console.error('Cleanup failed:', err)
  process.exit(1)
})
