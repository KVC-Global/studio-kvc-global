import { defineArrayMember, defineField, defineType } from 'sanity'

const text = (name: string, title: string) => defineField({ name, title, type: 'text', rows: 4 })
const string = (name: string, title: string) => defineField({ name, title, type: 'string' })
const image = (name: string, title: string) => defineField({ name, title, type: 'image', options: { hotspot: true } })

const isSupportedVideoEmbedUrl = (value?: string) => {
  if (!value) return true

  try {
    const url = new URL(value)
    const isYouTubeEmbed =
      ['www.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname) &&
      url.pathname.startsWith('/embed/')
    const isVimeoEmbed =
      url.hostname === 'player.vimeo.com' && url.pathname.startsWith('/video/')
    const isTikTokEmbed =
      url.hostname === 'www.tiktok.com' &&
      (url.pathname.startsWith('/embed/') || url.pathname.startsWith('/player/'))

    return url.protocol === 'https:' && (isYouTubeEmbed || isVimeoEmbed || isTikTokEmbed)
  } catch {
    return false
  }
}

const studyAbroadStat = defineType({
  name: 'studyAbroadStat',
  title: 'Stat item',
  type: 'object',
  fields: [
    string('value', 'Value'),
    string('label', 'Label'),
    string('icon', 'Icon name (e.g., Clock, Coins, FileCheck, GraduationCap)')
  ]
})

export const studyAbroadHero = defineType({
  name: 'studyAbroadHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow (e.g., DIPLOMA 6+6 TẠI SINGAPORE)'),
    string('title', 'Title'),
    text('description', 'Description'),
    string('primaryButtonLabel', 'Primary button label'),
    string('primaryButtonHref', 'Primary button href'),
    string('secondaryButtonLabel', 'Secondary button label'),
    string('secondaryButtonHref', 'Secondary button href'),
    image('backgroundImage', 'Background image'),
    defineField({
      name: 'stats',
      title: 'Stats bar items',
      type: 'array',
      of: [defineArrayMember({ type: 'studyAbroadStat' })],
      validation: (Rule) => Rule.max(4)
    })
  ]
})

export const studyAbroadIntro = defineType({
  name: 'studyAbroadIntro',
  title: 'Intro section',
  type: 'object',
  fields: [
    string('title', 'Title (e.g., Chương trình Diploma 6+6 là gì?)'),
    text('highlightText', 'Highlight introductory text'),
    defineField({
      name: 'bullets',
      title: 'Bullet points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'paragraphs',
      title: 'Remaining text paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })]
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      description: 'Upload a video file (e.g. MP4) in 9:16 portrait format.',
      type: 'file',
      options: { accept: 'video/*' }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL / Embed URL',
      description: 'Or enter a direct video URL or YouTube/Vimeo/TikTok embed URL (9:16 frame).',
      type: 'url'
    }),
    string('videoTitle', 'Video title / caption'),
    image('videoPoster', 'Video poster image (9:16)'),
    image('image', 'Intro section fallback image'),
    string('imageAlt', 'Image alt text')
  ]
})

const studyAbroadWhyItem = defineType({
  name: 'studyAbroadWhyItem',
  title: 'Why item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., Clock, Wallet, FileText, Briefcase, TrendingUp, EN)'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const studyAbroadWhy = defineType({
  name: 'studyAbroadWhy',
  title: 'Why section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Benefit items',
      type: 'array',
      of: [defineArrayMember({ type: 'studyAbroadWhyItem' })]
    })
  ]
})

const studyAbroadMajorItem = defineType({
  name: 'studyAbroadMajorItem',
  title: 'Major item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., Hotel, Utensils, Truck, Laptop, Brain, Bot, ShieldCheck, PlusCircle)'),
    string('name', 'Major name')
  ]
})

export const studyAbroadMajors = defineType({
  name: 'studyAbroadMajors',
  title: 'Majors section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Popular majors',
      type: 'array',
      of: [defineArrayMember({ type: 'studyAbroadMajorItem' })]
    })
  ]
})

export const studyAbroadRequirements = defineType({
  name: 'studyAbroadRequirements',
  title: 'Requirements section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'conditions',
      title: 'Conditions list',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    text('tipText', 'Tip bulb text'),
    image('image', 'Requirements side image'),
    string('imageAlt', 'Image alt text')
  ]
})

export const studyAbroadProspects = defineType({
  name: 'studyAbroadProspects',
  title: 'Prospects section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'opportunities',
      title: 'Opportunities list',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    image('image', 'Prospects corner image'),
    string('imageAlt', 'Image alt text')
  ]
})

const studyAbroadSupportStep = defineType({
  name: 'studyAbroadSupportStep',
  title: 'Support step',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., Compass, ClipboardList, FileSignature, UserCheck, Handshake)'),
    string('text', 'Step text')
  ]
})

export const studyAbroadSupport = defineType({
  name: 'studyAbroadSupport',
  title: 'Support section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'steps',
      title: 'Support steps (max 5)',
      type: 'array',
      of: [defineArrayMember({ type: 'studyAbroadSupportStep' })],
      validation: (Rule) => Rule.max(5)
    })
  ]
})

const studyAbroadTestimonialItem = defineType({
  name: 'studyAbroadTestimonialItem',
  title: 'Testimonial item',
  type: 'object',
  fields: [
    string('name', 'Student name'),
    string('role', 'Role (e.g. Student Diploma 6+6 - Hospitality)'),
    image('avatar', 'Avatar image'),
    defineField({
      name: 'rating',
      title: 'Rating stars',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5)
    }),
    text('quote', 'Student quote')
  ]
})

export const studyAbroadTestimonials = defineType({
  name: 'studyAbroadTestimonials',
  title: 'Testimonials section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'video',
      title: 'Video file',
      description: 'Upload a video file (e.g. MP4) in 9:16 portrait format.',
      type: 'file',
      options: { accept: 'video/*' }
    }),
    defineField({
      name: 'videoEmbedUrl',
      title: 'Vertical testimonial video embed URL',
      description: 'Use an embeddable YouTube, Vimeo, or TikTok player URL. Displayed in a 9:16 frame.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ['https'] }).custom((value) =>
          isSupportedVideoEmbedUrl(value)
            ? true
            : 'Use an HTTPS embed URL from YouTube, Vimeo, or TikTok.'
        )
    }),
    string('videoTitle', 'Video title'),
    image('videoPoster', 'Video poster image (9:16)'),
    defineField({
      name: 'testimonials',
      title: 'Testimonials list',
      type: 'array',
      of: [defineArrayMember({ type: 'studyAbroadTestimonialItem' })]
    })
  ]
})

const studyAbroadFaqItem = defineType({
  name: 'studyAbroadFaqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    string('question', 'Question'),
    text('answer', 'Answer')
  ]
})

export const studyAbroadFaqs = defineType({
  name: 'studyAbroadFaqs',
  title: 'FAQ section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'faqs',
      title: 'FAQs list',
      type: 'array',
      of: [defineArrayMember({ type: 'studyAbroadFaqItem' })]
    })
  ]
})

const studyAbroadServiceItem = defineType({
  name: 'studyAbroadServiceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    string('title', 'Service title'),
    string('ctaText', 'CTA link label (e.g. Tìm hiểu ngay)'),
    string('icon', 'Icon name (e.g. GraduationCap, Briefcase, IdCard, Building2)'),
    string('href', 'Redirect link Href')
  ]
})

export const studyAbroadServices = defineType({
  name: 'studyAbroadServices',
  title: 'Services section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'services',
      title: 'Related services list',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'relatedService' }] }),
        defineArrayMember({ type: 'studyAbroadServiceItem' })
      ]
    })
  ]
})

export const studyAbroadSeo = defineType({
  name: 'studyAbroadSeo',
  title: 'SEO metadata',
  type: 'object',
  fields: [
    string('title', 'Meta Title'),
    text('description', 'Meta Description'),
    image('shareImage', 'OpenGraph sharing image')
  ]
})

export const studyAbroadObjects = [
  studyAbroadStat,
  studyAbroadHero,
  studyAbroadIntro,
  studyAbroadWhyItem,
  studyAbroadWhy,
  studyAbroadMajorItem,
  studyAbroadMajors,
  studyAbroadRequirements,
  studyAbroadProspects,
  studyAbroadSupportStep,
  studyAbroadSupport,
  studyAbroadTestimonialItem,
  studyAbroadTestimonials,
  studyAbroadFaqItem,
  studyAbroadFaqs,
  studyAbroadServiceItem,
  studyAbroadServices,
  studyAbroadSeo
]
