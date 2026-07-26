import { faq } from './documents/faq'
import { homePage } from './documents/homePage'
import { partner } from './documents/partner'
import { service } from './documents/service'
import { testimonial } from './documents/testimonial'
import { homepageObjects } from './objects/homeSections'
import { workPassPage } from './documents/workPassPage'
import { workPassObjects } from './objects/workPassSections'

export const schemaTypes = [
  homePage,
  ...homepageObjects,
  workPassPage,
  ...workPassObjects,
  testimonial,
  partner,
  service,
  faq,
]
