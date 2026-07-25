import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'

const homeDocumentTypes = new Set(['homePage', 'service', 'partner', 'testimonial', 'faq'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      homeStructure(S),
      ...S.documentTypeListItems().filter((item) => !homeDocumentTypes.has(item.getId() ?? '')),
    ])
