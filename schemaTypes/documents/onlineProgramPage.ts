import {defineField, defineType} from 'sanity'

export const onlineProgramPage = defineType({
  name: 'onlineProgramPage',
  title: 'Online Program Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Introduction'},
    {name: 'content', title: 'Content'},
    {name: 'programs', title: 'Programs'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'slug', title: 'Slug', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'heroSection', title: 'Hero section', type: 'onlineProgramHero', group: 'hero'}),
    defineField({name: 'introSection', title: 'Introduction (What is X?)', type: 'onlineProgramIntro', group: 'intro'}),
    defineField({name: 'whySection', title: 'Why choose KVC', type: 'onlineProgramWhy', group: 'content'}),
    defineField({name: 'formatSection', title: 'Learning format', type: 'onlineProgramFormat', group: 'content'}),
    defineField({name: 'audienceSection', title: 'Target audience', type: 'onlineProgramAudience', group: 'content'}),
    defineField({name: 'benefitsSection', title: 'Benefits', type: 'onlineProgramBenefits', group: 'content'}),
    defineField({name: 'processSection', title: 'Registration process', type: 'onlineProgramProcess', group: 'content'}),
    defineField({name: 'ctaSection', title: 'Call to action', type: 'onlineProgramCta', group: 'content'}),
    defineField({name: 'programsSection', title: 'Programs', type: 'onlineProgramPrograms', group: 'programs'}),
    defineField({name: 'seo', title: 'SEO', type: 'sharedSeo', group: 'seo'}),
  ],
  preview: {
    select: {slug: 'slug', language: 'language'},
    prepare({slug, language}) {
      return {title: `${slug?.toUpperCase()} — ${language?.toUpperCase()}`, subtitle: 'Online Program Page'}
    },
  },
})
