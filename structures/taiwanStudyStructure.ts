import type { StructureBuilder } from 'sanity/structure'

const taiwanStudyDocument = (
  S: StructureBuilder,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`taiwan-study-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`taiwan-study-page-${language}`)
        .title(title)
        .schemaType('taiwanStudyPage')
        .documentId(`taiwan-study-page-${language}`)
        .initialValueTemplate(`taiwan-study-page-${language}`),
    )

export const taiwanStudyStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('taiwan-study-page-parent')
    .title('Trang Du học Đài Loan (Taiwan Study Page)')
    .child(
      S.list()
        .title('Trang Du học Đài Loan (Taiwan Study Page)')
        .items([
          taiwanStudyDocument(S, 'vi', 'Trang Du học Đài Loan — Tiếng Việt'),
          taiwanStudyDocument(S, 'en', 'Taiwan Study Page — English'),
        ]),
    )
