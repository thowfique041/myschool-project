import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote, SampleTag, SectionHeading } from "@/components/ui/primitives";
import { ResultLookup } from "@/components/explorers/ResultLookup";
import { NoticeRow } from "@/components/shared/cards";
import { sortedNotices } from "@/data/notices";
import { boardSummary, examSchedule } from "@/data/results";
import { formatDateEn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Results & Examinations",
  description: "Examination notices, the annual exam schedule, a sample result search and SSC/HSC result summaries.",
};

export default function ResultsPage() {
  const examNotices = sortedNotices.filter((n) => n.category === "exam");
  return (
    <>
      <PageHeader title="Results & Examinations" titleBn="ফলাফল ও পরীক্ষা" description="Search internal examination results, check the exam schedule and read examination notices." />

      <div className="container-page pt-10">
        <DemoNote>
          <strong>Demonstration only.</strong> The result search uses a handful of made-up records stored in the website code. No
          real student data is available here, and nothing is fetched from a school server.
        </DemoNote>
      </div>

      <section id="search" aria-labelledby="search-h" className="scroll-mt-24 py-12">
        <div className="container-page">
          <SectionHeading id="search-h" kicker="ফলাফল অনুসন্ধান" title="Result search" />
          <div className="mt-8">
            <ResultLookup />
          </div>
        </div>
      </section>

      <section id="schedule" aria-labelledby="sched-h" className="scroll-mt-24 border-y border-line bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-w-0">
            <SectionHeading id="sched-h" kicker="পরীক্ষার সময়সূচি" title="Annual examination 2026 schedule" description="All papers start at 10:00 AM. Practical examinations are held in the labs." />
            <div className="mt-6 overflow-x-auto rounded-xl border border-line" tabIndex={0} aria-label="Examination schedule">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-paper text-xs text-muted uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Day</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Subject</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Classes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {examSchedule.map((e) => (
                    <tr key={e.date}>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap text-navy-900">{formatDateEn(e.date)}</td>
                      <td className="px-4 py-3 text-muted">{e.day}</td>
                      <td className="px-4 py-3 text-ink">{e.subject}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted">{e.classes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="/downloads/annual-exam-routine-2026.pdf" download className="mt-4 inline-block text-sm font-semibold text-leaf-700 hover:underline underline-offset-4">
              Download routine (sample PDF)
            </a>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-navy-900">Examination notices</h2>
            <div className="mt-3 divide-y divide-line">
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
            <SectionHeading id="sum-h" kicker="পাবলিক পরীক্ষা" title="SSC & HSC result summary" description="Illustrative figures for the demonstration — not real board results." />
            <SampleTag />
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white" tabIndex={0} aria-label="Board examination summary">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-navy-800 text-xs text-white uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Examination</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Examinees</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Passed</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Pass rate</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">GPA 5.00</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {boardSummary.map((b) => (
                  <tr key={b.exam + b.year}>
                    <th scope="row" className="px-4 py-3 font-semibold text-navy-900">
                      {b.exam} {b.year}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{b.examinees}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{b.passed}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{((b.passed / b.examinees) * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3 text-right tabular-nums">{b.aPlus}</td>
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
