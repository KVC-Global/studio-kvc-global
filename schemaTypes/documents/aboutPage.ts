import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'company', title: 'Company'},
    {name: 'socialProof', title: 'Social proof'},
    {name: 'offices', title: 'Offices'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'aboutPageHero', group: 'hero'}),
    defineField({
      name: 'statsSection',
      title: 'Stats section',
      type: 'aboutPageStats',
      group: 'hero',
    }),
    defineField({
      name: 'storySection',
      title: 'Company story',
      type: 'aboutPageStory',
      group: 'company',
    }),
    defineField({
      name: 'valuesSection',
      title: 'Core values',
      type: 'aboutPageValues',
      group: 'company',
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Client reviews',
      type: 'aboutPageTestimonials',
      group: 'socialProof',
    }),
    defineField({
      name: 'partnersSection',
      title: 'Partners',
      description:
        'Section heading and partner selection. The selected Partner records are shared and editable under "Shared content > Partners". Only the heading and ordering are page-specific.',
      type: 'aboutPagePartners',
      group: 'socialProof',
    }),
    defineField({
      name: 'officesSection',
      title: 'Offices',
      type: 'aboutPageOffices',
      group: 'offices',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'pageSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language', media: 'heroSection.backgroundImage'},
    prepare({language, media}) {
      return {
        title: language === 'en' ? 'About — English' : 'Giới thiệu — Tiếng Việt',
        subtitle: language?.toUpperCase(),
        media,
      }
    },
  },
})
