import { faq } from './documents/faq'
import { homePage } from './documents/homePage'
import { partner } from './documents/partner'
import { service } from './documents/service'
import { testimonial } from './documents/testimonial'
import { homepageObjects } from './objects/homeSections'
import { workPassPage } from './documents/workPassPage'
import { workPassObjects } from './objects/workPassSections'
import { studyAbroadPage } from './documents/studyAbroadPage'
import { studyAbroadObjects } from './objects/studyAbroadSections'

export const schemaTypes = [
  homePage,
  ...homepageObjects,
  workPassPage,
  ...workPassObjects,
  studyAbroadPage,
  ...studyAbroadObjects,
  testimonial,
  partner,
  service,
  faq,
]
