import { defineArrayMember, defineField, defineType } from 'sanity'

const text = (name: string, title: string) => defineField({ name, title, type: 'text', rows: 4 })
const string = (name: string, title: string) => defineField({ name, title, type: 'string' })
const image = (name: string, title: string) => defineField({ name, title, type: 'image', options: { hotspot: true } })

const privateStudyStat = defineType({
  name: 'privateStudyStat',
  title: 'Stat item',
  type: 'object',
  fields: [
    string('value', 'Value'),
    string('label', 'Label'),
    string('icon', 'Icon name')
  ]
})

export const privateStudyHero = defineType({
  name: 'privateStudyHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
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
      of: [defineArrayMember({ type: 'privateStudyStat' })],
      validation: (Rule) => Rule.max(4)
    })
  ]
})

export const privateStudyIntro = defineType({
  name: 'privateStudyIntro',
  title: 'Intro section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('paragraph1', 'First paragraph text'),
    text('paragraph2', 'Second paragraph text'),
    text('paragraph3', 'Third paragraph text'),
    image('image', 'Intro section image'),
    string('imageAlt', 'Image alt text')
  ]
})

const privateStudyWhyItem = defineType({
  name: 'privateStudyWhyItem',
  title: 'Why item',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const privateStudyWhy = defineType({
  name: 'privateStudyWhy',
  title: 'Why section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Benefit items',
      type: 'array',
      of: [defineArrayMember({ type: 'privateStudyWhyItem' })]
    })
  ]
})

const privateStudySchoolLevel = defineType({
  name: 'privateStudySchoolLevel',
  title: 'School level details',
  type: 'object',
  fields: [
    string('grade', 'Grade level name (e.g. Early Years)'),
    string('age', 'Age or Grades description'),
    string('fee', 'Tuition reference fee')
  ]
})

const privateStudySchoolItem = defineType({
  name: 'privateStudySchoolItem',
  title: 'School item',
  type: 'object',
  fields: [
    string('id', 'Tab identifier (e.g. ais, sais, brighton)'),
    string('name', 'School full name'),
    text('desc', 'Description summary'),
    defineField({
      name: 'levels',
      title: 'Level details',
      type: 'array',
      of: [defineArrayMember({ type: 'privateStudySchoolLevel' })]
    })
  ]
})

export const privateStudySchools = defineType({
  name: 'privateStudySchools',
  title: 'Schools section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'School list',
      type: 'array',
      of: [defineArrayMember({ type: 'privateStudySchoolItem' })]
    }),
    text('tipText', 'Disclaimer tip text')
  ]
})

export const privateStudyRequirements = defineType({
  name: 'privateStudyRequirements',
  title: 'Requirements section',
  type: 'object',
  fields: [
    string('title1', 'Requirements Title (e.g. Yêu cầu về độ tuổi & học bạ)'),
    string('title2', 'Documents Title (e.g. Hồ sơ đăng ký cần chuẩn bị)'),
    string('ageTitle', 'Age bracket title'),
    text('ageDesc', 'Age bracket description'),
    string('academicTitle', 'Academic records title'),
    text('academicDesc', 'Academic records description'),
    string('entryTitle', 'Entry evaluation title'),
    text('entryDesc', 'Entry evaluation description'),
    defineField({
      name: 'conditions',
      title: 'Documents to prepare checklist',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    text('tipText', 'Guardian advice tip text')
  ]
})

const privateStudySupportStep = defineType({
  name: 'privateStudySupportStep',
  title: 'Support journey step',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Step title'),
    text('description', 'Step description')
  ]
})

export const privateStudySupport = defineType({
  name: 'privateStudySupport',
  title: 'Support section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Support journey steps list',
      type: 'array',
      of: [defineArrayMember({ type: 'privateStudySupportStep' })]
    })
  ]
})

const privateStudyFaqItem = defineType({
  name: 'privateStudyFaqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    string('question', 'Question text'),
    text('answer', 'Answer text')
  ]
})

export const privateStudyFaqs = defineType({
  name: 'privateStudyFaqs',
  title: 'FAQs section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'FAQ list',
      type: 'array',
      of: [defineArrayMember({ type: 'privateStudyFaqItem' })]
    })
  ]
})

const privateStudyServiceItem = defineType({
  name: 'privateStudyServiceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    string('title', 'Service title'),
    string('ctaText', 'CTA link label'),
    string('icon', 'Icon name'),
    string('href', 'Redirect link Href')
  ]
})

export const privateStudyServices = defineType({
  name: 'privateStudyServices',
  title: 'Services section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'services',
      title: 'Related services list',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'relatedService' }] })]
    })
  ]
})

export const privateStudySeo = defineType({
  name: 'privateStudySeo',
  title: 'SEO metadata',
  type: 'object',
  fields: [
    string('title', 'Meta Title'),
    text('description', 'Meta Description'),
    image('shareImage', 'OpenGraph sharing image')
  ]
})

export const privateStudyObjects = [
  privateStudyStat,
  privateStudyHero,
  privateStudyIntro,
  privateStudyWhyItem,
  privateStudyWhy,
  privateStudySchoolLevel,
  privateStudySchoolItem,
  privateStudySchools,
  privateStudyRequirements,
  privateStudySupportStep,
  privateStudySupport,
  privateStudyFaqItem,
  privateStudyFaqs,
  privateStudyServiceItem,
  privateStudyServices,
  privateStudySeo
]
