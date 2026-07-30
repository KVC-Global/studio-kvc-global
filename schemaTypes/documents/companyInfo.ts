import {defineArrayMember, defineField, defineType} from 'sanity'

const phone = defineType({
  name: 'companyPhone',
  title: 'Phone number',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Example: Vietnam or Singapore',
    }),
    defineField({
      name: 'number',
      title: 'Phone number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'number', subtitle: 'label'}},
})

const socialLink = defineType({
  name: 'companySocialLink',
  title: 'Social profile',
  type: 'object',
  fields: [
    defineField({
      name: 'network',
      title: 'Network',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Instagram', value: 'instagram'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['https']}),
    }),
  ],
  preview: {select: {title: 'network', subtitle: 'url'}},
})

export const companyInfoObjects = [phone, socialLink]

export const companyInfo = defineType({
  name: 'companyInfo',
  title: 'Company information',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'address', title: 'Address'},
    {name: 'social', title: 'Social media'},
  ],
  fields: [
    defineField({
      name: 'phones',
      title: 'Phone numbers',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({type: 'companyPhone'})],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'addressVi',
      title: 'Address — Vietnamese',
      type: 'text',
      rows: 3,
      group: 'address',
    }),
    defineField({
      name: 'addressEn',
      title: 'Address — English',
      type: 'text',
      rows: 3,
      group: 'address',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps URL',
      type: 'url',
      group: 'address',
      validation: (Rule) => Rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social profiles',
      type: 'array',
      group: 'social',
      of: [defineArrayMember({type: 'companySocialLink'})],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Company information', subtitle: 'Shared across all languages'}
    },
  },
})
