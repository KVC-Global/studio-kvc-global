import { defineArrayMember, defineField, defineType } from 'sanity'

const text = (name: string, title: string) => defineField({ name, title, type: 'text', rows: 4 })
const string = (name: string, title: string) => defineField({ name, title, type: 'string' })
const image = (name: string, title: string) => defineField({ name, title, type: 'image', options: { hotspot: true } })

const uniMasterStat = defineType({
  name: 'uniMasterStat',
  title: 'Stat item',
  type: 'object',
  fields: [
    string('value', 'Value'),
    string('label', 'Label'),
    string('icon', 'Icon name (e.g., GraduationCap, Compass, Coins, CheckCircle)')
  ]
})

export const uniMasterHero = defineType({
  name: 'uniMasterHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow (e.g., ĐẠI HỌC – THẠC SĨ SINGAPORE)'),
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
      of: [defineArrayMember({ type: 'uniMasterStat' })],
      validation: (Rule) => Rule.max(4)
    })
  ]
})

export const uniMasterIntro = defineType({
  name: 'uniMasterIntro',
  title: 'Intro section',
  type: 'object',
  fields: [
    string('title', 'Title (e.g., Giới thiệu lộ trình Đại học & Thạc sĩ Singapore)'),
    text('highlightText', 'Highlight introductory text'),
    defineField({
      name: 'criteria',
      title: 'Criteria list',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    text('remainingText', 'Remaining explanation text'),
    image('image', 'Intro section image'),
    string('imageAlt', 'Image alt text')
  ]
})

const uniMasterWhyItem = defineType({
  name: 'uniMasterWhyItem',
  title: 'Why item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., Globe, MapPin, BookOpen, Briefcase, Coins)'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const uniMasterWhy = defineType({
  name: 'uniMasterWhy',
  title: 'Why section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Benefit items',
      type: 'array',
      of: [defineArrayMember({ type: 'uniMasterWhyItem' })]
    })
  ]
})

const uniMasterAudienceItem = defineType({
  name: 'uniMasterAudienceItem',
  title: 'Audience item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., GraduationCap, UserCheck, Briefcase, HeartHandshake)'),
    string('title', 'Title'),
    text('desc', 'Description')
  ]
})

export const uniMasterAudience = defineType({
  name: 'uniMasterAudience',
  title: 'Audience section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Audience items',
      type: 'array',
      of: [defineArrayMember({ type: 'uniMasterAudienceItem' })]
    })
  ]
})

const uniMasterCommitmentItem = defineType({
  name: 'uniMasterCommitmentItem',
  title: 'Commitment item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., ShieldCheck, Heart, Sparkles)'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const uniMasterCommitment = defineType({
  name: 'uniMasterCommitment',
  title: 'Commitment section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Commitment items',
      type: 'array',
      of: [defineArrayMember({ type: 'uniMasterCommitmentItem' })]
    })
  ]
})

const uniMasterServiceItem = defineType({
  name: 'uniMasterServiceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    string('title', 'Service title'),
    string('ctaText', 'CTA link label (e.g. Tìm hiểu ngay)'),
    string('icon', 'Icon name (e.g. GraduationCap, Building2, BookOpen)'),
    string('href', 'Redirect link Href')
  ]
})

export const uniMasterServices = defineType({
  name: 'uniMasterServices',
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
        defineArrayMember({ type: 'uniMasterServiceItem' })
      ]
    })
  ]
})

export const uniMasterSeo = defineType({
  name: 'uniMasterSeo',
  title: 'SEO metadata',
  type: 'object',
  fields: [
    string('title', 'Meta Title'),
    text('description', 'Meta Description'),
    image('shareImage', 'OpenGraph sharing image')
  ]
})

export const uniMasterObjects = [
  uniMasterStat,
  uniMasterHero,
  uniMasterIntro,
  uniMasterWhyItem,
  uniMasterWhy,
  uniMasterAudienceItem,
  uniMasterAudience,
  uniMasterCommitmentItem,
  uniMasterCommitment,
  uniMasterServiceItem,
  uniMasterServices,
  uniMasterSeo
]
