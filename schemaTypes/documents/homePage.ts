import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'services', title: 'Services & Partners' },
    { name: 'whyProcess', title: 'Why & Process' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'heroSection', title: 'Hero section', type: 'homepageHero', group: 'hero' }),
    defineField({ name: 'statsSection', title: 'Stats section', type: 'homepageStats', group: 'hero' }),
    defineField({ name: 'aboutSection', title: 'About section', type: 'homepageAbout', group: 'about' }),
    defineField({ name: 'partnersSection', title: 'Partners section', type: 'homepagePartners', group: 'services' }),
    defineField({ name: 'servicesSection', title: 'Services section', type: 'homepageServices', group: 'services' }),
    defineField({ name: 'whyProcessSection', title: 'Why & Process section', type: 'homepageWhyProcess', group: 'whyProcess' }),
    defineField({ name: 'testimonialsSection', title: 'Testimonials section', type: 'homepageTestimonials', group: 'testimonials' }),
    defineField({ name: 'seo', title: 'SEO', type: 'homepageSeo', group: 'seo' }),
  ],
  preview: {
    select: { language: 'language', media: 'heroSection.backgroundImage' },
    prepare({ language, media }) {
      return {
        title: language === 'en' ? 'Homepage — English' : 'Trang chủ — Tiếng Việt',
        subtitle: language?.toUpperCase(),
        media,
      }
    },
  },
})
