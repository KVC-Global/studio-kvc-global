import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'
import {aboutStructure, contactStructure} from './structures/pageStructure'
import {dichVuStructure} from './structures/servicePageStructure'
import {onlineProgramsStructure} from './structures/onlineProgramStructure'

const sharedDocumentTypes = new Set(['service', 'partner', 'testimonial', 'faq'])
const allStructuredDocumentTypes = new Set([
  'homePage',
  'aboutPage',
  'contactPage',
  'dichVuPage',
  'onlineProgramPage',
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
            .items([homeStructure(S), aboutStructure(S), contactStructure(S), dichVuStructure(S), onlineProgramsStructure(S)]),
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
