import { defineField, defineType } from 'sanity'

export const publicStudyPage = defineType({
  name: 'publicStudyPage',
  title: 'Public Study Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Intro' },
    { name: 'why', title: 'Why' },
    { name: 'pathways', title: 'Pathways' },
    { name: 'requirements', title: 'Requirements' },
    { name: 'workRules', title: 'Work Rules' },
    { name: 'support', title: 'Support' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'services', title: 'Related Services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'heroSection', title: 'Hero section', type: 'publicStudyHero', group: 'hero' }),
    defineField({ name: 'introSection', title: 'Intro section', type: 'publicStudyIntro', group: 'intro' }),
    defineField({ name: 'whySection', title: 'Why section', type: 'publicStudyWhy', group: 'why' }),
    defineField({ name: 'pathwaysSection', title: 'Pathways section', type: 'publicStudyPathways', group: 'pathways' }),
    defineField({ name: 'requirementsSection', title: 'Requirements section', type: 'publicStudyRequirements', group: 'requirements' }),
    defineField({ name: 'workRulesSection', title: 'Work rules section', type: 'publicStudyWorkRules', group: 'workRules' }),
    defineField({ name: 'supportSection', title: 'Support section', type: 'publicStudySupport', group: 'support' }),
    defineField({ name: 'faqsSection', title: 'FAQs section', type: 'publicStudyFaqs', group: 'faqs' }),
    defineField({ name: 'servicesSection', title: 'Related services section', type: 'publicStudyServices', group: 'services' }),
    defineField({ name: 'seo', title: 'SEO', type: 'publicStudySeo', group: 'seo' }),
  ],
  preview: {
    select: { language: 'language', title: 'heroSection.title' },
    prepare({ language, title }) {
      return {
        title: title || (language === 'en' ? 'Public Study Page — English' : 'Trang Du học Công lập — Tiếng Việt'),
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
