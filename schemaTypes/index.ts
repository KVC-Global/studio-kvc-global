import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {dichVuPage} from './documents/dichVuPage'
import {faq} from './documents/faq'
import {homePage} from './documents/homePage'
import {onlineProgramPage} from './documents/onlineProgramPage'
import {partner} from './documents/partner'
import {service} from './documents/service'
import {testimonial} from './documents/testimonial'
import {homepageObjects} from './objects/homeSections'
import {onlineProgramObjects} from './objects/onlineProgramSections'
import {pageObjects} from './objects/pageSections'
import {servicePageObjects} from './objects/servicePageSections'

export const schemaTypes = [
  homePage,
  aboutPage,
  contactPage,
  dichVuPage,
  onlineProgramPage,
  ...homepageObjects,
  ...onlineProgramObjects,
  ...pageObjects,
  ...servicePageObjects,
  testimonial,
  partner,
  service,
  faq,
]
