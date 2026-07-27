import {defineField, defineType} from 'sanity'

export const dichVuPage = defineType({
  name: 'dichVuPage',
  title: 'Dịch vụ Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Content'},
    {name: 'partners', title: 'Partners'},
    {name: 'social', title: 'Social Proof'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'dichVuHero', group: 'hero'}),
    defineField({name: 'serviceCategories', title: 'Service categories', type: 'dichVuServiceCategories', group: 'content'}),
    defineField({name: 'whySection', title: 'Why choose KVC', type: 'dichVuWhy', group: 'content'}),
    defineField({name: 'processSection', title: 'How we work', type: 'dichVuProcess', group: 'content'}),
    defineField({name: 'partnersSection', title: 'Partners', type: 'dichVuPartners', group: 'partners'}),
    defineField({name: 'testimonialsSection', title: 'Testimonials', type: 'dichVuTestimonials', group: 'social'}),
    defineField({name: 'faqsSection', title: 'FAQs', type: 'dichVuFaqs', group: 'social'}),
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
