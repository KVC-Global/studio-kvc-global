import type {StructureBuilder} from 'sanity/structure'

const localizedDocument = (
  S: StructureBuilder,
  schemaType: 'khoaHocOnlinePage' | 'dichVuPage',
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

export const khoaHocOnlineStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('khoa-hoc-online')
    .title('Khoá học Online')
    .child(
      S.list()
        .title('Khoá học Online')
        .items([
          localizedDocument(S, 'khoaHocOnlinePage', 'khoa-hoc-online', 'vi', 'Khoá học Online — Tiếng Việt'),
          localizedDocument(S, 'khoaHocOnlinePage', 'khoa-hoc-online', 'en', 'Online Courses — English'),
        ]),
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
