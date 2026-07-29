import {defineArrayMember, defineField, defineType} from 'sanity'

const string = (name: string, title: string) => defineField({name, title, type: 'string'})
const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 4})
const image = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: true}})

/** Shared SEO object */
export const sharedSeo = defineType({
  name: 'sharedSeo',
  title: 'SEO',
  type: 'object',
  fields: [string('title', 'Title'), text('description', 'Description')],
})

// --- Dich Vu Hero ---

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
    image('backgroundImage', 'Background image'),
    string('backgroundImageAlt', 'Background image alt'),
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    string('primaryButtonLabel', 'Primary button label'),
    string('primaryButtonHref', 'Primary button href'),
    string('secondaryButtonLabel', 'Secondary button label'),
    string('secondaryButtonHref', 'Secondary button href'),
    defineField({name: 'stats', title: 'Stats', type: 'array', of: [defineArrayMember({type: 'dichVuStat'})], validation: (Rule) => Rule.max(4)}),
  ],
})

// --- Dich Vu Intro ---

const dichVuIntroPillar = defineType({
  name: 'dichVuIntroPillar',
  title: 'Intro pillar',
  type: 'object',
  fields: [string('icon', 'Icon name'), string('label', 'Label')],
  preview: {select: {title: 'label', subtitle: 'icon'}},
})

export const dichVuIntro = defineType({
  name: 'dichVuIntro',
  title: 'Intro section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
    defineField({name: 'pillars', title: 'Pillars', type: 'array', of: [defineArrayMember({type: 'dichVuIntroPillar'})], validation: (Rule) => Rule.max(5)}),
    text('paragraph1', 'Paragraph 1'),
    text('paragraph2', 'Paragraph 2 (highlighted)'),
  ],
})

// --- Dich Vu Service Categories (section heading only — categories are rendered by the accordion) ---

export const dichVuServiceCategories = defineType({
  name: 'dichVuServiceCategories',
  title: 'Service categories',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
    string('title', 'Title'),
  ],
})

// --- Dich Vu Service Accordion ---

const dichVuServiceChecklistGroup = defineType({
  name: 'dichVuServiceChecklistGroup',
  title: 'Checklist group',
  type: 'object',
  fields: [
    string('title', 'Group title'),
    defineField({name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
  preview: {select: {title: 'title'}},
})

const dichVuTagList = defineType({
  name: 'dichVuTagList',
  title: 'Tag list',
  type: 'object',
  fields: [
    string('label', 'Label'),
    defineField({name: 'items', title: 'Items', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
})

const dichVuSingaporeSubTab = defineType({
  name: 'dichVuSingaporeSubTab',
  title: 'Singapore sub-tab',
  type: 'object',
  fields: [
    string('label', 'Tab label'),
    string('icon', 'Icon name'),
    defineField({name: 'intro', title: 'Intro paragraphs', type: 'array', of: [defineArrayMember({type: 'text'})]}),
    defineField({name: 'services', title: 'Service checklists', type: 'array', of: [defineArrayMember({type: 'dichVuServiceChecklistGroup'})]}),
    defineField({name: 'audience', title: 'Target audience', type: 'dichVuTagList'}),
    defineField({name: 'benefits', title: 'Benefits', type: 'dichVuTagList'}),
  ],
  preview: {select: {title: 'label'}},
})

const dichVuServiceAccordionSection = defineType({
  name: 'dichVuServiceAccordionSection',
  title: 'Accordion section',
  type: 'object',
  fields: [
    string('tag', 'Tag label'),
    string('heading', 'Heading'),
    string('headingAccent', 'Heading accent'),
    defineField({name: 'intro', title: 'Intro paragraphs', type: 'array', of: [defineArrayMember({type: 'text'})]}),
    defineField({name: 'services', title: 'Service checklists', type: 'array', of: [defineArrayMember({type: 'dichVuServiceChecklistGroup'})]}),
    defineField({name: 'audience', title: 'Target audience', type: 'dichVuTagList'}),
    defineField({name: 'benefits', title: 'Benefits', type: 'dichVuTagList'}),
    defineField({name: 'singaporeSubTabs', title: 'Singapore sub-tabs', type: 'array', of: [defineArrayMember({type: 'dichVuSingaporeSubTab'})]}),
    string('ctaLabel', 'CTA label'),
    string('ctaHref', 'CTA href'),
    string('ctaIcon', 'CTA icon name'),
    text('crossLinkText', 'Cross-link paragraph'),
    image('image', 'Image'),
    string('imageAlt', 'Image alt'),
  ],
  preview: {select: {title: 'tag', subtitle: 'heading'}},
})

export const dichVuServiceAccordion = defineType({
  name: 'dichVuServiceAccordion',
  title: 'Service accordion',
  type: 'object',
  fields: [
    defineField({name: 'sections', title: 'Accordion sections', type: 'array', of: [defineArrayMember({type: 'dichVuServiceAccordionSection'})]}),
  ],
})

export const servicePageObjects = [
  sharedSeo,
  // Dich Vu
  dichVuStat,
  dichVuHero,
  dichVuIntroPillar,
  dichVuIntro,
  dichVuServiceCategories,
  // Dich Vu — service accordion (detailed breakdown)
  dichVuServiceChecklistGroup,
  dichVuTagList,
  dichVuSingaporeSubTab,
  dichVuServiceAccordionSection,
  dichVuServiceAccordion,
]
