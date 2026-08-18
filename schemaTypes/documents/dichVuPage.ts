import {defineField, defineType} from 'sanity'

export const dichVuPage = defineType({
  name: 'dichVuPage',
  title: 'Dịch vụ Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'dichVuHero', group: 'hero'}),
    defineField({name: 'introSection', title: 'Intro section', type: 'dichVuIntro', group: 'content'}),
    defineField({name: 'videoSection', title: 'Video section', type: 'dichVuVideoSection', group: 'content'}),
    defineField({name: 'serviceCategories', title: 'Service categories', type: 'dichVuServiceCategories', group: 'content'}),
    defineField({name: 'accordionSections', title: 'Detailed service accordion', type: 'dichVuServiceAccordion', group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'Services — English' : 'Dịch vụ — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
