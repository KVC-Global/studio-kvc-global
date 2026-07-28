import { defineField, defineType } from 'sanity'

export const privateStudyPage = defineType({
  name: 'privateStudyPage',
  title: 'Private Study Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Intro' },
    { name: 'why', title: 'Why' },
    { name: 'schools', title: 'Schools' },
    { name: 'requirements', title: 'Requirements' },
    { name: 'support', title: 'Support' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'services', title: 'Related Services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'heroSection', title: 'Hero section', type: 'privateStudyHero', group: 'hero' }),
    defineField({ name: 'introSection', title: 'Intro section', type: 'privateStudyIntro', group: 'intro' }),
    defineField({ name: 'whySection', title: 'Why section', type: 'privateStudyWhy', group: 'why' }),
    defineField({ name: 'schoolsSection', title: 'Schools section', type: 'privateStudySchools', group: 'schools' }),
    defineField({ name: 'requirementsSection', title: 'Requirements section', type: 'privateStudyRequirements', group: 'requirements' }),
    defineField({ name: 'supportSection', title: 'Support section', type: 'privateStudySupport', group: 'support' }),
    defineField({ name: 'faqsSection', title: 'FAQs section', type: 'privateStudyFaqs', group: 'faqs' }),
    defineField({ name: 'servicesSection', title: 'Related services section', type: 'privateStudyServices', group: 'services' }),
    defineField({ name: 'seo', title: 'SEO', type: 'privateStudySeo', group: 'seo' }),
  ],
  preview: {
    select: { language: 'language', title: 'heroSection.title' },
    prepare({ language, title }) {
      return {
        title: title || (language === 'en' ? 'Private Study Page — English' : 'Trang Du học Tư thục — Tiếng Việt'),
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
