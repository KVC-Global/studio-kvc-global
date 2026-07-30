import {defineArrayMember, defineField, defineType} from 'sanity'

const destinations = [
  {title: 'Home', value: 'home'},
  {title: 'About', value: 'about'},
  {title: 'Work Pass', value: 'workPass'},
  {title: 'Study Abroad', value: 'studyAbroad'},
  {title: 'Bachelor & Master', value: 'uniMaster'},
  {title: 'Private Schools', value: 'privateStudy'},
  {title: 'Public Schools', value: 'publicStudy'},
  {title: 'Online Courses', value: 'onlineCourses'},
  {title: 'OSSD Ontario', value: 'ossd'},
  {title: 'OTHM', value: 'othm'},
  {title: 'Qualifi', value: 'qualifi'},
  {title: 'University of Wolverhampton', value: 'wolverhampton'},
  {title: 'Enterprise Services', value: 'enterprise'},
  {title: 'Contact', value: 'contact'},
  {title: 'Coming Soon', value: 'comingSoon'},
  {title: 'Custom link', value: 'custom'},
]

const validCustomLink =
  /^(\/(?!\/)[^\s]*|#[^\s]*|https:\/\/[^\s]+|mailto:[^\s@]+@[^\s@]+\.[^\s@]+|tel:\+?[0-9().\-\s]+)$/i

const stringField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'string',
    validation: required ? (Rule) => Rule.required() : undefined,
  })

const textField = (name: string, title: string) => defineField({name, title, type: 'text', rows: 3})

const siteLink = defineType({
  name: 'siteLink',
  title: 'Link destination',
  type: 'object',
  fields: [
    defineField({
      name: 'destination',
      title: 'Page',
      type: 'string',
      options: {list: destinations, layout: 'dropdown'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customHref',
      title: 'Custom link',
      type: 'string',
      description: 'Use /path, #section, https://, mailto:, or tel:',
      hidden: ({parent}) => parent?.destination !== 'custom',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const destination = (context.parent as {destination?: string} | undefined)?.destination
          if (destination !== 'custom') return true
          if (!value) return 'Custom link is required'
          return validCustomLink.test(value)
            ? true
            : 'Enter a valid relative, HTTPS, email, or phone link'
        }),
    }),
  ],
})

const navChild = defineType({
  name: 'siteNavChild',
  title: 'Dropdown item',
  type: 'object',
  fields: [
    stringField('label', 'Label', true),
    defineField({
      name: 'link',
      title: 'Destination',
      type: 'siteLink',
      validation: (Rule) => Rule.required(),
    }),
    textField('description', 'Short description'),
    defineField({
      name: 'isComingSoon',
      title: 'Show “Coming soon”',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'link.destination'}},
})

const navItem = defineType({
  name: 'siteNavItem',
  title: 'Main navigation item',
  type: 'object',
  fields: [
    stringField('label', 'Label', true),
    defineField({
      name: 'link',
      title: 'Destination',
      type: 'siteLink',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'children',
      title: 'Dropdown items',
      description: 'Leave empty for a normal navigation link.',
      type: 'array',
      of: [defineArrayMember({type: 'siteNavChild'})],
      validation: (Rule) => Rule.max(8),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'link.destination'}},
})

const footerLink = defineType({
  name: 'siteFooterLink',
  title: 'Footer link',
  type: 'object',
  fields: [
    stringField('label', 'Label', true),
    defineField({
      name: 'link',
      title: 'Destination',
      type: 'siteLink',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'link.destination'}},
})

const footerColumn = defineType({
  name: 'siteFooterColumn',
  title: 'Footer column',
  type: 'object',
  fields: [
    stringField('heading', 'Heading', true),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({type: 'siteFooterLink'})],
      validation: (Rule) => Rule.max(8),
    }),
  ],
})

const ctaButton = defineType({
  name: 'siteCtaButton',
  title: 'Button',
  type: 'object',
  fields: [
    stringField('label', 'Label', true),
    defineField({
      name: 'link',
      title: 'Destination',
      type: 'siteLink',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export const siteSettingsObjects = [
  siteLink,
  navChild,
  navItem,
  footerLink,
  footerColumn,
  ctaButton,
]

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Header & footer',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'header',
      fields: [
        stringField('comingSoonLabel', '“Coming soon” label'),
        defineField({
          name: 'navItems',
          title: 'Main navigation',
          description: 'Drag items to reorder. Keep labels short so the desktop menu fits.',
          type: 'array',
          of: [defineArrayMember({type: 'siteNavItem'})],
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .max(7)
              .warning('More than 7 items may not fit in the desktop header'),
        }),
        defineField({name: 'cta', title: 'Consultation button', type: 'siteCtaButton'}),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        textField('bio', 'Company introduction'),
        defineField({
          name: 'cta',
          title: 'CTA banner',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Show CTA banner',
              type: 'boolean',
              initialValue: true,
            }),
            stringField('title', 'Title'),
            textField('description', 'Description'),
            defineField({name: 'primaryButton', title: 'Primary button', type: 'siteCtaButton'}),
            defineField({
              name: 'secondaryButton',
              title: 'Secondary button',
              type: 'siteCtaButton',
            }),
          ],
        }),
        defineField({name: 'servicesColumn', title: 'Services column', type: 'siteFooterColumn'}),
        defineField({name: 'aboutColumn', title: 'About column', type: 'siteFooterColumn'}),
        defineField({name: 'supportColumn', title: 'Support column', type: 'siteFooterColumn'}),
        stringField('contactHeading', 'Contact heading'),
        defineField({
          name: 'legalLinks',
          title: 'Legal links',
          type: 'array',
          of: [defineArrayMember({type: 'siteFooterLink'})],
          validation: (Rule) => Rule.max(4),
        }),
        defineField({
          name: 'copyrightNotice',
          title: 'Copyright notice',
          description:
            'Current year and © are added automatically. Example: KVC Global. All rights reserved.',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'Header & footer — English' : 'Header & footer — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
