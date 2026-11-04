import type { Department, Teacher } from "@/types";

type TeacherInput = Omit<Teacher, "phone" | "email">;

/** Sample faculty list, names are fictional. */
const faculty: TeacherInput[] = [
  { id: "t01", name: "Dr. Nasrin Akhter", nameBn: "ড. নাসরিন আক্তার", designation: "Principal", department: "Administration", subjects: ["Educational Leadership"], qualification: "Ph.D. in Education", joined: 2009, gender: "female", section: "All" },
  { id: "t02", name: "Md. Abdul Kader", nameBn: "মো. আব্দুল কাদের", designation: "Vice Principal", department: "Administration", subjects: ["Physics"], qualification: "M.Sc. in Physics, B.Ed.", joined: 2001, gender: "male", section: "All" },
  { id: "t03", name: "Shahana Begum", nameBn: "শাহানা বেগম", designation: "Assistant Head Teacher (Day Shift)", department: "Administration", subjects: ["Bangla"], qualification: "M.A. in Bangla, B.Ed.", joined: 2004, gender: "female", section: "Secondary" },
  { id: "t04", name: "Rafiqul Islam", nameBn: "রফিকুল ইসলাম", designation: "Senior Lecturer", department: "Mathematics", subjects: ["Higher Mathematics", "Mathematics"], qualification: "M.Sc. in Mathematics", joined: 2006, gender: "male", section: "Higher Secondary" },
  { id: "t05", name: "Tahmina Chowdhury", nameBn: "তাহমিনা চৌধুরী", designation: "Senior Teacher", department: "English", subjects: ["English First Paper", "English Second Paper"], qualification: "M.A. in English, B.Ed.", joined: 2008, gender: "female", section: "Secondary" },
  { id: "t06", name: "Sujit Kumar Das", nameBn: "সুজিত কুমার দাস", designation: "Lecturer", department: "Science", subjects: ["Chemistry"], qualification: "M.Sc. in Chemistry", joined: 2012, gender: "male", section: "Higher Secondary" },
  { id: "t07", name: "Farhana Yasmin", nameBn: "ফারহানা ইয়াসমিন", designation: "Lecturer", department: "Science", subjects: ["Biology"], qualification: "M.Sc. in Botany", joined: 2014, gender: "female", section: "Higher Secondary" },
  { id: "t08", name: "Mahbubur Rahman", nameBn: "মাহবুবুর রহমান", designation: "Lecturer", department: "ICT", subjects: ["Information & Communication Technology"], qualification: "B.Sc. in Computer Science & Engineering", joined: 2016, gender: "male", section: "Higher Secondary" },
  { id: "t09", name: "Nusrat Jahan", nameBn: "নুসরাত জাহান", designation: "Assistant Teacher", department: "ICT", subjects: ["ICT", "Digital Technology"], qualification: "B.Sc. in Computer Science", joined: 2019, gender: "female", section: "Secondary" },
  { id: "t10", name: "Abul Hasnat", nameBn: "আবুল হাসনাত", designation: "Senior Teacher", department: "Mathematics", subjects: ["Mathematics", "General Science"], qualification: "B.Sc. (Hons) in Mathematics, B.Ed.", joined: 2005, gender: "male", section: "Secondary" },
  { id: "t11", name: "Rumana Sultana", nameBn: "রুমানা সুলতানা", designation: "Lecturer", department: "Bangla", subjects: ["Bangla First Paper", "Bangla Second Paper"], qualification: "M.A. in Bangla", joined: 2013, gender: "female", section: "Higher Secondary" },
  { id: "t12", name: "Kamrul Hasan", nameBn: "কামরুল হাসান", designation: "Lecturer", department: "Business Studies", subjects: ["Accounting", "Finance & Banking"], qualification: "M.B.S. in Accounting", joined: 2011, gender: "male", section: "Higher Secondary" },
  { id: "t13", name: "Shirin Akter", nameBn: "শিরিন আক্তার", designation: "Assistant Teacher", department: "Business Studies", subjects: ["Business Entrepreneurship"], qualification: "M.B.A. in Management", joined: 2018, gender: "female", section: "Secondary" },
  { id: "t14", name: "Anwar Hossain", nameBn: "আনোয়ার হোসেন", designation: "Lecturer", department: "Humanities", subjects: ["History", "Civics & Good Governance"], qualification: "M.S.S. in Political Science", joined: 2010, gender: "male", section: "Higher Secondary" },
  { id: "t15", name: "Laila Arjumand", nameBn: "লায়লা আরজুমান্দ", designation: "Assistant Teacher", department: "Humanities", subjects: ["Geography & Environment", "Bangladesh & Global Studies"], qualification: "M.Sc. in Geography", joined: 2017, gender: "female", section: "Secondary" },
  { id: "t16", name: "Maulana Abdur Rahim", nameBn: "মাওলানা আব্দুর রহিম", designation: "Assistant Teacher", department: "Religion & Moral Education", subjects: ["Islam & Moral Education"], qualification: "Kamil (Hadith)", joined: 2007, gender: "male", section: "Secondary" },
  { id: "t17", name: "Mitali Rani Paul", nameBn: "মিতালী রাণী পাল", designation: "Assistant Teacher", department: "Religion & Moral Education", subjects: ["Hindu Religion & Moral Education"], qualification: "M.A. in Philosophy", joined: 2015, gender: "female", section: "Secondary" },
  { id: "t18", name: "Sabina Yasmin", nameBn: "সাবিনা ইয়াসমিন", designation: "Senior Teacher", department: "Primary Section", subjects: ["Bangla", "English", "Mathematics"], qualification: "B.A., C-in-Ed", joined: 2003, gender: "female", section: "Primary" },
  { id: "t19", name: "Taslima Nahar", nameBn: "তাসলিমা নাহার", designation: "Assistant Teacher", department: "Primary Section", subjects: ["Science", "Art & Craft"], qualification: "B.Sc., Dip-in-Ed", joined: 2020, gender: "female", section: "Primary" },
  { id: "t20", name: "Jahangir Alam", nameBn: "জাহাঙ্গীর আলম", designation: "Physical Education Instructor", department: "Physical Education", subjects: ["Physical Education & Health", "Scouting"], qualification: "B.P.Ed.", joined: 2009, gender: "male", section: "All" },
  { id: "t21", name: "Ishrat Jahan Mim", nameBn: "ইশরাত জাহান মিম", designation: "Assistant Teacher", department: "English", subjects: ["English", "Spoken English Club"], qualification: "M.A. in English Language Teaching", joined: 2021, gender: "female", section: "Primary" },
  { id: "t22", name: "Debashis Roy", nameBn: "দেবাশীষ রায়", designation: "Lecturer", department: "Science", subjects: ["Physics"], qualification: "M.Sc. in Physics", joined: 2015, gender: "male", section: "Higher Secondary" },
];

/**
 * Placeholder contact details: numbers use the 01700-000xxx demo range and
 * emails use the reserved .example domain, so nothing reaches a real person.
 */
function contact(t: TeacherInput, i: number): Pick<Teacher, "phone" | "email"> {
  const slug = t.name
    .replace(/^(Dr\.|Md\.|Maulana)\s+/i, "")
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .trim()
    .split(/\s+/)
    .join(".");
  const n = String(101 + i).padStart(3, "0");
  return { phone: `+880 1700-000${n}`, email: `${slug}@webnion.example` };
}

export const teachers: Teacher[] = faculty.map((t, i) => ({ ...t, ...contact(t, i) }));

export const departments: Department[] = Array.from(new Set(teachers.map((t) => t.department)));

/** Initials of a name (kept for places that still need a short label). */
export function initials(name: string): string {
  return name
    .replace(/^(Dr\.|Md\.|Maulana)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
