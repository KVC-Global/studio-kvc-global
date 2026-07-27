import type {StructureBuilder} from 'sanity/structure'

const SLUGS = [
  {slug: 'ossd', vi: 'OSSD Ontario — Tiếng Việt', en: 'OSSD Ontario — English'},
  {slug: 'othm', vi: 'OTHM — Tiếng Việt', en: 'OTHM — English'},
  {slug: 'wolverhampton', vi: 'Wolverhampton — Tiếng Việt', en: 'Wolverhampton — English'},
  {slug: 'qualifi', vi: 'Qualifi — Tiếng Việt', en: 'Qualifi — English'},
]

const localizedDocument = (
  S: StructureBuilder,
  slug: string,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`online-program-${slug}-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`online-program-${slug}-${language}`)
        .title(title)
        .schemaType('onlineProgramPage')
        .documentId(`online-program-${slug}-${language}`),
    )

export const onlineProgramsStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('online-programs')
    .title('Khóa học Online (Subpages)')
    .child(
      S.list()
        .title('Khóa học Online (Subpages)')
        .items(
          SLUGS.flatMap(({slug, vi, en}) => [
            localizedDocument(S, slug, 'vi', vi),
            localizedDocument(S, slug, 'en', en),
          ]),
        ),
    )
