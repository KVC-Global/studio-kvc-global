import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {dichVuPage} from './documents/dichVuPage'
import {faq} from './documents/faq'
import {homePage} from './documents/homePage'
import {onlineProgramPage} from './documents/onlineProgramPage'
import {onlineOssdPage} from './documents/onlineOssdPage'
import {onlineOthmPage} from './documents/onlineOthmPage'
import {onlineQualifiPage} from './documents/onlineQualifiPage'
import {onlineWolverhamptonPage} from './documents/onlineWolverhamptonPage'
import {partner} from './documents/partner'
import {service} from './documents/service'
import {relatedService} from './documents/relatedService'
import {testimonial} from './documents/testimonial'
import {homepageObjects} from './objects/homeSections'
import {onlineProgramObjects} from './objects/onlineProgramSections'
import {pageObjects} from './objects/pageSections'
import {servicePageObjects} from './objects/servicePageSections'
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
import {siteSettings, siteSettingsObjects} from './documents/siteSettings'
import {companyInfo, companyInfoObjects} from './documents/companyInfo'

export const schemaTypes = [
  homePage,
  aboutPage,
  contactPage,
  dichVuPage,
  onlineProgramPage,
  onlineOssdPage,
  onlineOthmPage,
  onlineQualifiPage,
  onlineWolverhamptonPage,
  ...homepageObjects,
  ...onlineProgramObjects,
  ...pageObjects,
  ...servicePageObjects,
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
