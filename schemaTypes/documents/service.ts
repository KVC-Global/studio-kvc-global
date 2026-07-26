import {defineType, defineField} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'e.g., GraduationCap, Globe, ShieldCheck',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text (for accessibility)',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      language: 'language',
      media: 'image',
    },
    prepare({
      title,
      description,
      language,
      media,
    }: {
      title?: string
      description?: string
      language?: string
      media?: any
    }) {
      const truncated = description
        ? description.slice(0, 100) + (description.length > 100 ? '…' : '')
        : ''
      return {
        title,
        subtitle: [language?.toUpperCase(), truncated].filter(Boolean).join(' — '),
        media,
      }
    },
  },
})
