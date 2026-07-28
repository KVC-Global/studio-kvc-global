import {defineType, defineField} from 'sanity'

export const relatedService = defineType({
  name: 'relatedService',
  title: 'Related Service',
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
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'e.g., Tìm hiểu ngay, Khám phá ngay',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'e.g., GraduationCap, Briefcase, BookOpen, Building2',
    }),
    defineField({
      name: 'href',
      title: 'Href / Link path',
      type: 'string',
      description: 'e.g., /du-hoc/tu-thuc, /work-pass, /khoa-hoc-online',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      icon: 'icon',
    },
    prepare({title, language, icon}) {
      return {
        title,
        subtitle: `[${language?.toUpperCase()}] Icon: ${icon || 'None'}`,
      }
    },
  },
})
