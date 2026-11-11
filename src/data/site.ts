import type { NavItem } from "@/types";

/**
 * Webnion School & College is a fictional institution. Every contact detail,
 * figure and name in this project is demonstration content.
 */
export const site = {
  name: "Webnion School & College",
  nameBn: "ওয়েবনিয়ন স্কুল এন্ড কলেজ",
  shortName: "Webnion",
  tagline: "Enter to learn, leave to serve",
  taglineBn: "শিক্ষার জন্য আসো, সেবার জন্য বের হয়ে যাও।",
  established: 1998,
  eiin: "111825",
  collegeCode: "0000",
  address: "Webnion Road, Upashahar, Sylhet 3100",
  addressBn: "ওয়েবনিয়ন রোড, উপশহর, সিলেট ৩১০০",
  phone: "+880 1700-000000",
  phoneHref: "tel:+8801700000000",
  officePhone: "+880 821-000000",
  officePhoneHref: "tel:+880821000000",
  email: "info@webnion.example",
  admissionEmail: "admission@webnion.example",
  officeHours: "Saturday – Thursday, 8:00 AM – 3:00 PM",
  officeHoursBn: "শনিবার – বৃহস্পতিবার, সকাল ৮টা – বিকাল ৩টা",
  url: "https://webnion-school-college.example",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  demoNote: "",
} as const;

/**
 * The site map. The header menu AND every breadcrumb are generated from this
 * one list (see lib/nav.ts), so they cannot disagree. Every item is a real page.
 */
export const navigation: NavItem[] = [
  { label: "Home", labelBn: "প্রচ্ছদ", href: "/" },
  {
    label: "About",
    labelBn: "প্রতিষ্ঠান পরিচিতি",
    href: "/about",
    children: [
      { label: "History", labelBn: "ইতিহাস", href: "/about/history" },
      { label: "Principal's Message", labelBn: "অধ্যক্ষের বাণী", href: "/about/principal" },
      { label: "Chairman's Message", labelBn: "সভাপতির বাণী", href: "/about/chairman" },
      { label: "Governing Body", labelBn: "পরিচালনা পর্ষদ", href: "/about/governing-body" },
      { label: "Teachers", labelBn: "শিক্ষকবৃন্দ", href: "/teachers" },
      { label: "Staff", labelBn: "কর্মচারীবৃন্দ", href: "/staff" },
      { label: "Infrastructure", labelBn: "অবকাঠামো", href: "/about/infrastructure" },
    ],
  },
  {
    label: "Academic",
    labelBn: "একাডেমিক",
    href: "/academic",
    children: [
      { label: "Classes & Sections", labelBn: "শ্রেণি ও শাখা", href: "/academic/classes" },
      { label: "Student Numbers", labelBn: "শিক্ষার্থী সংখ্যা", href: "/academic/students" },
      { label: "Class Routine", labelBn: "ক্লাস রুটিন", href: "/academic/routine" },
      { label: "Academic Calendar", labelBn: "একাডেমিক ক্যালেন্ডার", href: "/academic/calendar" },
      { label: "Syllabus", labelBn: "সিলেবাস", href: "/academic/syllabus" },
      { label: "Rules", labelBn: "নিয়মাবলি", href: "/academic/rules" },
      { label: "Clubs & Co-curricular", labelBn: "ক্লাব ও সহশিক্ষা", href: "/academic/clubs" },
    ],
  },
  { label: "Admission", labelBn: "ভর্তি", href: "/admission" },
  { label: "Notices", labelBn: "নোটিশ", href: "/notices" },
  { label: "Results", labelBn: "ফলাফল", href: "/results" },
  { label: "Gallery", labelBn: "গ্যালারি", href: "/gallery" },
  { label: "Downloads", labelBn: "ডাউনলোড", href: "/downloads" },
  { label: "Contact", labelBn: "যোগাযোগ", href: "/contact" },
];

/** Real pages that are not in the menu; breadcrumbs still find them here. */
export const extraRoutes: NavItem[] = [
  { label: "News", labelBn: "সংবাদ", href: "/news" },
  { label: "Photo Credits", labelBn: "ছবির কৃতজ্ঞতা", href: "/credits" },
];

export const footerLinks = {
  quick: [
    { label: "Admission", href: "/admission" },
    { label: "Notices", href: "/notices" },
    { label: "Results", href: "/results" },
    { label: "Academic Calendar", href: "/academic/calendar" },
    { label: "Downloads", href: "/downloads" },
  ],
  institution: [
    { label: "History", href: "/about/history" },
    { label: "Teachers", href: "/teachers" },
    { label: "News", href: "/news" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  help: [
    { label: "Class Routine", href: "/academic/routine" },
    { label: "Rules", href: "/academic/rules" },
    { label: "Syllabus", href: "/academic/syllabus" },
  ],
};
