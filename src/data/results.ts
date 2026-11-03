import type { ResultSubject, StudentResult } from "@/types";

function grade(marks: number): { grade: string; point: number } {
  if (marks >= 80) return { grade: "A+", point: 5 };
  if (marks >= 70) return { grade: "A", point: 4 };
  if (marks >= 60) return { grade: "A-", point: 3.5 };
  if (marks >= 50) return { grade: "B", point: 3 };
  if (marks >= 40) return { grade: "C", point: 2 };
  if (marks >= 33) return { grade: "D", point: 1 };
  return { grade: "F", point: 0 };
}

function subjects(list: [string, number][]): ResultSubject[] {
  return list.map(([subject, marks]) => ({ subject, marks, ...grade(marks) }));
}

function gpa(list: ResultSubject[]): number {
  if (list.some((s) => s.point === 0)) return 0;
  return Math.min(5, Math.round((list.reduce((sum, s) => sum + s.point, 0) / list.length) * 100) / 100);
}

function build(r: Omit<StudentResult, "gpa" | "subjects"> & { marks: [string, number][] }): StudentResult {
  const subs = subjects(r.marks);
  const { marks: _marks, ...rest } = r;
  void _marks;
  return { ...rest, subjects: subs, gpa: gpa(subs) };
}

/**
 * Demonstration records only — these students do not exist.
 * Try roll 101 / 102 / 205 / 310 with the matching class and exam.
 */
export const mockResults: StudentResult[] = [
  build({
    roll: "101", registration: "WSC-2026-0101", name: "Sample Student A", className: "Class 8", section: "A",
    exam: "Half-Yearly Examination", year: "2026", position: 3,
    marks: [["Bangla", 84], ["English", 78], ["Mathematics", 91], ["Science", 86], ["History & Social Science", 74], ["Digital Technology", 88], ["Religion & Moral Education", 82]],
  }),
  build({
    roll: "102", registration: "WSC-2026-0102", name: "Sample Student B", className: "Class 8", section: "A",
    exam: "Half-Yearly Examination", year: "2026",
    marks: [["Bangla", 71], ["English", 64], ["Mathematics", 58], ["Science", 69], ["History & Social Science", 72], ["Digital Technology", 80], ["Religion & Moral Education", 77]],
  }),
  build({
    roll: "205", registration: "WSC-2026-0205", name: "Sample Student C", className: "Class 9", section: "B", group: "Science",
    exam: "Half-Yearly Examination", year: "2026", position: 1,
    marks: [["Bangla", 82], ["English", 85], ["Mathematics", 95], ["Physics", 88], ["Chemistry", 84], ["Biology", 81], ["Higher Mathematics", 90], ["ICT", 92]],
  }),
  build({
    roll: "310", registration: "WSC-2026-0310", name: "Sample Student D", className: "Class 11", section: "C", group: "Business Studies",
    exam: "Half-Yearly Examination", year: "2026",
    marks: [["Bangla", 68], ["English", 61], ["ICT", 75], ["Accounting", 79], ["Business Organisation & Management", 72], ["Finance, Banking & Insurance", 66]],
  }),
  build({
    roll: "101", registration: "WSC-2025-0101", name: "Sample Student A", className: "Class 7", section: "A",
    exam: "Annual Examination", year: "2025", position: 4,
    marks: [["Bangla", 80], ["English", 76], ["Mathematics", 88], ["Science", 82], ["History & Social Science", 70], ["Digital Technology", 85], ["Religion & Moral Education", 84]],
  }),
];

export const resultClasses = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
export const resultExams = ["Half-Yearly Examination", "Annual Examination"];
export const resultYears = ["2026", "2025"];

/** Illustrative board-exam summary — clearly labelled as sample data in the UI. */
export const boardSummary = [
  { exam: "SSC", year: "2026", examinees: 186, passed: 181, aPlus: 64 },
  { exam: "SSC", year: "2025", examinees: 172, passed: 166, aPlus: 51 },
  { exam: "HSC", year: "2026", examinees: 214, passed: 199, aPlus: 47 },
  { exam: "HSC", year: "2025", examinees: 205, passed: 188, aPlus: 39 },
];

export const examSchedule = [
  { date: "2026-11-22", day: "Sunday", subject: "Bangla (1st Paper)", classes: "Class 3 – 9" },
  { date: "2026-11-23", day: "Monday", subject: "English (1st Paper)", classes: "Class 3 – 9" },
  { date: "2026-11-25", day: "Wednesday", subject: "Mathematics", classes: "Class 1 – 9" },
  { date: "2026-11-26", day: "Thursday", subject: "Bangla (2nd Paper)", classes: "Class 6 – 9" },
  { date: "2026-11-29", day: "Sunday", subject: "English (2nd Paper)", classes: "Class 6 – 9" },
  { date: "2026-11-30", day: "Monday", subject: "Science / Physics", classes: "Class 3 – 9" },
  { date: "2026-12-02", day: "Wednesday", subject: "Religion & Moral Education", classes: "Class 1 – 9" },
  { date: "2026-12-03", day: "Thursday", subject: "ICT / Digital Technology", classes: "Class 6 – 9" },
  { date: "2026-12-06", day: "Sunday", subject: "Group subjects (Chemistry / Accounting / History)", classes: "Class 9" },
  { date: "2026-12-07", day: "Monday", subject: "Practical examinations", classes: "Class 6 – 9" },
];
