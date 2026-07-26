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
      schemaTypes: ['homePage', 'workPassPage', 'service', 'partner', 'testimonial', 'faq'],
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter((template) => template.schemaType !== 'homePage' && template.schemaType !== 'workPassPage'),
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
    ],
  },
})
