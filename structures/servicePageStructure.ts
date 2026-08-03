import type {StructureBuilder} from 'sanity/structure'

const localizedDocument = (
  S: StructureBuilder,
  schemaType: 'dichVuPage',
  slug: string,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`${slug}-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`${slug}-${language}`)
        .title(title)
        .schemaType(schemaType)
        .documentId(`${slug}-${language}`)
        .initialValueTemplate(`${slug}-${language}`),
    )

export const dichVuStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('dich-vu')
    .title('Dịch vụ (Services)')
    .child(
      S.list()
        .title('Dịch vụ (Services)')
        .items([
          localizedDocument(S, 'dichVuPage', 'dich-vu', 'vi', 'Dịch vụ — Tiếng Việt'),
          localizedDocument(S, 'dichVuPage', 'dich-vu', 'en', 'Services — English'),
        ]),
    )
