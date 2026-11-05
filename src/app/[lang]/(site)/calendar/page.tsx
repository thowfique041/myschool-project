import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { getCategories, getDownloads, getEvents, getSite } from "@/content/site-content";
import type { CalendarEvent } from "@/types";
import { datePartsL, formatDate, toBnDigits } from "@/lib/utils";
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
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

const tone: Record<string, "navy" | "leaf" | "signal" | "gold" | "neutral"> = {
  exam: "navy",
  holiday: "signal",
  event: "leaf",
  academic: "neutral",
  admission: "gold",
};

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  bn: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
};

export default async function CalendarPage() {
  const [calendarEvents, types, downloads, site, { lang }] = await Promise.all([getEvents(), getCategories("event"), getDownloads(), getSite(), getI18n()]);
  const c = copy[lang];
  const calendarFile = downloads.find((d) => /calendar|ক্যালেন্ডার/i.test(d.title));
  const groups = new Map<string, CalendarEvent[]>();
  for (const e of [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date))) {
    const key = e.date.slice(0, 7);
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }

  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} crumbs={[{ label: c.crumb, href: "/academic" }]} description={c.intro}>
        {calendarFile && <a href={calendarFile.href} target="_blank" rel="noopener" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-surface px-5 text-sm font-semibold text-heading hover:bg-tint">
          {c.download}
        </a>}
      </PageHeader>
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <ul className="mb-8 flex flex-wrap gap-2" aria-label={c.legend}>
            {Object.entries(types).map(([t, v]) => (
              <li key={t}>
                <Badge tone={tone[t] ?? "neutral"}>{v.label}</Badge>
              </li>
            ))}
          </ul>
          <div className="space-y-10">
            {[...groups.entries()].map(([key, events]) => {
              const [y, m] = key.split("-").map(Number);
              return (
                <section key={key} aria-labelledby={`m-${key}`}>
                  <h2 id={`m-${key}`} className="font-serif text-xl font-semibold text-heading">
                    {monthNames[lang][m - 1]} {lang === "bn" ? toBnDigits(y) : y}
                  </h2>
                  <ul className="mt-3 divide-y divide-line rounded-md border border-line bg-surface">
                    {events.map((e) => {
                      const d = datePartsL(e.date, lang);
                      return (
                        <li key={e.date + e.title} className="flex items-start gap-4 p-4 sm:px-5">
                          <span className="flex w-12 shrink-0 flex-col items-center rounded-md border border-line py-1 text-center">
                            <span className="text-xs text-muted uppercase">{d.month}</span>
                            <span className="font-serif text-lg leading-none font-semibold text-heading">{d.day}</span>
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-heading">{e.title}</p>
                            {e.endDate && <p className="mt-0.5 text-xs text-muted">{lang === "bn" ? `${formatDate(e.endDate, lang)} পর্যন্ত` : `${c.until} ${formatDate(e.endDate, lang)}`}</p>}
                            {(e.venue || e.description) && (
                              <p className="mt-1 text-sm text-ink">
                                {e.venue && <span className="font-medium">{e.venue}. </span>}
                                {e.description}
                              </p>
                            )}
                          </div>
                          <Badge tone={tone[e.type] ?? "neutral"} className="shrink-0">
                            {e.typeLabel ?? e.type}
                          </Badge>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
          {groups.size === 0 && <p className="text-muted">{c.empty}</p>}
          {site.demoNote && <DemoNote className="mt-10">{c.sample}</DemoNote>}
        </div>
      </section>
    </>
  );
}
