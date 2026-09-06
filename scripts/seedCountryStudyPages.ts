/**
 * seedCountryStudyPages.ts
 * Seeds "Du học Malaysia" and "Du học Đài Loan" study pages (vi + en) and
 * repoints the live siteSettings nav children from coming-soon to the new pages.
 *
 * Run:    npx sanity exec scripts/seedCountryStudyPages.ts
 * Dry run: npx sanity exec scripts/seedCountryStudyPages.ts -- --dry-run
 */

import {randomUUID} from 'crypto'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-18'})
const dryRun = process.argv.includes('--dry-run')

const genKey = () => randomUUID().replace(/-/g, '').substring(0, 12)

const ensureKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      item && typeof item === 'object' && !Array.isArray(item)
        ? ensureKeys({_key: item._key || genKey(), ...item})
        : item,
    )
  }
  if (obj && typeof obj === 'object') {
    const res: any = {}
    for (const k of Object.keys(obj)) res[k] = ensureKeys(obj[k])
    return res
  }
  return obj
}

// ---------------------------------------------------------------------------
// Shared nav labels/descriptions for appending missing nav children
// ---------------------------------------------------------------------------
const navCopy = {
  vi: {
    malaysia: ['Du học Malaysia', 'Chi phí hợp lý, chất lượng giáo dục chuẩn quốc tế.'],
    taiwan: ['Du học Đài Loan', 'Học bổng hấp dẫn, cơ hội việc làm và phát triển rộng mở.'],
  },
  en: {
    malaysia: ['Study in Malaysia', 'Affordable cost, international standard education.'],
    taiwan: ['Study in Taiwan', 'Attractive scholarships, wide job and career opportunities.'],
  },
} as const

// ---------------------------------------------------------------------------
// Malaysia content
// ---------------------------------------------------------------------------
const malaysiaData = (lang: 'vi' | 'en') => {
  const isVi = lang === 'vi'
  return {
    _id: `malaysia-study-page-${lang}`,
    _type: 'malaysiaStudyPage',
    language: lang,
    heroSection: {
      eyebrow: isVi ? 'DU HỌC MALAYSIA' : 'STUDY IN MALAYSIA',
      title: isVi
        ? 'Du học Malaysia — Chi phí hợp lý, bằng cấp quốc tế'
        : 'Study in Malaysia — Affordable Cost, International Degrees',
      description: isVi
        ? 'Malaysia là điểm đến du học ngày càng được ưa chuộng nhờ chi phí hợp lý, môi trường học tập bằng tiếng Anh và bằng cấp được công nhận toàn cầu.'
        : 'Malaysia is an increasingly popular study destination thanks to affordable costs, an English-medium learning environment, and globally recognized degrees.',
      primaryButtonLabel: isVi ? 'Đăng ký tư vấn miễn phí' : 'Book a Free Consultation',
      primaryButtonHref: '/lien-he',
      secondaryButtonLabel: isVi ? 'Khám phá ngành học' : 'Explore Majors',
      secondaryButtonHref: '#nganh-hoc',
      stats: [
        {
          _type: 'studyAbroadStat',
          value: 'RM 25.000 – 50.000',
          label: isVi ? 'học phí mỗi năm' : 'tuition per year',
          icon: 'Wallet',
        },
        {
          _type: 'studyAbroadStat',
          value: 'RM 1.500 – 2.500',
          label: isVi ? 'chi phí sinh hoạt/tháng' : 'living cost per month',
          icon: 'Coins',
        },
        {
          _type: 'studyAbroadStat',
          value: isVi ? 'Không cần IELTS' : 'No IELTS required',
          label: isVi ? 'khi nhập học' : 'at enrollment',
          icon: 'FileCheck',
        },
        {
          _type: 'studyAbroadStat',
          value: '2 + 2',
          label: isVi ? 'chuyển tiếp Anh, Úc, Nhật' : 'transfer to UK, Australia, Japan',
          icon: 'GraduationCap',
        },
      ],
    },
    introSection: {
      title: isVi ? 'Vì sao chọn du học Malaysia?' : 'Why study in Malaysia?',
      highlightText: isVi
        ? 'Lựa chọn thông minh cho hành trình học tập quốc tế với ngân sách hợp lý'
        : 'A smart choice for an international education on a reasonable budget',
      bullets: [
        isVi
          ? 'Chi phí học tập và sinh hoạt chỉ bằng 50 – 70% so với Singapore, Úc hay Anh.'
          : 'Tuition and living costs are only 50–70% of Singapore, Australia, or the UK.',
        isVi
          ? 'Toàn bộ chương trình đào tạo bằng tiếng Anh, chuẩn quốc tế.'
          : 'All programs are taught in English to international standards.',
        isVi
          ? 'Bằng cấp được công nhận toàn cầu, dễ dàng chuyển tiếp sang các nước thứ ba.'
          : 'Degrees are globally recognized with easy transfer pathways to third countries.',
        isVi
          ? 'Văn hóa gần gũi Việt Nam, cộng đồng người Việt đông đảo.'
          : 'A culture close to Vietnam with a large Vietnamese community.',
      ],
      paragraphs: [
        isVi
          ? 'Malaysia đã trở thành một trong những điểm đến du học hàng đầu Đông Nam Á với hệ thống trường đại học chất lượng cao, học phí cạnh tranh và môi trường sống an toàn, thân thiện. Học sinh tốt nghiệp tại Malaysia có thể lựa chọn làm việc hoặc chuyển tiếp sang Anh, Úc, New Zealand và nhiều quốc gia khác.'
          : 'Malaysia has become one of the top study destinations in Southeast Asia with high-quality universities, competitive tuition, and a safe, friendly living environment. Graduates can choose to work or transfer to the UK, Australia, New Zealand, and many other countries.',
        isVi
          ? 'Với các chương trình twinning (2+2, 3+0), sinh viên có thể học phần đầu tại Malaysia với chi phí tiết kiệm rồi hoàn tất bằng cấp tại các trường đại học danh tiếng nước ngoài.'
          : 'With twinning programs (2+2, 3+0), students can complete the first part of their studies in Malaysia at a lower cost and finish their degree at prestigious foreign universities.',
      ],
    },
    whySection: {
      title: isVi ? 'Vì sao nên du học Malaysia?' : 'Why study in Malaysia?',
      items: [
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Wallet',
          title: isVi ? 'Chi phí hợp lý' : 'Affordable cost',
          description: isVi
            ? 'Học phí và sinh hoạt phí thấp hơn nhiều so với các nước nói tiếng Anh khác, giúp giảm áp lực tài chính cho gia đình.'
            : 'Tuition and living costs are much lower than other English-speaking countries, easing the financial burden on families.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'GraduationCap',
          title: isVi ? 'Bằng cấp quốc tế' : 'International degrees',
          description: isVi
            ? 'Nhiều trường hợp tác với đại học Anh, Úc cấp bằng trực tiếp từ trường gốc, được công nhận toàn cầu.'
            : 'Many partner campuses of UK and Australian universities issue degrees directly from the home institution, recognized worldwide.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'TrendingUp',
          title: isVi ? 'Cơ hội chuyển tiếp' : 'Transfer opportunities',
          description: isVi
            ? 'Chương trình 2+2, 3+0 cho phép chuyển tiếp sang Anh, Úc, Nhật để hoàn tất bằng cấp.'
            : '2+2 and 3+0 programs allow transfers to the UK, Australia, or Japan to complete the degree.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Handshake',
          title: isVi ? 'Văn hóa gần gũi' : 'Familiar culture',
          description: isVi
            ? 'Khoảng cách bay ngắn, văn hóa ẩm thực tương đồng và cộng đồng người Việt lớn giúp học sinh dễ thích nghi.'
            : 'Short flights, familiar food culture, and a large Vietnamese community help students settle in quickly.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Briefcase',
          title: isVi ? 'Được phép làm thêm' : 'Part-time work allowed',
          description: isVi
            ? 'Sinh viên quốc tế được làm thêm theo quy định hiện hành để tích lũy kinh nghiệm và trang trải chi phí.'
            : 'International students may work part-time under current regulations to gain experience and offset living costs.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'FileCheck',
          title: isVi ? 'Thủ tục visa đơn giản' : 'Simple visa process',
          description: isVi
            ? 'Tỷ lệ đạt visa cao, thủ tục minh bạch, thời gian xét duyệt nhanh.'
            : 'A high visa approval rate with a transparent, fast process.',
        },
      ],
    },
    majorsSection: {
      title: isVi ? 'Ngành học phổ biến' : 'Popular Majors',
      items: [
        {_type: 'studyAbroadMajorItem', icon: 'Briefcase', name: isVi ? 'Kinh doanh & Quản trị' : 'Business & Management'},
        {_type: 'studyAbroadMajorItem', icon: 'Hotel', name: isVi ? 'Du lịch & Khách sạn' : 'Tourism & Hospitality'},
        {_type: 'studyAbroadMajorItem', icon: 'Laptop', name: isVi ? 'Công nghệ thông tin' : 'Computer Science & IT'},
        {_type: 'studyAbroadMajorItem', icon: 'Bot', name: isVi ? 'Kỹ thuật' : 'Engineering'},
        {_type: 'studyAbroadMajorItem', icon: 'FileText', name: isVi ? 'Kế toán & Tài chính' : 'Accounting & Finance'},
      ],
    },
    requirementsSection: {
      title: isVi ? 'Điều kiện tham gia' : 'Entry Requirements',
      conditions: [
        isVi ? 'Tốt nghiệp THPT (học bạ GPA từ 6.5 – 7.0 trở lên tùy trường)' : 'High school graduation (transcript GPA of 6.5–7.0+ depending on the school)',
        isVi ? 'Chưa cần IELTS khi nhập học — có lộ trình tiếng Anh tăng cường' : 'No IELTS needed at enrollment — English enhancement pathway available',
        isVi ? 'Đáp ứng yêu cầu về sức khỏe và nhân thân theo quy định' : 'Meets health and conduct requirements as regulated',
      ],
      tipText: isVi
        ? 'KVC Global sẽ tư vấn lựa chọn trường và ngành học phù hợp với học lực và ngân sách của từng học viên.'
        : 'KVC Global will advise on the school and major that best fit each student’s academic record and budget.',
    },
    prospectsSection: {
      title: isVi ? 'Cơ hội sau tốt nghiệp' : 'Opportunities After Graduation',
      opportunities: [
        isVi ? 'Làm việc tại các tập đoàn đa quốc gia tại Malaysia' : 'Work at multinational corporations in Malaysia',
        isVi ? 'Chuyển tiếp năm cuối sang Anh, Úc, New Zealand, Nhật Bản' : 'Transfer the final year to the UK, Australia, New Zealand, or Japan',
        isVi ? 'Tiếp tục học lên thạc sĩ với bằng cấp quốc tế' : 'Continue to a master’s degree with an international qualification',
        isVi ? 'Quay về Việt Nam làm việc tại doanh nghiệp FDI' : 'Return to Vietnam and work at FDI companies',
      ],
    },
    supportSection: {
      title: isVi ? 'KVC Global đồng hành cùng bạn' : 'KVC Global accompanies you',
      steps: [
        {_type: 'studyAbroadSupportStep', icon: 'Compass', text: isVi ? 'Tư vấn chọn trường và ngành học phù hợp' : 'Advise on school and major selection'},
        {_type: 'studyAbroadSupportStep', icon: 'ClipboardList', text: isVi ? 'Hoàn thiện hồ sơ nhập học' : 'Prepare the admission application'},
        {_type: 'studyAbroadSupportStep', icon: 'FileSignature', text: isVi ? 'Xin thị thực du học sinh' : 'Apply for the student visa'},
        {_type: 'studyAbroadSupportStep', icon: 'UserCheck', text: isVi ? 'Định cư chuẩn bị trước khi bay' : 'Pre-departure preparation'},
        {_type: 'studyAbroadSupportStep', icon: 'Handshake', text: isVi ? 'Đồng hành suốt quá trình học tập' : 'Support throughout the study journey'},
      ],
    },
    testimonialsSection: {
      title: isVi ? 'Học viên nói gì về KVC Global?' : 'What students say about KVC Global?',
      testimonials: [],
    },
    faqsSection: {
      title: isVi ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions',
      faqs: [
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Tổng chi phí du học Malaysia là bao nhiêu?' : 'What is the total cost of studying in Malaysia?',
          answer: isVi
            ? 'Học phí trung bình từ RM 25.000 – 50.000/năm tùy ngành và trường. Chi phí sinh hoạt khoảng RM 1.500 – 2.500/tháng, tổng cộng khoảng 300 – 450 triệu VNĐ/năm.'
            : 'Tuition averages RM 25,000–50,000 per year depending on the major and school. Living costs are around RM 1,500–2,500 per month, totaling roughly USD 6,500–10,000 per year.',
        },
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Có cần IELTS khi đăng ký không?' : 'Do I need IELTS to apply?',
          answer: isVi
            ? 'Không bắt buộc ngay từ đầu. Các trường có chương trình tiếng Anh tăng cường trước khi vào chuyên ngành. Tuy nhiên, có IELTS sẽ tăng cơ hội nhận học bổng.'
            : 'Not mandatory at the start. Schools offer English enhancement programs before the main course. However, having IELTS improves scholarship chances.',
        },
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Sinh viên quốc tế có được làm thêm không?' : 'Can international students work part-time?',
          answer: isVi
            ? 'Có. Theo quy định hiện hành, sinh viên được làm thêm tối đa 20 giờ/tuần trong kỳ học và toàn thời gian trong kỳ nghỉ tại một số lĩnh vực được phép.'
            : 'Yes. Under current regulations, students may work up to 20 hours per week during term time and full-time during breaks in permitted sectors.',
        },
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Sau tốt nghiệp có thể chuyển tiếp sang nước khác không?' : 'Can I transfer to another country after graduation?',
          answer: isVi
            ? 'Có. Nhờ các chương trình twinning 2+2, 3+0, bạn có thể chuyển tiếp sang Anh, Úc, New Zealand hoặc Nhật Bản để hoàn tất bằng cấp.'
            : 'Yes. Thanks to 2+2 and 3+0 twinning programs, you can transfer to the UK, Australia, New Zealand, or Japan to complete your degree.',
        },
      ],
    },
    servicesSection: {
      title: isVi ? 'Các dịch vụ liên quan' : 'Related Services',
      services: [
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Du học Singapore' : 'Study in Singapore',
          ctaText: isVi ? 'Tìm hiểu ngay' : 'Learn more',
          icon: 'GraduationCap',
          href: '/du-hoc',
        },
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Work Holiday Pass' : 'Work Holiday Pass',
          ctaText: isVi ? 'Khám phá ngay' : 'Discover now',
          icon: 'Briefcase',
          href: '/work-pass',
        },
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Du học Đài Loan' : 'Study in Taiwan',
          ctaText: isVi ? 'Tìm hiểu ngay' : 'Learn more',
          icon: 'Building2',
          href: '/du-hoc/dai-loan',
        },
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Tư vấn di trú & định cư' : 'Migration & Residency Consulting',
          ctaText: isVi ? 'Liên hệ ngay' : 'Contact us',
          icon: 'IdCard',
          href: '/lien-he',
        },
      ],
    },
    seo: {
      title: isVi ? 'Du học Malaysia - KVC Global' : 'Study in Malaysia - KVC Global',
      description: isVi
        ? 'Chương trình du học Malaysia: chi phí hợp lý, môi trường học bằng tiếng Anh, bằng cấp quốc tế và cơ hội chuyển tiếp sang các nước thứ ba.'
        : 'Study in Malaysia with affordable tuition, English-medium education, internationally recognized degrees, and transfer pathways to third countries.',
    },
  }
}

// ---------------------------------------------------------------------------
// Taiwan content
// ---------------------------------------------------------------------------
const taiwanData = (lang: 'vi' | 'en') => {
  const isVi = lang === 'vi'
  return {
    _id: `taiwan-study-page-${lang}`,
    _type: 'taiwanStudyPage',
    language: lang,
    heroSection: {
      eyebrow: isVi ? 'DU HỌC ĐÀI LOAN' : 'STUDY IN TAIWAN',
      title: isVi
        ? 'Du học Đài Loan — Học bổng hấp dẫn, cơ hội việc làm rộng mở'
        : 'Study in Taiwan — Attractive Scholarships, Wide Career Opportunities',
      description: isVi
        ? 'Đài Loan là điểm đến du học lý tưởng với chính sách học bổng hào phóng, chi phí hợp lý và nền giáo dục công nghệ hàng đầu châu Á.'
        : 'Taiwan is an ideal study destination with generous scholarships, reasonable costs, and one of Asia’s leading technology education systems.',
      primaryButtonLabel: isVi ? 'Đăng ký tư vấn miễn phí' : 'Book a Free Consultation',
      primaryButtonHref: '/lien-he',
      secondaryButtonLabel: isVi ? 'Khám phá ngành học' : 'Explore Majors',
      secondaryButtonHref: '#nganh-hoc',
      stats: [
        {
          _type: 'studyAbroadStat',
          value: '30 – 100%',
          label: isVi ? 'học bổng học phí' : 'tuition scholarship',
          icon: 'GraduationCap',
        },
        {
          _type: 'studyAbroadStat',
          value: isVi ? 'Thấp hơn 40%' : '40% lower',
          label: isVi ? 'chi phí so với Hàn, Nhật' : 'cost vs. Korea, Japan',
          icon: 'Coins',
        },
        {
          _type: 'studyAbroadStat',
          value: isVi ? 'Cơ hội ở lại' : 'Work after',
          label: isVi ? 'làm việc sau tốt nghiệp' : 'graduation',
          icon: 'Briefcase',
        },
        {
          _type: 'studyAbroadStat',
          value: isVi ? 'Gần Việt Nam' : 'Close to Vietnam',
          label: isVi ? 'bay chỉ ~3 giờ' : 'just ~3h flight',
          icon: 'TrendingUp',
        },
      ],
    },
    introSection: {
      title: isVi ? 'Vì sao chọn du học Đài Loan?' : 'Why study in Taiwan?',
      highlightText: isVi
        ? 'Học bổng lớn, chi phí thấp, cơ hội nghề nghiệp song ngữ Trung – Anh'
        : 'Generous scholarships, low costs, and a bilingual Mandarin–English career advantage',
      bullets: [
        isVi
          ? 'Học bổng Chính phủ Đài Loan và các trường phủ tới 30 – 100% học phí kèm trợ cấp sinh hoạt.'
          : 'Taiwan government and university scholarships cover 30–100% of tuition plus living allowances.',
        isVi
          ? 'Chi phí học tập và sinh hoạt thấp hơn khoảng 40% so với Hàn Quốc, Nhật Bản.'
          : 'Tuition and living costs are about 40% lower than in Korea or Japan.',
        isVi
          ? 'Thế mạnh đào tạo công nghệ, điện tử, cơ khí — nơi đặt trụ sở các tập đoàn hàng đầu thế giới.'
          : 'Strengths in technology, electronics, and mechanical engineering — home to world-leading corporations.',
        isVi
          ? 'Vừa học tiếng Trung vừa học chuyên ngành bằng tiếng Anh — lợi thế kép trên thị trường lao động.'
          : 'Learn Mandarin alongside English-taught majors — a double advantage in the job market.',
      ],
      paragraphs: [
        isVi
          ? 'Đài Loan sở hữu hệ thống giáo dục đại học chất lượng cao với nhiều trường nằm trong bảng xếp hạng châu Á. Chính sách ưu đãi du học sinh quốc tế cùng nhu cầu nhân lực cao khiến Đài Loan trở thành lựa chọn hấp dẫn cho học sinh Việt Nam.'
          : 'Taiwan boasts a high-quality higher education system with many universities ranked among Asia’s best. Friendly policies for international students and strong labor demand make Taiwan an attractive choice for Vietnamese students.',
        isVi
          ? 'Sau tốt nghiệp, sinh viên có thể ở lại làm việc theo chính sách tuyển dụng lao động của Đài Loan, đặc biệt trong các ngành công nghệ, kỹ thuật và kinh doanh.'
          : 'After graduation, students may stay and work under Taiwan’s employment policies, especially in technology, engineering, and business fields.',
      ],
    },
    whySection: {
      title: isVi ? 'Vì sao nên du học Đài Loan?' : 'Why study in Taiwan?',
      items: [
        {
          _type: 'studyAbroadWhyItem',
          icon: 'GraduationCap',
          title: isVi ? 'Học bổng hấp dẫn' : 'Attractive scholarships',
          description: isVi
            ? 'Học bổng Chính phủ Đài Loan (MOE, MOFA) và học bổng trường phủ 30 – 100% học phí, kèm trợ cấp sinh hoạt.'
            : 'Taiwan government (MOE, MOFA) and university scholarships cover 30–100% of tuition plus living allowances.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Wallet',
          title: isVi ? 'Chi phí thấp' : 'Low cost',
          description: isVi
            ? 'Học phí và sinh hoạt phí hợp lý, thấp hơn đáng kể so với Hàn Quốc và Nhật Bản.'
            : 'Reasonable tuition and living costs, significantly lower than Korea and Japan.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Laptop',
          title: isVi ? 'Ngành công nghệ mạnh' : 'Strong technology programs',
          description: isVi
            ? 'Đài Loan là cái nôi của ngành bán dẫn, điện tử và cơ khí chính xác với thế giới đào tạo hàng đầu.'
            : 'Taiwan is the cradle of semiconductors, electronics, and precision machinery with world-class training.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Briefcase',
          title: isVi ? 'Cơ hội việc làm' : 'Career opportunities',
          description: isVi
            ? 'Nhu cầu nhân lực cao; sau tốt nghiệp có thể ở lại làm việc theo chính sách hiện hành.'
            : 'High labor demand; graduates may stay and work under current policies.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'Brain',
          title: isVi ? 'Lợi thế tiếng Trung' : 'Mandarin advantage',
          description: isVi
            ? 'Biết tiếng Trung là lợi thế lớn trên thị trường lao động quốc tế và tại các doanh nghiệp FDI.'
            : 'Mandarin proficiency is a major advantage in the international market and at FDI companies.',
        },
        {
          _type: 'studyAbroadWhyItem',
          icon: 'ShieldCheck',
          title: isVi ? 'Môi trường an toàn' : 'Safe environment',
          description: isVi
            ? 'Đài Loan được đánh giá là một trong những nơi an toàn và tiện lợi nhất châu Á, giao thông phát triển.'
            : 'Taiwan is rated among the safest and most convenient places in Asia with excellent transit.',
        },
      ],
    },
    majorsSection: {
      title: isVi ? 'Ngành học phổ biến' : 'Popular Majors',
      items: [
        {_type: 'studyAbroadMajorItem', icon: 'Laptop', name: isVi ? 'Công nghệ thông tin' : 'Information Technology'},
        {_type: 'studyAbroadMajorItem', icon: 'Bot', name: isVi ? 'Điện tử - Cơ khí' : 'Electronics & Mechanical Engineering'},
        {_type: 'studyAbroadMajorItem', icon: 'Briefcase', name: isVi ? 'Kinh doanh - Quản trị' : 'Business Administration'},
        {_type: 'studyAbroadMajorItem', icon: 'FileText', name: isVi ? 'Ngôn ngữ Trung' : 'Chinese Language'},
        {_type: 'studyAbroadMajorItem', icon: 'Hotel', name: isVi ? 'Du lịch - Khách sạn' : 'Tourism & Hospitality'},
      ],
    },
    requirementsSection: {
      title: isVi ? 'Điều kiện tham gia' : 'Entry Requirements',
      conditions: [
        isVi ? 'Tốt nghiệp THPT; kết quả học bạ quyết định mức học bổng' : 'High school graduation; transcript results determine the scholarship level',
        isVi ? 'Ưu tiên có nền tảng tiếng Trung (HSK) hoặc tiếng Anh (IELTS/TOEIC)' : 'A foundation in Chinese (HSK) or English (IELTS/TOEIC) is preferred',
        isVi ? 'Đáp ứng yêu cầu về sức khỏe và nhân thân theo quy định' : 'Meets health and conduct requirements as regulated',
      ],
      tipText: isVi
        ? 'KVC Global sẽ tư vấn chọn trường và chuẩn bị hồ sơ học bổng để tối đa mức hỗ trợ cho học viên.'
        : 'KVC Global will advise on school choice and scholarship preparation to maximize each student’s support level.',
    },
    prospectsSection: {
      title: isVi ? 'Cơ hội sau tốt nghiệp' : 'Opportunities After Graduation',
      opportunities: [
        isVi ? 'Ở lại Đài Loan làm việc tại các tập đoàn công nghệ, sản xuất hàng đầu' : 'Stay in Taiwan and work at leading technology and manufacturing corporations',
        isVi ? 'Học lên thạc sĩ với nhiều cơ hội học bổng hấp dẫn' : 'Pursue a master’s degree with generous scholarships',
        isVi ? 'Quay về Việt Nam làm việc tại doanh nghiệp Đài Loan đầu tư' : 'Return to Vietnam and work at Taiwan-invested companies',
        isVi ? 'Phát triển sự nghiệp song ngữ Trung – Anh trong môi trường quốc tế' : 'Build a bilingual Mandarin–English career in international environments',
      ],
    },
    supportSection: {
      title: isVi ? 'KVC Global đồng hành cùng bạn' : 'KVC Global accompanies you',
      steps: [
        {_type: 'studyAbroadSupportStep', icon: 'Compass', text: isVi ? 'Tư vấn chọn trường và ngành học phù hợp' : 'Advise on school and major selection'},
        {_type: 'studyAbroadSupportStep', icon: 'ClipboardList', text: isVi ? 'Chuẩn bị hồ sơ học bổng' : 'Prepare the scholarship application'},
        {_type: 'studyAbroadSupportStep', icon: 'FileSignature', text: isVi ? 'Xin thị thực du học sinh' : 'Apply for the student visa'},
        {_type: 'studyAbroadSupportStep', icon: 'UserCheck', text: isVi ? 'Định cư chuẩn bị trước khi bay' : 'Pre-departure preparation'},
        {_type: 'studyAbroadSupportStep', icon: 'Handshake', text: isVi ? 'Đồng hành suốt quá trình học tập' : 'Support throughout the study journey'},
      ],
    },
    testimonialsSection: {
      title: isVi ? 'Học viên nói gì về KVC Global?' : 'What students say about KVC Global?',
      testimonials: [],
    },
    faqsSection: {
      title: isVi ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions',
      faqs: [
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Các loại học bổng du học Đài Loan?' : 'What scholarships are available for studying in Taiwan?',
          answer: isVi
            ? 'Có học bổng Chính phủ Đài Loan (MOE, MOFA) và học bổng của từng trường, phủ từ 30 – 100% học phí, nhiều suất kèm trợ cấp sinh hoạt.'
            : 'There are Taiwan government scholarships (MOE, MOFA) and university scholarships covering 30–100% of tuition, many including living allowances.',
        },
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Chi phí du học Đài Loan khoảng bao nhiêu?' : 'How much does it cost to study in Taiwan?',
          answer: isVi
            ? 'Học phí khoảng 40.000 – 80.000 Đài tệ/năm (~30 – 60 triệu VNĐ) tùy trường và ngành. Sinh hoạt phí khoảng 5.000 – 8.000 Đài tệ/tháng.'
            : 'Tuition is around NT$40,000–80,000 per year (~USD 1,300–2,600) depending on the school and major. Living costs are about NT$5,000–8,000 per month.',
        },
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Cần biết tiếng Trung trước khi đi không?' : 'Do I need to know Chinese before going?',
          answer: isVi
            ? 'Không bắt buộc. Nhiều trường có chương trình dự bị tiếng Trung và ngành học bằng tiếng Anh. Tuy nhiên, có HSK sẽ tăng cơ hội học bổng và việc làm.'
            : 'Not mandatory. Many schools offer Chinese preparatory programs and English-taught majors. However, HSK certification improves scholarship and job prospects.',
        },
        {
          _type: 'studyAbroadFaqItem',
          question: isVi ? 'Sau tốt nghiệp có được ở lại làm việc không?' : 'Can I stay and work after graduation?',
          answer: isVi
            ? 'Có. Theo chính sách hiện hành, sinh viên tốt nghiệp đủ điều kiện có thể xin giấy phép làm việc tại Đài Loan, đặc biệt trong ngành công nghệ và kỹ thuật.'
            : 'Yes. Under current policies, eligible graduates can apply for work permits in Taiwan, especially in technology and engineering fields.',
        },
      ],
    },
    servicesSection: {
      title: isVi ? 'Các dịch vụ liên quan' : 'Related Services',
      services: [
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Du học Singapore' : 'Study in Singapore',
          ctaText: isVi ? 'Tìm hiểu ngay' : 'Learn more',
          icon: 'GraduationCap',
          href: '/du-hoc',
        },
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Du học Malaysia' : 'Study in Malaysia',
          ctaText: isVi ? 'Tìm hiểu ngay' : 'Learn more',
          icon: 'Building2',
          href: '/du-hoc/malaysia',
        },
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Work Holiday Pass' : 'Work Holiday Pass',
          ctaText: isVi ? 'Khám phá ngay' : 'Discover now',
          icon: 'Briefcase',
          href: '/work-pass',
        },
        {
          _type: 'studyAbroadServiceItem',
          title: isVi ? 'Tư vấn di trú & định cư' : 'Migration & Residency Consulting',
          ctaText: isVi ? 'Liên hệ ngay' : 'Contact us',
          icon: 'IdCard',
          href: '/lien-he',
        },
      ],
    },
    seo: {
      title: isVi ? 'Du học Đài Loan - KVC Global' : 'Study in Taiwan - KVC Global',
      description: isVi
        ? 'Chương trình du học Đài Loan: học bổng hấp dẫn, chi phí học tập và sinh hoạt hợp lý, thế mạnh về đào tạo công nghệ và cơ hội việc làm sau tốt nghiệp.'
        : 'Study in Taiwan with attractive scholarships, affordable tuition, strong technology programs, and work opportunities after graduation.',
    },
  }
}

// ---------------------------------------------------------------------------
// Nav patching
// ---------------------------------------------------------------------------
const countryDestination = (label: string): string | null => {
  if (/malaysia/i.test(label)) return 'malaysiaStudy'
  if (/taiwan|đài loan/i.test(label)) return 'taiwanStudy'
  return null
}

async function patchSiteSettings(language: 'vi' | 'en') {
  const id = `site-settings-${language}`
  const doc = await client.fetch<{header?: {navItems?: any[]}}>(
    `*[_id == $id][0]{header}`,
    {id},
  )
  if (!doc?.header?.navItems?.length) {
    console.log(`[${id}] no navItems found — skipping`)
    return
  }

  const navItems = doc.header.navItems.map((item: any) => {
    if (item?.link?.destination !== 'studyAbroad' || !Array.isArray(item.children)) {
      return item
    }
    const children = item.children.map((child: any) => {
      const destination = countryDestination(child?.label || '')
      if (!destination) return child
      const {customHref, ...linkRest} = child.link || {}
      return {...child, isComingSoon: false, link: {...linkRest, destination}}
    })

    const copy = navCopy[language]
    if (!children.some((c: any) => countryDestination(c?.label || '') === 'malaysiaStudy')) {
      children.push({
        _type: 'siteNavChild',
        _key: genKey(),
        label: copy.malaysia[0],
        description: copy.malaysia[1],
        link: {_type: 'siteLink', destination: 'malaysiaStudy'},
      })
    }
    if (!children.some((c: any) => countryDestination(c?.label || '') === 'taiwanStudy')) {
      children.push({
        _type: 'siteNavChild',
        _key: genKey(),
        label: copy.taiwan[0],
        description: copy.taiwan[1],
        link: {_type: 'siteLink', destination: 'taiwanStudy'},
      })
    }
    return {...item, children}
  })

  if (dryRun) {
    const study = navItems.find((n: any) => n?.link?.destination === 'studyAbroad')
    console.log(
      `[${id}] would patch navItems; study children:`,
      JSON.stringify(study?.children?.map((c: any) => c.label)),
    )
    return
  }
  await client.patch(id).set({'header.navItems': navItems}).commit()
  console.log(`[${id}] header.navItems patched`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const docs = [
    malaysiaData('vi'),
    malaysiaData('en'),
    taiwanData('vi'),
    taiwanData('en'),
  ]
  for (const doc of docs) {
    const keyed = ensureKeys(doc)
    if (dryRun) {
      console.log(`[dry-run] would createOrReplace ${keyed._id} (${keyed._type})`)
    } else {
      await client.createOrReplace(keyed)
      console.log(`Created ${keyed._id}`)
    }
  }
  await patchSiteSettings('vi')
  await patchSiteSettings('en')
  console.log(dryRun ? 'Dry run complete — no changes written.' : 'Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
