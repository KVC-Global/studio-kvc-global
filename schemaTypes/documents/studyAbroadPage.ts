import { defineField, defineType } from 'sanity'

export const studyAbroadPage = defineType({
  name: 'studyAbroadPage',
  title: 'Study Abroad Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Intro' },
    { name: 'why', title: 'Why' },
    { name: 'majors', title: 'Majors' },
    { name: 'requirements', title: 'Requirements' },
    { name: 'prospects', title: 'Prospects' },
    { name: 'support', title: 'Support' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'services', title: 'Related Services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'heroSection', title: 'Hero section', type: 'studyAbroadHero', group: 'hero' }),
    defineField({ name: 'introSection', title: 'Intro section', type: 'studyAbroadIntro', group: 'intro' }),
    defineField({ name: 'whySection', title: 'Why section', type: 'studyAbroadWhy', group: 'why' }),
    defineField({ name: 'majorsSection', title: 'Majors section', type: 'studyAbroadMajors', group: 'majors' }),
    defineField({ name: 'requirementsSection', title: 'Requirements section', type: 'studyAbroadRequirements', group: 'requirements' }),
    defineField({ name: 'prospectsSection', title: 'Prospects section', type: 'studyAbroadProspects', group: 'prospects' }),
    defineField({ name: 'supportSection', title: 'Support section', type: 'studyAbroadSupport', group: 'support' }),
    defineField({ name: 'testimonialsSection', title: 'Testimonials section', type: 'studyAbroadTestimonials', group: 'testimonials' }),
    defineField({ name: 'faqsSection', title: 'FAQs section', type: 'studyAbroadFaqs', group: 'faqs' }),
    defineField({ name: 'servicesSection', title: 'Related services section', type: 'studyAbroadServices', group: 'services' }),
    defineField({ name: 'seo', title: 'SEO', type: 'studyAbroadSeo', group: 'seo' }),
  ],
  preview: {
    select: { language: 'language', title: 'heroSection.title' },
    prepare({ language, title }) {
      return {
        title: title || (language === 'en' ? 'Study Abroad Page — English' : 'Trang Du học — Tiếng Việt'),
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
