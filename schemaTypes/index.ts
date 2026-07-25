import { faq } from './documents/faq'
import { homePage } from './documents/homePage'
import { partner } from './documents/partner'
import { service } from './documents/service'
import { testimonial } from './documents/testimonial'
import { homepageObjects } from './objects/homeSections'

export const schemaTypes = [
  homePage,
  ...homepageObjects,
  testimonial,
  partner,
  service,
  faq,
]
