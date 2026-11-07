import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { NoticeExplorer } from "@/components/explorers/NoticeExplorer";
import { getDownloads, getEvents, getNotices, getSite, getToday } from "@/content/site-content";
import { ArrowLink } from "@/components/shared/cards";
import { formatDate } from "@/lib/utils";
import { getI18n } from "@/i18n/server";
import { DownloadList } from "@/components/shared/DownloadList";
import { SectionHeading } from "@/components/ui/primitives";
import { FileDown } from "lucide-react";

const copy = {
  en: {
    title: "Notice Board",
    alt: "নোটিশ বোর্ড",
    meta: "Notices, forms and downloadable documents from Webnion School & College.",
    intro: "Official notices for students, guardians and staff, plus forms and documents to download.",
    upcoming: "Upcoming dates",
    comingUp: "Coming up",
    calendar: "Academic calendar",
    downloads: "Forms & downloads",
    sample: "Notices on this site are sample content for a fictional institution.",
    dlKicker: "Downloads",
    dlIntro: "Admission forms, circulars, routines, the academic calendar and other documents.",
    dlSample: "Sample files are short PDFs marked “for website demonstration only”.",
  },
  bn: {
    title: "নোটিশ বোর্ড",
    alt: "Notice Board",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের নোটিশ, ফরম ও ডাউনলোডযোগ্য কাগজপত্র।",
    intro: "শিক্ষার্থী, অভিভাবক ও কর্মীদের জন্য দাপ্তরিক নোটিশ, সঙ্গে ডাউনলোডের জন্য ফরম ও কাগজপত্র।",
    upcoming: "আসন্ন তারিখ",
    comingUp: "সামনে যা আছে",
    calendar: "একাডেমিক ক্যালেন্ডার",
    downloads: "ফরম ও ডাউনলোড",
    sample: "এই সাইটের নোটিশগুলো একটি কাল্পনিক প্রতিষ্ঠানের নমুনা বিষয়বস্তু।",
    dlKicker: "ডাউনলোড",
    dlIntro: "ভর্তি ফরম, বিজ্ঞপ্তি, রুটিন, একাডেমিক ক্যালেন্ডার ও অন্যান্য কাগজপত্র।",
    dlSample: "নমুনা ফাইলগুলো “শুধু ওয়েবসাইট প্রদর্শনের জন্য” লেখা ছোট পিডিএফ।",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function NoticesPage() {
  const [notices, events, downloads, site, today, { t, lang }] = await Promise.all([getNotices(), getEvents(), getDownloads(), getSite(), getToday(), getI18n()]);
  const c = copy[lang];
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= today).slice(0, 4);
  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} description={c.intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_18rem]">
          <h2 className="sr-only">{c.title}</h2>
          <NoticeExplorer notices={notices} />
          <aside aria-label={c.upcoming} className="space-y-6">
            <div className="border border-line bg-surface p-5">
              <h2 className="font-semibold text-heading">{c.comingUp}</h2>
              <ul className="mt-3 space-y-3 text-sm">
                {upcoming.length === 0 && <li className="text-muted">{t.common.upcomingNone}</li>}
                {upcoming.map((e) => (
                  <li key={e.date + e.title}>
                    <time dateTime={e.date} className="font-semibold text-accent">
                      {formatDate(e.date, lang)}
                    </time>
                    <p className="text-ink">{e.title}</p>
                  </li>
                ))}
              </ul>
              <ArrowLink href="/calendar" className="mt-4">
                {c.calendar}
              </ArrowLink>
            </div>
            <a
              href="#downloads"
              className="flex items-center gap-3 border border-line-strong bg-tint p-4 text-sm font-semibold text-heading hover:border-navy-400"
            >
              <FileDown aria-hidden className="size-5 text-accent" />
              {c.downloads}
            </a>
            {site.demoNote && <DemoNote>{c.sample}</DemoNote>}
          </aside>
        </div>
      </section>
      <section id="downloads" aria-labelledby="downloads-title" className="scroll-mt-24 border-t border-line bg-surface py-12 sm:py-16">
        <div className="container-page max-w-5xl">
          <SectionHeading
            id="downloads-title"
            title={c.downloads}
            description={c.dlIntro}
          />
          <div className="mt-8">
            <DownloadList downloads={downloads} />
          </div>
          {site.demoNote && <DemoNote className="mt-8">{c.dlSample}</DemoNote>}
        </div>
      </section>
    </>
  );
}
