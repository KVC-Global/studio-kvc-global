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
        'homePage',
        'aboutPage',
        'contactPage',
        'dichVuPage',
        'onlineProgramPage',
        'onlineOssdPage',
        'onlineOthmPage',
        'onlineQualifiPage',
        'onlineWolverhamptonPage',
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
        (template) => !['homePage', 'aboutPage', 'contactPage', 'dichVuPage', 'onlineProgramPage', 'onlineOssdPage', 'onlineOthmPage', 'onlineQualifiPage', 'onlineWolverhamptonPage'].includes(template.schemaType),
      ),
      ...[
        ['home-page', 'homePage', 'Trang chủ', 'Homepage'],
        ['about-page', 'aboutPage', 'Giới thiệu', 'About'],
        ['contact-page', 'contactPage', 'Liên hệ', 'Contact'],
        ['dich-vu', 'dichVuPage', 'Dịch vụ', 'Services'],
        ['online-ossd', 'onlineOssdPage', 'OSSD Ontario', 'OSSD Ontario'],
        ['online-othm', 'onlineOthmPage', 'OTHM Qualifications', 'OTHM Qualifications'],
        ['online-qualifi', 'onlineQualifiPage', 'QUALIFI Qualifications', 'QUALIFI Qualifications'],
        ['online-wolverhampton', 'onlineWolverhamptonPage', 'University of Wolverhampton', 'University of Wolverhampton'],
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
