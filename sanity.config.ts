import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'KVC GLOBAL',

  projectId: 'eh8b0fvx',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'vi', title: 'Vietnamese'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['homePage', 'workPassPage', 'studyAbroadPage', 'uniMasterPage', 'privateStudyPage', 'publicStudyPage', 'service', 'partner', 'testimonial', 'faq'],
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter((template) => template.schemaType !== 'homePage' && template.schemaType !== 'workPassPage' && template.schemaType !== 'studyAbroadPage' && template.schemaType !== 'uniMasterPage' && template.schemaType !== 'privateStudyPage' && template.schemaType !== 'publicStudyPage'),
      {
        id: 'home-page-vi',
        title: 'Trang chủ — Tiếng Việt',
        schemaType: 'homePage',
        value: {language: 'vi'},
      },
      {
        id: 'home-page-en',
        title: 'Homepage — English',
        schemaType: 'homePage',
        value: {language: 'en'},
      },
      {
        id: 'work-pass-page-vi',
        title: 'Trang Work Pass — Tiếng Việt',
        schemaType: 'workPassPage',
        value: {language: 'vi'},
      },
      {
        id: 'work-pass-page-en',
        title: 'Work Pass Page — English',
        schemaType: 'workPassPage',
        value: {language: 'en'},
      },
      {
        id: 'study-abroad-page-vi',
        title: 'Trang Du học — Tiếng Việt',
        schemaType: 'studyAbroadPage',
        value: {language: 'vi'},
      },
      {
        id: 'study-abroad-page-en',
        title: 'Study Abroad Page — English',
        schemaType: 'studyAbroadPage',
        value: {language: 'en'},
      },
      {
        id: 'uni-master-page-vi',
        title: 'Trang Đại học & Thạc sĩ — Tiếng Việt',
        schemaType: 'uniMasterPage',
        value: {language: 'vi'},
      },
      {
        id: 'uni-master-page-en',
        title: 'Uni & Master Page — English',
        schemaType: 'uniMasterPage',
        value: {language: 'en'},
      },
      {
        id: 'private-study-page-vi',
        title: 'Trang Du học Tư thục — Tiếng Việt',
        schemaType: 'privateStudyPage',
        value: {language: 'vi'},
      },
      {
        id: 'private-study-page-en',
        title: 'Private Study Page — English',
        schemaType: 'privateStudyPage',
        value: {language: 'en'},
      },
      {
        id: 'public-study-page-vi',
        title: 'Trang Du học Công lập — Tiếng Việt',
        schemaType: 'publicStudyPage',
        value: {language: 'vi'},
      },
      {
        id: 'public-study-page-en',
        title: 'Public Study Page — English',
        schemaType: 'publicStudyPage',
        value: {language: 'en'},
      },
    ],
  },
})
