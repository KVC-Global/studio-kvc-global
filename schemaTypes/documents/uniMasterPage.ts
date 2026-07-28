import { defineField, defineType } from 'sanity'

export const uniMasterPage = defineType({
  name: 'uniMasterPage',
  title: 'Uni & Master Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Intro' },
    { name: 'why', title: 'Why' },
    { name: 'audience', title: 'Audience' },
    { name: 'commitment', title: 'Commitment' },
    { name: 'services', title: 'Related Services' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({ name: 'heroSection', title: 'Hero section', type: 'uniMasterHero', group: 'hero' }),
    defineField({ name: 'introSection', title: 'Intro section', type: 'uniMasterIntro', group: 'intro' }),
    defineField({ name: 'whySection', title: 'Why section', type: 'uniMasterWhy', group: 'why' }),
    defineField({ name: 'audienceSection', title: 'Audience section', type: 'uniMasterAudience', group: 'audience' }),
    defineField({ name: 'commitmentSection', title: 'Commitment section', type: 'uniMasterCommitment', group: 'commitment' }),
    defineField({ name: 'servicesSection', title: 'Related services section', type: 'uniMasterServices', group: 'services' }),
    defineField({ name: 'seo', title: 'SEO', type: 'uniMasterSeo', group: 'seo' }),
  ],
  preview: {
    select: { language: 'language', title: 'heroSection.title' },
    prepare({ language, title }) {
      return {
        title: title || (language === 'en' ? 'Uni & Master Page — English' : 'Trang Đại học & Thạc sĩ — Tiếng Việt'),
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
