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

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "At a Glance", href: "/about", description: "Overview, mission and values" },
      { label: "History", href: "/about#history", description: "Milestones since 1998" },
      { label: "Campus & Facilities", href: "/about#campus", description: "Labs, library and playground" },
      { label: "News & Events", href: "/news", description: "What is happening at school" },
    ],
  },
  {
    label: "Administration",
    href: "/teachers",
    children: [
      { label: "Managing Committee", href: "/about#committee", description: "Members and their roles" },
      { label: "Principal's Message", href: "/about#principal", description: "A letter to students and guardians" },
      { label: "Teachers & Staff", href: "/teachers", description: "Faculty by department" },
    ],
  },
  {
    label: "Academic",
    href: "/academic",
    children: [
      { label: "Levels & Classes", href: "/academic#levels", description: "Primary, secondary, higher secondary" },
      { label: "Curriculum & Subjects", href: "/academic#curriculum", description: "NCTB subjects by class" },
      { label: "Class Routine", href: "/academic#routine", description: "Weekly timetable" },
      { label: "Academic Calendar", href: "/calendar", description: "Holidays, exams and events" },
      { label: "Examination System", href: "/academic#exams", description: "Terms, tests and grading" },
      { label: "School Policies", href: "/policies", description: "Attendance, uniform, conduct" },
    ],
  },
  {
    label: "Admission",
    href: "/admission",
    children: [
      { label: "Admission 2027", href: "/admission", description: "Circular, dates and seats" },
      { label: "Eligibility & Documents", href: "/admission#eligibility", description: "Who can apply and what to bring" },
      { label: "Fees", href: "/admission#fees", description: "Admission and monthly fees" },
      { label: "Apply / Inquiry Form", href: "/admission#apply", description: "Fill in and print the form" },
    ],
  },
  { label: "Notices", href: "/notices" },
  {
    label: "Results",
    href: "/results",
    children: [
      { label: "Result Search", href: "/results#search", description: "Find a result by roll number" },
      { label: "Exam Schedule", href: "/results#schedule", description: "Annual examination routine" },
      { label: "Board Exam Summary", href: "/results#summary", description: "SSC and HSC results" },
    ],
  },
  {
    label: "Campus Life",
    href: "/gallery",
    children: [
      { label: "Photo Gallery", href: "/gallery", description: "Classes, sports and events" },
      { label: "Students & Guardians", href: "/students-guardians", description: "Timings, uniform and leave" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  quick: [
    { label: "Admission 2027", href: "/admission" },
    { label: "Notice Board", href: "/notices" },
    { label: "Result Search", href: "/results" },
    { label: "Academic Calendar", href: "/calendar" },
    { label: "Forms & Downloads", href: "/notices#downloads" },
  ],
  institution: [
    { label: "About Us", href: "/about" },
    { label: "Teachers & Staff", href: "/teachers" },
    { label: "News & Events", href: "/news" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  help: [
    { label: "Students & Guardians", href: "/students-guardians" },
    { label: "School Policies", href: "/policies" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Photo Credits", href: "/credits" },
  ],
};
