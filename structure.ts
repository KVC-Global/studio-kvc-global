import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'
import {aboutStructure, contactStructure} from './structures/pageStructure'
import {khoaHocOnlineStructure, dichVuStructure} from './structures/servicePageStructure'

const sharedDocumentTypes = new Set(['service', 'partner', 'testimonial', 'faq'])
const allStructuredDocumentTypes = new Set([
  'homePage',
  'aboutPage',
  'contactPage',
  'khoaHocOnlinePage',
  'dichVuPage',
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
            .items([homeStructure(S), aboutStructure(S), contactStructure(S), khoaHocOnlineStructure(S), dichVuStructure(S)]),
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
