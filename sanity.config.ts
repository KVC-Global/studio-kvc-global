import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {documentInternationalization} from '@sanity/document-internationalization'
import {
  companyInfoInitialValue,
  siteSettingsInitialValue,
} from './schemaTypes/siteSettingsInitialValues'

const singletonTypes = new Set(['siteSettings', 'companyInfo'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

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
        'homePage',
        'workPassPage',
        'studyAbroadPage',
        'uniMasterPage',
        'privateStudyPage',
        'publicStudyPage',
        'aboutPage',
        'contactPage',
        'service',
        'relatedService',
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
        (template) =>
          ![
            'homePage',
            'aboutPage',
            'contactPage',
            'workPassPage',
            'studyAbroadPage',
            'uniMasterPage',
            'privateStudyPage',
            'publicStudyPage',
            'siteSettings',
            'companyInfo',
          ].includes(template.schemaType),
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
        ['site-settings', 'siteSettings', 'Cài đặt website', 'Site Settings'],
      ].flatMap(([id, schemaType, viTitle, enTitle]) => [
        {
          id: `${id}-vi`,
          title: `${viTitle} — Tiếng Việt`,
          schemaType,
          value: schemaType === 'siteSettings' ? siteSettingsInitialValue('vi') : {language: 'vi'},
        },
        {
          id: `${id}-en`,
          title: `${enTitle} — English`,
          schemaType,
          value: schemaType === 'siteSettings' ? siteSettingsInitialValue('en') : {language: 'en'},
        },
      ]),
    ],
  },

  document: {
    actions: (prev, context) => {
      if (context.schemaType && singletonTypes.has(context.schemaType)) {
        return prev.filter(({action}) => action && singletonActions.has(action))
      }
      return prev
    },
  },
})
