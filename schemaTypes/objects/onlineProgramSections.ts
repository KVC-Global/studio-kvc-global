import {defineArrayMember, defineField, defineType} from 'sanity'

const string = (name: string, title: string) => defineField({name, title, type: 'string'})
const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 4})

// Hero
export const onlineProgramHero = defineType({
  name: 'onlineProgramHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('tagline', 'Tagline'),
    string('title', 'Title'),
    string('subtitle', 'Subtitle'),
    text('description', 'Description'),
    string('breadcrumb', 'Breadcrumb text'),
    string('primaryButtonLabel', 'Button label'),
    string('primaryButtonHref', 'Button href'),
  ],
})

// Intro
export const onlineProgramIntro = defineType({
  name: 'onlineProgramIntro',
  title: 'Introduction',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({type: 'text'})]}),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

// Why KVC cards
export const onlineProgramWhy = defineType({
  name: 'onlineProgramWhy',
  title: 'Why choose KVC',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Reasons', type: 'array', of: [defineArrayMember({
      type: 'object',
      fields: [string('title', 'Title'), text('description', 'Description')],
    })]}),
  ],
})

// Learning format
export const onlineProgramFormat = defineType({
  name: 'onlineProgramFormat',
  title: 'Learning format',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Format items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

// Target audience
export const onlineProgramAudience = defineType({
  name: 'onlineProgramAudience',
  title: 'Target audience',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Audience', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

// Benefits
export const onlineProgramBenefits = defineType({
  name: 'onlineProgramBenefits',
  title: 'Benefits',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Benefits', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

// Registration process
export const onlineProgramProcess = defineType({
  name: 'onlineProgramProcess',
  title: 'Registration process',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'steps', title: 'Steps', type: 'array', of: [defineArrayMember({
      type: 'object',
      fields: [string('step', 'Step')],
    })]}),
  ],
})

// CTA
export const onlineProgramCta = defineType({
  name: 'onlineProgramCta',
  title: 'Call to action',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('body', 'Body'),
    string('buttonLabel', 'Button label'),
    string('buttonHref', 'Button href'),
  ],
})

// Program cards with subjects
const programCard = defineType({
  name: 'onlineProgramCard',
  title: 'Program card',
  type: 'object',
  fields: [
    string('name', 'Program name'),
    string('duration', 'Duration'),
    string('startDates', 'Start dates'),
    defineField({name: 'subjects', title: 'Subjects', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    string('entryRequirements', 'Entry requirements'),
  ],
  preview: {select: {title: 'name', subtitle: 'duration'}},
})

export const onlineProgramPrograms = defineType({
  name: 'onlineProgramPrograms',
  title: 'Programs section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Programs', type: 'array', of: [defineArrayMember({type: 'onlineProgramCard'})]}),
  ],
})

export const onlineProgramObjects = [
  onlineProgramHero,
  onlineProgramIntro,
  onlineProgramWhy,
  onlineProgramFormat,
  onlineProgramAudience,
  onlineProgramBenefits,
  onlineProgramProcess,
  onlineProgramCta,
  programCard,
  onlineProgramPrograms,
]
