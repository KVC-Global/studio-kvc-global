import type { StructureBuilder } from 'sanity/structure'

const malaysiaStudyDocument = (
  S: StructureBuilder,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`malaysia-study-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`malaysia-study-page-${language}`)
        .title(title)
        .schemaType('malaysiaStudyPage')
        .documentId(`malaysia-study-page-${language}`)
        .initialValueTemplate(`malaysia-study-page-${language}`),
    )

export const malaysiaStudyStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('malaysia-study-page-parent')
    .title('Trang Du học Malaysia (Malaysia Study Page)')
    .child(
      S.list()
        .title('Trang Du học Malaysia (Malaysia Study Page)')
        .items([
          malaysiaStudyDocument(S, 'vi', 'Trang Du học Malaysia — Tiếng Việt'),
          malaysiaStudyDocument(S, 'en', 'Malaysia Study Page — English'),
        ]),
    )
