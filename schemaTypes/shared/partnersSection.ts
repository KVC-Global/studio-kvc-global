import {defineArrayMember, defineField} from 'sanity'

/**
 * Shared field definitions for the partners section.
 * Used by both homepagePartners and aboutPagePartners to keep them in sync.
 */
export const partnersFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
  }),
  defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description: 'Section heading shown on the page. Only affects this page.',
  }),
  defineField({
    name: 'partners',
    title: 'Partners',
    description:
      'Choose reusable Partner records for this page. Reordering or removing a partner only changes this page. To update its name, logo, or website everywhere, open Shared content > Partners.',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'reference',
        to: [{type: 'partner'}],
      }),
    ],
    options: {
      sortable: true,
    },
  }),
]
