import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink, SectionHeading } from "@/components/ui/primitives";
import { SampleTag } from "@/components/ui/SampleTag";
import { RoutineGrid } from "@/components/explorers/RoutineGrid";
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

      <nav aria-label={c.onPage} className="sticky top-[4.5rem] z-20 border-b border-line bg-paper sm:top-20">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 text-sm whitespace-nowrap">
          {[
            ["#levels", c.nav.levels],
            ["#curriculum", c.nav.curriculum],
            ["#calendar", c.nav.calendar],
            ["#routine", c.nav.routine],
            ["#exams", c.nav.exams],
            ["#resources", c.nav.resources],
            ["#policies", c.nav.policies],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="inline-flex min-h-9 items-center rounded-md px-3 font-medium text-heading hover:bg-surface">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="levels" aria-labelledby="levels-h" className="scroll-mt-36 py-16">
        <div className="container-page">
          <SectionHeading id="levels-h" title={c.levels} />
          {/* Programmes as an editorial three-column spread, divided by hairlines rather than boxed. */}
          <ol className="mt-8 grid border-t-2 border-navy-800 lg:grid-cols-3 dark:border-navy-300">
            {academicLevels.map((l, i) => (
              <li key={l.id} className="lift border-b border-line px-1 py-7 hover:bg-surface sm:px-6 lg:border-b-0 lg:not-first:border-l">
                <p aria-hidden className="font-serif text-4xl font-semibold text-leaf-600 dark:text-accent">{n(String(i + 1).padStart(2, "0"))}</p>
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
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {subjectsByLevel.map((s) => (
              <div key={s.level}>
                <div className="lift h-full border border-line bg-surface p-6">
                  <h3 className="font-semibold text-heading">{s.level}</h3>
                  <p className="mt-3 text-xs font-semibold text-muted uppercase">{c.compulsory}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.compulsory.map((c) => (
                      <li key={c} className="rounded-md bg-paper px-2.5 py-1 text-sm text-ink">
                        {c}
                      </li>
                    ))}
                  </ul>
                  {s.optional.length > 0 && (
                    <>
                      <p className="mt-4 text-xs font-semibold text-muted uppercase">{c.groupSubjects}</p>
                      <ul className="mt-2 space-y-1.5 text-sm text-ink">
                        {s.optional.map((o) => (
                          <li key={o} className="flex gap-2">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-navy-400" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
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
          <ul className="divide-y divide-line border border-line bg-surface">
            {upcoming.length === 0 && <li className="px-5 py-4 text-muted">{t.common.upcomingNone}</li>}
            {upcoming.map((e) => (
              <li key={e.date + e.title} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                <time dateTime={e.date} className="w-44 shrink-0 text-sm font-semibold text-heading">
                  {formatDate(e.date, lang)}
                  {e.endDate && ` – ${formatDate(e.endDate, lang)}`}
                </time>
                <span className="flex-1 text-ink">
                  {e.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="routine" aria-labelledby="routine-h" className="scroll-mt-36 border-y border-line bg-surface py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="routine-h" title={c.routine} description={c.routineText} />
            {site.demoNote && <SampleTag />}
          </div>
          {routines.map((routine) => (
          <div key={routine.title} className="mt-6 border border-line">
            <p className="border-b border-line bg-paper px-4 py-3 text-sm font-semibold text-heading">{routine.title}</p>
            <RoutineGrid
              rows={routine.rows}
              rowsEn={routine.rowsEn}
              labels={{
                title: routine.title,
                time: c.time,
                days: days.map(([, label]) => label),
                today: c.today,
                now: c.now,
                lab: c.lab,
                period: c.periodTpl,
                periods: c.periodsTpl,
                minutes: c.minutesTpl,
                caption: `${c.weekly} ${routine.title}`,
                scrollHint: c.routineLabel,
                bangla: lang === "bn",
              }}
            />
          </div>
          ))}
          {settings.timings && <p className="mt-3 text-sm text-muted">{settings.timings}</p>}
        </div>
      </section>

      <section id="exams" aria-labelledby="exams-h" className="scroll-mt-36 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <SectionHeading id="exams-h" title={c.exams} />
            <ol className="mt-6 space-y-4">
              {examSystem.map((e, i) => (
                <li key={e.title} className="flex gap-4 border border-line bg-surface p-5">
                  <span className="font-serif text-2xl font-semibold text-navy-200 dark:text-navy-600">{n(i + 1)}</span>
                  <div>
                    <h3 className="font-semibold text-heading">{e.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ArrowLink href="/results" className="mt-5">
              {c.examLink}
            </ArrowLink>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-heading">{c.grading}</h3>
            <p className="mt-1 text-sm text-muted">{c.gradingText}</p>
            <table className="mt-4 w-full overflow-hidden border border-line bg-surface text-sm">
              <thead className="bg-brand text-left text-xs text-white uppercase">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">{c.marks}</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">{c.grade}</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">{c.point}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {gradingScale.map((g) => (
                  <tr key={g.grade}>
                    <td className="px-4 py-2.5">{n(g.range)}</td>
                    <td className="px-4 py-2.5 font-semibold text-heading">{g.grade}</td>
                    <td className="px-4 py-2.5 tabular-nums">{n(g.point)}</td>
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
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {resources.length === 0 && <li className="text-muted">{c.resNone}</li>}
            {resources.map((r) => (
              <li key={r.id} className="flex items-start gap-4 border border-line p-5">
                <FileText aria-hidden className="mt-0.5 size-6 shrink-0 text-danger" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-heading">{r.title}</p>
                  <p className="text-sm text-muted">{r.description}</p>
                  <a href={r.href} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline underline-offset-4">
                    <Download aria-hidden className="size-4" /> {t.common.downloadPdf}
                  </a>
                </div>
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
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {policies.map((p) => (
              <div key={p.id} className="border border-line bg-surface p-6">
                <h3 className="font-semibold text-heading">{p.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-navy-300" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ArrowLink href="/policies" className="mt-5">
            {c.fullPol}
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
