import {defineField, defineType} from 'sanity'

export const khoaHocOnlinePage = defineType({
  name: 'khoaHocOnlinePage',
  title: 'Khoá học Online Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Content'},
    {name: 'social', title: 'Social Proof'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'khoaHocOnlineHero', group: 'hero'}),
    defineField({name: 'introSection', title: 'Intro section', type: 'khoaHocOnlineIntro', group: 'content'}),
    defineField({name: 'programsSection', title: 'Programs', type: 'khoaHocOnlinePrograms', group: 'content'}),
    defineField({name: 'whySection', title: 'Why choose online courses', type: 'khoaHocOnlineWhy', group: 'content'}),
    defineField({name: 'ctaSection', title: 'Call to action', type: 'khoaHocOnlineCta', group: 'content'}),
    defineField({name: 'testimonialsSection', title: 'Testimonials', type: 'khoaHocOnlineTestimonials', group: 'social'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'Online Courses — English' : 'Khoá học Online — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
