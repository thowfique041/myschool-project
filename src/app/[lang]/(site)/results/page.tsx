import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote, SectionHeading } from "@/components/ui/primitives";
import { SampleTag } from "@/components/ui/SampleTag";
import { ResultLookup } from "@/components/explorers/ResultLookup";
import { NoticeRow } from "@/components/shared/cards";
import { getBoardResults, getExamSchedule, getNotices, getResultOptions, getSite } from "@/content/site-content";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Results & Examinations",
    alt: "ফলাফল ও পরীক্ষা",
    intro: "Search internal examination results, check the exam schedule and read examination notices.",
    meta: "Examination notices, the annual exam schedule, a sample result search and SSC/HSC result summaries.",
    demoStrong: "Demonstration only.",
    demoText: "The result search uses a handful of made-up sample records. No real student data is shown here.",
    searchKicker: "ফলাফল অনুসন্ধান",
    search: "Result search",
    schedKicker: "পরীক্ষার সময়সূচি",
    sched: (name: string, year: string) => `${name} ${year} schedule`,
    schedNone: "Examination schedule",
    schedNoneText: "The next examination schedule will be published here.",
    schedLabel: "Examination schedule",
    date: "Date",
    day: "Day",
    subject: "Subject",
    classes: "Classes",
    routine: "Download routine (PDF)",
    notices: "Examination notices",
    noNotices: "No examination notices.",
    sumKicker: "পাবলিক পরীক্ষা",
    sum: "SSC & HSC result summary",
    sumSample: "Illustrative figures for the demonstration — not real board results.",
    sumLabel: "Board examination summary",
    exam: "Examination",
    examinees: "Examinees",
    passed: "Passed",
    rate: "Pass rate",
    gpa5: "GPA 5.00",
  },
  bn: {
    title: "ফলাফল ও পরীক্ষা",
    alt: "Results & Examinations",
    intro: "অভ্যন্তরীণ পরীক্ষার ফলাফল খুঁজুন, পরীক্ষার সময়সূচি দেখুন এবং পরীক্ষা সংক্রান্ত নোটিশ পড়ুন।",
    meta: "পরীক্ষার নোটিশ, বার্ষিক পরীক্ষার সময়সূচি, নমুনা ফলাফল অনুসন্ধান এবং এসএসসি/এইচএসসি ফলাফলের সারসংক্ষেপ।",
    demoStrong: "শুধু প্রদর্শনের জন্য।",
    demoText: "ফলাফল অনুসন্ধানে কয়েকটি বানানো নমুনা রেকর্ড ব্যবহার করা হয়েছে। এখানে কোনো আসল শিক্ষার্থীর তথ্য নেই।",
    searchKicker: "Result search",
    search: "ফলাফল অনুসন্ধান",
    schedKicker: "Exam schedule",
    sched: (name: string, year: string) => `${name} ${year}-এর সময়সূচি`,
    schedNone: "পরীক্ষার সময়সূচি",
    schedNoneText: "পরবর্তী পরীক্ষার সময়সূচি এখানে প্রকাশ করা হবে।",
    schedLabel: "পরীক্ষার সময়সূচি",
    date: "তারিখ",
    day: "বার",
    subject: "বিষয়",
    classes: "শ্রেণি",
    routine: "রুটিন ডাউনলোড (পিডিএফ)",
    notices: "পরীক্ষা সংক্রান্ত নোটিশ",
    noNotices: "পরীক্ষা সংক্রান্ত কোনো নোটিশ নেই।",
    sumKicker: "Public examinations",
    sum: "এসএসসি ও এইচএসসি ফলাফলের সারসংক্ষেপ",
    sumSample: "ডেমোর জন্য নমুনা সংখ্যা — বোর্ডের আসল ফলাফল নয়।",
    sumLabel: "বোর্ড পরীক্ষার সারসংক্ষেপ",
    exam: "পরীক্ষা",
    examinees: "পরীক্ষার্থী",
    passed: "উত্তীর্ণ",
    rate: "পাসের হার",
    gpa5: "জিপিএ ৫.০০",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function ResultsPage() {
  const [sortedNotices, schedule, board, options, site, { lang }] = await Promise.all([getNotices(), getExamSchedule(), getBoardResults(), getResultOptions(), getSite(), getI18n()]);
  const c = copy[lang];
  const n = (v: number | string) => (lang === "bn" ? toBnDigits(v) : String(v));
  const examNotices = sortedNotices.filter((n) => n.category === "exam").slice(0, 6);
  const isDemo = Boolean(site.demoNote);
  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} description={c.intro} />

      {isDemo && (
        <div className="container-page pt-10">
          <DemoNote>
            <strong>{c.demoStrong}</strong> {c.demoText}
          </DemoNote>
        </div>
      )}

      <section id="search" aria-labelledby="search-h" className="scroll-mt-24 py-12">
        <div className="container-page">
          <SectionHeading id="search-h" kicker={c.searchKicker} title={c.search} />
          <div className="mt-8">
            <ResultLookup options={options} isDemo={isDemo} />
          </div>
        </div>
      </section>

      <section id="schedule" aria-labelledby="sched-h" className="scroll-mt-24 border-y border-line bg-surface py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          {schedule ? <div className="min-w-0">
            <SectionHeading id="sched-h" kicker={c.schedKicker} title={c.sched(schedule.name, schedule.year)} description={schedule.note || undefined} />
            <div className="mt-6 overflow-x-auto rounded-xl border border-line" tabIndex={0} aria-label={c.schedLabel}>
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-paper text-xs text-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">{c.date}</th>
                    <th scope="col" className="px-4 py-3 font-semibold">{c.day}</th>
                    <th scope="col" className="px-4 py-3 font-semibold">{c.subject}</th>
                    <th scope="col" className="px-4 py-3 font-semibold">{c.classes}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {schedule.rows.map((e) => (
                    <tr key={e.date + e.subject}>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap text-heading">{formatDate(e.date, lang)}</td>
                      <td className="px-4 py-3 text-muted">{e.day}</td>
                      <td className="px-4 py-3 text-ink">{e.subject}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted">{e.classes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {schedule.file && (
              <a href={schedule.file} target="_blank" rel="noopener" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline underline-offset-4">
                {c.routine}
              </a>
            )}
          </div> : <div className="min-w-0">
            <SectionHeading id="sched-h" kicker={c.schedKicker} title={c.schedNone} description={c.schedNoneText} />
          </div>}
          <div>
            <h2 className="font-serif text-xl font-semibold text-heading">{c.notices}</h2>
            <div className="mt-3 divide-y divide-line">
              {examNotices.length === 0 && <p className="py-4 text-sm text-muted">{c.noNotices}</p>}
              {examNotices.map((n) => (
                <NoticeRow key={n.slug} notice={n} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="summary" aria-labelledby="sum-h" className="scroll-mt-24 py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="sum-h" kicker={c.sumKicker} title={c.sum} description={board.isSample ? c.sumSample : undefined} />
            {board.isSample && <SampleTag />}
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-surface" tabIndex={0} aria-label={c.sumLabel}>
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-brand text-xs text-white uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">{c.exam}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.examinees}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.passed}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.rate}</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">{c.gpa5}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {board.rows.map((b) => (
                  <tr key={b.exam + b.year}>
                    <th scope="row" className="px-4 py-3 font-semibold text-heading">
                      {b.exam} {b.year}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{n(b.examinees)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{n(b.passed)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{n(b.examinees ? ((b.passed / b.examinees) * 100).toFixed(1) : "0.0")}%</td>
                    <td className="px-4 py-3 text-right tabular-nums">{n(b.aPlus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
