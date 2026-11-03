export const admissionYear = 2027;

export const admissionDates = [
  { label: "Form distribution & submission starts", date: "2026-11-10" },
  { label: "Last date of form submission", date: "2026-12-03" },
  { label: "Admit card collection", date: "2026-12-07" },
  { label: "Admission test (Class 2–9)", date: "2026-12-12" },
  { label: "Lottery & guardian interview (Play–Class 1)", date: "2026-12-13" },
  { label: "Result publication", date: "2026-12-17" },
  { label: "Admission & book distribution", date: "2027-01-01" },
];

export const eligibility = [
  { cls: "Play", requirement: "Child must be 4+ years old on 1 January 2027.", selection: "Lottery & guardian interview", seats: 40 },
  { cls: "Nursery", requirement: "Child must be 5+ years old on 1 January 2027.", selection: "Lottery & guardian interview", seats: 20 },
  { cls: "Class 1", requirement: "Child must be 6+ years old on 1 January 2027.", selection: "Lottery & guardian interview", seats: 30 },
  { cls: "Class 2 – 5", requirement: "Passed the previous class from a recognised school.", selection: "Written test (Bangla, English, Mathematics)", seats: 18 },
  { cls: "Class 6", requirement: "Passed Class 5 from a recognised school.", selection: "Written test (Bangla, English, Mathematics, General Knowledge)", seats: 60 },
  { cls: "Class 7 – 9", requirement: "Passed the previous class; seats subject to vacancy.", selection: "Written test", seats: 24 },
  { cls: "Class 11 (HSC)", requirement: "SSC passed; minimum GPA set per group in the HSC circular.", selection: "National online admission system, following the board's schedule", seats: 240 },
];

export const admissionSteps = [
  { title: "Collect the form", text: "Get the form from the school office or download it from the Downloads page." },
  { title: "Submit with documents", text: "Submit the completed form with the documents listed below and the form fee receipt." },
  { title: "Collect admit card", text: "Admit cards are issued from the office from 7 December, with the test venue and time." },
  { title: "Test or lottery", text: "Class 2–9 sit a written test. Play–Class 1 selection is by lottery with a short guardian interview." },
  { title: "Check the result", text: "Results are published on the notice board and on this website on 17 December." },
  { title: "Complete admission", text: "Selected students complete admission by paying fees and collecting books and the diary." },
];

export const requiredDocuments = [
  "Online birth registration certificate (photocopy)",
  "Two recent passport-size photographs of the student",
  "One passport-size photograph of each guardian",
  "Transfer certificate (TC) from the previous school — for Class 2 and above",
  "Last examination transcript or progress report — for Class 2 and above",
  "National ID card photocopy of father and mother (or legal guardian)",
];

/** Sample fee structure — clearly not real fees. */
export const fees = [
  { item: "Admission form fee", primary: "300", secondary: "400", higher: "500" },
  { item: "Admission fee (one time)", primary: "5,000", secondary: "6,000", higher: "7,000" },
  { item: "Monthly tuition fee", primary: "1,200", secondary: "1,500", higher: "1,800" },
  { item: "Session charge (yearly)", primary: "2,000", secondary: "2,500", higher: "3,000" },
  { item: "ICT & lab fee (yearly)", primary: "—", secondary: "1,000", higher: "1,500" },
  { item: "Examination fee (per term)", primary: "500", secondary: "700", higher: "900" },
];

export const classOptions = [
  "Play",
  "Nursery",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 11 (HSC)",
] as const;
