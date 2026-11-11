import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { ResultLookup } from "@/components/explorers/ResultLookup";
import { Box } from "@/components/portal/Box";
import { FullWidth } from "@/components/portal/Sidebar";
import { table, td, th } from "@/components/portal/table";
import { getBoardResults, getExamSchedule, getResultOptions, getSite } from "@/content/site-content";
import { toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Results & Examinations",
    alt: "ফলাফল ও পরীক্ষা",
    intro: "Search internal examination results, check the exam schedule and read examination notices.",
    meta: "Examination notices, the annual exam schedule, a result search and SSC/HSC result summaries.",
    demoStrong: "Demonstration only.",
    demoText: "The result search uses a handful of made-up sample records. No real student data is shown here.",
    searchKicker: "Result search",
    search: "Result search",
    schedKicker: "Exam schedule",
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
    sumKicker: "Public examinations",
    sum: "SSC & HSC result summary",
    sumSample: "Illustrative figures for the demonstration, not real board results.",
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
    meta: "পরীক্ষার নোটিশ, বার্ষিক পরীক্ষার সময়সূচি, ফলাফল অনুসন্ধান এবং এসএসসি/এইচএসসি ফলাফলের সারসংক্ষেপ।",
    demoStrong: "শুধু প্রদর্শনের জন্য।",
    demoText: "ফলাফল অনুসন্ধানে কয়েকটি বানানো নমুনা রেকর্ড ব্যবহার করা হয়েছে। এখানে কোনো আসল শিক্ষার্থীর তথ্য নেই।",
    searchKicker: "ফলাফল অনুসন্ধান",
    search: "ফলাফল অনুসন্ধান",
    schedKicker: "পরীক্ষার সময়সূচি",
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
    sumKicker: "পাবলিক পরীক্ষা",
    sum: "এসএসসি ও এইচএসসি ফলাফলের সারসংক্ষেপ",
    sumSample: "ডেমোর জন্য নমুনা সংখ্যা, বোর্ডের আসল ফলাফল নয়।",
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
  const [schedule, board, options, site, { lang }] = await Promise.all([getExamSchedule(), getBoardResults(), getResultOptions(), getSite(), getI18n()]);
  const c = copy[lang];
  const n = (v: number | string) => (lang === "bn" ? toBnDigits(v) : String(v));
  const isDemo = Boolean(site.demoNote);
  return (
    <>
      <PageHeader path="/results" title={c.title} />
      <FullWidth>
        {isDemo && (
          <DemoNote>
            <strong>{c.demoStrong}</strong> {c.demoText}
          </DemoNote>
        )}
        <Box id="search-h" title={c.search}>
          <ResultLookup options={options} isDemo={isDemo} />
        </Box>

        <Box id="sum-h" title={c.sum} bodyClassName="p-0">
          {board.isSample && <p className="px-4 pt-3 text-sm text-muted">{c.sumSample}</p>}
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={c.sumLabel}>
            <table className={`${table} min-w-[34rem]`}>
              <caption className="sr-only">{c.sumLabel}</caption>
              <thead>
                <tr>
                  <th scope="col" className={th}>{c.exam}</th>
                  <th scope="col" className={`${th} text-right`}>{c.examinees}</th>
                  <th scope="col" className={`${th} text-right`}>{c.passed}</th>
                  <th scope="col" className={`${th} text-right`}>{c.rate}</th>
                  <th scope="col" className={`${th} text-right`}>{c.gpa5}</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {board.rows.map((b) => (
                  <tr key={b.exam + b.year}>
                    <th scope="row" className={`${td} font-semibold text-heading`}>
                      {b.exam} {b.year}
                    </th>
                    <td className={`${td} text-right`}>{n(b.examinees)}</td>
                    <td className={`${td} text-right`}>{n(b.passed)}</td>
                    <td className={`${td} text-right`}>{n(b.examinees ? ((b.passed / b.examinees) * 100).toFixed(1) : "0.0")}%</td>
                    <td className={`${td} text-right`}>{n(b.aPlus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>

        <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {schedule?.file && (
            <a href={schedule.file} target="_blank" rel="noopener" className="font-semibold text-accent underline underline-offset-4 hover:text-heading">
              {c.sched(schedule.name, schedule.year)}: {c.routine}
            </a>
          )}
          <Link href="/notices" className="font-semibold text-accent underline underline-offset-4 hover:text-heading">
            {c.notices}
          </Link>
        </p>
      </FullWidth>
    </>
  );
}
