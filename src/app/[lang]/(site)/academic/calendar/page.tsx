import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { PrintButton } from "@/components/calendar/PrintButton";
import { WithSidebar } from "@/components/portal/Sidebar";
import { table, tableWrap, td, th } from "@/components/portal/table";
import { getCategories, getDownloads, getEvents, getSite } from "@/content/site-content";
import { formatDate, toBnDigits } from "@/lib/utils";
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
  const [calendarEvents, types, downloads, site, { lang }] = await Promise.all([getEvents(), getCategories("event"), getDownloads(), getSite(), getI18n()]);
  const c = copy[lang];
  const calendarFile = downloads.find((d) => /calendar|ক্যালেন্ডার/i.test(d.title));
  const sorted = [...calendarEvents].sort((x, y) => x.date.localeCompare(y.date));
  const months = new Map<string, typeof sorted>();
  for (const e of sorted) months.set(e.date.slice(0, 7), [...(months.get(e.date.slice(0, 7)) ?? []), e]);
  const monthLabel = (key: string) => {
    const [y, m] = key.split("-").map(Number);
    return `${monthNames[lang][m - 1]} ${lang === "bn" ? toBnDigits(y) : y}`;
  };
  const labels = lang === "bn" ? { date: "তারিখ", title: "বিষয়", type: "ধরন" } : { date: "Date", title: "Event", type: "Type" };
  return (
    <>
      <PageHeader path="/academic/calendar" title={c.title} />
      <WithSidebar>
        <div data-print-page="calendar" className="space-y-4">
          <p className="text-ink">{c.intro}</p>
          <div className="print-hide flex flex-wrap items-center gap-x-6 gap-y-3">
            {calendarFile && (
              <a href={calendarFile.href} target="_blank" rel="noopener" download className="inline-flex items-center gap-2 text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
                <Download aria-hidden className="size-4" />
                {c.download}
              </a>
            )}
            <PrintButton label={c.print} />
          </div>
          {sorted.length === 0 ? (
            <p className="text-muted">{c.empty}</p>
          ) : (
            <div className={tableWrap}>
              <table className={`${table} min-w-[32rem]`}>
                <caption className="sr-only">{c.title}</caption>
                <thead>
                  <tr>
                    <th scope="col" className={`${th} w-44`}>{labels.date}</th>
                    <th scope="col" className={th}>{labels.title}</th>
                    <th scope="col" className={`${th} w-32`}>{labels.type}</th>
                  </tr>
                </thead>
                {[...months.entries()].map(([key, list]) => (
                  <tbody key={key}>
                    <tr>
                      <th colSpan={3} scope="colgroup" className="bg-paper-dark px-3 py-1.5 text-left text-sm font-semibold text-heading">{monthLabel(key)}</th>
                    </tr>
                    {list.map((e) => (
                      <tr key={e.date + e.title}>
                        <td className={`${td} whitespace-nowrap`}>
                          <time dateTime={e.date}>{formatDate(e.date, lang)}</time>
                          {e.endDate && (
                            <>
                              {" – "}
                              <time dateTime={e.endDate}>{formatDate(e.endDate, lang)}</time>
                            </>
                          )}
                        </td>
                        <td className={td}>{e.title}</td>
                        <td className={`${td} text-muted`}>{e.typeLabel ?? types[e.type]?.label ?? e.type}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          )}
          {site.demoNote && <DemoNote className="print-hide">{c.sample}</DemoNote>}
        </div>
      </WithSidebar>
    </>
  );
}
