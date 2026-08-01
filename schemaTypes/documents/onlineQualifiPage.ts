import {defineField, defineType} from 'sanity'

export const onlineQualifiPage = defineType({
  name: 'onlineQualifiPage',
  title: 'QUALIFI Qualifications Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Introduction'},
    {name: 'content', title: 'Content'},
    {name: 'programs', title: 'Programs Timeline'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'onlineProgramHero', group: 'hero'}),
    defineField({name: 'introSection', title: 'Intro section (QUALIFI là gì?)', type: 'onlineProgramIntro', group: 'intro'}),
    defineField({name: 'whySection', title: 'Why choose KVC Global', type: 'onlineProgramWhy', group: 'content'}),
    defineField({name: 'learningFormatsSection', title: 'Learning format', type: 'onlineProgramFormat', group: 'content'}),
    defineField({name: 'targetAudienceSection', title: 'Target audience', type: 'onlineProgramAudience', group: 'content'}),
    defineField({name: 'benefitsSection', title: 'Benefits section', type: 'onlineProgramBenefits', group: 'content'}),
    defineField({name: 'stepsSection', title: 'Steps section (Quy trình nhập học)', type: 'onlineProgramProcess', group: 'content'}),
    defineField({name: 'progressionSection', title: 'Progression section (Cơ hội học tiếp)', type: 'onlineProgramProgression', group: 'content'}),
    defineField({name: 'programsSection', title: 'QUALIFI Programs Timeline', type: 'onlineProgramPrograms', group: 'programs'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'QUALIFI Qualifications — English' : 'QUALIFI Qualifications — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
