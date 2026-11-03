import type { CalendarEvent } from "@/types";

/** Academic calendar 2026–27 (sample). Holiday dates follow typical public holidays. */
export const calendarEvents: CalendarEvent[] = [
  { date: "2026-10-17", endDate: "2026-10-22", title: "Durga Puja holiday", titleBn: "শারদীয় দুর্গাপূজার ছুটি", type: "holiday" },
  { date: "2026-10-29", title: "Inter-class science fair", titleBn: "আন্তঃশ্রেণি বিজ্ঞান মেলা", type: "event" },
  { date: "2026-11-10", endDate: "2026-12-03", title: "Admission forms for 2027", titleBn: "২০২৭ সালের ভর্তি ফরম বিতরণ", type: "admission" },
  { date: "2026-11-22", endDate: "2026-12-07", title: "Annual examination 2026", titleBn: "বার্ষিক পরীক্ষা ২০২৬", type: "exam" },
  { date: "2026-12-12", title: "Admission test (Class 2–9)", titleBn: "ভর্তি পরীক্ষা (২য়–৯ম শ্রেণি)", type: "admission" },
  { date: "2026-12-16", title: "Victory Day", titleBn: "মহান বিজয় দিবস", type: "holiday" },
  { date: "2026-12-20", title: "Annual result publication", titleBn: "বার্ষিক পরীক্ষার ফলাফল প্রকাশ", type: "academic" },
  { date: "2026-12-21", endDate: "2026-12-31", title: "Winter vacation", titleBn: "শীতকালীন ছুটি", type: "holiday" },
  { date: "2027-01-01", title: "Book distribution & new session", titleBn: "পাঠ্যপুস্তক বিতরণ ও নতুন শিক্ষাবর্ষ শুরু", type: "academic" },
  { date: "2027-01-14", title: "Annual sports day", titleBn: "বার্ষিক ক্রীড়া প্রতিযোগিতা", type: "event" },
  { date: "2027-02-21", title: "Shaheed Day & International Mother Language Day", titleBn: "শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস", type: "holiday" },
  { date: "2027-03-26", title: "Independence Day", titleBn: "মহান স্বাধীনতা দিবস", type: "holiday" },
  { date: "2027-04-14", title: "Pahela Baishakh", titleBn: "পহেলা বৈশাখ", type: "holiday" },
  { date: "2027-06-06", endDate: "2027-06-20", title: "Half-yearly examination 2027", titleBn: "অর্ধবার্ষিক পরীক্ষা ২০২৭", type: "exam" },
];

export const calendarTypeLabel: Record<CalendarEvent["type"], string> = {
  exam: "Examination",
  holiday: "Holiday",
  event: "Event",
  academic: "Academic",
  admission: "Admission",
};
