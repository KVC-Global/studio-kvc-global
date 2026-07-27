import {defineArrayMember, defineField, defineType} from 'sanity'

const string = (name: string, title: string) => defineField({name, title, type: 'string'})
const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 4})
const image = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: true}})

// --- Shared reusable types ---

/** Generic icon-item card used by Why/benefits sections across pages */
const iconItem = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: 'object',
    fields: [string('icon', 'Icon name'), string('title', 'Title'), text('description', 'Description')],
    preview: {select: {title: 'title'}},
  })

/** Inline testimonial item */
const testimonialItem = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: 'object',
    fields: [
      string('name', 'Name'),
      string('role', 'Role'),
      text('quote', 'Quote'),
      defineField({name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5)}),
    ],
    preview: {select: {title: 'name', subtitle: 'role'}},
  })

/** Shared SEO object — same shape as homepageSeo / pageSeo */
export const sharedSeo = defineType({
  name: 'sharedSeo',
  title: 'SEO',
  type: 'object',
  fields: [string('title', 'Title'), text('description', 'Description')],
})

// --- Khoa hoc online section types ---

const khoaHocOnlineStat = defineType({
  name: 'khoaHocOnlineStat',
  title: 'Stat',
  type: 'object',
  fields: [string('icon', 'Icon name'), string('value', 'Value'), string('label', 'Label')],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const khoaHocOnlineHero = defineType({
  name: 'khoaHocOnlineHero',
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
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [defineArrayMember({type: 'khoaHocOnlineStat'})],
      validation: (Rule) => Rule.max(4),
    }),
  ],
})

export const khoaHocOnlineIntro = defineType({
  name: 'khoaHocOnlineIntro',
  title: 'Intro section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('highlightText', 'Highlight text'),
    defineField({name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({type: 'text'})]}),
    defineField({name: 'bullets', title: 'Bullet points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    image('image', 'Image'),
    string('imageAlt', 'Image alt'),
  ],
})

const khoaHocOnlineProgramItem = defineType({
  name: 'khoaHocOnlineProgramItem',
  title: 'Program',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('name', 'Program name'),
    text('description', 'Description'),
    string('duration', 'Duration'),
    defineField({name: 'highlights', title: 'Highlights', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
  preview: {select: {title: 'name', subtitle: 'duration'}},
})

export const khoaHocOnlinePrograms = defineType({
  name: 'khoaHocOnlinePrograms',
  title: 'Programs section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Programs', type: 'array', of: [defineArrayMember({type: 'khoaHocOnlineProgramItem'})]}),
  ],
})

export const khoaHocOnlineWhy = defineType({
  name: 'khoaHocOnlineWhy',
  title: 'Why choose online courses',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Reasons', type: 'array', of: [defineArrayMember({type: 'khoaHocOnlineWhyItem'})]}),
  ],
})

export const khoaHocOnlineTestimonials = defineType({
  name: 'khoaHocOnlineTestimonials',
  title: 'Testimonials section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'testimonials', title: 'Testimonials', type: 'array', of: [defineArrayMember({type: 'khoaHocOnlineTestimonialItem'})]}),
  ],
})

export const khoaHocOnlineCta = defineType({
  name: 'khoaHocOnlineCta',
  title: 'Call to action',
  type: 'object',
  fields: [string('title', 'Title'), text('description', 'Description'), string('buttonLabel', 'Button label'), string('buttonHref', 'Button href')],
})

// --- Dich vu section types ---

const dichVuStat = defineType({
  name: 'dichVuStat',
  title: 'Stat',
  type: 'object',
  fields: [string('icon', 'Icon name'), string('value', 'Value'), string('label', 'Label')],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const dichVuHero = defineType({
  name: 'dichVuHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    text('description', 'Description'),
    string('primaryButtonLabel', 'Primary button label'),
    string('primaryButtonHref', 'Primary button href'),
    defineField({name: 'stats', title: 'Stats', type: 'array', of: [defineArrayMember({type: 'dichVuStat'})], validation: (Rule) => Rule.max(4)}),
  ],
})

const dichVuCategory = defineType({
  name: 'dichVuCategory',
  title: 'Service category',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Title'),
    text('description', 'Description'),
    string('href', 'Link URL'),
    image('image', 'Image'),
    string('imageAlt', 'Image alt'),
  ],
  preview: {select: {title: 'title', media: 'image'}},
})

export const dichVuServiceCategories = defineType({
  name: 'dichVuServiceCategories',
  title: 'Service categories',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'categories', title: 'Categories', type: 'array', of: [defineArrayMember({type: 'dichVuCategory'})]}),
  ],
})

export const dichVuWhy = defineType({
  name: 'dichVuWhy',
  title: 'Why choose KVC',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'items', title: 'Reasons', type: 'array', of: [defineArrayMember({type: 'dichVuWhyItem'})]}),
  ],
})

const dichVuProcessStep = defineType({
  name: 'dichVuProcessStep',
  title: 'Process step',
  type: 'object',
  fields: [string('icon', 'Icon name'), string('title', 'Title'), text('description', 'Description')],
  preview: {select: {title: 'title'}},
})

export const dichVuProcess = defineType({
  name: 'dichVuProcess',
  title: 'Process section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'steps', title: 'Steps', type: 'array', of: [defineArrayMember({type: 'dichVuProcessStep'})]}),
  ],
})

export const dichVuTestimonials = defineType({
  name: 'dichVuTestimonials',
  title: 'Testimonials section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({name: 'testimonials', title: 'Testimonials', type: 'array', of: [defineArrayMember({type: 'dichVuTestimonialItem'})]}),
  ],
})

export const dichVuPartners = defineType({
  name: 'dichVuPartners',
  title: 'Partners section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'partners', title: 'Partners', type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'partner'}]})],
      options: {sortable: true},
    }),
  ],
})

// --- Collected type lists ---

// Reusable shared icon/testimonial types
export const khoaHocOnlineWhyItem = iconItem('khoaHocOnlineWhyItem', 'Why item')
export const khoaHocOnlineTestimonialItem = testimonialItem('khoaHocOnlineTestimonialItem', 'Testimonial')
export const dichVuWhyItem = iconItem('dichVuWhyItem', 'Why item')
export const dichVuTestimonialItem = testimonialItem('dichVuTestimonialItem', 'Testimonial')

export const servicePageObjects = [
  // Shared
  sharedSeo,
  // Khoa hoc online
  khoaHocOnlineStat,
  khoaHocOnlineHero,
  khoaHocOnlineIntro,
  khoaHocOnlineProgramItem,
  khoaHocOnlinePrograms,
  khoaHocOnlineWhyItem,
  khoaHocOnlineWhy,
  khoaHocOnlineTestimonialItem,
  khoaHocOnlineTestimonials,
  khoaHocOnlineCta,
  // Dich vu
  dichVuStat,
  dichVuHero,
  dichVuCategory,
  dichVuServiceCategories,
  dichVuWhyItem,
  dichVuWhy,
  dichVuProcessStep,
  dichVuProcess,
  dichVuTestimonialItem,
  dichVuTestimonials,
  dichVuPartners,
]
