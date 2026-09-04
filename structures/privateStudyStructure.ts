import React from 'react'
import type { StructureBuilder } from 'sanity/structure'

const BuildingIcon = () =>
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
    React.createElement('rect', { x: '4', y: '2', width: '16', height: '20', rx: '2', ry: '2' }),
    React.createElement('line', { x1: '9', y1: '22', x2: '9', y2: '16' }),
    React.createElement('line', { x1: '15', y1: '22', x2: '15', y2: '16' }),
    React.createElement('line', { x1: '9', y1: '16', x2: '15', y2: '16' }),
    React.createElement('path', { d: 'M8 6h.01' }),
    React.createElement('path', { d: 'M16 6h.01' }),
    React.createElement('path', { d: 'M8 10h.01' }),
    React.createElement('path', { d: 'M16 10h.01' })
  )

const privateStudyDocument = (
  S: StructureBuilder,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`private-study-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`private-study-page-${language}`)
        .title(title)
        .schemaType('privateStudyPage')
        .documentId(`private-study-page-${language}`)
        .initialValueTemplate(`private-study-page-${language}`),
    )

export const privateStudyStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('private-study-page-parent')
    .title('Trang Du học Trường Quốc tế Singapore')
    .icon(BuildingIcon)
    .child(
      S.list()
        .title('Trang Du học Trường Quốc tế Singapore')
        .items([
          privateStudyDocument(S, 'vi', 'Trang Du học Trường Quốc tế Singapore — Tiếng Việt'),
          privateStudyDocument(S, 'en', 'Studying at Singapore International School — English'),
        ]),
    )
