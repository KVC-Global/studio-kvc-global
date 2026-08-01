import {createClient} from '@sanity/client'
import {randomUUID} from 'crypto'

const client = createClient({
  projectId: 'eh8b0fvx',
  dataset: 'production',
  apiVersion: '2026-07-18',
  token:
    process.env.SANITY_AUTH_TOKEN ||
    'skPtRYVIXonREO1fJDQiiS7nK8SdI0gsT68Z57h8dlta8ilNXWDI9HaIIY3ayFHN2CEXXRULZcbW3X7ZiW35cdO1uJ4Xpl1gkqkcncpOL34s4NKhaqJiV9BGLtvmbaYpvzIsBxpCez54HT6pZK3dYKghQ0Ns4dixcALBVL1m5BihAlJgAwUM',
  useCdn: false,
})

const genKey = () => randomUUID().replace(/-/g, '').substring(0, 12)

const ensureKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        return ensureKeys({
          _key: item._key || genKey(),
          ...item,
        })
      }
      return item
    })
  } else if (obj && typeof obj === 'object') {
    const res: any = {}
    for (const k of Object.keys(obj)) {
      res[k] = ensureKeys(obj[k])
    }
    return res
  }
  return obj
}

const createOrReplaceDoc = async (doc: any) => {
  const keyedDoc = ensureKeys(doc)
  console.log(`Seeding document with keys: ${keyedDoc._id}`)
  await client.createOrReplace(keyedDoc)
}

// --------------------------------------------------
// OSSD CANADA DATA (VI & EN)
// --------------------------------------------------
const ossdData = (lang: 'vi' | 'en') => {
  const isVi = lang === 'vi'
  return {
    _id: `online-ossd-${lang}`,
    _type: 'onlineOssdPage',
    language: lang,
    heroSection: {
      parentBreadcrumb: isVi ? 'Khóa Học Online' : 'Online Courses',
      breadcrumb: isVi ? 'OSSD Canada' : 'OSSD Canada',
      tagline: 'OSSD CANADA',
      title: isVi
        ? 'Bằng Tốt nghiệp Trung học Phổ thông Ontario'
        : 'Ontario Secondary School Diploma (OSSD)',
      subtitle: isVi
        ? 'Mở cánh cửa vào các trường đại học hàng đầu tại Canada, Anh, Mỹ, Úc và nhiều quốc gia khác với chương trình OSSD được công nhận quốc tế.'
        : 'Open doors to top universities in Canada, UK, USA, Australia, and worldwide with the internationally recognized OSSD program.',
      description: isVi
        ? 'KVC Global mang đến chương trình OSSD theo hình thức học linh hoạt, giúp học sinh xây dựng hồ sơ học thuật vững chắc và tăng lợi thế khi xét tuyển đại học toàn cầu.'
        : 'KVC Global provides the OSSD program with flexible learning, helping students build a strong academic profile and gain competitive advantages for global university admission.',
      primaryButtonLabel: isVi ? 'Đăng ký tư vấn miễn phí' : 'Book a Free Consultation',
      primaryButtonHref: '#dang-ky',
    },
    introSection: {
      title: isVi ? 'OSSD là gì?' : 'What is OSSD?',
      paragraphs: [
        isVi
          ? 'Ontario Secondary School Diploma (OSSD) là bằng tốt nghiệp trung học phổ thông chính thức của tỉnh Ontario, Canada. Đây là chương trình giáo dục được công nhận rộng rãi bởi các trường đại học và cao đẳng tại Canada cũng như nhiều quốc gia trên thế giới.'
          : 'Ontario Secondary School Diploma (OSSD) is the official high school diploma of the province of Ontario, Canada. It is widely recognized by universities and colleges worldwide.',
        isVi
          ? 'OSSD chú trọng phát triển toàn diện cho học sinh thông qua:'
          : 'OSSD focuses on holistic student development through:',
      ],
      highlights: [
        isVi ? 'Kiến thức học thuật vững chắc.' : 'Solid academic foundation.',
        isVi ? 'Tư duy phản biện và giải quyết vấn đề.' : 'Critical thinking and problem solving.',
        isVi ? 'Kỹ năng nghiên cứu và giao tiếp.' : 'Research and communication skills.',
        isVi ? 'Hoạt động ngoại khóa và trách nhiệm cộng đồng.' : 'Extracurriculars and community involvement.',
        isVi ? 'Chuẩn bị sẵn sàng cho môi trường đại học quốc tế.' : 'Readiness for top international universities.',
      ],
      imageAlt: 'OSSD Ontario Program',
    },
    whySection: {
      title: isVi ? 'Vì sao chọn chương trình OSSD?' : 'Why Choose the OSSD Program?',
      items: [
        {
          icon: 'Globe',
          title: isVi ? 'Bằng cấp được công nhận quốc tế' : 'Internationally Recognized Diploma',
          description: isVi
            ? 'OSSD được các trường đại học tại Canada và nhiều quốc gia sử dụng làm căn cứ xét tuyển đầu vào.'
            : 'OSSD is recognized as a direct university entry qualification in Canada and globally.',
        },
        {
          icon: 'Star',
          title: isVi ? 'Tăng cơ hội vào đại học' : 'Boost University Acceptance',
          description: isVi
            ? 'Học sinh được đánh giá dựa trên quá trình học tập thay vì chỉ một kỳ thi duy nhất, giúp xây dựng hồ sơ học tập toàn diện.'
            : 'Students are evaluated on continuous coursework rather than a single high-stakes exam, helping build a holistic academic record.',
        },
        {
          icon: 'Users',
          title: isVi ? 'Phát triển kỹ năng toàn diện' : 'Holistic Skill Development',
          description: isVi
            ? 'Kỹ năng nghiên cứu, làm việc nhóm, thuyết trình, quản lý thời gian, tư duy độc lập.'
            : 'Build research, teamwork, presentation, time management, and independent thinking skills.',
        },
        {
          icon: 'Clock',
          title: isVi ? 'Linh hoạt trong học tập' : 'Flexible Learning',
          description: isVi
            ? 'Học trực tuyến, lộ trình học cá nhân hóa, chuyển đổi tín chỉ nếu đủ điều kiện.'
            : 'Learn online with personalized learning paths and potential credit transfers.',
        },
      ],
    },
    structureSection: {
      title: isVi ? 'Cấu trúc chương trình OSSD' : 'OSSD Program Structure',
      subtitle: isVi
        ? 'Để nhận bằng OSSD, học sinh cần hoàn thành các yêu cầu tốt nghiệp theo quy định của Bộ Giáo dục Ontario.'
        : 'To earn an OSSD, students must fulfill graduation requirements set by the Ontario Ministry of Education.',
      items: [
        {
          title: isVi ? 'Hoàn thành 30 tín chỉ' : 'Complete 30 Credits',
          description: isVi
            ? 'Bao gồm các môn học bắt buộc và tự chọn theo định hướng nghề nghiệp và đại học. Đối với học sinh bắt đầu Grade 9 từ năm học 2024 trở đi, yêu cầu gồm 17 tín chỉ bắt buộc và 13 tín chỉ tự chọn; các khóa trước đó là 18 tín chỉ bắt buộc và 12 tín chỉ tự chọn.'
            : 'Includes compulsory and elective courses aligned with career and university goals. For students starting Grade 9 in 2024 onwards, 17 compulsory and 13 elective credits are required; previous cohorts require 18 compulsory and 12 elective credits.',
        },
        {
          title: isVi ? 'Năng lực đọc viết' : 'Literacy Requirement',
          description: isVi
            ? 'Học sinh cần đáp ứng yêu cầu về năng lực đọc – viết của tỉnh Ontario thông qua bài đánh giá hoặc khóa học thay thế theo quy định.'
            : 'Students must meet the Ontario literacy requirement through the OSSLT assessment or an eligible course equivalent.',
        },
        {
          title: isVi ? 'Hoạt động cộng đồng' : 'Community Involvement',
          description: isVi
            ? 'Hoàn thành 40 giờ hoạt động cộng đồng (Community Involvement) nhằm phát triển trách nhiệm xã hội và kỹ năng thực tiễn.'
            : 'Complete 40 hours of community involvement activities to build social responsibility and practical skills.',
        },
        {
          title: isVi ? 'Học trực tuyến' : 'Online Learning Requirement',
          description: isVi
            ? 'Theo quy định hiện hành, học sinh cần hoàn thành tối thiểu 2 tín chỉ học trực tuyến (trừ các trường hợp được miễn theo chính sách của Ontario).'
            : 'Under current regulations, students must complete at least 2 online learning credits (unless exempted under Ontario policy).',
        },
      ],
    },
    subjectsSection: {
      title: isVi ? 'Các môn học' : 'Subjects Offered',
      items: [
        { name: 'English' },
        { name: 'Mathematics' },
        { name: 'Science' },
        { name: 'Business Studies' },
        { name: 'Computer Science' },
        { name: 'Social Sciences' },
        { name: 'Canadian & World Studies' },
        { name: 'Arts' },
        { name: 'Health & Physical Education' },
        { name: 'Technology' },
        { name: 'French' },
        { name: 'Economics' },
        { name: 'Accounting' },
      ],
    },
    targetAudienceSection: {
      title: isVi ? 'Đối tượng phù hợp' : 'Target Audience',
      items: [
        { icon: 'GraduationCap', title: isVi ? 'Học sinh THCS chuẩn bị vào THPT.' : 'Middle school students preparing for high school.' },
        { icon: 'Building2', title: isVi ? 'Học sinh THPT muốn chuyển sang chương trình quốc tế.' : 'High school students wishing to switch to an international curriculum.' },
        { icon: 'Globe', title: isVi ? 'Học sinh có kế hoạch du học Canada.' : 'Students planning to study abroad in Canada.' },
        { icon: 'Star', title: isVi ? 'Học sinh muốn xét tuyển vào các trường đại học quốc tế.' : 'Students aiming for admissions to international universities.' },
        { icon: 'Users', title: isVi ? 'Gia đình mong muốn con học theo chương trình giáo dục Canada.' : 'Families wanting their children to follow the Canadian educational system.' },
      ],
    },
    benefitsSection: {
      title: isVi ? 'Lợi ích khi học OSSD tại KVC Global' : 'Benefits of Studying OSSD at KVC Global',
      items: [
        {
          title: isVi ? 'Tư vấn lộ trình cá nhân' : 'Personalized Pathway Counseling',
          description: isVi ? 'Đội ngũ chuyên gia hỗ trợ xây dựng kế hoạch học tập phù hợp với năng lực và mục tiêu của từng học sinh.' : 'Experts assist in creating study plans tailored to each student capability and goal.',
        },
        {
          title: isVi ? 'Hỗ trợ chọn môn' : 'Course Selection Support',
          description: isVi ? 'Tư vấn lựa chọn môn học phù hợp với ngành học tương lai, điều kiện xét tuyển đại học, khả năng học tập.' : 'Guidance on choosing courses suitable for future majors, university admission criteria, and academic capacity.',
        },
        {
          title: isVi ? 'Đồng hành xuyên suốt' : 'Continuous Guidance',
          description: isVi ? 'Theo dõi tiến độ học tập, hỗ trợ hồ sơ, tư vấn hoạt động ngoại khóa, chuẩn bị hồ sơ đại học.' : 'Track progress, support portfolios, advise on extracurriculars, and prepare university applications.',
        },
        {
          title: isVi ? 'Mở rộng cơ hội quốc tế' : 'Expand Global Opportunities',
          description: isVi ? 'OSSD giúp học sinh xây dựng nền tảng để ứng tuyển vào nhiều trường đại học tại Canada và các quốc gia khác.' : 'OSSD builds a strong foundation for applying to universities in Canada and worldwide.',
        },
      ],
    },
    learningFormatsSection: {
      title: isVi ? 'Hình thức học' : 'Learning Format',
      items: [
        { icon: 'Globe', title: isVi ? 'Chương trình chuẩn Ontario' : 'Ontario Standard Curriculum', description: isVi ? 'Nội dung đào tạo bám sát khung chương trình chính thức của Bộ Giáo dục Ontario, Canada.' : 'Curriculum strictly adheres to the official Ontario Ministry of Education framework.' },
        { icon: 'Monitor', title: isVi ? 'Môi trường học hiện đại' : 'Modern Online Environment', description: isVi ? 'Nền tảng học trực tuyến tiên tiến với đầy đủ tài nguyên học tập và công cụ tương tác.' : 'Advanced online learning platform equipped with interactive tools and rich learning resources.' },
        { icon: 'Star', title: isVi ? 'Giáo viên đạt chuẩn' : 'Certified Educators', description: isVi ? 'Đội ngũ giảng dạy được đào tạo và cấp phép theo tiêu chuẩn của tỉnh bang Ontario.' : 'Teaching staff certified and licensed according to Ontario provincial standards.' },
        { icon: 'FileText', title: isVi ? 'Đánh giá liên tục' : 'Continuous Assessment', description: isVi ? 'Học sinh được đánh giá xuyên suốt quá trình học thay vì chỉ dựa vào một kỳ thi duy nhất.' : 'Students are assessed throughout the learning process rather than relying on a single exam.' },
        { icon: 'Clock', title: isVi ? 'Học tập linh hoạt' : 'Flexible Learning', description: isVi ? 'Lộ trình cá nhân hóa, học mọi lúc mọi nơi theo kế hoạch riêng của từng học sinh.' : 'Personalized learning schedule, study anytime anywhere according to individual student plans.' },
      ],
    },
    stepsSection: {
      title: isVi ? 'Quy trình đăng ký' : 'Enrollment Process',
      steps: [
        { title: isVi ? 'Đăng ký tư vấn' : 'Register Consultation', description: isVi ? 'Liên hệ với KVC Global để được tư vấn chi tiết về chương trình OSSD và lộ trình học tập phù hợp.' : 'Contact KVC Global for detailed advice on the OSSD program and a suitable study pathway.' },
        { title: isVi ? 'Đánh giá hồ sơ' : 'Evaluate Profile', description: isVi ? 'Đội ngũ chuyên gia đánh giá học lực, hồ sơ hiện tại và mục tiêu để đưa ra định hướng tối ưu.' : 'Experts evaluate academic background, current profile, and goals to provide optimal guidance.' },
        { title: isVi ? 'Xây dựng lộ trình' : 'Build Personalized Pathway', description: isVi ? 'Thiết kế lộ trình học OSSD cá nhân hóa, lựa chọn môn học phù hợp với định hướng đại học.' : 'Design a personalized OSSD pathway selecting courses aligned with university goals.' },
        { title: isVi ? 'Hoàn tất nhập học' : 'Complete Admission', description: isVi ? 'Hoàn thiện thủ tục, kích hoạt tài khoản học tập và sẵn sàng bắt đầu hành trình OSSD.' : 'Finalize procedures, activate learning account, and prepare to begin the OSSD journey.' },
        { title: isVi ? 'Học tập & Hỗ trợ' : 'Study & Ongoing Support', description: isVi ? 'Bắt đầu chương trình với sự đồng hành xuyên suốt từ KVC Global cho đến khi hoàn thành bằng.' : 'Begin the program with continuous support from KVC Global until diploma completion.' },
      ],
    },
    parentReasonsSection: {
      title: isVi ? 'Vì sao phụ huynh lựa chọn KVC Global?' : 'Why Parents Choose KVC Global',
      items: [
        isVi ? 'Tư vấn chuyên sâu về hệ thống giáo dục Canada.' : 'In-depth consultation on the Canadian education system.',
        isVi ? 'Xây dựng lộ trình học tập cá nhân hóa.' : 'Tailored personal academic learning paths.',
        isVi ? 'Hỗ trợ lựa chọn môn học và định hướng đại học.' : 'Guidance on course selection and university direction.',
        isVi ? 'Đồng hành trong quá trình học và chuẩn bị hồ sơ du học.' : 'Continuous support during learning and study abroad application preparation.',
        isVi ? 'Kết nối với các chương trình chuyển tiếp và tuyển sinh quốc tế.' : 'Connecting with pathway programs and international admissions.',
      ],
    },
    seo: {
      title: isVi ? 'OSSD Canada — Bằng THPT Ontario | KVC Global' : 'OSSD Canada — Ontario High School Diploma | KVC Global',
      description: isVi ? 'Học OSSD Canada trực tuyến cùng KVC Global. Bằng cấp THPT chính quy tỉnh Ontario.' : 'Study OSSD Canada online with KVC Global. Official Ontario secondary diploma.',
    },
  }
}

// --------------------------------------------------
// OTHM QUALIFICATIONS DATA (VI & EN)
// --------------------------------------------------
const othmData = (lang: 'vi' | 'en') => {
  const isVi = lang === 'vi'
  return {
    _id: `online-othm-${lang}`,
    _type: 'onlineOthmPage',
    language: lang,
    heroSection: {
      parentBreadcrumb: isVi ? 'Khóa Học Online' : 'Online Courses',
      breadcrumb: isVi ? 'OTHM Anh Quốc' : 'OTHM UK',
      tagline: 'OTHM ANH QUỐC',
      title: isVi
        ? 'Học Chứng chỉ OTHM Anh Quốc trực tuyến cùng KVC Global'
        : 'OTHM UK Qualifications Online with KVC Global',
      subtitle: isVi
        ? 'Mở rộng cơ hội nghề nghiệp và học tập quốc tế với bằng cấp được công nhận toàn cầu.'
        : 'Expand career and global education opportunities with internationally recognized UK diplomas.',
      description: isVi
        ? 'KVC Global cung cấp các chương trình OTHM Qualifications theo hình thức 100% Online, phù hợp với sinh viên, người đi làm và các nhà quản lý mong muốn nâng cao trình độ chuyên môn theo tiêu chuẩn giáo dục Vương quốc Anh.'
        : 'KVC Global provides OTHM Qualifications 100% Online, suitable for students, working professionals, and managers seeking UK education standards.',
      primaryButtonLabel: isVi ? 'Đăng ký tư vấn miễn phí' : 'Book a Free Consultation',
      primaryButtonHref: '/lien-he',
    },
    introSection: {
      title: isVi ? 'OTHM là gì?' : 'What is OTHM?',
      paragraphs: [
        isVi
          ? 'OTHM (Organization for Tourism and Hospitality Management) là tổ chức cấp bằng của Vương quốc Anh, được Ofqual (Office of Qualifications and Examinations Regulation) quản lý và công nhận.'
          : 'OTHM (Organization for Tourism and Hospitality Management) is a UK awarding organization regulated by Ofqual (Office of Qualifications and Examinations Regulation).',
        isVi
          ? 'Các chương trình OTHM được thiết kế theo Khung trình độ quốc gia Anh (Regulated Qualifications Framework - RQF), giúp người học:'
          : 'OTHM programs are aligned with the UK Regulated Qualifications Framework (RQF), enabling learners to:',
      ],
      highlights: [
        isVi ? 'Sở hữu văn bằng theo tiêu chuẩn Anh Quốc.' : 'Earn UK standard regulated qualifications.',
        isVi ? 'Học trực tuyến linh hoạt.' : 'Flexible 100% online learning.',
        isVi ? 'Phát triển kỹ năng quản lý và chuyên môn.' : 'Develop management and professional skills.',
        isVi ? 'Tiết kiệm chi phí so với du học truyền thống.' : 'Cost savings compared to traditional study abroad.',
        isVi ? 'Mở rộng cơ hội thăng tiến nghề nghiệp.' : 'Expand career advancement opportunities.',
        isVi ? 'Dễ dàng chuyển tiếp lên Đại học và Thạc sĩ.' : 'Seamless top-up progression to Bachelor & Master degrees.',
      ],
      imageAlt: 'OTHM Qualifications',
    },
    whySection: {
      title: isVi ? 'Vì sao chọn KVC Global?' : 'Why Choose KVC Global?',
      items: [
        {
          icon: 'Globe',
          title: isVi ? 'Đào tạo chính hãng' : 'Official Delivery Partner',
          description: isVi ? 'KVC Global đồng hành cùng học viên trong suốt quá trình học tập với chương trình đạt chuẩn quốc tế.' : 'KVC Global accompanies learners throughout their studies with international standards.',
        },
        {
          icon: 'Star',
          title: isVi ? 'Học Online 100%' : '100% Online Learning',
          description: isVi ? 'Học mọi lúc, mọi nơi, Chủ động thời gian, Phù hợp người đi làm, Không cần đến lớp.' : 'Learn anytime, anywhere, flexible schedule, ideal for working professionals, no attendance required.',
        },
        {
          icon: 'Users',
          title: isVi ? 'Hỗ trợ học tập' : 'Learning Support',
          description: isVi ? 'Giảng viên hướng dẫn, Hỗ trợ làm Assignment, Theo dõi tiến độ học, Tư vấn lộ trình chuyển tiếp.' : 'Tutor guidance, Assignment support, progress tracking, and progression counseling.',
        },
        {
          icon: 'BookOpen',
          title: isVi ? 'Chi phí tối ưu' : 'Cost-Effective',
          description: isVi ? 'Tiết kiệm hơn nhiều so với du học trực tiếp nhưng vẫn đạt bằng cấp theo tiêu chuẩn Anh Quốc.' : 'Significantly more affordable than studying abroad directly while achieving UK qualifications.',
        },
      ],
    },
    programsSection: {
      title: isVi ? 'Các chương trình OTHM' : 'OTHM Programs',
      items: [
        {
          name: 'Level 3 Diploma in Business Management',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Communication for Business', 'The Business Environment', 'People Management', 'Customer Service', 'Finance in Business', 'Marketing'],
          entryRequirements: isVi ? 'Từ 18 tuổi trở lên.' : 'Aged 18 and above.',
        },
        {
          name: 'Level 4 Diploma in Business Management',
          duration: isVi ? '12 tháng' : '12 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Academic Writing and Research Skills', 'Business Operations', 'Communication in Business', 'Finance and Accounting', 'Leading and Managing Teams', 'Operating in a Global Context'],
          entryRequirements: isVi ? 'Từ 19 tuổi. Có bằng Level 3 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý có thể được xem xét.' : 'Aged 19+. Level 3 diploma or equivalent required.',
        },
        {
          name: 'Level 5 Diploma in Business Management',
          duration: isVi ? '12 tháng' : '12 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Principles and Concepts of Strategy', 'The Management of Human Resources', 'Marketing for Managers', 'Business Law for Managers', 'Management Accounting and Decision Making', 'Business Start-up: Conception to Market'],
          entryRequirements: isVi ? 'Có bằng Level 4 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý.' : 'Level 4 diploma or equivalent. Mature learners aged 21+ with management experience.',
        },
        {
          name: 'Level 5 Extended Diploma in Business Management',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 1, 4, 7, 10' : 'Jan, Apr, Jul, Oct',
          subjects: ['Academic Writing and Research Skills', 'Business Operations', 'Communication in Business', 'Finance and Accounting', 'Leading and Managing Teams', 'Operating in a Global Context', 'Principles and Concepts of Strategy', 'Human Resource Management', 'Marketing for Managers', 'Business Law for Managers', 'Management Accounting and Decision Making', 'Business Start-up: Conception to Market'],
          entryRequirements: isVi ? 'Có bằng Level 4 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý.' : 'Level 4 diploma or equivalent required.',
        },
        {
          name: 'Level 5 Extended Diploma Logistics, Supply Chain & Management',
          duration: isVi ? '9 tháng' : '9 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Academic Writing and Research Skills', 'Logistics and the Business Environment', 'Operations and Logistics Management', 'Finance and Accounting', 'Communication in Business', 'Leading and Managing Teams', 'Principles and Concepts of Strategy', 'Procurement and Inventory Management', 'Contract and Financial Management', 'Global Context of Supply Chains', 'Principles and Concepts of Supply Chain Management', 'Contemporary Issues in Supply Chain Management'],
          entryRequirements: isVi ? 'Có bằng Level 4 hoặc tương đương. Người trên 21 tuổi có kinh nghiệm quản lý.' : 'Level 4 diploma or equivalent required.',
        },
        {
          name: 'Level 7 Diploma Strategic Management & Leadership',
          duration: isVi ? '3–9 tháng' : '3–9 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Strategic Management', 'Strategic Leadership', 'Strategic Human Resource Management', 'Advanced Business Research Methods', 'Entrepreneurship and Innovation', 'Strategic Marketing'],
          entryRequirements: isVi ? 'Từ 21 tuổi. Có bằng đại học hoặc Level 6 tương đương. Người có kinh nghiệm quản lý cũng có thể được xem xét.' : 'Aged 21+. Bachelor degree or Level 6 equivalent required.',
        },
        {
          name: 'Level 7 Diploma Logistics, Supply Chain & Management',
          duration: isVi ? '9 tháng' : '9 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Logistics Management', 'Supply Chain Planning, Modelling and Analytics', 'Procurement and Supply Management', 'Supply Chain and Operations Strategy', 'Sustainable Operations Management', 'Business Research Methods'],
          entryRequirements: isVi ? 'Từ 21 tuổi. Có bằng đại học hoặc Level 6 tương đương. Người có kinh nghiệm quản lý cũng có thể được xem xét.' : 'Aged 21+. Bachelor degree or Level 6 equivalent required.',
        },
        {
          name: 'Level 7 Diploma Accounting & Finance',
          duration: isVi ? '9 tháng' : '9 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Investment Analysis', 'Corporate Reporting', 'Global Finance and Strategy', 'Strategic Financial Management', 'Strategic Audit', 'Business Research Methods'],
          entryRequirements: isVi ? 'Từ 21 tuổi. Có bằng đại học hoặc Level 6 tương đương. Người có kinh nghiệm quản lý cũng có thể được xem xét.' : 'Aged 21+. Bachelor degree or Level 6 equivalent required.',
        },
      ],
    },
    learningFormatsSection: {
      title: isVi ? 'Hình thức học' : 'Learning Format',
      items: [
        { icon: 'Globe', title: '100% Online', description: isVi ? 'Học mọi lúc, mọi nơi, chủ động thời gian, phù hợp người đi làm, không cần đến lớp.' : 'Learn anytime, anywhere, flexible schedule, ideal for working professionals.' },
        { icon: 'Monitor', title: isVi ? 'Nền tảng LMS hiện đại' : 'Modern LMS Platform', description: isVi ? 'Hệ thống quản lý học tập tiên tiến, giao diện thân thiện, dễ sử dụng trên mọi thiết bị.' : 'Advanced learning management system, user-friendly on any device.' },
        { icon: 'FileText', title: isVi ? 'Tài liệu điện tử đầy đủ' : 'Digital Course Materials', description: isVi ? 'Toàn bộ giáo trình, bài giảng và tài nguyên học tập được cung cấp dưới dạng số.' : 'All syllabus, lectures, and resources provided digitally.' },
        { icon: 'Star', title: isVi ? 'Đánh giá theo chuẩn Anh Quốc' : 'UK Standard Assessment', description: isVi ? 'Bài tập được thiết kế và đánh giá theo tiêu chuẩn của khung trình độ Anh Quốc (RQF).' : 'Assignments designed and assessed under UK RQF qualifications framework.' },
        { icon: 'Users', title: isVi ? 'Giảng viên hỗ trợ xuyên suốt' : 'Tutor Support Throughout', description: isVi ? 'Đội ngũ giảng viên và cố vấn học tập đồng hành, giải đáp và theo dõi tiến độ liên tục.' : 'Tutor and academic advisor guidance monitoring progress continuously.' },
      ],
    },
    targetAudienceSection: {
      title: isVi ? 'Đối tượng phù hợp' : 'Target Audience',
      items: [
        { title: isVi ? 'Sinh viên' : 'Students', description: isVi ? 'Mong muốn sở hữu bằng cấp quốc tế để tăng lợi thế cạnh tranh trên thị trường lao động.' : 'Aiming for international degrees to boost competitiveness in the job market.' },
        { title: isVi ? 'Người đi làm' : 'Working Professionals', description: isVi ? 'Cần nâng cao năng lực quản lý và chuyên môn mà không gián đoạn công việc hiện tại.' : 'Upgrading management skills without stopping current work.' },
        { title: isVi ? 'Nhà quản lý & Chủ doanh nghiệp' : 'Managers & Business Owners', description: isVi ? 'Phát triển tư duy chiến lược và kỹ năng lãnh đạo theo chuẩn quốc tế.' : 'Developing strategic thinking and leadership under global standards.' },
        { title: isVi ? 'Người có kế hoạch du học' : 'Prospective Study Abroad Students', description: isVi ? 'Chuẩn bị lộ trình chuyển tiếp lên đại học hoặc thạc sĩ tại Anh và các quốc gia khác.' : 'Preparing top-up pathways to UK Bachelor or Master degrees.' },
        { title: isVi ? 'Người cần linh hoạt' : 'Learners Needing Flexibility', description: isVi ? 'Học tập theo tiêu chuẩn Anh Quốc với thời gian và địa điểm hoàn toàn chủ động.' : 'Studying under UK standards with complete control of time and venue.' },
      ],
    },
    benefitsSection: {
      title: isVi ? 'Lợi ích khi học OTHM tại KVC Global' : 'Benefits of Studying OTHM at KVC Global',
      items: [
        {
          title: isVi ? 'Chứng chỉ chuẩn Anh Quốc' : 'UK Accredited Diploma',
          description: isVi ? 'Văn bằng được Ofqual công nhận, có giá trị quốc tế, mở ra cơ hội học tập và làm việc toàn cầu.' : 'Ofqual-regulated qualification recognized globally for work and study.',
        },
        {
          title: isVi ? 'Học trực tuyến linh hoạt' : 'Flexible Online Study',
          description: isVi ? 'Chủ động thời gian, học mọi lúc mọi nơi, phù hợp với người đi làm và sinh viên bận rộn.' : 'Learn anytime anywhere, matching busy work and study schedules.',
        },
        {
          title: isVi ? 'Nâng cao kỹ năng chuyên môn' : 'Professional Skill Advancement',
          description: isVi ? 'Phát triển năng lực quản lý và kỹ năng thực tiễn, đáp ứng yêu cầu của thị trường lao động quốc tế.' : 'Develop practical management capabilities matching international job demands.',
        },
        {
          title: isVi ? 'Tiết kiệm chi phí' : 'Cost Savings',
          description: isVi ? 'Chi phí tối ưu hơn nhiều so với du học truyền thống nhưng vẫn đạt bằng cấp theo tiêu chuẩn Anh Quốc.' : 'Highly cost-effective compared to studying abroad on campus.',
        },
        {
          title: isVi ? 'Cơ hội nghề nghiệp quốc tế' : 'Global Career Opportunities',
          description: isVi ? 'Mở rộng cánh cửa làm việc trong môi trường đa quốc gia với bằng cấp được công nhận rộng rãi.' : 'Open doors to multinational corporate environments.',
        },
        {
          title: isVi ? 'Lộ trình chuyển tiếp rõ ràng' : 'Clear Top-Up Pathway',
          description: isVi ? 'Chuyển tiếp lên Đại học và Thạc sĩ tại nhiều trường đối tác Anh Quốc và quốc tế.' : 'Direct top-up entry into UK partner Bachelor and Master degrees.',
        },
      ],
    },
    stepsSection: {
      title: isVi ? 'Quy trình đăng ký' : 'Enrollment Process',
      steps: [
        { title: isVi ? 'Đăng ký tư vấn' : 'Register Consultation', description: isVi ? 'Liên hệ với KVC Global để được tư vấn chi tiết về chương trình OTHM và lộ trình phù hợp.' : 'Contact KVC Global for advice on OTHM levels and custom pathways.' },
        { title: isVi ? 'Đánh giá hồ sơ' : 'Profile Assessment', description: isVi ? 'Đội ngũ chuyên gia đánh giá hồ sơ đầu vào, kinh nghiệm và mục tiêu học tập của bạn.' : 'Experts evaluate academic background and work experience.' },
        { title: isVi ? 'Chọn chương trình' : 'Select Program', description: isVi ? 'Tư vấn lựa chọn chương trình OTHM phù hợp với trình độ và định hướng nghề nghiệp.' : 'Select an OTHM diploma matching your career aspirations.' },
        { title: isVi ? 'Hoàn tất nhập học' : 'Complete Admission', description: isVi ? 'Hoàn thiện thủ tục, kích hoạt tài khoản và sẵn sàng bắt đầu hành trình học tập.' : 'Finalize procedures, activate account, and get ready.' },
        { title: isVi ? 'Học tập cùng KVC' : 'Study with KVC', description: isVi ? 'Bắt đầu chương trình học trực tuyến với sự đồng hành và hỗ trợ xuyên suốt từ KVC Global.' : 'Begin online study with full mentorship and support.' },
      ],
    },
    seo: {
      title: isVi ? 'Chứng chỉ OTHM Anh Quốc Online | KVC Global' : 'OTHM UK Qualifications Online | KVC Global',
      description: isVi ? 'Chương trình OTHM Level 3-7 trực tuyến chuẩn Anh Quốc.' : 'Study OTHM Level 3-7 online accredited by Ofqual UK.',
    },
  }
}

// --------------------------------------------------
// QUALIFI QUALIFICATIONS DATA (VI & EN)
// --------------------------------------------------
const qualifiData = (lang: 'vi' | 'en') => {
  const isVi = lang === 'vi'
  return {
    _id: `online-qualifi-${lang}`,
    _type: 'onlineQualifiPage',
    language: lang,
    heroSection: {
      parentBreadcrumb: isVi ? 'Khóa Học Online' : 'Online Courses',
      breadcrumb: isVi ? 'QUALIFI Anh Quốc' : 'QUALIFI UK',
      tagline: 'QUALIFI ANH QUỐC',
      title: isVi
        ? 'Học Chứng chỉ QUALIFI Anh Quốc trực tuyến cùng KVC Global'
        : 'QUALIFI UK Qualifications Online with KVC Global',
      subtitle: isVi
        ? 'Nâng tầm sự nghiệp với bằng cấp quốc tế được công nhận toàn cầu.'
        : 'Elevate your career with globally recognized UK diplomas.',
      description: isVi
        ? 'KVC Global mang đến các chương trình đào tạo QUALIFI theo hình thức 100% Online, giúp học viên học tập linh hoạt, tiết kiệm chi phí và mở rộng cơ hội chuyển tiếp đại học, thạc sĩ tại Anh Quốc và nhiều quốc gia khác.'
        : 'KVC Global provides QUALIFI programs 100% Online for flexible, affordable learning with UK university progression.',
      primaryButtonLabel: isVi ? 'Đăng ký tư vấn miễn phí' : 'Book a Free Consultation',
      primaryButtonHref: '/lien-he',
    },
    introSection: {
      title: isVi ? 'QUALIFI là gì?' : 'What is QUALIFI?',
      paragraphs: [
        isVi
          ? 'QUALIFI là tổ chức cấp bằng uy tín của Vương quốc Anh, được Ofqual (Office of Qualifications and Examinations Regulation) quản lý và công nhận.'
          : 'QUALIFI is a recognized UK awarding organization regulated by Ofqual.',
        isVi
          ? 'Các chương trình của QUALIFI được thiết kế theo chuẩn RQF, giúp học viên nâng cao kiến thức chuyên môn và dễ dàng chuyển tiếp vào các trường đại học tại Anh Quốc cũng như trên toàn thế giới.'
          : 'QUALIFI diplomas adhere to RQF standards, enabling seamless entry to UK and global universities.',
      ],
      highlights: [
        isVi ? 'Văn bằng được Ofqual công nhận.' : 'Ofqual-regulated qualifications.',
        isVi ? 'Học trực tuyến linh hoạt 100%.' : '100% flexible online study.',
        isVi ? 'Lộ trình chuyển tiếp Cử nhân và Thạc sĩ.' : 'Bachelor & Master top-up progression.',
      ],
      imageAlt: 'QUALIFI Qualifications',
    },
    whySection: {
      title: isVi ? 'Vì sao chọn KVC Global?' : 'Why Choose KVC Global?',
      items: [
        {
          icon: 'Globe',
          title: isVi ? 'Đối tác đào tạo chuyên nghiệp' : 'Professional Training Partner',
          description: isVi ? 'KVC Global đồng hành cùng học viên trong suốt quá trình học tập với đội ngũ tư vấn giàu kinh nghiệm.' : 'KVC Global guides learners with an experienced academic advisory team.',
        },
        {
          icon: 'Star',
          title: isVi ? 'Học Online 100%' : '100% Online',
          description: isVi ? 'Học mọi lúc, mọi nơi. Không cần đến lớp. Chủ động thời gian. Phù hợp người đi làm.' : 'Study anytime, anywhere. No classroom attendance. Flexible schedule.',
        },
        {
          icon: 'Users',
          title: isVi ? 'Giảng viên hỗ trợ' : 'Tutor Support',
          description: isVi ? 'Hướng dẫn làm Assignment. Theo sát tiến độ học tập. Giải đáp nhanh chóng.' : 'Assignment guidance, progress tracking, and prompt Q&A support.',
        },
        {
          icon: 'TrendingUp',
          title: isVi ? 'Chi phí hợp lý' : 'Affordable Cost',
          description: isVi ? 'Tiết kiệm đáng kể so với du học trực tiếp nhưng vẫn sở hữu bằng cấp theo tiêu chuẩn Anh Quốc.' : 'Significant savings compared to studying abroad while gaining UK degrees.',
        },
      ],
    },
    progressionSection: {
      title: isVi ? 'Cơ hội học tiếp' : 'Progression Opportunities',
      body: isVi
        ? 'Hoàn thành các chứng chỉ QUALIFI mở ra cơ hội chuyển tiếp lên các chương trình Cử nhân (Top-up) và Thạc sĩ (MBA/MSc) tại nhiều trường đại học hàng đầu tại Anh Quốc và quốc tế.'
        : 'Completing QUALIFI diplomas opens direct entry into Bachelor Top-up and Master (MBA/MSc) programs worldwide.',
      tags: ['Level 4 & 5 -> Year 3 Bachelor Top-up', 'Level 7 -> MBA / MSc Dissertation Top-up'],
      noteTitle: isVi ? 'Tiết kiệm chi phí tối đa' : 'Maximum Cost Savings',
      noteBody: isVi ? 'Hình thức chuyển tiếp giúp học viên tiết kiệm tới 70% chi phí so với du học toàn thời gian tại Anh Quốc.' : 'The Top-up progression pathway saves up to 70% compared to full-time UK studying abroad.',
      imageAlt: 'QUALIFI University Progression',
    },
    programsSection: {
      title: isVi ? 'Các chương trình QUALIFI' : 'QUALIFI Programs',
      items: [
        {
          name: 'Level 3 Diploma in Accounting & Finance',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Financial Transactions Record-keeping', 'Cost and Management Information', 'Financial Records Maintenance'],
          entryRequirements: isVi ? 'Từ 18 tuổi trở lên.' : 'Aged 18 and above.',
        },
        {
          name: 'Level 4 Diploma in Accounting & Finance',
          duration: isVi ? '12 tháng' : '12 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Accounting in a Business Context', 'Economics for Business', 'Mathematical Accounting Methods', 'Financial Accounting', 'Management Accounting', 'Leadership and Management in Accounting'],
          entryRequirements: isVi ? 'Từ 19 tuổi trở lên.' : 'Aged 19 and above.',
        },
        {
          name: 'Level 5 Diploma in Accounting & Finance',
          duration: isVi ? '12 tháng' : '12 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Financial Management', 'Financial Planning and Control', 'Financial Reporting', 'Principles and Practices of Taxation', 'Management of People', 'Ethics and Corporate Responsibility in Business'],
          entryRequirements: isVi ? 'Từ 20 tuổi trở lên.' : 'Aged 20 and above.',
        },
        {
          name: 'Level 5 Extended Diploma in Accounting & Finance',
          duration: isVi ? '12 tháng' : '12 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Accounting in a Business Context', 'Economics for Business', 'Mathematical Accounting Methods', 'Financial Accounting', 'Management Accounting', 'Leadership and Management in Accounting', 'Financial Management', 'Financial Planning and Control', 'Financial Reporting', 'Principles and Practices of Taxation', 'Management of People', 'Ethics and Corporate Responsibility in Business'],
          entryRequirements: isVi ? 'Từ 20 tuổi trở lên.' : 'Aged 20 and above.',
        },
        {
          name: 'Level 7 Diploma in Accounting & Finance',
          duration: isVi ? '9 tháng' : '9 months',
          startDates: isVi ? 'Tháng 2, 4, 6, 8, 10, 12' : 'Feb, Apr, Jun, Aug, Oct, Dec',
          subjects: ['Strategy and Global Finance', 'Strategic Financial Management', 'Strategic Auditing', 'Ethical Behaviour and Corporate Governance', 'Corporate Reporting', 'Financial Analyst'],
          entryRequirements: isVi ? 'Từ 21 tuổi trở lên.' : 'Aged 21 and above.',
        },
        {
          name: 'Level 7 Diploma in Strategic Management & Leadership',
          duration: isVi ? '3–9 tháng' : '3–9 months',
          startDates: isVi ? 'Tháng 2, 4, 6, 8, 10, 12' : 'Feb, Apr, Jun, Aug, Oct, Dec',
          subjects: ['Information Management and Strategic Decision Taking', 'Manage Team Performance to Support Strategy', 'Strategic Direction', 'Leading a Strategic Management Project', 'Strategic Planning', 'Development as a Strategic Manager', 'Finance for Managers', 'Strategic Marketing'],
          entryRequirements: isVi ? 'Từ 21 tuổi trở lên.' : 'Aged 21 and above.',
        },
      ],
    },
    learningFormatsSection: {
      title: isVi ? 'Hình thức học' : 'Learning Format',
      items: [
        { icon: 'Globe', title: '100% Online', description: isVi ? 'Học mọi lúc, mọi nơi, chủ động thời gian, phù hợp người đi làm, không cần đến lớp.' : 'Learn anytime, anywhere, flexible schedule, ideal for working professionals.' },
        { icon: 'FileText', title: isVi ? 'Tài liệu điện tử' : 'Digital Materials', description: isVi ? 'Toàn bộ giáo trình, bài giảng và tài nguyên học tập được cung cấp dưới dạng số, truy cập dễ dàng.' : 'All textbooks and resources accessible digitally.' },
        { icon: 'Monitor', title: isVi ? 'Hệ thống LMS' : 'LMS System', description: isVi ? 'Nền tảng quản lý học tập hiện đại, giao diện thân thiện, hỗ trợ học tập trên mọi thiết bị.' : 'Modern LMS platform supported across all devices.' },
        { icon: 'Star', title: isVi ? 'Đánh giá qua Assignment' : 'Assignment Based', description: isVi ? 'Hình thức đánh giá linh hoạt thông qua bài tập thay vì thi viết truyền thống (tùy chương trình).' : 'Evaluated flexibly via assignments rather than written exams.' },
        { icon: 'Users', title: isVi ? 'Hỗ trợ trực tuyến' : 'Online Support', description: isVi ? 'Đội ngũ giảng viên và cố vấn học tập luôn sẵn sàng hỗ trợ, giải đáp thắc mắc kịp thời.' : 'Tutors and academic advisors ready to help prompt.' },
      ],
    },
    targetAudienceSection: {
      title: isVi ? 'Đối tượng phù hợp' : 'Target Audience',
      items: [
        { title: isVi ? 'Sinh viên' : 'Students', description: isVi ? 'Mong muốn sở hữu bằng cấp quốc tế được công nhận rộng rãi để khởi đầu sự nghiệp thuận lợi.' : 'Seeking globally recognized UK diplomas for a career headstart.' },
        { title: isVi ? 'Người đi làm' : 'Working Professionals', description: isVi ? 'Cần nâng cao trình độ chuyên môn và kỹ năng thực tiễn mà không phải tạm dừng công việc.' : 'Upgrading professional skills without interrupting current jobs.' },
        { title: isVi ? 'Chủ doanh nghiệp' : 'Business Owners', description: isVi ? 'Phát triển năng lực quản lý và tư duy chiến lược để dẫn dắt doanh nghiệp vươn xa.' : 'Building strategic leadership to expand business growth.' },
        { title: isVi ? 'Người có kế hoạch du học' : 'Study Abroad Candidates', description: isVi ? 'Chuẩn bị nền tảng vững chắc để chuyển tiếp lên các chương trình tại Anh và quốc tế.' : 'Building a solid foundation for UK degree top-up.' },
        { title: isVi ? 'Người cần linh hoạt' : 'Flexible Learners', description: isVi ? 'Học tập đạt chuẩn giáo dục Anh Quốc với lịch trình hoàn toàn chủ động và cá nhân hóa.' : 'Study under UK education standards with personalized scheduling.' },
      ],
    },
    benefitsSection: {
      title: isVi ? 'Lợi ích khi học QUALIFI tại KVC Global' : 'Benefits of Studying QUALIFI at KVC Global',
      items: [
        {
          title: isVi ? 'Chứng chỉ chuẩn Anh Quốc' : 'UK Standard Diploma',
          description: isVi ? 'Văn bằng được Ofqual công nhận và quản lý, đảm bảo chất lượng theo khung trình độ Anh Quốc (RQF).' : 'Ofqual-regulated qualification ensuring UK RQF framework quality.',
        },
        {
          title: isVi ? 'Học tập linh hoạt' : 'Flexible Learning',
          description: isVi ? 'Chủ động sắp xếp thời gian học, phù hợp với lịch trình cá nhân và công việc bận rộn.' : 'Schedule learning around personal and work routines.',
        },
        {
          title: isVi ? 'Phù hợp người đi làm' : 'Ideal for Professionals',
          description: isVi ? 'Thiết kế dành riêng cho người vừa học vừa làm, không cần đến lớp, không gián đoạn công việc.' : 'Tailored for working learners without job interruption.',
        },
        {
          title: isVi ? 'Tiết kiệm chi phí' : 'Cost Savings',
          description: isVi ? 'Chi phí hợp lý, tiết kiệm đáng kể so với du học trực tiếp nhưng vẫn sở hữu bằng cấp quốc tế.' : 'Reasonable costs with major savings over study abroad.',
        },
        {
          title: isVi ? 'Cơ hội nghề nghiệp rộng mở' : 'Broad Career Opportunities',
          description: isVi ? 'Nâng cao năng lực cạnh tranh, mở rộng cơ hội thăng tiến trong môi trường làm việc quốc tế.' : 'Enhance competitiveness for promotion in global firms.',
        },
        {
          title: isVi ? 'Lộ trình chuyển tiếp đại học' : 'University Top-Up Pathway',
          description: isVi ? 'Đủ điều kiện chuyển tiếp lên các chương trình Cử nhân và Thạc sĩ tại nhiều trường đối tác.' : 'Eligible for direct entry into Bachelor and Master top-ups.',
        },
      ],
    },
    stepsSection: {
      title: isVi ? 'Quy trình đăng ký' : 'Enrollment Process',
      steps: [
        { title: isVi ? 'Đăng ký tư vấn' : 'Register Consultation', description: isVi ? 'Liên hệ với KVC Global để được tư vấn chi tiết về chương trình QUALIFI và định hướng học tập.' : 'Contact KVC Global for detailed advice on QUALIFI pathways.' },
        { title: isVi ? 'Đánh giá hồ sơ' : 'Evaluate Profile', description: isVi ? 'Đội ngũ chuyên gia đánh giá trình độ, kinh nghiệm và mục tiêu để đưa ra lời khuyên phù hợp.' : 'Experts evaluate qualifications and career objectives.' },
        { title: isVi ? 'Chọn chương trình' : 'Select Program', description: isVi ? 'Lựa chọn chương trình QUALIFI phù hợp với năng lực và kế hoạch phát triển sự nghiệp.' : 'Choose a QUALIFI level aligned with career plans.' },
        { title: isVi ? 'Hoàn tất nhập học' : 'Complete Admission', description: isVi ? 'Hoàn thiện thủ tục đăng ký, kích hoạt tài khoản học tập trên nền tảng trực tuyến.' : 'Finalize registration and activate LMS account.' },
        { title: isVi ? 'Bắt đầu học tập' : 'Start Learning', description: isVi ? 'Khởi đầu hành trình học trực tuyến với sự hỗ trợ liên tục từ giảng viên và cố vấn học tập.' : 'Begin online study with ongoing tutor support.' },
      ],
    },
    seo: {
      title: isVi ? 'Chứng chỉ QUALIFI Anh Quốc | KVC Global' : 'QUALIFI UK Qualifications | KVC Global',
      description: isVi ? 'Chương trình QUALIFI chuẩn Ofqual Anh Quốc trực tuyến.' : 'QUALIFI UK regulated online diploma programs.',
    },
  }
}

// --------------------------------------------------
// UNIVERSITY OF WOLVERHAMPTON DATA (VI & EN)
// --------------------------------------------------
const wolverhamptonData = (lang: 'vi' | 'en') => {
  const isVi = lang === 'vi'
  return {
    _id: `online-wolverhampton-${lang}`,
    _type: 'onlineWolverhamptonPage',
    language: lang,
    heroSection: {
      parentBreadcrumb: isVi ? 'Khóa Học Online' : 'Online Courses',
      breadcrumb: isVi ? 'University of Wolverhampton' : 'University of Wolverhampton',
      tagline: 'UNIVERSITY OF WOLVERHAMPTON',
      title: isVi
        ? 'Học Đại học và Thạc sĩ Anh Quốc 100% Online cùng University of Wolverhampton'
        : 'Study UK Bachelor & Master 100% Online with University of Wolverhampton',
      subtitle: isVi
        ? 'Nhận bằng cấp chính quy từ một trường đại học công lập Vương quốc Anh với hình thức học linh hoạt, phù hợp cho người đi làm và sinh viên quốc tế.'
        : 'Earn an official UK degree from a public university with flexible online learning.',
      description: isVi
        ? 'KVC Global đồng hành cùng học viên trong chương trình chuyển tiếp và Top-up trực tuyến của Đại học Wolverhampton, giúp tối ưu hóa thời gian và chi phí học tập.'
        : 'KVC Global guides students through online Top-up and degree programs at Wolverhampton.',
      primaryButtonLabel: isVi ? 'Đăng ký tư vấn miễn phí' : 'Book a Free Consultation',
      primaryButtonHref: '/lien-he',
    },
    introSection: {
      title: isVi ? 'Giới thiệu về University of Wolverhampton' : 'About University of Wolverhampton',
      paragraphs: [
        isVi
          ? 'University of Wolverhampton là trường đại học công lập hàng đầu tại Anh Quốc với lịch sử đào tạo hơn 190 năm. Trường được công nhận rộng rãi về chất lượng giảng dạy và tính ứng dụng thực tiễn trong các chương trình đào tạo.'
          : 'University of Wolverhampton is a leading UK public university with over 190 years of educational heritage.',
        isVi
          ? 'Chương trình trực tuyến của trường mang lại cơ hội sở hữu bằng cấp chính quy cho học viên trên toàn cầu mà không cần di chuyển hay tạm dừng công việc.'
          : 'Its online programs offer official UK degrees to global students without leaving home or work.',
      ],
      imageAlt: 'University of Wolverhampton',
    },
    whySection: {
      title: isVi ? 'Vì sao chọn University of Wolverhampton?' : 'Why Choose University of Wolverhampton?',
      items: [
        { icon: 'Globe', title: isVi ? 'Bằng cấp chính quy' : 'Official Degree', description: isVi ? 'Bằng cấp được cấp trực tiếp bởi trường đại học Anh Quốc.' : 'Degree awarded directly by the UK public university.' },
        { icon: 'Star', title: isVi ? 'Công nhận quốc tế' : 'Internationally Recognized', description: isVi ? 'Chương trình học được công nhận quốc tế.' : 'Curriculum recognized worldwide.' },
        { icon: 'Clock', title: isVi ? 'Học trực tuyến linh hoạt' : 'Flexible Online Study', description: isVi ? 'Phù hợp người đi làm.' : 'Designed around working professionals schedules.' },
        { icon: 'Users', title: isVi ? 'Giảng viên giàu kinh nghiệm' : 'Experienced Faculty', description: isVi ? 'Đội ngũ giảng viên giàu kinh nghiệm.' : 'Taught by experienced UK academics.' },
        { icon: 'Building2', title: isVi ? 'Ứng dụng thực tiễn' : 'Practical Focus', description: isVi ? 'Chương trình tập trung vào ứng dụng thực tiễn.' : 'Practical application oriented curriculum.' },
        { icon: 'Globe', title: isVi ? 'Cộng đồng quốc tế' : 'Global Community', description: isVi ? 'Cộng đồng sinh viên đến từ hơn 130 quốc gia.' : 'Student network spanning over 130 countries.' },
      ],
    },
    supportSection: {
      title: isVi ? 'KVC Global đồng hành cùng bạn như thế nào?' : 'How KVC Global Supports You',
      items: [
        isVi ? 'Tư vấn lựa chọn chương trình phù hợp.' : 'Advising on suitable program options.',
        isVi ? 'Hỗ trợ hồ sơ nhập học.' : 'Assisting with admission documentation.',
        isVi ? 'Hướng dẫn học tập trực tuyến.' : 'Guiding online learning orientation.',
        isVi ? 'Theo dõi tiến độ học.' : 'Tracking academic progress.',
        isVi ? 'Hỗ trợ thực hiện luận văn (Dissertation).' : 'Supporting dissertation research and writing.',
        isVi ? 'Đồng hành cho đến khi nhận bằng.' : 'Guiding continuously until graduation.',
      ],
    },
    programsSection: {
      title: isVi ? 'Các chương trình đào tạo' : 'Degree Programs',
      items: [
        {
          name: 'BA (Hons) Business Management',
          duration: isVi ? '12 tháng' : '12 months',
          startDates: isVi ? 'Tháng 1, 5, 9' : 'Jan, May, Sep',
          subjects: ['Organisational Behavior', 'The Business Communicator', 'The Professional Project', 'The Strategic Business'],
          entryRequirements: isVi ? 'Có bằng Cao đẳng / Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.' : 'Recognized Diploma / Associate degree or equivalent.',
        },
        {
          name: 'MBA – Master of Business Administration',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 1, 3, 5, 7, 9, 11' : 'Jan, Mar, May, Jul, Sep, Nov',
          subjects: ['Proposal', 'Dissertation', 'Reflective Paper'],
          entryRequirements: isVi ? 'Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.' : 'Recognized Bachelor degree or Level 7 diploma.',
        },
        {
          name: 'MSc Psychology - Master of Science in Psychology',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 3, 5, 10' : 'Mar, May, Oct',
          subjects: ['Proposal', 'Dissertation', 'Reflective Paper'],
          entryRequirements: isVi ? 'Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.' : 'Recognized Bachelor degree in relevant field.',
        },
        {
          name: 'MSc Project Management - Master of Science in Project Management',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 1, 9' : 'Jan, Sep',
          subjects: ['Financial Management of Projects', 'Dissertation'],
          entryRequirements: isVi ? 'Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.' : 'Recognized Bachelor degree or project management background.',
        },
        {
          name: 'MSc Accounting & Finance - Master of Science in Accounting and Finance',
          duration: isVi ? '6 tháng' : '6 months',
          startDates: isVi ? 'Tháng 1, 5, 9' : 'Jan, May, Sep',
          subjects: ['Proposal', 'Dissertation'],
          entryRequirements: isVi ? 'Có bằng Đại học hoặc Sau đại học được công nhận (hoặc văn bằng tương đương). Hoặc có trình độ cao hơn bằng Cử nhân danh dự (Honours) theo hệ thống giáo dục Vương quốc Anh.' : 'Recognized Bachelor degree in Accounting & Finance or Level 7 diploma.',
        },
      ],
    },
    learningFormatsSection: {
      title: isVi ? 'Hình thức học' : 'Learning Format',
      items: [
        { icon: 'Globe', title: '100% Online', description: isVi ? 'Học hoàn toàn trực tuyến, không cần đến lớp, chủ động thời gian và địa điểm học tập.' : 'Fully online study without classroom attendance.' },
        { icon: 'Clock', title: isVi ? 'Học mọi lúc, mọi nơi' : 'Learn Anytime, Anywhere', description: isVi ? 'Linh hoạt sắp xếp lịch học theo thời gian biểu cá nhân, phù hợp với người đi làm.' : 'Flexible scheduling for working professionals.' },
        { icon: 'FileText', title: isVi ? 'Tài liệu học tập điện tử' : 'Digital Learning Resources', description: isVi ? 'Toàn bộ giáo trình, bài giảng và tài nguyên được cung cấp qua nền tảng trực tuyến.' : 'Full digital syllabus and library materials.' },
        { icon: 'Users', title: isVi ? 'Giảng viên hướng dẫn' : 'Academic Tutor Guidance', description: isVi ? 'Đội ngũ giảng viên giàu kinh nghiệm hướng dẫn và hỗ trợ trực tuyến trong suốt khóa học.' : 'Experienced UK tutors guiding throughout.' },
        { icon: 'Star', title: isVi ? 'Đánh giá đa dạng' : 'Comprehensive Evaluation', description: isVi ? 'Kết hợp bài tập, dự án và luận văn theo từng chương trình để đánh giá toàn diện năng lực.' : 'Portfolio, projects, and dissertation based evaluation.' },
      ],
    },
    targetAudienceSection: {
      title: isVi ? 'Đối tượng phù hợp' : 'Target Audience',
      items: [
        { title: isVi ? 'Người đã tốt nghiệp đại học' : 'University Graduates', description: isVi ? 'Mong muốn nâng cao trình độ với bằng cấp chính quy từ trường đại học công lập Anh Quốc.' : 'Seeking official postgraduate degrees from UK public university.' },
        { title: isVi ? 'Nhà quản lý & Lãnh đạo' : 'Managers & Leaders', description: isVi ? 'Phát triển năng lực quản trị và tư tư duy chiến lược để dẫn dắt tổ chức trong môi trường toàn cầu.' : 'Building executive leadership and global strategic thinking.' },
        { title: isVi ? 'Người đi làm' : 'Working Professionals', description: isVi ? 'Cần bằng cấp quốc tế để thăng tiến sự nghiệp mà không phải tạm dừng công việc hiện tại.' : 'Requiring UK degrees for promotion without stopping work.' },
        { title: isVi ? 'Học viên hướng quốc tế' : 'Globally Oriented Learners', description: isVi ? 'Có kế hoạch làm việc hoặc học tập trong môi trường đa quốc gia, cần bằng cấp được công nhận rộng rãi.' : 'Aiming for multinational corporate roles.' },
        { title: isVi ? 'Người cần linh hoạt' : 'Flexible Learners', description: isVi ? 'Chương trình học trực tuyến đảm bảo chất lượng giáo dục Anh Quốc với lịch trình cá nhân hóa.' : 'Studying under UK quality framework with personalized pacing.' },
      ],
    },
    benefitsSection: {
      title: isVi ? 'Lợi ích khi học cùng University of Wolverhampton' : 'Benefits of Studying with Wolverhampton',
      items: [
        {
          title: isVi ? 'Bằng cấp chính quy trực tiếp' : 'Direct Official UK Degree',
          description: isVi ? 'Bằng được cấp trực tiếp bởi University of Wolverhampton, trường đại học công lập với hơn 190 năm lịch sử.' : 'Directly awarded by University of Wolverhampton with 190+ years of history.',
        },
        {
          title: isVi ? 'Chuẩn giáo dục Anh Quốc' : 'UK Quality Education',
          description: isVi ? 'Chương trình đào tạo bám sát khung tiêu chuẩn giáo dục Vương quốc Anh, được công nhận toàn cầu.' : 'Curriculum strictly adheres to UK quality standards recognized globally.',
        },
        {
          title: isVi ? 'Học tập linh hoạt' : 'Flexible Online Learning',
          description: isVi ? '100% trực tuyến, chủ động thời gian, không gián đoạn công việc hiện tại.' : '100% online, flexible scheduling, no career interruption.',
        },
        {
          title: isVi ? 'Phát triển năng lực toàn diện' : 'Holistic Capability Building',
          description: isVi ? 'Nâng cao kỹ năng quản lý, nghiên cứu và chuyên môn thông qua chương trình học ứng dụng thực tiễn.' : 'Enhance management, research, and practical expertise.',
        },
        {
          title: isVi ? 'Cơ hội thăng tiến quốc tế' : 'Global Career Advancement',
          description: isVi ? 'Gia tăng lợi thế cạnh tranh, mở rộng cơ hội làm việc trong môi trường đa quốc gia.' : 'Gain competitive advantages in multinational corporate settings.',
        },
        {
          title: isVi ? 'Tiết kiệm chi phí tối đa' : 'Maximum Financial Savings',
          description: isVi ? 'Tiết kiệm đáng kể so với du học toàn thời gian, không mất chi phí sinh hoạt tại nước ngoài.' : 'Save expenses compared to full-time UK living and studying on campus.',
        },
      ],
    },
    stepsSection: {
      title: isVi ? 'Quy trình đăng ký' : 'Enrollment Process',
      steps: [
        { title: isVi ? 'Đăng ký tư vấn' : 'Register Consultation', description: isVi ? 'Liên hệ với KVC Global để được tư vấn chi tiết về chương trình của University of Wolverhampton.' : 'Contact KVC Global for detailed advice on Wolverhampton degrees.' },
        { title: isVi ? 'Đánh giá hồ sơ' : 'Evaluate Profile', description: isVi ? 'Đội ngũ chuyên gia đánh giá hồ sơ học thuật, bằng cấp và kinh nghiệm làm việc của bạn.' : 'Experts evaluate academic credentials and work experience.' },
        { title: isVi ? 'Chuẩn bị hồ sơ' : 'Prepare Application', description: isVi ? 'Hỗ trợ chuẩn bị và hoàn thiện hồ sơ nhập học theo yêu cầu của University of Wolverhampton.' : 'Assist in completing admission files according to university requirements.' },
        { title: isVi ? 'Nhận thư mời' : 'Receive Offer Letter', description: isVi ? 'Nhận thư mời nhập học chính thức từ trường và hoàn tất các thủ tục cần thiết.' : 'Receive official offer letter from University of Wolverhampton.' },
        { title: isVi ? 'Bắt đầu học tập' : 'Begin Studies', description: isVi ? 'Khởi đầu chương trình học trực tuyến, nhận bằng cấp chính quy từ trường đại học công lập Anh Quốc.' : 'Start your online degree program from the UK public university.' },
      ],
    },
    seo: {
      title: isVi ? 'University of Wolverhampton Online | KVC Global' : 'University of Wolverhampton Online | KVC Global',
      description: isVi ? 'Học Cử nhân và Thạc sĩ Wolverhampton trực tuyến.' : 'Study University of Wolverhampton Bachelor & Master online.',
    },
  }
}

async function runSeed() {
  console.log('--- Starting Complete Seeding with Unique Array Item Keys ---')
  await createOrReplaceDoc(ossdData('vi'))
  await createOrReplaceDoc(ossdData('en'))
  await createOrReplaceDoc(othmData('vi'))
  await createOrReplaceDoc(othmData('en'))
  await createOrReplaceDoc(qualifiData('vi'))
  await createOrReplaceDoc(qualifiData('en'))
  await createOrReplaceDoc(wolverhamptonData('vi'))
  await createOrReplaceDoc(wolverhamptonData('en'))
  console.log('--- Seeding with Unique Keys Finished Successfully! ---')
}

runSeed().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
