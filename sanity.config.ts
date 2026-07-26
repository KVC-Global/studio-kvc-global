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
      schemaTypes: [
        'homePage', 'workPassPage', 'studyAbroadPage', 'uniMasterPage', 'privateStudyPage', 'publicStudyPage',
        'aboutPage',
        'contactPage',
        'service',
        'partner',
        'testimonial',
        'faq',
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter(
        (template) => !['homePage', 'aboutPage', 'contactPage', 'workPassPage', 'studyAbroadPage', 'uniMasterPage', 'privateStudyPage', 'publicStudyPage'].includes(template.schemaType),
      ),
      ...[
        ['home-page', 'homePage', 'Trang chủ', 'Homepage'],
        ['about-page', 'aboutPage', 'Giới thiệu', 'About'],
        ['contact-page', 'contactPage', 'Liên hệ', 'Contact'],
        ['work-pass-page', 'workPassPage', 'Trang Work Pass', 'Work Pass Page'],
        ['study-abroad-page', 'studyAbroadPage', 'Trang Du học', 'Study Abroad Page'],
        ['uni-master-page', 'uniMasterPage', 'Trang Đại học & Thạc sĩ', 'University & Master Page'],
        ['private-study-page', 'privateStudyPage', 'Trang Du học Tư thục', 'Private Study Page'],
        ['public-study-page', 'publicStudyPage', 'Trang Du học Công lập', 'Public Study Page'],
      ].flatMap(([id, schemaType, viTitle, enTitle]) => [
        {
          id: `${id}-vi`,
          title: `${viTitle} — Tiếng Việt`,
          schemaType,
          value: {language: 'vi'},
        },
        {
          id: `${id}-en`,
          title: `${enTitle} — English`,
          schemaType,
          value: {language: 'en'},
        },
      ]),
    ],
  },
})
