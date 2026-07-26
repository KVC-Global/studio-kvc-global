import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'contact', title: 'Contact & form'},
    {name: 'offices', title: 'Offices'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({
      name: 'heroSection',
      title: 'Hero section',
      type: 'contactPageHero',
      group: 'hero',
    }),
    defineField({
      name: 'infoSection',
      title: 'Contact information',
      type: 'contactPageInfo',
      group: 'contact',
    }),
    defineField({
      name: 'formSection',
      title: 'Contact form',
      type: 'contactPageForm',
      group: 'contact',
    }),
    defineField({
      name: 'officesSection',
      title: 'Offices',
      type: 'contactPageOffices',
      group: 'offices',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'pageSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language', media: 'heroSection.backgroundImage'},
    prepare({language, media}) {
      return {
        title: language === 'en' ? 'Contact — English' : 'Liên hệ — Tiếng Việt',
        subtitle: language?.toUpperCase(),
        media,
      }
    },
  },
})
