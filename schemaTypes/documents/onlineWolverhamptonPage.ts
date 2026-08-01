import {defineField, defineType} from 'sanity'

export const onlineWolverhamptonPage = defineType({
  name: 'onlineWolverhamptonPage',
  title: 'University of Wolverhampton Page',
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
    defineField({name: 'introSection', title: 'Intro section (Giới thiệu trường)', type: 'onlineProgramWolverIntro', group: 'intro'}),
    defineField({name: 'whySection', title: 'Why choose Wolverhampton', type: 'onlineProgramWhy', group: 'content'}),
    defineField({name: 'kvcSupportSection', title: 'Why KVC Global?', type: 'onlineProgramSupport', group: 'content'}),
    defineField({name: 'learningFormatsSection', title: 'Learning format', type: 'onlineProgramFormat', group: 'content'}),
    defineField({name: 'targetAudienceSection', title: 'Target audience', type: 'onlineProgramAudience', group: 'content'}),
    defineField({name: 'benefitsSection', title: 'Benefits section', type: 'onlineProgramBenefits', group: 'content'}),
    defineField({name: 'stepsSection', title: 'Steps section (Quy trình nhập học)', type: 'onlineProgramProcess', group: 'content'}),
    defineField({name: 'programsSection', title: 'Các chương trình đào tạo (Degree Programs Timeline)', type: 'onlineProgramPrograms', group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'Wolverhampton — English' : 'Wolverhampton — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
