import type {StructureResolver} from 'sanity/structure'
import {homeStructure} from './structures/homeStructure'
import {workPassStructure} from './structures/workPassStructure'
import {studyAbroadStructure} from './structures/studyAbroadStructure'
import {uniMasterStructure} from './structures/uniMasterStructure'
import {privateStudyStructure} from './structures/privateStudyStructure'
import {publicStudyStructure} from './structures/publicStudyStructure'

const homeDocumentTypes = new Set(['homePage', 'workPassPage', 'studyAbroadPage', 'uniMasterPage', 'privateStudyPage', 'publicStudyPage', 'service', 'partner', 'testimonial', 'faq'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      homeStructure(S),
      workPassStructure(S),
      studyAbroadStructure(S),
      uniMasterStructure(S),
      privateStudyStructure(S),
      publicStudyStructure(S),
      ...S.documentTypeListItems().filter((item) => !homeDocumentTypes.has(item.getId() ?? '')),
    ])
