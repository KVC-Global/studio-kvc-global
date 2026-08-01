import type {StructureBuilder} from 'sanity/structure'

const SUBPAGES = [
  {
    id: 'ossd',
    schemaType: 'onlineOssdPage',
    title: 'OSSD Ontario',
    vi: 'OSSD Ontario — Tiếng Việt',
    en: 'OSSD Ontario — English',
  },
  {
    id: 'othm',
    schemaType: 'onlineOthmPage',
    title: 'OTHM Qualifications',
    vi: 'OTHM — Tiếng Việt',
    en: 'OTHM — English',
  },
  {
    id: 'qualifi',
    schemaType: 'onlineQualifiPage',
    title: 'QUALIFI Qualifications',
    vi: 'Qualifi — Tiếng Việt',
    en: 'Qualifi — English',
  },
  {
    id: 'wolverhampton',
    schemaType: 'onlineWolverhamptonPage',
    title: 'University of Wolverhampton',
    vi: 'Wolverhampton — Tiếng Việt',
    en: 'Wolverhampton — English',
  },
]

const localizedDocument = (
  S: StructureBuilder,
  schemaType: string,
  docId: string,
  title: string,
) =>
  S.listItem()
    .id(docId)
    .title(title)
    .child(
      S.document()
        .id(docId)
        .title(title)
        .schemaType(schemaType)
        .documentId(docId),
    )

export const onlineProgramsStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('online-programs')
    .title('Khóa học Online (Subpages)')
    .child(
      S.list()
        .title('Khóa học Online (Subpages)')
        .items(
          SUBPAGES.map(({id, schemaType, title, vi, en}) =>
            S.listItem()
              .id(`subpage-${id}`)
              .title(title)
              .child(
                S.list()
                  .title(title)
                  .items([
                    localizedDocument(S, schemaType, `online-${id}-vi`, vi),
                    localizedDocument(S, schemaType, `online-${id}-en`, en),
                  ]),
              ),
          ),
        ),
    )
