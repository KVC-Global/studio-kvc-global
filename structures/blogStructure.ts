import type {StructureBuilder} from 'sanity/structure'

const postList = (S: StructureBuilder, language: 'vi' | 'en', title: string) =>
  S.listItem()
    .id(`blog-${language}`)
    .title(title)
    .child(
      S.documentTypeList('post')
        .id(`blog-${language}-list`)
        .title(title)
        .filter('_type == "post" && language == $language')
        .params({language})
        .initialValueTemplates([S.initialValueTemplateItem(`post-${language}`)])
        .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
    )

export const blogStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('blog')
    .title('Blog (Tin tức)')
    .child(
      S.list()
        .title('Blog (Tin tức)')
        .items([postList(S, 'vi', 'Tiếng Việt'), postList(S, 'en', 'English')]),
    )
