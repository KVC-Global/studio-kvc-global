import type {StructureBuilder} from 'sanity/structure'

const localizedDocument = (
  S: StructureBuilder,
  schemaType: 'aboutPage' | 'contactPage',
  slug: 'about-page' | 'contact-page',
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

export const aboutStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('about-page')
    .title('Giới Thiệu (About Page)')
    .child(
      S.list()
        .title('Giới Thiệu (About Page)')
        .items([
          localizedDocument(S, 'aboutPage', 'about-page', 'vi', 'Giới thiệu — Tiếng Việt'),
          localizedDocument(S, 'aboutPage', 'about-page', 'en', 'About — English'),
        ]),
    )

export const contactStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('contact-page')
    .title('Liên Hệ (Contact Page)')
    .child(
      S.list()
        .title('Liên Hệ (Contact Page)')
        .items([
          localizedDocument(S, 'contactPage', 'contact-page', 'vi', 'Liên hệ — Tiếng Việt'),
          localizedDocument(S, 'contactPage', 'contact-page', 'en', 'Contact — English'),
        ]),
    )
