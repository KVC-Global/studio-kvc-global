import { defineArrayMember, defineField, defineType } from 'sanity'

const text = (name: string, title: string) => defineField({ name, title, type: 'text', rows: 4 })
const string = (name: string, title: string) => defineField({ name, title, type: 'string' })
const image = (name: string, title: string) => defineField({ name, title, type: 'image', options: { hotspot: true } })

const workPassStat = defineType({
  name: 'workPassStat',
  title: 'Stat item',
  type: 'object',
  fields: [
    string('value', 'Value'),
    string('label', 'Label'),
    string('icon', 'Icon name (e.g., Briefcase, Award, ClipboardCheck)')
  ]
})

export const workPassHero = defineType({
  name: 'workPassHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('description', 'Description'),
    string('primaryButtonLabel', 'Primary button label'),
    string('primaryButtonHref', 'Primary button href'),
    string('secondaryButtonLabel', 'Secondary button label'),
    string('secondaryButtonHref', 'Secondary button href'),
    image('backgroundImage', 'Background image'),
    defineField({
      name: 'stats',
      title: 'Stats bar items',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassStat' })],
      validation: (Rule) => Rule.max(3)
    })
  ]
})

const workPassTargetItem = defineType({
  name: 'workPassTargetItem',
  title: 'Target item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., GraduationCap, Briefcase, Users, Target)'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const workPassTarget = defineType({
  name: 'workPassTarget',
  title: 'Target section',
  type: 'object',
  fields: [
    string('title', 'Section title (e.g., 1. Ai nên chọn TEP?)'),
    defineField({
      name: 'items',
      title: 'Target cards',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassTargetItem' })]
    })
  ]
})

const workPassProcessStep = defineType({
  name: 'workPassProcessStep',
  title: 'Process step',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., MessageSquareMore, ClipboardList, FolderOpen, Send, FileCheck, Building2)'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const workPassProcess = defineType({
  name: 'workPassProcess',
  title: 'Process section',
  type: 'object',
  fields: [
    string('title', 'Section title (e.g., 2. Quy trình thực hiện TEP)'),
    defineField({
      name: 'steps',
      title: 'Process steps',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassProcessStep' })]
    })
  ]
})

export const workPassRequirements = defineType({
  name: 'workPassRequirements',
  title: 'Requirements section',
  type: 'object',
  fields: [
    string('title', 'Section title (e.g., 3. Yêu cầu & điều kiện)'),
    string('conditionsTitle', 'Conditions card title (e.g., Điều kiện)'),
    defineField({
      name: 'conditions',
      title: 'Conditions list',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    string('documentsTitle', 'Documents card title (e.g., Hồ sơ cần chuẩn bị)'),
    defineField({
      name: 'documents',
      title: 'Documents list',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    image('image', 'Section image'),
    string('imageAlt', 'Image alt text')
  ]
})

const workPassFeeItem = defineType({
  name: 'workPassFeeItem',
  title: 'Fee item',
  type: 'object',
  fields: [
    string('category', 'Category (e.g., Phi xin TEP (MOM))'),
    string('cost', 'Cost (e.g., 105 or Liên hệ)')
  ]
})

const workPassProcessingItem = defineType({
  name: 'workPassProcessingItem',
  title: 'Processing item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., Clock, Plane)'),
    string('title', 'Title (e.g., Thời gian xét duyệt hồ sơ: 2 - 4 tuần)'),
    text('description', 'Description (e.g., (Tùy thuộc vào hồ sơ...))')
  ]
})

export const workPassFees = defineType({
  name: 'workPassFees',
  title: 'Fees section',
  type: 'object',
  fields: [
    string('title', 'Section title (e.g., 4. Chi phí & thời gian xử lý)'),
    string('feesTitle', 'Fees card title (e.g., Chi phí tham khảo)'),
    string('feesCategoryHeader', 'Fees category table header (e.g., Hạng mục)'),
    string('feesCostHeader', 'Fees cost table header (e.g., Chi phí (SGD))'),
    defineField({
      name: 'feesList',
      title: 'Fees list',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassFeeItem' })]
    }),
    string('feesNote', 'Fees note (e.g., *Chi phí có thể thay đổi theo quy định của MOM.)'),
    string('processingTitle', 'Processing timeline title (e.g., Thời gian xử lý)'),
    defineField({
      name: 'processingItems',
      title: 'Processing timeline items',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassProcessingItem' })]
    })
  ]
})

const workPassTestimonial = defineType({
  name: 'workPassTestimonial',
  title: 'Testimonial details',
  type: 'object',
  fields: [
    string('name', 'Name'),
    string('role', 'Role (e.g., Graduate Trainee at Tech Company, Singapore)'),
    text('quote', 'Quote content'),
    image('image', 'Avatar image'),
    defineField({
      name: 'rating',
      title: 'Rating (0 - 5 stars)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5)
    })
  ]
})

const workPassCaseStudy = defineType({
  name: 'workPassCaseStudy',
  title: 'Case Study details',
  type: 'object',
  fields: [
    string('tagline', 'Tagline (e.g., Case Study)'),
    text('description', 'Description'),
    string('ctaLabel', 'CTA button label'),
    string('ctaHref', 'CTA button link'),
    image('image', 'Case study image')
  ]
})

export const workPassReview = defineType({
  name: 'workPassReview',
  title: 'Review section',
  type: 'object',
  fields: [
    defineField({ name: 'testimonial', type: 'workPassTestimonial', title: 'Featured testimonial' }),
    defineField({ name: 'caseStudy', type: 'workPassCaseStudy', title: 'Featured case study' })
  ]
})

const workPassFaqItem = defineType({
  name: 'workPassFaqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    string('question', 'Question'),
    text('answer', 'Answer')
  ]
})

export const workPassFaqs = defineType({
  name: 'workPassFaqs',
  title: 'FAQ section',
  type: 'object',
  fields: [
    string('title', 'Section title (e.g., 5. Câu hỏi thường gặp)'),
    defineField({
      name: 'faqs',
      title: 'FAQs list',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassFaqItem' })]
    })
  ]
})

const workPassServiceItem = defineType({
  name: 'workPassServiceItem',
  title: 'Related service item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g., GraduationCap, Briefcase, IdCard, Building2)'),
    string('title', 'Title'),
    string('cta', 'CTA label (e.g., Tìm hiểu ngay)'),
    string('href', 'Href link')
  ]
})

export const workPassServices = defineType({
  name: 'workPassServices',
  title: 'Related services section',
  type: 'object',
  fields: [
    string('title', 'Section title (e.g., Các dịch vụ liên quan)'),
    defineField({
      name: 'services',
      title: 'Services list',
      type: 'array',
      of: [defineArrayMember({ type: 'workPassServiceItem' })]
    })
  ]
})

export const workPassSeo = defineType({
  name: 'workPassSeo',
  title: 'SEO details',
  type: 'object',
  fields: [
    string('title', 'Meta title'),
    text('description', 'Meta description'),
    image('image', 'Social share thumbnail')
  ]
})

export const workPassObjects = [
  workPassStat,
  workPassHero,
  workPassTargetItem,
  workPassTarget,
  workPassProcessStep,
  workPassProcess,
  workPassRequirements,
  workPassFeeItem,
  workPassProcessingItem,
  workPassFees,
  workPassTestimonial,
  workPassCaseStudy,
  workPassReview,
  workPassFaqItem,
  workPassFaqs,
  workPassServiceItem,
  workPassServices,
  workPassSeo
]
