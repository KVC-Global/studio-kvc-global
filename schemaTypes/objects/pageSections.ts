import {defineArrayMember, defineField, defineType} from 'sanity'
import {partnersFields} from '../shared/partnersSection'

const string = (name: string, title: string) => defineField({name, title, type: 'string'})
const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 4})
const image = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: true}})

const pageHero = (name: string, title: string, secondaryButton = true) =>
  defineType({
    name,
    title,
    type: 'object',
    fields: [
      string('breadcrumbHome', 'Home breadcrumb'),
      string('breadcrumbCurrent', 'Current page breadcrumb'),
      string('eyebrow', 'Eyebrow'),
      string('titleLine1', 'Title line 1'),
      string('titleLine2', 'Title line 2'),
      text('description', 'Description'),
      string('primaryButtonLabel', 'Primary button label'),
      string('primaryButtonHref', 'Primary button href'),
      ...(secondaryButton
        ? [
            string('secondaryButtonLabel', 'Secondary button label'),
            string('secondaryButtonHref', 'Secondary button href'),
          ]
        : []),
      image('backgroundImage', 'Background image'),
      string('backgroundImageAlt', 'Background image alt'),
    ],
  })

const office = defineType({
  name: 'pageOffice',
  title: 'Office',
  type: 'object',
  fields: [
    string('country', 'Country'),
    string('role', 'Office name'),
    text('description', 'Description'),
    text('address', 'Address'),
    string('phone', 'Phone'),
    string('email', 'Email'),
    string('hours', 'Office hours'),
    defineField({name: 'mapUrl', title: 'Google Maps URL', type: 'url'}),
    string('mapQuery', 'Google Maps query'),
    image('image', 'Office image'),
    string('imageAlt', 'Office image alt'),
  ],
})

const offices = (name: string, title: string) =>
  defineType({
    name,
    title,
    type: 'object',
    fields: [
      string('eyebrow', 'Eyebrow'),
      string('title', 'Title'),
      text('description', 'Description'),
      defineField({
        name: 'offices',
        title: 'Offices',
        type: 'array',
        of: [defineArrayMember({type: 'pageOffice'})],
      }),
    ],
  })

const aboutStat = defineType({
  name: 'aboutPageStat',
  title: 'Stat',
  type: 'object',
  fields: [string('icon', 'Icon name'), string('value', 'Value'), string('label', 'Label')],
})

const aboutValue = defineType({
  name: 'aboutPageValue',
  title: 'Core value',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Title'),
    text('description', 'Description'),
  ],
})

const aboutReview = defineType({
  name: 'aboutPageReview',
  title: 'Client review',
  type: 'object',
  fields: [
    string('name', 'Name'),
    string('role', 'Role'),
    text('quote', 'Quote'),
    image('image', 'Photo'),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    }),
  ],
})

const socialLink = defineType({
  name: 'contactPageSocialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    string('label', 'Label'),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    string('network', 'Network'),
  ],
})

const serviceOption = defineType({
  name: 'contactPageServiceOption',
  title: 'Service option',
  type: 'object',
  fields: [string('label', 'Label'), string('value', 'Value')],
})

export const aboutPageHero = pageHero('aboutPageHero', 'About hero')
export const aboutPageStats = defineType({
  name: 'aboutPageStats',
  title: 'About stats',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({type: 'aboutPageStat'})],
      validation: (Rule) => Rule.max(4),
    }),
  ],
})
export const aboutPageStory = defineType({
  name: 'aboutPageStory',
  title: 'Company story',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    text('description', 'Description'),
    image('image', 'Image'),
    string('imageAlt', 'Image alt'),
    string('visionTitle', 'Vision title'),
    text('visionDescription', 'Vision description'),
    string('missionTitle', 'Mission title'),
    text('missionDescription', 'Mission description'),
  ],
})
export const aboutPageValues = defineType({
  name: 'aboutPageValues',
  title: 'Core values',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    text('description', 'Description'),
    defineField({
      name: 'items',
      title: 'Values',
      type: 'array',
      of: [defineArrayMember({type: 'aboutPageValue'})],
    }),
  ],
})
export const aboutPageTestimonials = defineType({
  name: 'aboutPageTestimonials',
  title: 'Client reviews',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    text('description', 'Description'),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [defineArrayMember({type: 'aboutPageReview'})],
    }),
  ],
})
export const aboutPagePartners = defineType({
  name: 'aboutPagePartners',
  title: 'Partners',
  type: 'object',
  fields: partnersFields,
})
export const aboutPageOffices = offices('aboutPageOffices', 'About offices')

export const contactPageHero = pageHero('contactPageHero', 'Contact hero', false)
export const contactPageInfo = defineType({
  name: 'contactPageInfo',
  title: 'Contact information',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('description', 'Description'),
    string('phone', 'Phone'),
    string('email', 'Email'),
    text('address', 'Address'),
    string('officeHoursTitle', 'Office hours title'),
    string('weekdayHours', 'Weekday hours'),
    string('weekendHours', 'Weekend hours'),
    string('socialTitle', 'Social title'),
    text('socialDescription', 'Social description'),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [defineArrayMember({type: 'contactPageSocialLink'})],
    }),
  ],
})
export const contactPageForm = defineType({
  name: 'contactPageForm',
  title: 'Contact form',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('description', 'Description'),
    string('nameLabel', 'Name label'),
    string('emailLabel', 'Email label'),
    string('phoneLabel', 'Phone label'),
    string('serviceLabel', 'Service label'),
    string('messageLabel', 'Message label'),
    text('consentLabel', 'Consent label'),
    string('submitLabel', 'Submit label'),
    defineField({
      name: 'serviceOptions',
      title: 'Service options',
      type: 'array',
      of: [defineArrayMember({type: 'contactPageServiceOption'})],
    }),
  ],
})
export const contactPageOffices = offices('contactPageOffices', 'Contact offices')

export const pageSeo = defineType({
  name: 'pageSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('description', 'Description'),
    image('image', 'Social image'),
  ],
})

export const pageObjects = [
  office,
  aboutStat,
  aboutValue,
  aboutReview,
  socialLink,
  serviceOption,
  aboutPageHero,
  aboutPageStats,
  aboutPageStory,
  aboutPageValues,
  aboutPageTestimonials,
  aboutPagePartners,
  aboutPageOffices,
  contactPageHero,
  contactPageInfo,
  contactPageForm,
  contactPageOffices,
  pageSeo,
]
