type Language = 'vi' | 'en'

const copy = {
  vi: {
    nav: [
      'Trang chủ',
      'Giới thiệu',
      'Work pass & việc làm',
      'Du học',
      'Khóa học Online',
      'Dịch vụ doanh nghiệp',
      'Liên hệ',
    ],
    study: [
      'Diploma 6 + 6 tại Singapore',
      'Chương trình Đại học - Thạc sĩ tại Singapore',
      'Du học tư thục - mọi độ tuổi',
      'Du học công lập - mọi độ tuổi',
      'Du học Malaysia',
      'Du học Đài Loan',
    ],
    studyDescriptions: [
      'Vừa học vừa thực tập hưởng lương tại Singapore.',
      'Bằng cấp quốc tế từ các trường Đại học danh tiếng.',
      'Lộ trình học tập đa dạng, linh hoạt tại hệ thống trường tư thục.',
      'Cơ hội học tập tại các trường công lập chất lượng hàng đầu.',
      'Chi phí hợp lý, chất lượng giáo dục chuẩn quốc tế.',
      'Học bổng hấp dẫn, cơ hội việc làm và phát triển rộng mở.',
    ],
    courses: ['OSSD Ontario', 'OTHM', 'Qualifi', 'University of Wolverhampton'],
    comingSoon: 'Sắp ra mắt',
    consult: 'Tư vấn miễn phí',
    bio: 'KVC Global — Đồng hành cùng bạn trên hành trình học tập, làm việc, kinh doanh và định cư tại Singapore và nhiều quốc gia khác.',
    ctaTitle: 'Bắt đầu hành trình của bạn?',
    ctaDescription:
      'Khởi đầu hành trình định cư, làm việc và kinh doanh tại Singapore cùng đối tác tư vấn di trú hàng đầu. Chúng tôi biến giấc mơ toàn cầu của bạn thành hiện thực bền vững.',
    ctaPrimary: 'Đặt lịch tư vấn ngay',
    ctaSecondary: 'Chat với chuyên viên',
    columns: ['Dịch vụ', 'Về chúng tôi', 'Hỗ trợ'],
    services: [
      'Tư vấn du học',
      'Thực tập Singapore',
      'Thành lập doanh nghiệp',
      'Tư vấn di trú & định cư',
    ],
    about: ['Giới thiệu', 'Đội ngũ', 'Đối tác', 'Giá trị cốt lõi', 'Quy trình làm việc'],
    support: ['Câu hỏi thường gặp'],
    contact: 'Liên hệ',
  },
  en: {
    nav: [
      'Home',
      'About Us',
      'Work Pass & Employment',
      'Study Abroad',
      'Online Courses',
      'Enterprise Services',
      'Contact',
    ],
    study: [
      'Diploma 6 + 6 in Singapore',
      "Bachelor & Master's Programs in Singapore",
      'Private Schools - All Ages',
      'Public Schools - All Ages',
      'Study in Malaysia',
      'Study in Taiwan',
    ],
    studyDescriptions: [
      'Study and paid internship opportunities in Singapore.',
      'International degrees from prestigious universities.',
      'Diverse and flexible study pathways in private schools.',
      'Opportunities to study in top-tier public schools.',
      'Affordable cost, international standard education.',
      'Attractive scholarships, wide job and career opportunities.',
    ],
    courses: ['OSSD Ontario', 'OTHM', 'Qualifi', 'University of Wolverhampton'],
    comingSoon: 'Coming soon',
    consult: 'Free Consultation',
    bio: 'KVC Global — Accompanying you on your journey of studying, working, business, and settling in Singapore and other countries.',
    ctaTitle: 'Start your journey?',
    ctaDescription:
      'Embark on your journey to settle, work, and do business in Singapore with a leading immigration consulting partner. We turn your global dreams into sustainable reality.',
    ctaPrimary: 'Book a consultation now',
    ctaSecondary: 'Chat with specialist',
    columns: ['Services', 'About Us', 'Support'],
    services: [
      'Study Abroad Consulting',
      'Singapore Internship',
      'Business Incorporation',
      'Migration & Residency Consulting',
    ],
    about: ['About Us', 'Our Team', 'Partners', 'Core Values', 'Our Process'],
    support: ['FAQs'],
    contact: 'Contact',
  },
} as const

const link = (destination: string) => ({_type: 'siteLink', destination})
const navItem = (key: string, label: string, destination: string, children?: object[]) => ({
  _type: 'siteNavItem',
  _key: key,
  label,
  link: link(destination),
  ...(children ? {children} : {}),
})
const navChild = (
  key: string,
  label: string,
  destination: string,
  description?: string,
  isComingSoon = false,
) => ({
  _type: 'siteNavChild',
  _key: key,
  label,
  link: link(destination),
  description,
  isComingSoon,
})
const footerLink = (key: string, label: string, destination: string) => ({
  _type: 'siteFooterLink',
  _key: key,
  label,
  link: link(destination),
})

export function siteSettingsInitialValue(language: Language) {
  const t = copy[language]
  const studyDestinations = [
    'studyAbroad',
    'uniMaster',
    'privateStudy',
    'publicStudy',
    'comingSoon',
    'comingSoon',
  ]
  const courseDestinations = ['ossd', 'othm', 'qualifi', 'wolverhampton']

  return {
    language,
    header: {
      comingSoonLabel: t.comingSoon,
      navItems: [
        navItem('home', t.nav[0], 'home'),
        navItem('about', t.nav[1], 'about'),
        navItem('work-pass', t.nav[2], 'workPass'),
        navItem(
          'study-abroad',
          t.nav[3],
          'studyAbroad',
          t.study.map((label, index) =>
            navChild(
              `study-${index}`,
              label,
              studyDestinations[index],
              t.studyDescriptions[index],
              index >= 4,
            ),
          ),
        ),
        navItem(
          'online',
          t.nav[4],
          'onlineCourses',
          t.courses.map((label, index) =>
            navChild(`course-${index}`, label, courseDestinations[index]),
          ),
        ),
        navItem('enterprise', t.nav[5], 'enterprise'),
        navItem('contact', t.nav[6], 'contact'),
      ],
      cta: {_type: 'siteCtaButton', label: t.consult, link: link('contact')},
    },
    footer: {
      bio: t.bio,
      cta: {
        enabled: true,
        title: t.ctaTitle,
        description: t.ctaDescription,
        primaryButton: {_type: 'siteCtaButton', label: t.ctaPrimary, link: link('contact')},
        secondaryButton: {_type: 'siteCtaButton', label: t.ctaSecondary, link: link('contact')},
      },
      servicesColumn: {
        _type: 'siteFooterColumn',
        heading: t.columns[0],
        links: [
          footerLink('study', t.services[0], 'studyAbroad'),
          footerLink('internship', t.services[1], 'workPass'),
          footerLink('business', t.services[2], 'enterprise'),
          footerLink('migration', t.services[3], 'contact'),
        ],
      },
      aboutColumn: {
        _type: 'siteFooterColumn',
        heading: t.columns[1],
        links: t.about.map((label, index) => footerLink(`about-${index}`, label, 'about')),
      },
      supportColumn: {
        _type: 'siteFooterColumn',
        heading: t.columns[2],
        links: [footerLink('faq', t.support[0], 'contact')],
      },
      contactHeading: t.contact,
      legalLinks: [],
      copyrightNotice: 'KVC Global. All rights reserved.',
    },
  }
}

export const companyInfoInitialValue = {
  phones: [
    {_type: 'companyPhone', _key: 'vietnam', label: 'Vietnam', number: '+84 911 942 409'},
    {_type: 'companyPhone', _key: 'singapore', label: 'Singapore', number: '+65 9742 1392'},
  ],
  email: 'info@kvcglobal.vn',
  addressVi: '456 Xô Viết Nghệ Tĩnh, Thạnh Mỹ Tây, Hồ Chí Minh, Việt Nam',
  addressEn: '456 Xo Viet Nghe Tinh, Thanh My Tay, Ho Chi Minh City, Vietnam',
  mapUrl: 'https://maps.google.com/?q=456+Xo+Viet+Nghe+Tinh+Ho+Chi+Minh',
  socialLinks: [
    {
      _type: 'companySocialLink',
      _key: 'facebook',
      network: 'facebook',
      url: 'https://facebook.com/kvcglobal',
    },
    {
      _type: 'companySocialLink',
      _key: 'linkedin',
      network: 'linkedin',
      url: 'https://linkedin.com/company/kvcglobal',
    },
    {
      _type: 'companySocialLink',
      _key: 'youtube',
      network: 'youtube',
      url: 'https://youtube.com/@kvcglobal',
    },
    {
      _type: 'companySocialLink',
      _key: 'instagram',
      network: 'instagram',
      url: 'https://instagram.com/kvcglobal',
    },
  ],
}
