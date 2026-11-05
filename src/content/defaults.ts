import { site as staticSite, navigation as staticNav, footerLinks } from "@/data/site";
import { notices, noticeCategories } from "@/data/notices";
import { news, newsCategories } from "@/data/news";
import { teachers, departments } from "@/data/teachers";
import { gallery, galleryCategories } from "@/data/gallery";
import { downloads } from "@/data/downloads";
import { faqs, testimonials } from "@/data/faqs";
import { academicLevels, examSystem, gradingScale, policies, sampleRoutine, subjectsByLevel } from "@/data/academics";
import { admissionDates, admissionSteps, admissionYear, classOptions, eligibility, fees, requiredDocuments } from "@/data/admission";
import { calendarEvents, calendarTypeLabel } from "@/data/calendar";
import { boardSummary, examSchedule, mockResults } from "@/data/results";
import { images } from "@/data/images";
import { slugify } from "@/lib/utils";

const extraPolicies = [
  {
    id: "assessment",
    title: "Assessment & promotion",
    points: [
      "Promotion is based on annual examination results together with continuous assessment and attendance.",
      "Students who miss an examination for medical reasons must submit a doctor's certificate within three days.",
      "Re-examination is not held for absence without a valid reason.",
    ],
  },
  {
    id: "safety",
    title: "Safety & wellbeing",
    points: [
      "Gates are supervised during arrival and dismissal; visitors sign in at the office.",
      "A first-aid room is open during school hours, and guardians are called for any injury or illness.",
      "Students can speak privately to the class teacher or the assistant head teacher about any concern.",
    ],
  },
];

/**
 * Default content, the content the website shipped with. Used as the
 * fallback when no database is configured and as seed data when the CMS is
 * first set up, so the live site looks the same before and after.
 */

export const singletonDefaults: Record<string, Record<string, unknown>> = {
  homepage: {
    heroTagline: staticSite.tagline,
    heroTitle: "Webnion School & College",
    heroSubtitle: "Play to Class 12 · NCTB curriculum · Upashahar, Sylhet · Est. 1998",
    heroNote: "Admission for 2027 is open until 3 December.",
    heroImage: images.heroCampus.src,
    heroImageAlt: images.heroCampus.alt,
    heroCaption: "",
    primaryLabel: "Admission 2027",
    primaryHref: "/admission",
    secondaryLabel: "About the school",
    secondaryHref: "/about",
    welcomeTitle: "About the school",
    welcomeText: [
      "Webnion School & College began in 1998 as a small primary school in Upashahar with four classrooms and a single shift. Today it teaches from Play to Class 12 in two shifts, with separate primary, secondary and higher secondary sections.",
      "Classes follow the national curriculum and NCTB textbooks. Every section has a class teacher who keeps in touch with guardians.",
    ],
    welcomePoints: [
      "Class teacher follow-up for every section",
      "Separate study hall for SSC & HSC candidates",
      "Guardian meetings every term",
      "Science, ICT and library periods in the routine",
    ],
    sections: [
      { key: "notices", enabled: true, kicker: "", title: "Notice board", description: "" },
      { key: "welcome", enabled: true, kicker: "", title: "About the school", description: "" },
      { key: "levels", enabled: true, kicker: "", title: "Classes and sections", description: "" },
      { key: "results", enabled: true, kicker: "", title: "Public examination results", description: "" },
      { key: "facilities", enabled: true, kicker: "", title: "Facilities", description: "" },
      { key: "news", enabled: true, kicker: "", title: "News & events", description: "" },
      { key: "gallery", enabled: true, kicker: "", title: "Photo gallery", description: "" },
      { key: "people", enabled: true, kicker: "", title: "Teachers", description: "" },
      { key: "faq", enabled: true, kicker: "", title: "Frequently asked questions", description: "" },
    ],
  },
  site: {
    name: staticSite.name,
    nameBn: staticSite.nameBn,
    shortName: staticSite.shortName,
    established: staticSite.established,
    tagline: staticSite.tagline,
    taglineBn: staticSite.taglineBn,
    eiin: staticSite.eiin,
    address: staticSite.address,
    addressBn: staticSite.addressBn,
    area: "Upashahar, Sylhet",
    phone: staticSite.phone,
    officePhone: staticSite.officePhone,
    email: staticSite.email,
    admissionEmail: staticSite.admissionEmail,
    officeHours: staticSite.officeHours,
    officeHoursBn: staticSite.officeHoursBn,
    mapUrl: "",
    demoNote: staticSite.demoNote,
  },
  social: { links: staticSite.social.map((s) => ({ ...s })) },
  branding: { logo: "", favicon: "", primary: "#172c4a", accent: "#0c7351" },
  seo: {
    title: `${staticSite.name} | Sylhet`,
    description:
      "Webnion School & College, Sylhet, Play to Class 12 under the national curriculum. Admission, notices, results, academic calendar and campus life.",
    keywords: ["school in Sylhet", "college in Sylhet", "admission", "SSC", "HSC", "Bangladesh school"],
    ogImage: "",
    siteUrl: "https://webnion-school-college.vercel.app",
  },
  maintenance: {
    enabled: false,
    title: "We'll be back shortly",
    message: "The website is being updated. Please check back soon or call the school office.",
  },
  navigation: {
    ctaLabel: "Apply Now",
    ctaHref: "/admission#apply",
    items: staticNav.map((n) => ({ label: n.label, href: n.href, children: (n.children ?? []).map((c) => ({ ...c, description: c.description ?? "" })) })),
  },
  footer: {
    about: "A school and college in Sylhet offering Play to Class 12 under the national curriculum, with morning and day shifts.",
    quickTitle: "Quick links",
    quick: footerLinks.quick,
    institutionTitle: "Institution",
    institution: footerLinks.institution,
    helpTitle: "Help",
    help: footerLinks.help,
    copyright: "All rights reserved.",
  },
  about: {
    overview: [
      "Webnion School & College is a non-government school and college in Upashahar, Sylhet, teaching from Play to Class 12. The primary section runs in the morning shift; the secondary section has morning and day shifts; and the higher secondary section offers Science, Business Studies and Humanities.",
      "The institution follows the national curriculum and textbooks of the National Curriculum and Textbook Board (NCTB). Students sit the SSC and HSC public examinations under the education board.",
    ],
    overviewImage: images.students.src,
    milestones: [
      { year: "1998", text: "Founded as a primary school in Upashahar with four classrooms and 120 students." },
      { year: "2003", text: "Secondary section opened; first Class 6 batch admitted." },
      { year: "2008", text: "First SSC batch sat the public examination." },
      { year: "2012", text: "Higher secondary section (Class 11–12) added with Science, Business Studies and Humanities." },
      { year: "2017", text: "New four-storey academic building and separate science laboratories completed." },
      { year: "2021", text: "Day shift introduced for Class 6–10 to reduce section sizes." },
      { year: "2026", text: "ICT lab upgraded with 30 student workstations." },
    ],
    committee: [
      { role: "Chairman", name: "Alhaj Md. Shamsul Haque", note: "Guardian representative" },
      { role: "Member Secretary", name: "Dr. Nasrin Akhter", note: "Principal" },
      { role: "Guardian member", name: "Shirin Sultana", note: "Elected guardian representative" },
      { role: "Guardian member", name: "Abdul Matin Chowdhury", note: "Elected guardian representative" },
      { role: "Teacher member", name: "Md. Abdul Kader", note: "Teachers' representative" },
      { role: "Teacher member", name: "Sabina Yasmin", note: "Teachers' representative (primary)" },
    ],
    staffText:
      "Teaching is organised in departments: Bangla, English, Mathematics, Science, ICT, Business Studies, Humanities, Religion & Moral Education, the Primary section and Physical Education. Office, library, laboratory and support staff work across both shifts.",
  },
  mission: {
    mission:
      "To provide disciplined, affordable and well-supervised education under the national curriculum, so that every student builds strong foundations in language, mathematics and science, and grows in character.",
    vision:
      "To be the school Sylhet families trust for steady teaching and honest guidance, where students leave confident, curious and ready to serve their community and country.",
    values: [
      { title: "Honesty", text: "In examinations, in work and in how we speak to one another." },
      { title: "Respect", text: "For teachers, families, classmates of every background, and our language and heritage." },
      { title: "Diligence", text: "Steady daily effort matters more than last-minute pressure." },
      { title: "Service", text: "Scouting, community clean-ups and helping younger students are part of school life." },
    ],
  },
  principal: {
    name: "Dr. Nasrin Akhter",
    title: "Principal",
    gender: "female",
    photo: "",
    quote:
      "Good results matter, but they are not the only thing we measure. I want every student to leave this school honest, curious and confident to speak in front of others, and every guardian to feel they can walk into our office and be heard.",
    message: [
      "Dear students and guardians, welcome. A school is judged by its results, and we take results seriously, but I believe the more important measure is the kind of person a student becomes during the years they spend with us.",
      "Our teachers know that children learn best when they feel safe, are expected to work hard, and are noticed when they struggle. That is why every section has a class teacher responsible for following up with families, and why we hold guardian meetings every term.",
      "My office door is open to every guardian during office hours. Please come and talk to us. We would much rather hear about a concern early than late.",
    ],
    messageBn: "আমরা চাই আমাদের শিক্ষার্থীরা সৎ, পরিশ্রমী ও দায়িত্বশীল মানুষ হয়ে গড়ে উঠুক, নিজের ভাষা ও সংস্কৃতিকে ভালোবেসে বিশ্বের সাথে তাল মিলিয়ে চলুক।",
  },
  admission: {
    year: admissionYear,
    open: true,
    intro: "Applications are open for Play to Class 9. Class 11 admission follows the national online admission schedule.",
    noticeDate: "2026-11-01",
    formFile: "/downloads/admission-form-2027.pdf",
    circularFile: "/downloads/admission-circular-2027.pdf",
    noticeTitle: "Admission notice for Play to Class 9, academic year 2027",
    noticeTitleBn: "২০২৭ শিক্ষাবর্ষে প্লে থেকে নবম শ্রেণিতে ভর্তি বিজ্ঞপ্তি",
    noticeBodyBn:
      "২০২৭ শিক্ষাবর্ষে প্লে, নার্সারি এবং প্রথম থেকে নবম শ্রেণির শূন্য আসনে ভর্তির জন্য আবেদন গ্রহণ করা হচ্ছে। আবেদন ফরম ১০ নভেম্বর ২০২৬ থেকে ৩ ডিসেম্বর ২০২৬ পর্যন্ত প্রতিষ্ঠানের অফিস ও ওয়েবসাইট থেকে সংগ্রহ করা যাবে।",
    noticeBody:
      "Forms are available from 10 Nov 2026 to 3 Dec 2026 at the school office and in the Forms & downloads section. Questions? Call the admission office.",
    image: images.admission.src,
    dates: admissionDates.map((d) => ({ ...d })),
    eligibility: eligibility.map((e) => ({ ...e })),
    steps: admissionSteps.map((s) => ({ ...s })),
    documents: [...requiredDocuments],
    fees: fees.map((f) => ({ ...f })),
    feeNote: "",
    classOptions: [...classOptions],
  },
  academic: {
    examSystem: examSystem.map((e) => ({ ...e })),
    grading: gradingScale.map((g) => ({ ...g })),
    timings: "Morning shift: 7:30 AM – 12:15 PM · Day shift: 12:30 PM – 5:00 PM · Higher secondary: 9:00 AM – 2:30 PM",
  },
  boardResults: { isSample: false, rows: boardSummary.map((b) => ({ ...b })) },
};

/* ---------------------------------------------------------------- Seed docs */

const published = { status: "published" };

export function seedCollections(): Record<string, Record<string, unknown>[]> {
  const categories: Record<string, unknown>[] = [
    ...Object.entries(noticeCategories).map(([value, c], i) => ({ group: "notice", value, label: c.label, labelBn: c.labelBn, order: i })),
    ...Object.entries(newsCategories).map(([value, label], i) => ({ group: "news", value, label, order: i })),
    ...Object.entries(galleryCategories).map(([value, label], i) => ({ group: "gallery", value, label, order: i })),
    ...Object.entries(calendarTypeLabel).map(([value, label], i) => ({ group: "event", value, label, order: i })),
    ...["Admission", "Academic", "Forms", "Policy"].map((label, i) => ({ group: "download", value: slugify(label), label, order: i })),
    ...departments.map((label, i) => ({ group: "department", value: slugify(label), label, order: i })),
  ];

  return {
    categories,
    notices: notices.map((n) => ({
      ...published,
      slug: n.slug,
      title: n.title,
      titleEn: n.titleEn ?? "",
      category: n.category,
      date: n.date,
      important: Boolean(n.important),
      summary: n.summary,
      body: n.body,
      issuedBy: n.issuedBy,
      attachmentLabel: n.attachment?.label ?? "",
      attachmentUrl: n.attachment?.href ?? "",
    })),
    news: news.map((n) => ({
      ...published,
      slug: n.slug,
      title: n.title,
      category: n.category,
      date: n.date,
      eventDate: n.eventDate ?? "",
      venue: n.venue ?? "",
      featured: Boolean(n.featured),
      excerpt: n.excerpt,
      body: n.body,
      image: n.image.src,
      imageAlt: n.image.alt,
    })),
    events: calendarEvents.map((e) => ({ ...published, title: e.title, titleBn: e.titleBn, type: e.type, date: e.date, endDate: e.endDate ?? "" })),
    teachers: teachers.map((t, i) => ({
      kind: "teacher",
      active: true,
      name: t.name,
      nameBn: t.nameBn,
      designation: t.designation,
      department: slugify(t.department),
      subjects: t.subjects,
      qualification: t.qualification,
      section: t.section,
      gender: t.gender,
      joined: t.joined,
      phone: t.phone,
      email: t.email,
      photo: "",
      order: i,
    })),
    gallery: gallery.map((g, i) => ({ ...published, image: g.image.src, alt: g.image.alt, caption: g.caption, captionBn: g.captionBn, category: g.category, order: i })),
    downloads: downloads.map((d, i) => ({
      ...published,
      title: d.title,
      titleBn: d.titleBn ?? "",
      category: slugify(d.category),
      description: d.description,
      file: d.href,
      updated: d.updated,
      order: i,
    })),
    faqs: faqs.map((f, i) => ({ ...f, order: i })),
    testimonials: testimonials.map((t, i) => ({ ...t, order: i })),
    levels: academicLevels.map((l, i) => ({ name: l.name, nameBn: l.nameBn, classes: l.classes, ages: l.ages, summary: l.summary, highlights: l.highlights, groups: l.groups ?? [], shift: l.shift ?? "", sectionSize: l.sectionSize ?? "", order: i })),
    subjects: subjectsByLevel.map((s, i) => ({ level: s.level, compulsory: s.compulsory, optional: s.optional ?? [], order: i })),
    routines: [{ title: sampleRoutine.title, rows: sampleRoutine.rows.map((r) => ({ ...r })), order: 0 }],
    policies: [...policies, ...extraPolicies].map((p, i) => ({ title: p.title, points: p.points, order: i })),
    facilities: [
      { title: "Science laboratories", text: "Separate physics, chemistry and biology labs for SSC and HSC practicals.", image: images.scienceLab.src, imageAlt: images.scienceLab.alt, order: 0 },
      { title: "ICT lab", text: "Thirty student workstations with timetabled practical classes.", image: images.computerLab.src, imageAlt: images.computerLab.alt, order: 1 },
      { title: "Central library", text: "Bangla and English collections, reference books and a quiet reading hall.", image: images.library.src, imageAlt: images.library.alt, order: 2 },
      { title: "Playground & sports", text: "Open field for cricket, football and the annual sports day.", image: images.sports.src, imageAlt: images.sports.alt, order: 3 },
    ],
  };
}

/** Exams and results are seeded separately because results reference exams. */
export function seedExams() {
  return [
    { name: "Half-Yearly Examination", year: "2026", classes: "Class 1 – 9", startDate: "2026-06-07", endDate: "2026-06-21", showSchedule: false, resultsPublished: true, schedule: [] },
    { name: "Annual Examination", year: "2025", classes: "Class 1 – 9", startDate: "2025-11-23", endDate: "2025-12-08", showSchedule: false, resultsPublished: true, schedule: [] },
    {
      name: "Annual Examination",
      year: "2026",
      classes: "Class 1 – 9",
      startDate: "2026-11-22",
      endDate: "2026-12-07",
      showSchedule: true,
      resultsPublished: false,
      scheduleNote: "All papers start at 10:00 AM. Practical examinations are held in the labs.",
      routineFile: "/downloads/annual-exam-routine-2026.pdf",
      schedule: examSchedule.map((e) => ({ ...e })),
    },
  ];
}

export function seedResultsFor(examIdByKey: Record<string, unknown>) {
  return mockResults.map((r) => ({
    exam: examIdByKey[`${r.exam}|${r.year}`],
    roll: r.roll,
    registration: r.registration,
    name: r.name,
    className: r.className,
    section: r.section,
    group: r.group ?? "",
    position: r.position,
    subjects: r.subjects.map((s) => ({ subject: s.subject, marks: s.marks })),
    gpa: r.gpa,
    published: true,
  }));
}
