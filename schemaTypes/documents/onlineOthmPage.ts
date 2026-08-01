import {defineField, defineType} from 'sanity'

export const onlineOthmPage = defineType({
  name: 'onlineOthmPage',
  title: 'OTHM Qualifications Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Introduction'},
    {name: 'content', title: 'Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'onlineProgramHero', group: 'hero'}),
    defineField({name: 'introSection', title: 'Intro section (OTHM là gì?)', type: 'onlineProgramIntro', group: 'intro'}),
    defineField({name: 'whySection', title: 'Why choose KVC Global', type: 'onlineProgramWhy', group: 'content'}),
    defineField({name: 'programsSection', title: 'Các chương trình OTHM (Programs Timeline)', type: 'onlineProgramPrograms', group: 'content'}),
    defineField({name: 'learningFormatsSection', title: 'Learning format (100% Online)', type: 'onlineProgramFormat', group: 'content'}),
    defineField({name: 'targetAudienceSection', title: 'Target audience', type: 'onlineProgramAudience', group: 'content'}),
    defineField({name: 'benefitsSection', title: 'Benefits section', type: 'onlineProgramBenefits', group: 'content'}),
    defineField({name: 'stepsSection', title: 'Steps section (Quy trình nhập học)', type: 'onlineProgramProcess', group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'OTHM Qualifications — English' : 'OTHM Qualifications — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
