import {defineType, defineField} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Page',
      type: 'string',
      description: 'e.g., General, Study Abroad, Online Course, Work Pass',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Study Abroad', value: 'study-abroad'},
          {title: 'Online Course', value: 'online-course'},
          {title: 'Work Pass', value: 'work-pass'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      language: 'language',
    },
    prepare({title, subtitle, language}: {title?: string; subtitle?: string; language?: string}) {
      return {
        title,
        subtitle: [language?.toUpperCase(), subtitle].filter(Boolean).join(' — '),
      }
    },
  },
})
