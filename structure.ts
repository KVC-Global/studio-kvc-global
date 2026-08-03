import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'
import {workPassStructure} from './structures/workPassStructure'
import {studyAbroadStructure} from './structures/studyAbroadStructure'
import {uniMasterStructure} from './structures/uniMasterStructure'
import {privateStudyStructure} from './structures/privateStudyStructure'
import {publicStudyStructure} from './structures/publicStudyStructure'
import {aboutStructure, contactStructure} from './structures/pageStructure'
import {dichVuStructure} from './structures/servicePageStructure'
import {onlineProgramsStructure} from './structures/onlineProgramStructure'

const sharedDocumentTypes = new Set([
  'service',
  'relatedService',
  'partner',
  'testimonial',
  'faq',
  'siteSettings',
  'companyInfo',
])
const allStructuredDocumentTypes = new Set([
  'homePage',
  'aboutPage',
  'contactPage',
  'dichVuPage',
  'onlineProgramPage',
  'onlineOssdPage',
  'onlineOthmPage',
  'onlineQualifiPage',
  'onlineWolverhamptonPage',
  'workPassPage',
  'studyAbroadPage',
  'uniMasterPage',
  'privateStudyPage',
  'publicStudyPage',
  ...sharedDocumentTypes,
])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('pages')
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              homeStructure(S),
              aboutStructure(S),
              contactStructure(S),
              dichVuStructure(S),
              onlineProgramsStructure(S),
              S.divider(),
              workPassStructure(S),
              S.divider(),
              studyAbroadStructure(S),
              uniMasterStructure(S),
              privateStudyStructure(S),
              publicStudyStructure(S),
            ]),
        ),
      S.listItem()
        .id('website')
        .title('Website')
        .child(
          S.list()
            .title('Website')
            .items([
              S.listItem()
                .id('site-settings-vi')
                .title('Header & footer — Tiếng Việt')
                .child(
                  S.document()
                    .id('site-settings-vi')
                    .title('Header & footer — Tiếng Việt')
                    .schemaType('siteSettings')
                    .documentId('site-settings-vi')
                    .initialValueTemplate('site-settings-vi'),
                ),
              S.listItem()
                .id('site-settings-en')
                .title('Header & footer — English')
                .child(
                  S.document()
                    .id('site-settings-en')
                    .title('Header & footer — English')
                    .schemaType('siteSettings')
                    .documentId('site-settings-en')
                    .initialValueTemplate('site-settings-en'),
                ),
              S.divider(),
              S.listItem()
                .id('company-info')
                .title('Company information')
                .child(
                  S.document()
                    .id('company-info')
                    .title('Company information')
                    .schemaType('companyInfo')
                    .documentId('company-info')
                    .initialValueTemplate('company-info'),
                ),
            ]),
        ),
      S.listItem()
        .id('shared-content')
        .title('Shared content')
        .child(
          S.list()
            .title('Shared content')
            .items([
              S.documentTypeListItem('partner').title('Partners'),
              S.documentTypeListItem('service').title('Services'),
              S.documentTypeListItem('relatedService').title('Related Services (Study)'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('faq').title('FAQs'),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !allStructuredDocumentTypes.has(item.getId() ?? ''),
      ),
    ])
