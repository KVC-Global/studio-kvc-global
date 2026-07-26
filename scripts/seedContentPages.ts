import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-18'})
const dryRun = process.argv.includes('--dry-run')

const reference = (id: string, index: number) => ({
  _type: 'reference',
  _key: `${id.replace(/[^a-zA-Z0-9]/g, '').slice(-18)}${index}`,
  _ref: id,
})

async function partnerReferences() {
  const partners = await client.fetch<Array<{_id: string}>>(
    `*[_type == "partner"] | order(name asc){_id}`,
  )
  return partners.map((partner, index) => reference(partner._id, index))
}

const office = (language: 'vi' | 'en') => ({
  _type: 'pageOffice',
  _key: 'vietnam',
  country: language === 'vi' ? 'Việt Nam' : 'Vietnam',
  role: language === 'vi' ? 'Chi nhánh Việt Nam' : 'Vietnam office',
  description:
    language === 'vi'
      ? 'Kết nối trực tiếp với đội ngũ KVC Global để được hỗ trợ tại văn phòng gần bạn.'
      : 'Connect directly with KVC Global for support from your nearest office.',
  address: '456 Xô Viết Nghệ Tĩnh, Thạnh Mỹ Tây, Hồ Chí Minh, Việt Nam',
  phone: '(+84) 911942409',
  email: 'info@kvcglobal.vn',
  hours: language === 'vi' ? 'Thứ 2 - Thứ 6, 08:00-17:00' : 'Monday - Friday, 8:00 AM-5:00 PM',
  mapUrl: 'https://maps.google.com/?q=456+Xo+Viet+Nghe+Tinh+Ho+Chi+Minh',
  mapQuery: '456+Xo+Viet+Nghe+Tinh+Ho+Chi+Minh',
})

const about = (language: 'vi' | 'en', partners: ReturnType<typeof reference>[]) => {
  const vi = language === 'vi'
  return {
    _type: 'aboutPage',
    language,
    heroSection: {
      _type: 'aboutPageHero',
      breadcrumbHome: vi ? 'Trang chủ' : 'Home',
      breadcrumbCurrent: vi ? 'Giới thiệu' : 'About',
      eyebrow: vi ? 'Giới thiệu về KVC Global' : 'About KVC Global',
      titleLine1: vi ? 'Đồng hành cùng bạn' : 'Partnering with you',
      titleLine2: vi ? 'chạm tới tương lai mới' : 'toward a new future',
      description: vi
        ? 'KVC Global đồng hành cùng học sinh, người lao động và doanh nghiệp trên hành trình chinh phục Singapore.'
        : 'KVC Global supports students, professionals, and businesses on their journey to Singapore.',
      primaryButtonLabel: vi ? 'Đăng ký tư vấn miễn phí' : 'Book a free consultation',
      primaryButtonHref: '#lien-he',
      secondaryButtonLabel: vi ? 'Tìm hiểu thêm' : 'Learn more',
      secondaryButtonHref: '#cau-chuyen',
    },
    statsSection: {
      _type: 'aboutPageStats',
      items: [
        {
          _type: 'aboutPageStat',
          _key: 'experience',
          icon: 'Award',
          value: '13+',
          label: vi ? 'Năm kinh nghiệm' : 'Years experience',
        },
        {
          _type: 'aboutPageStat',
          _key: 'clients',
          icon: 'Users',
          value: '2,000+',
          label: vi ? 'Khách hàng' : 'Clients',
        },
        {
          _type: 'aboutPageStat',
          _key: 'transparent',
          icon: 'ShieldCheck',
          value: '100%',
          label: vi ? 'Minh bạch' : 'Transparent',
        },
        {
          _type: 'aboutPageStat',
          _key: 'support',
          icon: 'Globe2',
          value: '24/7',
          label: vi ? 'Hỗ trợ' : 'Support',
        },
      ],
    },
    storySection: {
      _type: 'aboutPageStory',
      title: vi ? 'Về KVC Global' : 'About KVC Global',
      description: vi
        ? 'KVC Global đồng hành cùng cá nhân và doanh nghiệp trên hành trình học tập, làm việc và đầu tư tại Singapore.'
        : 'KVC Global supports individuals and businesses studying, working, and investing in Singapore.',
      visionTitle: vi ? 'Tầm nhìn' : 'Vision',
      visionDescription: vi
        ? 'Trở thành đơn vị tư vấn đáng tin cậy cho khách hàng tại Singapore.'
        : 'To become a trusted Singapore consultancy.',
      missionTitle: vi ? 'Sứ mệnh' : 'Mission',
      missionDescription: vi
        ? 'Cung cấp giải pháp tư vấn đúng quy trình, minh bạch và nhất quán.'
        : 'Provide compliant, transparent, and consistent consulting solutions.',
    },
    partnersSection: {
      _type: 'aboutPagePartners',
      eyebrow: vi ? 'Đối tác' : 'Partners',
      title: vi ? 'Đối tác và trường liên kết' : 'Partners and affiliated institutions',
      partners,
    },
    officesSection: {
      _type: 'aboutPageOffices',
      eyebrow: vi ? 'Văn phòng' : 'Offices',
      title: vi ? 'Gần bạn hơn ở mỗi điểm đến' : 'Closer at every destination',
      offices: [office(language)],
    },
    seo: {
      _type: 'pageSeo',
      title: vi ? 'Giới thiệu - KVC Global' : 'About - KVC Global',
      description: vi
        ? 'Giới thiệu về KVC Global và các dịch vụ tại Singapore.'
        : 'Learn about KVC Global and our Singapore services.',
    },
  }
}

const contact = (language: 'vi' | 'en') => {
  const vi = language === 'vi'
  return {
    _type: 'contactPage',
    language,
    heroSection: {
      _type: 'contactPageHero',
      breadcrumbHome: vi ? 'Trang chủ' : 'Home',
      breadcrumbCurrent: vi ? 'Liên hệ' : 'Contact',
      titleLine1: vi ? 'KẾT NỐI CÙNG' : 'CONNECT WITH',
      titleLine2: 'KVC GLOBAL.',
      description: vi
        ? 'Chia sẻ mục tiêu của bạn. Đội ngũ KVC Global sẽ tư vấn lộ trình rõ ràng và minh bạch.'
        : 'Share your goals. KVC Global will recommend a clear, transparent pathway.',
      primaryButtonLabel: vi ? 'Gửi yêu cầu tư vấn' : 'Request a consultation',
      primaryButtonHref: '#gui-yeu-cau',
    },
    infoSection: {
      _type: 'contactPageInfo',
      title: vi ? 'Liên hệ với chúng tôi' : 'Contact us',
      description: vi
        ? 'Có câu hỏi hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp bạn.'
        : 'Questions or need support? Our team is ready to help.',
      phone: '(+84) 911942409',
      email: 'info@kvcglobal.vn',
      address: office(language).address,
      officeHoursTitle: vi ? 'Giờ làm việc' : 'Office hours',
      weekdayHours: vi ? 'Thứ 2 - Thứ 6, 8:00 - 17:00' : 'Monday - Friday, 8:00 AM - 5:00 PM',
      weekendHours: vi ? 'Thứ 7 - Chủ nhật: Đóng cửa' : 'Saturday - Sunday: Closed',
      socialTitle: vi ? 'Kết nối với chúng tôi' : 'Connect with us',
    },
    formSection: {
      _type: 'contactPageForm',
      title: vi ? 'Gửi yêu cầu tư vấn' : 'Request a consultation',
      description: vi
        ? 'Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại sớm nhất.'
        : 'Complete the form and we will contact you shortly.',
      nameLabel: vi ? 'Họ và tên' : 'Full name',
      emailLabel: 'Email',
      phoneLabel: vi ? 'Số điện thoại' : 'Phone',
      serviceLabel: vi ? 'Dịch vụ quan tâm' : 'Service',
      messageLabel: vi ? 'Tin nhắn' : 'Message',
      submitLabel: vi ? 'Gửi yêu cầu tư vấn' : 'Send request',
    },
    officesSection: {
      _type: 'contactPageOffices',
      eyebrow: vi ? 'Văn phòng' : 'Offices',
      title: vi ? 'Gần bạn hơn ở mỗi điểm đến' : 'Closer at every destination',
      offices: [office(language)],
    },
    seo: {
      _type: 'pageSeo',
      title: vi ? 'Liên hệ - KVC Global' : 'Contact - KVC Global',
      description: vi
        ? 'Liên hệ KVC Global để được tư vấn.'
        : 'Contact KVC Global for a consultation.',
    },
  }
}

async function seed(
  type: 'aboutPage' | 'contactPage',
  language: 'vi' | 'en',
  fields: Record<string, unknown>,
) {
  const slug = type === 'aboutPage' ? 'about-page' : 'contact-page'
  const _id = `drafts.${slug}-${language}`
  if (dryRun) return console.log(JSON.stringify({_id, ...fields}, null, 2))
  await client.createIfNotExists({_id, _type: type, language})
  await client.patch(_id).setIfMissing(fields).commit()
  console.log(`Seeded ${_id}`)
}

async function main() {
  const partners = await partnerReferences()
  for (const language of ['vi', 'en'] as const) {
    await seed('aboutPage', language, about(language, partners))
    await seed('contactPage', language, contact(language))
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
