import { Download } from "lucide-react";
import { Box } from "@/components/portal/Box";
import { table, tableWrap, td, th } from "@/components/portal/table";
import { RoutinePicker } from "@/components/academic/RoutinePicker";
import Link from "@/components/i18n/Link";
import { getAcademic, getDownloads, getEvents, getSetting, getSite, getToday } from "@/content/site-content";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Academic Information",
    alt: "একাডেমিক তথ্য",
    meta: "Academic levels, subjects, class routine, examinations, grading and student policies at Webnion School & College.",
    intro: "How teaching, routines and examinations work at each level, following the national curriculum.",
    onPage: "On this page",
    klass: "Class",
    sectionL: "Section",
    shiftL: "Shift",
    printRoutine: "Print routine",
    noRoutine: "No routine published yet.",
    updatedL: "Updated",
    stepL: "Stage",
    nav: { levels: "Levels", curriculum: "Curriculum", calendar: "Calendar", routine: "Class routine", exams: "Examinations", resources: "Syllabus & resources", policies: "Policies" },
    levelsK: "Academic levels",
    levels: "Academic levels and classes",
    groups: "Groups",
    currK: "Curriculum",
    curr: "Subjects and curriculum",
    currText: "All classes use NCTB textbooks. Subject names follow the current national curriculum for each level.",
    compulsory: "Compulsory",
    groupSubjects: "Group subjects",
    calK: "Academic calendar",
    cal: "Academic calendar",
    calText: "The next important dates. The full calendar has every holiday, exam and event for the session.",
    fullCal: "Full academic calendar",
    routineK: "Class routine",
    routine: "Class routine",
    routineText: "School week: Saturday to Thursday. Friday is the weekly holiday.",
    routineLabel: "Class routine table, scroll horizontally on small screens",
    weekly: "Weekly class routine:",
    today: "Today",
    now: "Now",
    lab: "Lab",
    periodTpl: "Period {n}",
    periodsTpl: "{n} periods",
    minutesTpl: "{n} min",
    time: "Time",
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    examsK: "Examination system",
    exams: "Examination system",
    examLink: "Exam schedule and result search",
    grading: "Grading scale",
    gradingText: "Letter grades and grade points used for SSC, HSC and internal examinations.",
    marks: "Marks",
    grade: "Grade",
    point: "Point",
    resK: "Syllabus & resources",
    res: "Syllabus and resources",
    resSample: "Sample documents prepared for this demonstration.",
    resNone: "No academic resources yet.",
    allDownloads: "All downloads",
    polK: "Policies",
    pol: "Policies for students and guardians",
    fullPol: "Full school policies",
  },
  bn: {
    title: "একাডেমিক তথ্য",
    alt: "Academic Information",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের শিক্ষা স্তর, বিষয়, ক্লাস রুটিন, পরীক্ষা, গ্রেডিং ও শিক্ষার্থী নীতিমালা।",
    intro: "প্রতিটি স্তরে পাঠদান, রুটিন ও পরীক্ষা কীভাবে চলে, জাতীয় শিক্ষাক্রম অনুযায়ী।",
    onPage: "এই পাতায়",
    klass: "শ্রেণি",
    sectionL: "শাখা",
    shiftL: "শিফট",
    printRoutine: "রুটিন প্রিন্ট করুন",
    noRoutine: "এখনো কোনো রুটিন প্রকাশ করা হয়নি।",
    updatedL: "হালনাগাদ",
    stepL: "ধাপ",
    nav: { levels: "স্তর", curriculum: "শিক্ষাক্রম", calendar: "ক্যালেন্ডার", routine: "ক্লাস রুটিন", exams: "পরীক্ষা", resources: "সিলেবাস ও রিসোর্স", policies: "নীতিমালা" },
    levelsK: "শিক্ষা স্তর",
    levels: "শিক্ষা স্তর ও শ্রেণি",
    groups: "বিভাগ",
    currK: "পাঠ্যক্রম",
    curr: "বিষয় ও শিক্ষাক্রম",
    currText: "সব শ্রেণিতে এনসিটিবির পাঠ্যবই ব্যবহার করা হয়। বিষয়ের নাম প্রতিটি স্তরের বর্তমান জাতীয় শিক্ষাক্রম অনুযায়ী।",
    compulsory: "আবশ্যিক",
    groupSubjects: "বিভাগভিত্তিক বিষয়",
    calK: "একাডেমিক ক্যালেন্ডার",
    cal: "একাডেমিক ক্যালেন্ডার",
    calText: "সামনের গুরুত্বপূর্ণ তারিখগুলো। পূর্ণ ক্যালেন্ডারে পুরো সেশনের সব ছুটি, পরীক্ষা ও অনুষ্ঠান আছে।",
    fullCal: "পূর্ণ একাডেমিক ক্যালেন্ডার",
    routineK: "ক্লাস রুটিন",
    routine: "ক্লাস রুটিন",
    routineText: "শনিবার থেকে বৃহস্পতিবার ক্লাস হয়। শুক্রবার সাপ্তাহিক ছুটি।",
    routineLabel: "ক্লাস রুটিনের সারণি, ছোট পর্দায় পাশে স্ক্রল করুন",
    weekly: "সাপ্তাহিক ক্লাস রুটিন:",
    today: "আজ",
    now: "এখন",
    lab: "ল্যাব",
    periodTpl: "পিরিয়ড {n}",
    periodsTpl: "{n} পিরিয়ড",
    minutesTpl: "{n} মিনিট",
    time: "সময়",
    days: ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার"],
    examsK: "পরীক্ষা পদ্ধতি",
    exams: "পরীক্ষা পদ্ধতি",
    examLink: "পরীক্ষার সময়সূচি ও ফলাফল অনুসন্ধান",
    grading: "গ্রেডিং পদ্ধতি",
    gradingText: "এসএসসি, এইচএসসি ও অভ্যন্তরীণ পরীক্ষায় ব্যবহৃত লেটার গ্রেড ও গ্রেড পয়েন্ট।",
    marks: "নম্বর",
    grade: "গ্রেড",
    point: "পয়েন্ট",
    resK: "সিলেবাস ও রিসোর্স",
    res: "সিলেবাস ও রিসোর্স",
    resSample: "এই ডেমোর জন্য তৈরি নমুনা কাগজপত্র।",
    resNone: "এখনো কোনো একাডেমিক রিসোর্স নেই।",
    allDownloads: "সব ডাউনলোড",
    polK: "নীতিমালা",
    pol: "শিক্ষার্থী ও অভিভাবকদের জন্য নীতিমালা",
    fullPol: "বিদ্যালয়ের পূর্ণ নীতিমালা",
  },
};
// Sections of the former single Academic page, each now on its own route.
const dayKeys = ["sat", "sun", "mon", "tue", "wed", "thu"] as const;

type AcademicSettings = {
  examSystem: { title: string; text: string }[];
  grading: { range: string; grade: string; point: string | number }[];
  timings: string;
};

async function ctx() {
  const [academic, settings, events, downloads, site, today] = await Promise.all([
    getAcademic(),
    getSetting<AcademicSettings>("academic"),
    getEvents(),
    getDownloads(),
    getSite(),
    getToday(),
  ]);
  const { t, lang } = await getI18n();
  const c = copy[lang];
  const days = dayKeys.map((k, i) => [k, c.days[i]] as const);
  const n = (v: string | number) => (lang === "bn" ? toBnDigits(v) : String(v));
  const { levels: academicLevels, subjects: subjectsByLevel, routines, policies } = academic;
  const { examSystem, grading: gradingScale } = settings;
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= today).slice(0, 6);
  const resources = downloads.filter((d) => d.category === "academic");

  return { academic, settings, events, downloads, site, today, t, lang, c, days, n, academicLevels, subjectsByLevel, routines, policies, examSystem, gradingScale, upcoming, resources };
}

export async function LevelsPart() {
  const { c, lang, academicLevels } = await ctx();
  const L = lang === "bn" ? { level: "স্তর", classes: "শ্রেণি", ages: "বয়স", about: "বিবরণ" } : { level: "Level", classes: "Classes", ages: "Ages", about: "About" };
  return (
    <Box id="levels-h" title={c.levels} bodyClassName="p-0">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={c.levels}>
        <table className={`${table} min-w-[40rem]`}>
          <caption className="sr-only">{c.levels}</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>{L.level}</th>
              <th scope="col" className={th}>{L.classes}</th>
              <th scope="col" className={th}>{L.ages}</th>
              <th scope="col" className={th}>{L.about}</th>
            </tr>
          </thead>
          <tbody>
            {academicLevels.map((l) => (
              <tr key={l.id}>
                <th scope="row" className={`${td} font-semibold whitespace-nowrap text-heading`}>{l.name}</th>
                <td className={`${td} whitespace-nowrap`}>{l.classes}</td>
                <td className={`${td} whitespace-nowrap`}>{l.ages.replace(/^(Ages|বয়স)\s*/, "")}</td>
                <td className={td}>
                  {l.summary}
                  {l.groups && l.groups.length > 0 && (
                    <span className="mt-1 block text-sm text-muted">
                      {c.groups}: {l.groups.join(", ")}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Box>
  );
}

export async function CurriculumPart() {
  const { c, subjectsByLevel } = await ctx();
  return (
    <Box id="curr-h" title={c.curr}>
      <p className="text-ink">{c.currText}</p>
      <div className="mt-4 space-y-5">
        {subjectsByLevel.map((l) => (
          <div key={l.level}>
            <h3 className="border-b border-line pb-1 font-semibold text-heading">{l.level}</h3>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-muted">{c.compulsory}</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink marker:text-muted">
                  {l.compulsory.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              {l.optional.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-muted">{c.groupSubjects}</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink marker:text-muted">
                    {l.optional.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

export async function RoutinePart() {
  const { settings, site, lang, c, days, routines } = await ctx();
  return (
    <section id="routine" aria-labelledby="routine-h" className="border border-line bg-surface">
      <div className="box-head bg-navy-800 px-4 py-2 text-white">
        <h2 id="routine-h" className="text-[1.05rem] font-semibold">{c.routine}</h2>
      </div>
      <div className="p-4">
        <p className="text-ink">
          {c.routineText}
          {site.demoNote && <span className="text-muted"> ({lang === "bn" ? "নমুনা" : "Sample"})</span>}
        </p>
        <RoutinePicker
          routines={routines}
          grid={{
            time: c.time,
            days: days.map(([, label]) => label),
            today: c.today,
            now: c.now,
            lab: c.lab,
            period: c.periodTpl,
            periods: c.periodsTpl,
            minutes: c.minutesTpl,
            scrollHint: c.routineLabel,
            bangla: lang === "bn",
          }}
          labels={{ klass: c.klass, section: c.sectionL, shift: c.shiftL, print: c.printRoutine, none: c.noRoutine, caption: c.weekly }}
        />
        {settings.timings && <p className="mt-3 text-sm text-muted">{settings.timings}</p>}
      </div>
    </section>
  );
}

export async function ExamsPart() {
  const { c, n, examSystem, gradingScale } = await ctx();
  return (
    <>
      <Box id="exams-h" title={c.exams}>
        <dl className="divide-y divide-line">
          {examSystem.map((e) => (
            <div key={e.title} className="py-3 first:pt-0 last:pb-0">
              <dt className="font-semibold text-heading">{e.title}</dt>
              <dd className="mt-0.5 leading-relaxed text-ink">{e.text}</dd>
            </div>
          ))}
        </dl>
        <Link href="/results" className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
          {c.examLink}
        </Link>
      </Box>
      <Box id="grading-h" title={c.grading} bodyClassName="p-0">
        <p className="px-4 pt-3 text-sm text-muted">{c.gradingText}</p>
        <table className={table}>
          <caption className="sr-only">{c.grading}</caption>
          <thead>
            <tr>
              <th scope="col" className={th}>{c.marks}</th>
              <th scope="col" className={th}>{c.grade}</th>
              <th scope="col" className={`${th} text-right`}>{c.point}</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {gradingScale.map((g) => (
              <tr key={g.grade}>
                <td className={td}>{n(g.range)}</td>
                <th scope="row" className={`${td} font-semibold text-heading`}>{g.grade}</th>
                <td className={`${td} text-right`}>{n(g.point)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}

export async function ResourcesPart() {
  const { site, t, lang, c, resources } = await ctx();
  const L = lang === "bn" ? { no: "ক্রম", title: "শিরোনাম", updated: "হালনাগাদ", file: "ডাউনলোড" } : { no: "No.", title: "Title", updated: "Updated", file: "Download" };
  return (
    <>
      {site.demoNote && <p className="text-sm text-muted">{c.resSample}</p>}
      {resources.length === 0 ? (
        <p className="text-muted">{c.resNone}</p>
      ) : (
        <div className={tableWrap}>
          <table className={`${table} min-w-[30rem]`}>
            <caption className="sr-only">{c.res}</caption>
            <thead>
              <tr>
                <th scope="col" className={`${th} w-14`}>{L.no}</th>
                <th scope="col" className={th}>{L.title}</th>
                <th scope="col" className={`${th} w-32`}>{L.updated}</th>
                <th scope="col" className={`${th} w-24 text-center`}>{L.file}</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r, i) => (
                <tr key={r.id}>
                  <td className={`${td} text-muted`}>{lang === "bn" ? toBnDigits(i + 1) : i + 1}</td>
                  <td className={td}>
                    <a href={r.href} target="_blank" rel="noopener" className="text-heading hover:text-accent hover:underline underline-offset-4">{r.title}</a>
                    <span className="block text-sm text-muted">{r.description}</span>
                  </td>
                  <td className={`${td} whitespace-nowrap`}>{r.updated ? formatDate(r.updated, lang) : "–"}</td>
                  <td className={`${td} text-center`}>
                    <a href={r.href} target="_blank" rel="noopener" download className="inline-flex size-9 items-center justify-center border border-line-strong text-heading hover:bg-navy-800 hover:text-white">
                      <Download aria-hidden className="size-4" />
                      <span className="sr-only">{t.common.downloadPdf}: {r.title}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link href="/downloads" className="inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
        {c.allDownloads}
      </Link>
    </>
  );
}
