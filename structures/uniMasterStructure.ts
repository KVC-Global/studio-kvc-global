import React from 'react'
import { StructureBuilder } from 'sanity/structure'

const GraduationCapIcon = () =>
  React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '1em',
      height: '1em',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    React.createElement('path', {
      d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
    }),
    React.createElement('path', { d: 'M6 12v5c0 2 2 3 6 3s6-1 6-3v-5' })
  )

export const uniMasterStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Trang Đại học & Thạc sĩ (Bachelor & Master Page)')
    .icon(GraduationCapIcon)
    .child(
      S.list()
        .title('Chọn ngôn ngữ')
        .items([
          S.listItem()
            .title('Tiếng Việt')
            .child(
              S.document()
                .title('Trang Đại học & Thạc sĩ — Tiếng Việt')
                .schemaType('uniMasterPage')
                .documentId('uni-master-page-vi')
            ),
          S.listItem()
            .title('English')
            .child(
              S.document()
                .title('Uni & Master Page — English')
                .schemaType('uniMasterPage')
                .documentId('uni-master-page-en')
            ),
        ])
    )
