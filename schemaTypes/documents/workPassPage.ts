import { defineField, defineType } from 'sanity'

export const workPassPage = defineType({
  name: 'workPassPage',
  title: 'Work Pass Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'target', title: 'Target' },
    { name: 'process', title: 'Process' },
    { name: 'requirements', title: 'Requirements' },
    { name: 'fees', title: 'Fees & Processing' },
    { name: 'review', title: 'Review & Case Study' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'services', title: 'Related Services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'heroSection', title: 'Hero section', type: 'workPassHero', group: 'hero' }),
    defineField({ name: 'targetSection', title: 'Target section', type: 'workPassTarget', group: 'target' }),
    defineField({ name: 'processSection', title: 'Process section', type: 'workPassProcess', group: 'process' }),
    defineField({ name: 'requirementsSection', title: 'Requirements section', type: 'workPassRequirements', group: 'requirements' }),
    defineField({ name: 'feesSection', title: 'Fees section', type: 'workPassFees', group: 'fees' }),
    defineField({ name: 'reviewSection', title: 'Review section', type: 'workPassReview', group: 'review' }),
    defineField({ name: 'faqsSection', title: 'FAQs section', type: 'workPassFaqs', group: 'faqs' }),
    defineField({ name: 'servicesSection', title: 'Related services section', type: 'workPassServices', group: 'services' }),
    defineField({ name: 'seo', title: 'SEO', type: 'workPassSeo', group: 'seo' }),
  ],
  preview: {
    select: { language: 'language', title: 'heroSection.title' },
    prepare({ language, title }) {
      return {
        title: title || (language === 'en' ? 'Work Pass Page — English' : 'Trang Work Pass — Tiếng Việt'),
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
