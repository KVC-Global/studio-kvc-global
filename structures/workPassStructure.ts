import type {StructureBuilder} from 'sanity/structure'

const workPassDocument = (
  S: StructureBuilder,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`work-pass-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`work-pass-page-${language}`)
        .title(title)
        .schemaType('workPassPage')
        .documentId(`work-pass-page-${language}`)
        .initialValueTemplate(`work-pass-page-${language}`),
    )

export const workPassStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('work-pass-page-parent')
    .title('Trang Work Pass (Work Pass Page)')
    .child(
      S.list()
        .title('Trang Work Pass (Work Pass Page)')
        .items([
          workPassDocument(S, 'vi', 'Trang Work Pass — Tiếng Việt'),
          workPassDocument(S, 'en', 'Work Pass Page — English'),
        ]),
    )
