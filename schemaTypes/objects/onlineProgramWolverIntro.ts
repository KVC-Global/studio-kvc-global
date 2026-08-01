import {defineField, defineType} from 'sanity'

export const onlineProgramWolverIntro = defineType({
  name: 'onlineProgramWolverIntro',
  title: 'Wolverhampton Intro',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({name: 'image', title: 'Intro image', type: 'image'}),
    defineField({name: 'imageAlt', title: 'Image alt', type: 'string'}),
  ],
})
