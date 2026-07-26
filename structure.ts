import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'
import {workPassStructure} from './structures/workPassStructure'

const homeDocumentTypes = new Set(['homePage', 'workPassPage', 'service', 'partner', 'testimonial', 'faq'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      homeStructure(S),
      workPassStructure(S),
      ...S.documentTypeListItems().filter((item) => !homeDocumentTypes.has(item.getId() ?? '')),
    ])
