import type { DownloadResource } from "@/types";

/** Every file listed here exists in /public/downloads as a clearly marked sample PDF. */
export const downloads: DownloadResource[] = [
  { id: "d1", title: "Admission Circular 2027", titleBn: "ভর্তি বিজ্ঞপ্তি ২০২৭", category: "Admission", description: "Dates, seats, eligibility and selection process.", href: "/downloads/admission-circular-2027.pdf", size: "PDF", updated: "2026-11-01" },
  { id: "d2", title: "Admission Form 2027", titleBn: "ভর্তি ফরম ২০২৭", category: "Admission", description: "Printable application form for Play to Class 9.", href: "/downloads/admission-form-2027.pdf", size: "PDF", updated: "2026-11-01" },
  { id: "d3", title: "Fee Structure 2027 (sample)", category: "Admission", description: "Sample fee table for all sections.", href: "/downloads/fee-structure-2027-sample.pdf", size: "PDF", updated: "2026-11-01" },
  { id: "d4", title: "Annual Examination Routine 2026", titleBn: "বার্ষিক পরীক্ষার রুটিন ২০২৬", category: "Academic", description: "Subject-wise schedule for Class 1 to 9.", href: "/downloads/annual-exam-routine-2026.pdf", size: "PDF", updated: "2026-10-28" },
  { id: "d5", title: "Academic Calendar 2026–27", titleBn: "একাডেমিক ক্যালেন্ডার", category: "Academic", description: "Exams, holidays and events for the session.", href: "/downloads/academic-calendar-2026-27.pdf", size: "PDF", updated: "2026-10-01" },
  { id: "d6", title: "Annual Exam Syllabus — Class 6 to 9", category: "Academic", description: "Chapters and topics included in the annual exam.", href: "/downloads/annual-syllabus-class-6-9.pdf", size: "PDF", updated: "2026-09-15" },
  { id: "d7", title: "Leave Application Form", titleBn: "ছুটির আবেদন ফরম", category: "Forms", description: "For student absence, signed by a guardian.", href: "/downloads/leave-application-form.pdf", size: "PDF", updated: "2026-01-10" },
  { id: "d8", title: "Transfer Certificate Request", category: "Forms", description: "Request form for a transfer certificate (TC).", href: "/downloads/transfer-certificate-request.pdf", size: "PDF", updated: "2026-01-10" },
  { id: "d9", title: "Student Code of Conduct", category: "Policy", description: "Attendance, uniform, discipline and guardian responsibilities.", href: "/downloads/code-of-conduct.pdf", size: "PDF", updated: "2026-01-05" },
];
