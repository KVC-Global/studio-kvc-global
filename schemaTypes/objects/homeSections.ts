import {defineArrayMember, defineField, defineType} from 'sanity'
import {partnersFields} from '../shared/partnersSection'

const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 4})
const string = (name: string, title: string) => defineField({name, title, type: 'string'})
const image = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: true}})

const stat = defineType({
  name: 'homepageStat',
  title: 'Stat item',
  type: 'object',
  fields: [string('value', 'Value'), string('label', 'Label'), string('icon', 'Icon name')],
})
const reason = defineType({
  name: 'homepageReason',
  title: 'Why KVC reason',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Title'),
    text('description', 'Description'),
  ],
})
const processStep = defineType({
  name: 'homepageProcessStep',
  title: 'Process step',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Title'),
    text('description', 'Description'),
  ],
})
const review = defineType({
  name: 'homepageGoogleReview',
  title: 'Google review',
  type: 'object',
  fields: [
    string('name', 'Name'),
    string('initial', 'Initial'),
    string('color', 'Color'),
    text('text', 'Review'),
  ],
})

export const homepageHero = defineType({
  name: 'homepageHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('titleLine1', 'Title line 1'),
    string('titleLine2', 'Title line 2'),
    text('description', 'Description'),
    string('primaryButtonLabel', 'Primary button label'),
    string('primaryButtonHref', 'Primary button href'),
    string('secondaryButtonLabel', 'Secondary button label'),
    string('secondaryButtonHref', 'Secondary button href'),
    image('backgroundImage', 'Background image'),
    string('backgroundImageAlt', 'Background image alt'),
  ],
})

export const homepageStats = defineType({
  name: 'homepageStats',
  title: 'Stats section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({type: 'homepageStat'})],
      validation: (Rule) => Rule.max(4),
    }),
  ],
})

export const homepageAbout = defineType({
  name: 'homepageAbout',
  title: 'About section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    text('description', 'Description'),
    image('image', 'Image'),
    string('imageAlt', 'Image alt'),
    string('ctaLabel', 'CTA label'),
    string('ctaHref', 'CTA href'),
  ],
})

const sectionReferences = (name: string, title: string, type: string) =>
  defineField({
    name,
    title,
    description:
      'Choose reusable records for this page. Reordering or removing an item only changes this page; editing the referenced record changes it everywhere.',
    type: 'array',
    of: [defineArrayMember({type: 'reference', to: [{type}]})],
    options: {
      sortable: true,
    },
  })

export const homepagePartners = defineType({
  name: 'homepagePartners',
  title: 'Partners section',
  type: 'object',
  fields: partnersFields,
})
export const homepageServices = defineType({
  name: 'homepageServices',
  title: 'Services section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    text('description', 'Description'),
    sectionReferences('services', 'Featured services', 'service'),
  ],
})

export const homepageWhyProcess = defineType({
  name: 'homepageWhyProcess',
  title: 'Why & Process section',
  type: 'object',
  fields: [
    defineField({
      name: 'why',
      title: 'Why KVC',
      type: 'object',
      fields: [
        string('eyebrow', 'Eyebrow'),
        string('title', 'Title'),
        string('cta', 'CTA label'),
        defineField({
          name: 'reasons',
          title: 'Reasons',
          type: 'array',
          of: [defineArrayMember({type: 'homepageReason'})],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'object',
      fields: [
        string('eyebrow', 'Eyebrow'),
        string('title', 'Title'),
        string('ariaLabel', 'Accessibility label'),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [defineArrayMember({type: 'homepageProcessStep'})],
          validation: (Rule) => Rule.max(5),
        }),
      ],
    }),
  ],
})

export const homepageTestimonials = defineType({
  name: 'homepageTestimonials',
  title: 'Testimonials section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    sectionReferences('testimonials', 'Featured testimonials', 'testimonial'),
    defineField({
      name: 'googleReviews',
      title: 'Google reviews',
      type: 'object',
      fields: [
        defineField({name: 'rating', type: 'number', validation: (Rule) => Rule.min(0).max(5)}),
        defineField({name: 'reviewCount', title: 'Review count', type: 'number'}),
        defineField({name: 'reviewUrl', title: 'Review URL', type: 'url'}),
        defineField({
          name: 'reviews',
          type: 'array',
          of: [defineArrayMember({type: 'homepageGoogleReview'})],
        }),
      ],
    }),
  ],
})

export const homepageSeo = defineType({
  name: 'homepageSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('description', 'Description'),
    image('image', 'Social image'),
  ],
})

export const homepageObjects = [
  stat,
  reason,
  processStep,
  review,
  homepageHero,
  homepageStats,
  homepageAbout,
  homepagePartners,
  homepageServices,
  homepageWhyProcess,
  homepageTestimonials,
  homepageSeo,
]
