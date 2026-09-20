import {defineType, defineField, defineArrayMember} from 'sanity'
import type {ReactNode} from 'react'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'content',
    }),
    defineField({
      name: 'mainImageAlt',
      title: 'Cover image alt text',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for cards and meta description',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'authorName',
      title: 'Author name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      description:
        'Markdown shortcuts work while typing: # heading, **bold**, - list, > quote',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'sharedSeo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      publishedAt: 'publishedAt',
      authorName: 'authorName',
      media: 'mainImage',
    },
    prepare({
      title,
      language,
      publishedAt,
      authorName,
      media,
    }: {
      title?: string
      language?: string
      publishedAt?: string
      authorName?: string
      media?: ReactNode
    }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('vi-VN') : ''
      return {
        title,
        subtitle: [language?.toUpperCase(), date, authorName].filter(Boolean).join(' — '),
        media,
      }
    },
  },
})
