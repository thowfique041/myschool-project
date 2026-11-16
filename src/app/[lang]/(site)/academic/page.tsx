import type { Metadata } from "next";
import { ChevronDown, Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink, SectionHeading, buttonClasses } from "@/components/ui/primitives";
import { SampleTag } from "@/components/ui/SampleTag";
import { RoutinePicker } from "@/components/academic/RoutinePicker";
import { SectionNav } from "@/components/academic/SectionNav";
import { SubjectTabs } from "@/components/academic/SubjectTabs";
import { DateBlock } from "@/components/shared/cards";
import { ArrowLink } from "@/components/shared/cards";
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

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

const dayKeys = ["sat", "sun", "mon", "tue", "wed", "thu"] as const;

type AcademicSettings = {
  examSystem: { title: string; text: string }[];
  grading: { range: string; grade: string; point: string | number }[];
  timings: string;
};

export default async function AcademicPage() {
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

  return (
    <>
      <PageHeader
        title={c.title}
        titleBn={c.alt}
        description={c.intro}
      />

      <SectionNav
        label={c.onPage}
        items={[
          ["levels", c.nav.levels],
          ["curriculum", c.nav.curriculum],
          ["calendar", c.nav.calendar],
          ["routine", c.nav.routine],
          ["exams", c.nav.exams],
          ["resources", c.nav.resources],
          ["policies", c.nav.policies],
        ]}
      />

      <section id="levels" aria-labelledby="levels-h" className="scroll-mt-36 py-16">
        <div className="container-page">
          <SectionHeading id="levels-h" title={c.levels} />
          {/* Programmes as an editorial three-column spread, divided by hairlines rather than boxed. */}
          <ol className="mt-8 grid border-t-2 border-forest-800 lg:grid-cols-3 dark:border-forest-300">
            {academicLevels.map((l, i) => (
              <li key={l.id} className="lift border-b border-line px-1 py-7 hover:bg-surface sm:px-6 lg:border-b-0 lg:not-first:border-l">
                <p aria-hidden className="font-serif text-4xl font-semibold text-crimson-600 dark:text-accent">{n(String(i + 1).padStart(2, "0"))}</p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-heading">{l.name}</h3>
                <p className="mt-1 text-xs font-semibold tracking-wide text-subheading uppercase">
                  {l.classes} · {l.ages}
                </p>
                <p className="mt-4 leading-relaxed text-muted">{l.summary}</p>
                {l.groups && l.groups.length > 0 && (
                  <p className="mt-5 border-t border-line pt-4 text-sm">
                    <span className="font-semibold text-heading">{c.groups}: </span>
                    <span className="text-ink">{l.groups.join(" · ")}</span>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="curriculum" aria-labelledby="curr-h" className="scroll-mt-36 border-y border-line bg-surface py-16">
        <div className="container-page">
          <SectionHeading
            id="curr-h"
            title={c.curr}
            description={c.currText}
          />
          <SubjectTabs levels={subjectsByLevel} label={c.curr} compulsoryLabel={c.compulsory} groupLabel={c.groupSubjects} />
        </div>
      </section>

      <section id="calendar" aria-labelledby="cal-h" className="scroll-mt-36 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="cal-h" title={c.cal} description={c.calText} />
            <ButtonLink href="/calendar" variant="outline" className="mt-6">
              {c.fullCal}
            </ButtonLink>
          </div>
          {/* Chronological timeline: date in the margin, burgundy marker on the spine. */}
          <ol className="relative border-l-2 border-line-strong pl-0">
            {upcoming.length === 0 && <li className="py-4 pl-6 text-muted">{t.common.upcomingNone}</li>}
            {upcoming.map((e, k) => (
              <li key={e.date + e.title} className="relative flex gap-5 py-4 pl-6">
                <span aria-hidden className={`absolute top-7 -left-[7px] size-3 rounded-full ring-4 ring-paper ${k === 0 ? "bg-crimson-600 dark:bg-accent" : "bg-line-strong"}`} />
                <DateBlock iso={e.date} />
                <div className="self-center">
                  <p className="font-semibold text-heading">{e.title}</p>
                  {e.endDate && (
                    <p className="text-sm text-muted">
                      {formatDate(e.date, lang)} – {formatDate(e.endDate, lang)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="routine" aria-labelledby="routine-h" className="scroll-mt-36 border-y border-line bg-surface py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="routine-h" title={c.routine} description={c.routineText} />
            {site.demoNote && <SampleTag />}
          </div>
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

      <section id="exams" aria-labelledby="exams-h" className="scroll-mt-36 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <SectionHeading id="exams-h" title={c.exams} />
            {/* Numbered process: one ruled row per stage, stage number in the margin. */}
            <ol className="mt-6 border-t-2 border-forest-800 dark:border-forest-300">
              {examSystem.map((e, i) => (
                <li key={e.title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-5">
                  <span className="font-serif text-3xl leading-none font-semibold text-crimson-600 tabular-nums dark:text-accent">
                    <span className="sr-only">{c.stepL} </span>
                    {n(String(i + 1).padStart(2, "0"))}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-heading">{e.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ArrowLink href="/results" className="mt-5">
              {c.examLink}
            </ArrowLink>
          </div>
          <div>
            <h3 className="font-serif text-2xl leading-tight font-semibold text-heading">{c.grading}</h3>
            <p className="mt-1 text-sm text-muted">{c.gradingText}</p>
            <table className="mt-5 w-full text-left">
              <thead className="border-y-2 border-forest-800 dark:border-forest-300">
                <tr>
                  <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.marks}</th>
                  <th scope="col" className="eyebrow py-3 pr-4 text-subheading">{c.grade}</th>
                  <th scope="col" className="eyebrow py-3 text-right text-subheading">{c.point}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-b border-line tabular-nums">
                {gradingScale.map((g) => (
                  <tr key={g.grade} className="hover:bg-surface">
                    <td className="py-3 pr-4 text-ink">{n(g.range)}</td>
                    <th scope="row" className="py-3 pr-4 text-left font-serif text-xl font-semibold text-heading">{g.grade}</th>
                    <td className="py-3 text-right font-semibold text-heading">{n(g.point)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="resources" aria-labelledby="res-h" className="scroll-mt-36 border-y border-line bg-surface py-16">
        <div className="container-page">
          <SectionHeading id="res-h" title={c.res} description={site.demoNote ? c.resSample : undefined} />
          {/* Resource library: ruled rows with file details and a clear download action. */}
          <ul className="mt-6 border-t-2 border-forest-800 dark:border-forest-300">
            {resources.length === 0 && <li className="py-4 text-muted">{c.resNone}</li>}
            {resources.map((r) => (
              <li key={r.id} className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:gap-6">
                <FileText aria-hidden className="hidden size-7 shrink-0 text-crimson-600 sm:block dark:text-accent" />
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-semibold text-heading">{r.title}</p>
                  <p className="text-sm text-muted">{r.description}</p>
                  <p className="mt-1 text-xs text-muted">
                    PDF{r.size && !/^pdf$/i.test(r.size) && ` · ${r.size}`}
                    {r.updated && ` · ${c.updatedL} ${formatDate(r.updated, lang)}`}
                  </p>
                </div>
                <a href={r.href} target="_blank" rel="noopener" download className={`${buttonClasses("outline", "sm")} self-start sm:self-center`}>
                  <Download aria-hidden className="size-4" />
                  {t.common.downloadPdf}
                  <span className="sr-only">: {r.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <ArrowLink href="/notices#downloads" className="mt-5">
            {c.allDownloads}
          </ArrowLink>
        </div>
      </section>

      <section id="policies" aria-labelledby="pol-h" className="scroll-mt-36 py-16">
        <div className="container-page">
          <SectionHeading id="pol-h" title={c.pol} />
          {/* Grouped disclosures (native details/summary: keyboard and screen-reader friendly without script). */}
          <div className="mt-8 grid gap-x-10 border-t-2 border-forest-800 md:grid-cols-2 dark:border-forest-300">
            {[policies.filter((_, k) => k % 2 === 0), policies.filter((_, k) => k % 2 === 1)].map((col, ci) => (
              <div key={ci}>
                {col.map((p, k) => (
                  <details key={p.id} open={ci === 0 && k === 0} className="group border-b border-line">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-lg font-semibold text-heading hover:text-accent [&::-webkit-details-marker]:hidden">
                      {p.title}
                      <ChevronDown aria-hidden className="size-5 shrink-0 text-crimson-600 transition-transform group-open:rotate-180 motion-reduce:transition-none dark:text-accent" />
                    </summary>
                    <ul className="space-y-2 pb-5 text-muted">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-crimson-600 dark:bg-accent" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            ))}
          </div>
          <ArrowLink href="/policies" className="mt-6">
            {c.fullPol}
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
