import {defineField, defineType} from 'sanity'

export const lead = defineType({
  name: 'lead',
  title: 'Liên hệ (Lead)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Họ và tên',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Dịch vụ (value)',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'serviceLabel',
      title: 'Dịch vụ',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Tin nhắn',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'referrer',
      title: 'Referrer',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Thời gian gửi',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: '',
    },
  },
})
