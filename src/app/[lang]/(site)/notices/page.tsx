import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { NoticeExplorer } from "@/components/explorers/NoticeExplorer";
import { getEvents, getNotices, getSite, getToday } from "@/content/site-content";
import Link from "@/components/i18n/Link";
import { formatDate, toBnDigits } from "@/lib/utils";
import { getI18n } from "@/i18n/server";
import { ArrowRight, FileDown } from "lucide-react";

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
    total: "Notices",
    important: "Important",
    latest: "Latest",
    next: "Next",
    fileType: "File",
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
    total: "নোটিশ",
    important: "জরুরি",
    latest: "সর্বশেষ",
    next: "পরবর্তী",
    fileType: "ফাইল",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function NoticesPage() {
  const [notices, events, site, today, { t, lang }] = await Promise.all([getNotices(), getEvents(), getSite(), getToday(), getI18n()]);
  const c = copy[lang];
  const n = (v: number | string) => (lang === "bn" ? toBnDigits(v) : String(v));
  // Same event source and ordering as the Academic Calendar and Admission pages.
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).filter((e) => (e.endDate ?? e.date) >= today).slice(0, 5);
  const latest = [...notices].sort((a, b) => b.date.localeCompare(a.date))[0];
  const facts: [string, string][] = [
    [c.total, n(notices.length)],
    [c.important, n(notices.filter((x) => x.important).length)],
    ...(latest ? ([[c.latest, formatDate(latest.date, lang)]] as [string, string][]) : []),
  ];
  return (
    <>
      <PageHeader path="/notices"
        title={c.title}
        titleBn={c.alt}
        description={c.intro}
        aside={
          <dl className="grid grid-cols-[auto_auto_1fr] border-t border-white/20 lg:w-96">
            {facts.map(([k, v]) => (
              <div key={k} className="pt-3 pr-3 not-first:border-l not-first:border-white/20 not-first:pl-3">
                <dd className="font-serif text-2xl leading-tight font-semibold whitespace-nowrap text-white">{v}</dd>
                <dt className="mt-0.5 text-xs text-on-navy-accent">{k}</dt>
              </div>
            ))}
          </dl>
        }
      />
      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
          <div className="min-w-0">
            <h2 className="sr-only">{c.title}</h2>
            <NoticeExplorer notices={notices} />
          </div>
          <aside aria-labelledby="upcoming-title" className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="border-t-4 border-leaf-600 bg-navy-900 p-6 text-white dark:border-accent">
              <h2 id="upcoming-title" className="font-serif text-xl font-semibold">{c.comingUp}</h2>
              <ol className="mt-4 border-l border-white/25">
                {upcoming.length === 0 && <li className="pl-4 text-sm text-navy-100">{t.common.upcomingNone}</li>}
                {upcoming.map((e, i) => (
                  <li key={e.date + e.title} className="relative pb-4 pl-4 last:pb-0">
                    <span aria-hidden className={`absolute top-1.5 -left-[5px] size-2.5 rounded-full ${i === 0 ? "bg-on-navy-accent" : "bg-white/40"}`} />
                    <time dateTime={e.date} className={`text-xs font-semibold ${i === 0 ? "text-on-navy-accent" : "text-navy-200"}`}>
                      {formatDate(e.date, lang)}
                      {e.endDate && ` – ${formatDate(e.endDate, lang)}`}
                      {i === 0 && <span className="eyebrow ml-2">{c.next}</span>}
                    </time>
                    <p className={i === 0 ? "mt-0.5 font-serif text-lg leading-snug font-semibold" : "mt-0.5 text-sm text-navy-50"}>{e.title}</p>
                  </li>
                ))}
              </ol>
              <Link href="/academic/calendar" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white underline underline-offset-4 hover:text-on-navy-accent">
                {c.calendar} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <Link href="/downloads" className="flex min-h-12 items-center gap-3 border-y border-line py-3 text-sm font-semibold text-heading hover:text-accent">
              <FileDown aria-hidden className="size-5 text-leaf-600 dark:text-accent" />
              {c.downloads}
              <ArrowRight aria-hidden className="ml-auto size-4" />
            </Link>
            {site.demoNote && <DemoNote>{c.sample}</DemoNote>}
          </aside>
        </div>
      </section>
    </>
  );
}
