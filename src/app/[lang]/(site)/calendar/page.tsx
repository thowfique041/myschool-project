import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Download } from "lucide-react";
import { DemoNote } from "@/components/ui/primitives";
import { CalendarExplorer } from "@/components/calendar/CalendarExplorer";
import { PrintButton } from "@/components/calendar/PrintButton";
import { getCategories, getDownloads, getEvents, getSite, getToday } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Academic Calendar",
    alt: "একাডেমিক ক্যালেন্ডার",
    crumb: "Academic",
    intro: "Session 2026–27. Holidays follow the government holiday list; dates may change by notice.",
    meta: "Examinations, holidays, admission dates and events for the 2026–27 session at Webnion School & College.",
    download: "Download calendar (PDF)",
    legend: "Legend",
    until: "Until",
    empty: "No calendar entries have been published yet.",
    sample: "This calendar is sample content. Always confirm dates from the official notice board.",
    print: "Print calendar",
    all: "All events",
    filter: "Filter by type",
    months: "Jump to month",
    nextUp: "Next up",
    past: "Past",
    shown: "Showing {n} of {total} entries",
  },
  bn: {
    title: "একাডেমিক ক্যালেন্ডার",
    alt: "Academic Calendar",
    crumb: "একাডেমিক",
    intro: "শিক্ষাবর্ষ ২০২৬–২৭। ছুটি সরকারি ছুটির তালিকা অনুযায়ী; নোটিশের মাধ্যমে তারিখ বদলাতে পারে।",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ২০২৬–২৭ শিক্ষাবর্ষের পরীক্ষা, ছুটি, ভর্তির তারিখ ও অনুষ্ঠান।",
    download: "ক্যালেন্ডার ডাউনলোড (পিডিএফ)",
    legend: "সংকেত",
    until: "চলবে",
    empty: "এখনো ক্যালেন্ডারে কিছু প্রকাশ করা হয়নি।",
    sample: "এই ক্যালেন্ডারটি নমুনা। তারিখ সব সময় দাপ্তরিক নোটিশ বোর্ড থেকে মিলিয়ে নিন।",
    print: "ক্যালেন্ডার প্রিন্ট",
    all: "সব অনুষ্ঠান",
    filter: "ধরন অনুযায়ী বাছাই",
    months: "মাসে যান",
    nextUp: "পরবর্তী",
    past: "অতীত",
    shown: "{total}টির মধ্যে {n}টি দেখানো হচ্ছে",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  bn: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
};

export default async function CalendarPage() {
  const [calendarEvents, types, downloads, site, today, { lang }] = await Promise.all([getEvents(), getCategories("event"), getDownloads(), getSite(), getToday(), getI18n()]);
  const c = copy[lang];
  const calendarFile = downloads.find((d) => /calendar|ক্যালেন্ডার/i.test(d.title));

  return (
    <>
      <PageHeader
        title={c.title}
        titleBn={c.alt}
        crumbs={[{ label: c.crumb, href: "/academic" }]}
        description={c.intro}
        aside={
          <div className="print-hide flex flex-wrap gap-3 lg:justify-end">
            {calendarFile && (
              <a href={calendarFile.href} target="_blank" rel="noopener" download className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-beige px-5 font-bold text-navy-900 hover:bg-white">
                <Download aria-hidden className="size-4" />
                {c.download}
              </a>
            )}
            <PrintButton label={c.print} />
          </div>
        }
      />
      <section data-print-page="calendar" className="py-12 sm:py-16">
        <div className="container-page">
          <CalendarExplorer
            events={calendarEvents}
            types={Object.entries(types).map(([k, v]) => [k, v.label])}
            today={today}
            lang={lang}
            labels={{ all: c.all, filter: c.filter, months: c.months, nextUp: c.nextUp, past: c.past, until: c.until, empty: c.empty, shown: c.shown, monthNames: monthNames[lang] }}
          />
          {site.demoNote && <DemoNote className="print-hide mt-10">{c.sample}</DemoNote>}
        </div>
      </section>
    </>
  );
}
