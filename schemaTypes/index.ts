import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {dichVuPage} from './documents/dichVuPage'
import {faq} from './documents/faq'
import {homePage} from './documents/homePage'
import {khoaHocOnlinePage} from './documents/khoaHocOnlinePage'
import {partner} from './documents/partner'
import {service} from './documents/service'
import {testimonial} from './documents/testimonial'
import {homepageObjects} from './objects/homeSections'
import {pageObjects} from './objects/pageSections'
import {servicePageObjects} from './objects/servicePageSections'

export const schemaTypes = [
  homePage,
  aboutPage,
  contactPage,
  khoaHocOnlinePage,
  dichVuPage,
  ...homepageObjects,
  ...pageObjects,
  ...servicePageObjects,
  testimonial,
  partner,
  service,
  faq,
]
