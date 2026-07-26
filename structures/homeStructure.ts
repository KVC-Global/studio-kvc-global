import type {StructureBuilder} from 'sanity/structure'

const homepageDocument = (S: StructureBuilder, language: 'vi' | 'en', title: string) =>
  S.listItem()
    .id(`home-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`home-page-${language}`)
        .title(title)
        .schemaType('homePage')
        .documentId(`home-page-${language}`)
        .initialValueTemplate(`home-page-${language}`),
    )

export const homeStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('home-page')
    .title('Trang Chủ (Home Page)')
    .child(
      S.list()
        .title('Trang Chủ (Home Page)')
        .items([
          homepageDocument(S, 'vi', 'Trang chủ — Tiếng Việt'),
          homepageDocument(S, 'en', 'Homepage — English'),
        ]),
    )
