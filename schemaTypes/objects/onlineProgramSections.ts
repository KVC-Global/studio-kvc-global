import {defineArrayMember, defineField, defineType} from 'sanity'

const string = (name: string, title: string) => defineField({name, title, type: 'string'})
const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 4})
const image = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: true}})

// Hero
export const onlineProgramHero = defineType({
  name: 'onlineProgramHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('parentBreadcrumb', 'Parent breadcrumb (e.g. Khóa Học Online)'),
    string('tagline', 'Tagline'),
    string('title', 'Title'),
    string('subtitle', 'Subtitle'),
    text('description', 'Description (second paragraph)'),
    string('breadcrumb', 'Breadcrumb text (current page)'),
    string('primaryButtonLabel', 'Button label'),
    string('primaryButtonHref', 'Button href'),
    image('backgroundImage', 'Hero background image'),
  ],
})

// Intro (What is X?)
export const onlineProgramIntro = defineType({
  name: 'onlineProgramIntro',
  title: 'Introduction',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({type: 'text'})]}),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    image('image', 'Intro image'),
    string('imageAlt', 'Intro image alt'),
  ],
})

// Numbered structure cards (OSSD graduation requirements)
const structureItem = defineType({
  name: 'onlineProgramStructureItem',
  title: 'Structure item',
  type: 'object',
  fields: [string('title', 'Title'), text('description', 'Description')],
  preview: {select: {title: 'title'}},
})

export const onlineProgramStructure = defineType({
  name: 'onlineProgramStructure',
  title: 'Program structure',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('subtitle', 'Subtitle'),
    defineField({name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({type: 'onlineProgramStructureItem'})]}),
  ],
})

// Why choose cards (with icon)
const iconCard = defineType({
  name: 'onlineProgramIconCard',
  title: 'Icon card',
  type: 'object',
  fields: [
    string('icon', 'Icon name (lucide)'),
    string('title', 'Title'),
    text('description', 'Description'),
  ],
  preview: {select: {title: 'title', subtitle: 'icon'}},
})

export const onlineProgramWhy = defineType({
  name: 'onlineProgramWhy',
  title: 'Why choose KVC',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Reasons', type: 'array', of: [defineArrayMember({type: 'onlineProgramIconCard'})]}),
  ],
})

// Bullet list section (Wolverhampton KVC support)
export const onlineProgramSupport = defineType({
  name: 'onlineProgramSupport',
  title: 'Support list',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

// Learning format tiles (icon + title + desc)
export const onlineProgramFormat = defineType({
  name: 'onlineProgramFormat',
  title: 'Learning format',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Format items', type: 'array', of: [defineArrayMember({type: 'onlineProgramIconCard'})]}),
  ],
})

// Progression section (Qualifi "Cơ hội học tiếp")
export const onlineProgramProgression = defineType({
  name: 'onlineProgramProgression',
  title: 'Progression',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('body', 'Body paragraph'),
    defineField({name: 'tags', title: 'Level tags', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    string('noteTitle', 'Highlight note title'),
    text('noteBody', 'Highlight note body'),
    image('image', 'Progression image'),
    string('imageAlt', 'Image alt'),
  ],
})

// Target audience (icon + title only, description removed)
const audienceCard = defineType({
  name: 'onlineProgramAudienceCard',
  title: 'Audience card',
  type: 'object',
  fields: [
    string('icon', 'Icon name (lucide)'),
    string('title', 'Title'),
  ],
  preview: {select: {title: 'title', subtitle: 'icon'}},
})

export const onlineProgramAudience = defineType({
  name: 'onlineProgramAudience',
  title: 'Target audience',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Audience', type: 'array', of: [defineArrayMember({type: 'onlineProgramAudienceCard'})]}),
  ],
})

// Benefits (image cards)
const benefitCard = defineType({
  name: 'onlineProgramBenefitCard',
  title: 'Benefit card',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('description', 'Description'),
    image('image', 'Benefit image'),
  ],
  preview: {select: {title: 'title'}},
})

export const onlineProgramBenefits = defineType({
  name: 'onlineProgramBenefits',
  title: 'Benefits',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Benefits', type: 'array', of: [defineArrayMember({type: 'onlineProgramBenefitCard'})]}),
  ],
})

// Registration process (step title + desc)
const processStep = defineType({
  name: 'onlineProgramStep',
  title: 'Process step',
  type: 'object',
  fields: [string('title', 'Title'), text('description', 'Description')],
  preview: {select: {title: 'title'}},
})

export const onlineProgramProcess = defineType({
  name: 'onlineProgramProcess',
  title: 'Registration process',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'steps', title: 'Steps', type: 'array', of: [defineArrayMember({type: 'onlineProgramStep'})]}),
  ],
})

// CTA (currently unused by components but kept for future wiring)
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

// Program cards with subjects (OTHM/Qualifi/Wolverhampton timelines)
const programCard = defineType({
  name: 'onlineProgramCard',
  title: 'Program card',
  type: 'object',
  fields: [
    string('name', 'Program name'),
    string('duration', 'Duration'),
    string('startDates', 'Start dates'),
    defineField({name: 'subjects', title: 'Subjects', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    text('entryRequirements', 'Entry requirements'),
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

// OSSD Subjects Carousel
const subjectItem = defineType({
  name: 'onlineProgramSubject',
  title: 'Subject item',
  type: 'object',
  fields: [
    string('name', 'Subject name'),
    image('image', 'Subject image'),
  ],
  preview: {select: {title: 'name'}},
})

export const onlineProgramSubjects = defineType({
  name: 'onlineProgramSubjects',
  title: 'Subjects carousel',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Subjects', type: 'array', of: [defineArrayMember({type: 'onlineProgramSubject'})]}),
  ],
})

// Parent reasons bullet section
export const onlineProgramParentReasons = defineType({
  name: 'onlineProgramParentReasons',
  title: 'Parent reasons',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Reasons', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

export const onlineProgramObjects = [
  onlineProgramHero,
  onlineProgramIntro,
  structureItem,
  onlineProgramStructure,
  subjectItem,
  onlineProgramSubjects,
  onlineProgramParentReasons,
  iconCard,
  onlineProgramWhy,
  onlineProgramSupport,
  onlineProgramFormat,
  onlineProgramProgression,
  audienceCard,
  onlineProgramAudience,
  benefitCard,
  onlineProgramBenefits,
  processStep,
  onlineProgramProcess,
  onlineProgramCta,
  programCard,
  onlineProgramPrograms,
]

