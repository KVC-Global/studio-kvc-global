import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'
import {workPassStructure} from './structures/workPassStructure'
import {studyAbroadStructure} from './structures/studyAbroadStructure'
import {uniMasterStructure} from './structures/uniMasterStructure'
import {privateStudyStructure} from './structures/privateStudyStructure'
import {publicStudyStructure} from './structures/publicStudyStructure'
import {aboutStructure, contactStructure} from './structures/pageStructure'

const sharedDocumentTypes = new Set(['service', 'partner', 'testimonial', 'faq'])
const allStructuredDocumentTypes = new Set([
  'homePage',
  'aboutPage',
  'contactPage',
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
            .items([homeStructure(S), aboutStructure(S), contactStructure(S)]),
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
              S.documentTypeListItem('testimonial').title('Testimonials'),
              S.documentTypeListItem('faq').title('FAQs'),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !allStructuredDocumentTypes.has(item.getId() ?? ''),
      ),
    ])
