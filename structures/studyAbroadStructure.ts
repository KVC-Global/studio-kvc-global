import type {StructureBuilder} from 'sanity/structure'

const studyAbroadDocument = (
  S: StructureBuilder,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`study-abroad-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`study-abroad-page-${language}`)
        .title(title)
        .schemaType('studyAbroadPage')
        .documentId(`study-abroad-page-${language}`)
        .initialValueTemplate(`study-abroad-page-${language}`),
    )

export const studyAbroadStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('study-abroad-page-parent')
    .title('Trang Du học (Study Abroad Page)')
    .child(
      S.list()
        .title('Trang Du học (Study Abroad Page)')
        .items([
          studyAbroadDocument(S, 'vi', 'Trang Du học — Tiếng Việt'),
          studyAbroadDocument(S, 'en', 'Study Abroad Page — English'),
        ]),
    )
