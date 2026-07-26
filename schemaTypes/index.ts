import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {faq} from './documents/faq'
import {homePage} from './documents/homePage'
import {partner} from './documents/partner'
import {service} from './documents/service'
import {testimonial} from './documents/testimonial'
import {homepageObjects} from './objects/homeSections'
import {pageObjects} from './objects/pageSections'

export const schemaTypes = [
  homePage,
  aboutPage,
  contactPage,
  ...homepageObjects,
  ...pageObjects,
  testimonial,
  partner,
  service,
  faq,
]
