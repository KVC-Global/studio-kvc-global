import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {faq} from './documents/faq'
import {homePage} from './documents/homePage'
import {partner} from './documents/partner'
import {service} from './documents/service'
import {relatedService} from './documents/relatedService'
import {testimonial} from './documents/testimonial'
import {homepageObjects} from './objects/homeSections'
import {workPassPage} from './documents/workPassPage'
import {workPassObjects} from './objects/workPassSections'
import {studyAbroadPage} from './documents/studyAbroadPage'
import {studyAbroadObjects} from './objects/studyAbroadSections'
import {uniMasterPage} from './documents/uniMasterPage'
import {uniMasterObjects} from './objects/uniMasterSections'
import {privateStudyPage} from './documents/privateStudyPage'
import {privateStudyObjects} from './objects/privateStudySections'
import {publicStudyPage} from './documents/publicStudyPage'
import {publicStudyObjects} from './objects/publicStudySections'
import {pageObjects} from './objects/pageSections'
import {siteSettings, siteSettingsObjects} from './documents/siteSettings'
import {companyInfo, companyInfoObjects} from './documents/companyInfo'

export const schemaTypes = [
  homePage,
  aboutPage,
  contactPage,
  ...homepageObjects,
  ...pageObjects,
  workPassPage,
  ...workPassObjects,
  studyAbroadPage,
  ...studyAbroadObjects,
  uniMasterPage,
  ...uniMasterObjects,
  privateStudyPage,
  ...privateStudyObjects,
  publicStudyPage,
  ...publicStudyObjects,
  siteSettings,
  ...siteSettingsObjects,
  companyInfo,
  ...companyInfoObjects,
  testimonial,
  partner,
  service,
  relatedService,
  faq,
]
