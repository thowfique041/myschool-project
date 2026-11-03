import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, ButtonLink, Card, SampleTag, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/shared/cards";
import { academicLevels, examSystem, gradingScale, policies, sampleRoutine, subjectsByLevel } from "@/data/academics";
import { calendarEvents } from "@/data/calendar";
import { downloads } from "@/data/downloads";
import { formatDateEn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Academic Information",
  description: "Academic levels, subjects, class routine, examinations, grading and student policies at Webnion School & College.",
};

const days = [
  ["sat", "Saturday"],
  ["sun", "Sunday"],
  ["mon", "Monday"],
  ["tue", "Tuesday"],
  ["wed", "Wednesday"],
  ["thu", "Thursday"],
] as const;

export default function AcademicPage() {
  const upcoming = calendarEvents.filter((e) => e.date >= "2026-11-01").slice(0, 6);
  const resources = downloads.filter((d) => d.category === "Academic");

  return (
    <>
      <PageHeader
        title="Academic Information"
        titleBn="একাডেমিক তথ্য"
        description="How teaching, routines and examinations work at each level — following the national curriculum."
      />

      <nav aria-label="On this page" className="sticky top-[4.5rem] z-20 border-b border-line bg-paper/95 backdrop-blur sm:top-20">
        <ul className="container-page flex gap-1 overflow-x-auto py-2 text-sm whitespace-nowrap">
          {[
            ["#levels", "Levels"],
            ["#curriculum", "Curriculum"],
            ["#calendar", "Calendar"],
            ["#routine", "Class routine"],
            ["#exams", "Examinations"],
            ["#resources", "Syllabus & resources"],
            ["#policies", "Policies"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="inline-flex min-h-9 items-center rounded-md px-3 font-medium text-navy-800 hover:bg-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="levels" aria-labelledby="levels-h" className="scroll-mt-36 py-16">
        <div className="container-page">
          <SectionHeading id="levels-h" kicker="শিক্ষা স্তর" title="Academic levels and classes" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {academicLevels.map((l, i) => (
              <Reveal key={l.id} delay={i * 0.05}>
                <Card className="h-full p-6">
                  <p lang="bn" className="text-sm text-leaf-700">{l.nameBn}</p>
                  <h3 className="font-serif text-xl font-semibold text-navy-900">{l.name}</h3>
                  <p className="text-sm font-semibold text-navy-700">
                    {l.classes} · {l.ages}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{l.summary}</p>
                  {l.groups && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-muted uppercase">Groups</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {l.groups.map((g) => (
                          <Badge key={g}>{g}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="curriculum" aria-labelledby="curr-h" className="scroll-mt-36 border-y border-line bg-white py-16">
        <div className="container-page">
          <SectionHeading
            id="curr-h"
            kicker="পাঠ্যক্রম"
            title="Subjects and curriculum"
            description="All classes use NCTB textbooks. Subject names follow the current national curriculum for each level."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {subjectsByLevel.map((s) => (
              <Reveal key={s.level}>
                <div className="h-full rounded-xl border border-line p-6">
                  <h3 className="font-semibold text-navy-900">{s.level}</h3>
                  <p className="mt-3 text-xs font-semibold text-muted uppercase">Compulsory</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.compulsory.map((c) => (
                      <li key={c} className="rounded-md bg-paper px-2.5 py-1 text-sm text-ink">
                        {c}
                      </li>
                    ))}
                  </ul>
                  {s.optional && (
                    <>
                      <p className="mt-4 text-xs font-semibold text-muted uppercase">Group subjects</p>
                      <ul className="mt-2 space-y-1.5 text-sm text-ink">
                        {s.optional.map((o) => (
                          <li key={o} className="flex gap-2">
                            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="calendar" aria-labelledby="cal-h" className="scroll-mt-36 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading id="cal-h" kicker="একাডেমিক ক্যালেন্ডার" title="Academic calendar" description="The next important dates. The full calendar has every holiday, exam and event for the session." />
            <ButtonLink href="/calendar" variant="outline" className="mt-6">
              Full academic calendar
            </ButtonLink>
          </div>
          <ul className="divide-y divide-line rounded-xl border border-line bg-white">
            {upcoming.map((e) => (
              <li key={e.date + e.title} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6">
                <time dateTime={e.date} className="w-44 shrink-0 text-sm font-semibold text-navy-900">
                  {formatDateEn(e.date)}
                  {e.endDate && ` – ${formatDateEn(e.endDate)}`}
                </time>
                <span className="flex-1 text-ink">
                  {e.title}
                  <span lang="bn" className="block text-sm text-muted">{e.titleBn}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="routine" aria-labelledby="routine-h" className="scroll-mt-36 border-y border-line bg-white py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="routine-h" kicker="ক্লাস রুটিন" title="Class routine" description="School week: Saturday to Thursday. Friday is the weekly holiday." />
            <SampleTag />
          </div>
          <div className="mt-6 rounded-xl border border-line">
            <p className="border-b border-line bg-paper px-4 py-3 text-sm font-semibold text-navy-900">{sampleRoutine.title}</p>
            <div className="overflow-x-auto" tabIndex={0} aria-label="Class routine table, scroll horizontally on small screens">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <caption className="sr-only">Weekly class routine for Class 8 Section A, morning shift</caption>
                <thead>
                  <tr className="border-b border-line text-xs text-muted uppercase">
                    <th scope="col" className="px-4 py-3 font-semibold">Time</th>
                    {days.map(([k, label]) => (
                      <th key={k} scope="col" className="px-4 py-3 font-semibold">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {sampleRoutine.rows.map((row) => {
                    const isBreak = row.sat === "Break" || row.sat === "Assembly";
                    return (
                      <tr key={row.time} className={isBreak ? "bg-leaf-50/60" : undefined}>
                        <th scope="row" className="px-4 py-3 font-semibold whitespace-nowrap text-navy-900">
                          {row.time}
                        </th>
                        {isBreak ? (
                          <td colSpan={6} className="px-4 py-3 text-center font-medium text-leaf-700">
                            {row.sat}
                          </td>
                        ) : (
                          days.map(([k]) => (
                            <td key={k} className="px-4 py-3 text-ink">
                              {row[k]}
                            </td>
                          ))
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">
            Morning shift: 7:30 AM – 12:15 PM · Day shift: 12:30 PM – 5:00 PM · Higher secondary: 9:00 AM – 2:30 PM
          </p>
        </div>
      </section>

      <section id="exams" aria-labelledby="exams-h" className="scroll-mt-36 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <SectionHeading id="exams-h" kicker="পরীক্ষা পদ্ধতি" title="Examination system" />
            <ol className="mt-6 space-y-4">
              {examSystem.map((e, i) => (
                <li key={e.title} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                  <span className="font-serif text-2xl font-semibold text-navy-200">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{e.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{e.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ArrowLink href="/results" className="mt-5">
              Exam schedule and result search
            </ArrowLink>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-navy-900">Grading scale</h3>
            <p className="mt-1 text-sm text-muted">Letter grades and grade points used for SSC, HSC and internal examinations.</p>
            <table className="mt-4 w-full overflow-hidden rounded-xl border border-line bg-white text-sm">
              <thead className="bg-navy-800 text-left text-xs text-white uppercase">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Marks</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Grade</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {gradingScale.map((g) => (
                  <tr key={g.grade}>
                    <td className="px-4 py-2.5">{g.range}</td>
                    <td className="px-4 py-2.5 font-semibold text-navy-900">{g.grade}</td>
                    <td className="px-4 py-2.5 tabular-nums">{g.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="resources" aria-labelledby="res-h" className="scroll-mt-36 border-y border-line bg-white py-16">
        <div className="container-page">
          <SectionHeading id="res-h" kicker="সিলেবাস ও রিসোর্স" title="Syllabus and resources" description="Sample documents prepared for this demonstration." />
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {resources.map((r) => (
              <li key={r.id} className="flex items-start gap-4 rounded-xl border border-line p-5">
                <FileText aria-hidden className="mt-0.5 size-6 shrink-0 text-signal-600" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy-900">{r.title}</p>
                  <p className="text-sm text-muted">{r.description}</p>
                  <a href={r.href} download className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700 hover:underline underline-offset-4">
                    <Download aria-hidden className="size-4" /> Download PDF
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <ArrowLink href="/notices#downloads" className="mt-5">
            All downloads
          </ArrowLink>
        </div>
      </section>

      <section id="policies" aria-labelledby="pol-h" className="scroll-mt-36 py-16">
        <div className="container-page">
          <SectionHeading id="pol-h" kicker="নীতিমালা" title="Policies for students and guardians" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {policies.map((p) => (
              <div key={p.id} className="rounded-xl border border-line bg-white p-6">
                <h3 className="font-semibold text-navy-900">{p.title}</h3>
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
            Full school policies
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
