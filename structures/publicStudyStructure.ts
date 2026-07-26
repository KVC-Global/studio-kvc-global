import React from 'react'
import { StructureBuilder } from 'sanity/structure'

const LandmarkIcon = () =>
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
    React.createElement('line', { x1: '3', y1: '22', x2: '21', y2: '22' }),
    React.createElement('line', { x1: '6', y1: '18', x2: '6', y2: '11' }),
    React.createElement('line', { x1: '10', y1: '18', x2: '10', y2: '11' }),
    React.createElement('line', { x1: '14', y1: '18', x2: '14', y2: '11' }),
    React.createElement('line', { x1: '18', y1: '18', x2: '18', y2: '11' }),
    React.createElement('polygon', { points: '12 2 2 7 22 7 12 2' })
  )

export const publicStudyStructure = (S: StructureBuilder) =>
  S.listItem()
    .title('Trang Du học Công lập (Public Study Page)')
    .icon(LandmarkIcon)
    .child(
      S.list()
        .title('Chọn ngôn ngữ')
        .items([
          S.listItem()
            .title('Tiếng Việt')
            .child(
              S.document()
                .title('Trang Du học Công lập — Tiếng Việt')
                .schemaType('publicStudyPage')
                .documentId('public-study-page-vi')
            ),
          S.listItem()
            .title('English')
            .child(
              S.document()
                .title('Public Study Page — English')
                .schemaType('publicStudyPage')
                .documentId('public-study-page-en')
            ),
        ])
    )
