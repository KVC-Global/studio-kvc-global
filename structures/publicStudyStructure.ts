import React from 'react'
import type { StructureBuilder } from 'sanity/structure'

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

const publicStudyDocument = (
  S: StructureBuilder,
  language: 'vi' | 'en',
  title: string,
) =>
  S.listItem()
    .id(`public-study-page-${language}`)
    .title(title)
    .child(
      S.document()
        .id(`public-study-page-${language}`)
        .title(title)
        .schemaType('publicStudyPage')
        .documentId(`public-study-page-${language}`)
        .initialValueTemplate(`public-study-page-${language}`),
    )

export const publicStudyStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('public-study-page-parent')
    .title('Trang Du học Công lập (Public Study Page)')
    .icon(LandmarkIcon)
    .child(
      S.list()
        .title('Trang Du học Công lập (Public Study Page)')
        .items([
          publicStudyDocument(S, 'vi', 'Trang Du học Công lập — Tiếng Việt'),
          publicStudyDocument(S, 'en', 'Public Study Page — English'),
        ]),
    )
