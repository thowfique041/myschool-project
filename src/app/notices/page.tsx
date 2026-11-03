import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { NoticeExplorer } from "@/components/explorers/NoticeExplorer";
import { notices } from "@/data/notices";
import { calendarEvents } from "@/data/calendar";
import { ArrowLink } from "@/components/shared/cards";
import { formatDateEn } from "@/lib/utils";
import { DownloadList } from "@/components/shared/DownloadList";
import { SectionHeading } from "@/components/ui/primitives";
import { FileDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Notice Board",
  description: "Notices, forms and downloadable documents from Webnion School & College.",
};

export default function NoticesPage() {
  const upcoming = calendarEvents.filter((e) => e.date >= "2026-11-03").slice(0, 4);
  return (
    <>
      <PageHeader title="Notice Board" titleBn="নোটিশ বোর্ড" description="Official notices for students, guardians and staff, plus forms and documents to download." />
      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_18rem]">
          <NoticeExplorer notices={notices} />
          <aside aria-label="Upcoming dates" className="space-y-6">
            <div className="rounded-xl border border-line bg-white p-5">
              <h2 className="font-semibold text-navy-900">Coming up</h2>
              <ul className="mt-3 space-y-3 text-sm">
                {upcoming.map((e) => (
                  <li key={e.date + e.title}>
                    <time dateTime={e.date} className="font-semibold text-leaf-700">
                      {formatDateEn(e.date)}
                    </time>
                    <p className="text-ink">{e.title}</p>
                  </li>
                ))}
              </ul>
              <ArrowLink href="/calendar" className="mt-4">
                Academic calendar
              </ArrowLink>
            </div>
            <a
              href="#downloads"
              className="flex items-center gap-3 rounded-xl border border-leaf-200 bg-leaf-50 p-4 text-sm font-semibold text-navy-900 hover:border-leaf-500"
            >
              <FileDown aria-hidden className="size-5 text-leaf-700" />
              Forms &amp; downloads
            </a>
            <DemoNote>Notices on this site are sample content for a fictional institution.</DemoNote>
          </aside>
        </div>
      </section>
      <section id="downloads" aria-labelledby="downloads-title" className="scroll-mt-24 border-t border-line bg-white py-12 sm:py-16">
        <div className="container-page max-w-5xl">
          <SectionHeading
            id="downloads-title"
            kicker="ডাউনলোড"
            title="Forms & downloads"
            description="Admission forms, circulars, routines, the academic calendar and other documents. All files are PDF."
          />
          <div className="mt-8">
            <DownloadList />
          </div>
          <DemoNote className="mt-8">Every file is a short sample PDF marked “for website demonstration only”.</DemoNote>
        </div>
      </section>
    </>
  );
}
