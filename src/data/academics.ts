import type { AcademicLevel } from "@/types";

export const academicLevels: AcademicLevel[] = [
  {
    id: "primary",
    name: "Primary",
    nameBn: "প্রাথমিক",
    classes: "Play – Class 5",
    ages: "Ages 4 – 11",
    summary:
      "A caring start with small sections, class-teacher follow-up and plenty of reading, drawing and play alongside the national curriculum.",
    highlights: ["Maximum 35 students per section", "Daily reading hour", "Art, music & handwriting classes", "Morning shift only"],
    shift: "Morning",
    sectionSize: "Up to 35",
  },
  {
    id: "secondary",
    name: "Secondary",
    nameBn: "মাধ্যমিক",
    classes: "Class 6 – Class 10",
    ages: "Ages 11 – 16",
    summary:
      "NCTB curriculum with continuous assessment, practical science and ICT classes, and focused preparation for the SSC examination.",
    highlights: ["Morning & day shifts", "Science lab & ICT practicals", "Weekly class tests", "SSC model tests in Class 10"],
    shift: "Morning and day",
    groups: ["Science", "Business Studies", "Humanities"],
  },
  {
    id: "higher-secondary",
    name: "Higher Secondary",
    nameBn: "উচ্চ মাধ্যমিক",
    classes: "Class 11 – Class 12",
    ages: "Ages 16 – 18",
    summary:
      "Two-year HSC programme taught by subject lecturers, with tutorial classes, lab work and guidance for university admission.",
    highlights: ["Subject-specialist lecturers", "Tutorial & lab sessions", "Career and admission guidance", "Separate study hall"],
    shift: "Single shift, 9:00 AM to 2:30 PM",
    groups: ["Science", "Business Studies", "Humanities"],
  },
];

export const subjectsByLevel: { level: string; compulsory: string[]; optional?: string[] }[] = [
  {
    level: "Primary (Class 1–5)",
    compulsory: ["Bangla", "English", "Mathematics", "Primary Science", "Bangladesh & Global Studies", "Religion & Moral Education", "Art & Craft", "Physical Education"],
  },
  {
    level: "Secondary (Class 6–8)",
    compulsory: ["Bangla", "English", "Mathematics", "Science", "History & Social Science", "Digital Technology", "Life & Livelihood", "Wellbeing", "Religion & Moral Education", "Arts & Culture"],
  },
  {
    level: "SSC (Class 9–10)",
    compulsory: ["Bangla", "English", "Mathematics", "ICT", "Bangladesh & Global Studies / General Science", "Religion & Moral Education", "Physical Education"],
    optional: ["Science: Physics, Chemistry, Biology, Higher Mathematics", "Business Studies: Accounting, Finance & Banking, Business Entrepreneurship", "Humanities: History, Geography, Civics, Economics"],
  },
  {
    level: "HSC (Class 11–12)",
    compulsory: ["Bangla", "English", "ICT"],
    optional: ["Science: Physics, Chemistry, Biology, Higher Mathematics", "Business Studies: Accounting, Business Organisation & Management, Finance, Production Management & Marketing", "Humanities: Economics, Civics & Good Governance, History, Logic, Social Work"],
  },
];

export type RoutineRow = { time: string; sat: string; sun: string; mon: string; tue: string; wed: string; thu: string };

/** Sample routine, Class 8, Section A, morning shift */
export const sampleRoutine: { title: string; rows: RoutineRow[] } = {
  title: "Class 8 · Section A · Morning Shift",
  rows: [
    { time: "7:30 – 7:45", sat: "Assembly", sun: "Assembly", mon: "Assembly", tue: "Assembly", wed: "Assembly", thu: "Assembly" },
    { time: "7:45 – 8:30", sat: "Bangla", sun: "English", mon: "Bangla", tue: "English", wed: "Bangla", thu: "Mathematics" },
    { time: "8:30 – 9:15", sat: "Mathematics", sun: "Mathematics", mon: "Science", tue: "Mathematics", wed: "Science", thu: "English" },
    { time: "9:15 – 10:00", sat: "Science", sun: "Digital Tech.", mon: "English", tue: "History & Soc. Sc.", wed: "Mathematics", thu: "Science" },
    { time: "10:00 – 10:20", sat: "Break", sun: "Break", mon: "Break", tue: "Break", wed: "Break", thu: "Break" },
    { time: "10:20 – 11:00", sat: "English", sun: "Religion", mon: "Life & Livelihood", tue: "Bangla", wed: "Digital Tech. (Lab)", thu: "Wellbeing" },
    { time: "11:00 – 11:40", sat: "History & Soc. Sc.", sun: "Bangla", mon: "Mathematics", tue: "Religion", wed: "Digital Tech. (Lab)", thu: "Arts & Culture" },
    { time: "11:40 – 12:15", sat: "Wellbeing", sun: "Science", mon: "Games", tue: "Science (Lab)", wed: "Library", thu: "Club Activity" },
  ],
};

export const examSystem = [
  {
    title: "Continuous assessment",
    text: "Class work, weekly class tests, assignments and practical work are recorded throughout the year in line with the national curriculum's assessment guidelines.",
  },
  {
    title: "Half-yearly examination",
    text: "Held in June. Results are shared through progress reports signed by the class teacher and guardian.",
  },
  {
    title: "Annual examination",
    text: "Held in November–December. Promotion to the next class depends on annual results, attendance and continuous assessment.",
  },
  {
    title: "Test & model tests",
    text: "Class 10 and Class 12 students sit pre-test, test (selection) and model examinations before the SSC and HSC public examinations.",
  },
];

export const gradingScale = [
  { range: "80 – 100", grade: "A+", point: "5.00" },
  { range: "70 – 79", grade: "A", point: "4.00" },
  { range: "60 – 69", grade: "A−", point: "3.50" },
  { range: "50 – 59", grade: "B", point: "3.00" },
  { range: "40 – 49", grade: "C", point: "2.00" },
  { range: "33 – 39", grade: "D", point: "1.00" },
  { range: "0 – 32", grade: "F", point: "0.00" },
];

export const policies = [
  {
    id: "attendance",
    title: "Attendance",
    points: [
      "Students are expected to attend at least 80% of classes in each term.",
      "Absence must be explained with a written application signed by a guardian.",
      "Three consecutive days of unexplained absence will be followed up by the class teacher by phone.",
    ],
  },
  {
    id: "uniform",
    title: "Uniform & appearance",
    points: [
      "Boys: white shirt with school badge, navy blue trousers, black shoes.",
      "Girls: white kameez with navy cross-belt, white salwar and white orna; white ribbons for primary.",
      "Navy blue sweater or cardigan only during winter.",
    ],
  },
  {
    id: "conduct",
    title: "Discipline & conduct",
    points: [
      "Respect towards teachers, staff and fellow students is expected at all times.",
      "Mobile phones are not allowed in classrooms. Phones brought for travel must be kept with the class teacher.",
      "Bullying, ragging or harassment of any kind will be dealt with under the school's disciplinary procedure.",
    ],
  },
  {
    id: "guardians",
    title: "Guardians",
    points: [
      "Guardians should attend progress meetings and sign progress reports on time.",
      "Changes of phone number or address must be reported to the office in writing.",
      "Students may only be collected early by guardians listed on the admission record.",
    ],
  },
];
