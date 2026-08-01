import {defineField, defineType} from 'sanity'

export const onlineOssdPage = defineType({
  name: 'onlineOssdPage',
  title: 'OSSD Ontario Page',
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
    defineField({name: 'introSection', title: 'Intro section (OSSD là gì?)', type: 'onlineProgramIntro', group: 'intro'}),
    defineField({name: 'whySection', title: 'Why choose section', type: 'onlineProgramWhy', group: 'content'}),
    defineField({name: 'structureSection', title: 'Structure section (Cấu trúc 30 tín chỉ)', type: 'onlineProgramStructure', group: 'content'}),
    defineField({name: 'subjectsSection', title: 'Subjects carousel', type: 'onlineProgramSubjects', group: 'content'}),
    defineField({name: 'targetAudienceSection', title: 'Target audience', type: 'onlineProgramAudience', group: 'content'}),
    defineField({name: 'learningFormatsSection', title: 'Learning formats (Hình thức học)', type: 'onlineProgramFormat', group: 'content'}),
    defineField({name: 'benefitsSection', title: 'Benefits section (Lợi ích khi học OSSD)', type: 'onlineProgramBenefits', group: 'content'}),
    defineField({name: 'stepsSection', title: 'Steps section (Quy trình nhập học)', type: 'onlineProgramProcess', group: 'content'}),
    defineField({name: 'parentReasonsSection', title: 'Parent reasons (Vì sao phụ huynh lựa chọn)', type: 'onlineProgramParentReasons', group: 'content'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {language: 'language'},
    prepare({language}) {
      return {
        title: language === 'en' ? 'OSSD Ontario — English' : 'OSSD Ontario — Tiếng Việt',
        subtitle: language?.toUpperCase(),
      }
    },
  },
})
