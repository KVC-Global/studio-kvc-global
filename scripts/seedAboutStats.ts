import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eh8b0fvx',
  dataset: 'production',
  apiVersion: '2026-07-18',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

type ProgressStat = {
  _type: 'homepageProgressStat'
  _key: string
  value: string
  label: string
  color: {_type: 'color'; hex: string}
}

type IconStat = {
  _type: 'homepageIconStat'
  _key: string
  value: string
  sub: string
  icon: 'handshake' | 'award'
  tone: 'blue' | 'gold'
}

const CONTENT: Record<string, {statsTitle: string; progressStats: ProgressStat[]; iconStats: IconStat[]}> = {
  vi: {
    statsTitle: 'Những con số chứng minh năng lực',
    progressStats: [
      {
        _type: 'homepageProgressStat',
        _key: 'progress-strategy',
        value: '98%',
        label: 'Tỷ lệ hồ sơ thành công',
        color: {_type: 'color', hex: '#F8BC62'},
      },
      {
        _type: 'homepageProgressStat',
        _key: 'progress-network',
        value: '100%',
        label: 'Rà soát theo chuẩn ICA Due Diligence',
        color: {_type: 'color', hex: '#F8BC62'},
      },
    ],
    iconStats: [
      {
        _type: 'homepageIconStat',
        _key: 'icon-experience',
        value: '13+ Năm',
        sub: 'Kinh nghiệm thực chiến',
        icon: 'handshake',
        tone: 'blue',
      },
      {
        _type: 'homepageIconStat',
        _key: 'icon-clients',
        value: '10,000+',
        sub: 'Khách hàng tin tưởng',
        icon: 'award',
        tone: 'gold',
      },
      {
        _type: 'homepageIconStat',
        _key: 'icon-partners',
        value: '150+',
        sub: 'Đối tác chiến lược',
        icon: 'handshake',
        tone: 'blue',
      },
      {
        _type: 'homepageIconStat',
        _key: 'icon-rating',
        value: '4.8 Đánh giá trên Google',
        sub: 'Dựa trên 600+ reviews',
        icon: 'award',
        tone: 'gold',
      },
    ],
  },
  en: {
    statsTitle: 'Proven capabilities in numbers',
    progressStats: [
      {
        _type: 'homepageProgressStat',
        _key: 'progress-strategy',
        value: '98%',
        label: 'Application success rate',
        color: {_type: 'color', hex: '#F8BC62'},
      },
      {
        _type: 'homepageProgressStat',
        _key: 'progress-network',
        value: '100%',
        label: 'Reviewed to ICA Due Diligence standards',
        color: {_type: 'color', hex: '#F8BC62'},
      },
    ],
    iconStats: [
      {
        _type: 'homepageIconStat',
        _key: 'icon-experience',
        value: '13+ Years',
        sub: 'Hands-on experience',
        icon: 'handshake',
        tone: 'blue',
      },
      {
        _type: 'homepageIconStat',
        _key: 'icon-clients',
        value: '10,000+',
        sub: 'Trusted clients',
        icon: 'award',
        tone: 'gold',
      },
      {
        _type: 'homepageIconStat',
        _key: 'icon-partners',
        value: '150+',
        sub: 'Strategic partners',
        icon: 'handshake',
        tone: 'blue',
      },
      {
        _type: 'homepageIconStat',
        _key: 'icon-rating',
        value: '4.8 Google rating',
        sub: 'Based on 600+ reviews',
        icon: 'award',
        tone: 'gold',
      },
    ],
  },
}

async function main() {
  const pages = await client.fetch(`*[_type == "homePage"]{_id, language, "hasStats": defined(aboutSection.progressStats)}`)
  console.log(`Found ${pages.length} homePage documents.`)

  for (const page of pages) {
    const lang = (page.language as string) || 'vi'
    const content = CONTENT[lang] ?? CONTENT.vi
    const isDraft = (page._id as string).startsWith('drafts.')
    const docId = (page._id as string).replace(/^drafts\./, '')

    if (page.hasStats) {
      console.log(`- ${page._id}: already has progressStats, skipping`)
      continue
    }

    await client
      .patch(docId)
      .setIfMissing({aboutSection: {}})
      .set({
        'aboutSection.statsTitle': content.statsTitle,
        'aboutSection.progressStats': content.progressStats,
        'aboutSection.iconStats': content.iconStats,
      })
      .commit()
    console.log(`- ${docId} (${lang})${isDraft ? ' [draft]' : ''}: set statsTitle, ${content.progressStats.length} progressStats, ${content.iconStats.length} iconStats`)
  }
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
