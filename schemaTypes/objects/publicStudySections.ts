import { defineArrayMember, defineField, defineType } from 'sanity'

const text = (name: string, title: string) => defineField({ name, title, type: 'text', rows: 4 })
const string = (name: string, title: string) => defineField({ name, title, type: 'string' })
const image = (name: string, title: string) => defineField({ name, title, type: 'image', options: { hotspot: true } })

const publicStudyStat = defineType({
  name: 'publicStudyStat',
  title: 'Stat item',
  type: 'object',
  fields: [
    string('value', 'Value'),
    string('label', 'Label'),
    string('icon', 'Icon name')
  ]
})

export const publicStudyHero = defineType({
  name: 'publicStudyHero',
  title: 'Hero section',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow'),
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
      of: [defineArrayMember({ type: 'publicStudyStat' })],
      validation: (Rule) => Rule.max(4)
    })
  ]
})

export const publicStudyIntro = defineType({
  name: 'publicStudyIntro',
  title: 'Intro section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    text('paragraph1', 'First paragraph text'),
    text('paragraph2', 'Second paragraph text'),
    text('paragraph3', 'Third paragraph text'),
    image('image', 'Intro section image'),
    string('imageAlt', 'Image alt text')
  ]
})

const publicStudyWhyItem = defineType({
  name: 'publicStudyWhyItem',
  title: 'Why item',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Title'),
    text('description', 'Description')
  ]
})

export const publicStudyWhy = defineType({
  name: 'publicStudyWhy',
  title: 'Why section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Benefit items',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudyWhyItem' })]
    })
  ]
})

const publicStudyPathwayCondition = defineType({
  name: 'publicStudyPathwayCondition',
  title: 'Pathway Card Condition Item',
  type: 'object',
  fields: [
    string('icon', 'Icon name (e.g. Compass, FileCheck, Coins)'),
    string('boldText', 'Bold prefix text (e.g. Thi tuyển AEIS/S-AEIS:)'),
    string('normalText', 'Remaining condition description')
  ]
})

const publicStudyPathwayCard = defineType({
  name: 'publicStudyPathwayCard',
  title: 'Pathway card',
  type: 'object',
  fields: [
    string('eyebrow', 'Eyebrow (e.g. BẬC TIỂU HỌC)'),
    string('title', 'Title (e.g. Xây dựng nền tảng vững chắc)'),
    text('description', 'Description summary'),
    defineField({
      name: 'conditions',
      title: 'Key conditions lists',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudyPathwayCondition' })]
    })
  ]
})

const publicStudyCompareCard = defineType({
  name: 'publicStudyCompareCard',
  title: 'Compare card details',
  type: 'object',
  fields: [
    string('title', 'Card title (e.g. Junior College)'),
    string('duration', 'Duration/Time limit (e.g. 2 năm)'),
    string('objective', 'Learning orientation / output target'),
    string('criteria', 'Admission entry criteria details'),
    string('feeReference', 'Reference fee (e.g. 1.200 - 1.400 SGD/tháng)')
  ]
})

export const publicStudyPathways = defineType({
  name: 'publicStudyPathways',
  title: 'Pathways section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'cards',
      title: 'Age bracket pathway cards',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudyPathwayCard' })]
    }),
    string('compareTitle', 'Compare blocks section title'),
    defineField({
      name: 'compareCard1',
      title: 'Junior College (JC) compare card',
      type: 'publicStudyCompareCard'
    }),
    defineField({
      name: 'compareCard2',
      title: 'Polytechnic (Poly) compare card',
      type: 'publicStudyCompareCard'
    })
  ]
})

const publicStudyRequirementCheck = defineType({
  name: 'publicStudyRequirementCheck',
  title: 'Requirement checklist item',
  type: 'object',
  fields: [
    string('title', 'Item title (bold prefix)'),
    text('description', 'Requirement explanation')
  ]
})

const publicStudyCostItem = defineType({
  name: 'publicStudyCostItem',
  title: 'Cost item detail',
  type: 'object',
  fields: [
    string('item', 'Item description'),
    string('fee', 'Monthly / Annual cost amount')
  ]
})

const publicStudyScholarshipItem = defineType({
  name: 'publicStudyScholarshipItem',
  title: 'Scholarship item details',
  type: 'object',
  fields: [
    string('title', 'Scholarship name'),
    string('target', 'Target audience'),
    text('benefit', 'Financial benefits'),
    string('duration', 'Duration details'),
    text('standard', 'Requirements & Evaluation standards')
  ]
})

export const publicStudyRequirements = defineType({
  name: 'publicStudyRequirements',
  title: 'Requirements section',
  type: 'object',
  fields: [
    string('title1', 'Requirements Title (e.g. Quy định về Visa & Người giám hộ)'),
    string('title2', 'Living Costs Title (e.g. Dự trù chi phí sinh hoạt tại Singapore)'),
    defineField({
      name: 'conditions',
      title: 'Visa & Guardian checklist',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudyRequirementCheck' })]
    }),
    text('tipText1', 'Visa/Guardian tip text (under checklist)'),
    defineField({
      name: 'costs',
      title: 'Cost list',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudyCostItem' })]
    }),
    text('tipText2', 'Cost disclaimer tip text'),
    string('scholarshipEyebrow', 'Scholarship section eyebrow'),
    string('scholarshipTitle', 'Scholarship section title'),
    defineField({
      name: 'scholarship1',
      title: 'ASEAN Scholarship details',
      type: 'publicStudyScholarshipItem'
    }),
    defineField({
      name: 'scholarship2',
      title: 'MOE Pre-U Scholarship details',
      type: 'publicStudyScholarshipItem'
    })
  ]
})

export const publicStudyWorkRules = defineType({
  name: 'publicStudyWorkRules',
  title: 'Work rules section',
  type: 'object',
  fields: [
    string('title', 'Main title'),
    string('sectionTitle1', 'Section 1 title (e.g. Quy định về thời gian & độ tuổi)'),
    text('sectionDesc1', 'Section 1 text introduction'),
    defineField({
      name: 'conditions1',
      title: 'Section 1 bullet points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    string('sectionTitle2', 'Section 2 title (e.g. Điều kiện cơ sở đào tạo & Thực tập)'),
    defineField({
      name: 'conditions2',
      title: 'Section 2 bullet points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    text('warningText', 'MOM penalty warning alert text')
  ]
})

const publicStudySupportStep = defineType({
  name: 'publicStudySupportStep',
  title: 'Support journey step',
  type: 'object',
  fields: [
    string('icon', 'Icon name'),
    string('title', 'Step title'),
    text('description', 'Step description')
  ]
})

export const publicStudySupport = defineType({
  name: 'publicStudySupport',
  title: 'Support section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'Support journey steps list',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudySupportStep' })]
    })
  ]
})

const publicStudyFaqItem = defineType({
  name: 'publicStudyFaqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    string('question', 'Question text'),
    text('answer', 'Answer text')
  ]
})

export const publicStudyFaqs = defineType({
  name: 'publicStudyFaqs',
  title: 'FAQs section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'items',
      title: 'FAQ list',
      type: 'array',
      of: [defineArrayMember({ type: 'publicStudyFaqItem' })]
    })
  ]
})

const publicStudyServiceItem = defineType({
  name: 'publicStudyServiceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    string('title', 'Service title'),
    string('ctaText', 'CTA link label'),
    string('icon', 'Icon name'),
    string('href', 'Redirect link Href')
  ]
})

export const publicStudyServices = defineType({
  name: 'publicStudyServices',
  title: 'Services section',
  type: 'object',
  fields: [
    string('title', 'Title'),
    defineField({
      name: 'services',
      title: 'Related services list',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'relatedService' }] }),
        defineArrayMember({ type: 'publicStudyServiceItem' })
      ]
    })
  ]
})

export const publicStudySeo = defineType({
  name: 'publicStudySeo',
  title: 'SEO metadata',
  type: 'object',
  fields: [
    string('title', 'Meta Title'),
    text('description', 'Meta Description'),
    image('shareImage', 'OpenGraph sharing image')
  ]
})

export const publicStudyObjects = [
  publicStudyStat,
  publicStudyHero,
  publicStudyIntro,
  publicStudyWhyItem,
  publicStudyWhy,
  publicStudyPathwayCondition,
  publicStudyPathwayCard,
  publicStudyCompareCard,
  publicStudyPathways,
  publicStudyRequirementCheck,
  publicStudyCostItem,
  publicStudyScholarshipItem,
  publicStudyRequirements,
  publicStudyWorkRules,
  publicStudySupportStep,
  publicStudySupport,
  publicStudyFaqItem,
  publicStudyFaqs,
  publicStudyServiceItem,
  publicStudyServices,
  publicStudySeo
]
