import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { NewsExplorer } from "@/components/explorers/NewsExplorer";
import { getEvents, getNews, getToday } from "@/content/site-content";
import { datePartsL, formatDate } from "@/lib/utils";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "News & Events", alt: "খবর ও অনুষ্ঠান", crumb: "Campus Life", intro: "Stories from classrooms, competitions and school programmes.", meta: "Latest news, achievements and upcoming events at Webnion School & College.", all: "All news" },
  bn: { title: "খবর ও অনুষ্ঠান", alt: "News & Events", crumb: "ক্যাম্পাস জীবন", intro: "শ্রেণিকক্ষ, প্রতিযোগিতা ও বিদ্যালয়ের অনুষ্ঠানের গল্প।", meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের সর্বশেষ খবর, অর্জন ও আসন্ন অনুষ্ঠান।", all: "সব খবর" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function NewsPage() {
  const [sortedNews, allEvents, today, { t, lang }] = await Promise.all([getNews(), getEvents(), getToday(), getI18n()]);
  const c = copy[lang];
  const featured = sortedNews.find((n) => n.featured) ?? sortedNews[0];
  const events = allEvents.filter((e) => e.type === "event" || e.type === "academic").filter((e) => (e.endDate ?? e.date) >= today).slice(0, 6);

  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} crumbs={[{ label: c.crumb }]} description={c.intro} />

      {featured && <section aria-labelledby="featured" className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="group relative grid overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] md:grid-cols-2">
            <Picture image={featured.image} ratio="aspect-[16/10] md:aspect-auto md:h-full" sizes="(min-width: 768px) 40vw, 100vw" />
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-muted">
                <Badge tone="leaf">
                  {t.common.featured} · {featured.categoryLabel}
                </Badge>
                <time dateTime={featured.date}>{formatDate(featured.date, lang)}</time>
              </div>
              <h2 id="featured" className="mt-3 font-serif text-2xl leading-snug font-semibold text-heading group-hover:text-accent">
                <Link href={`/news/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{featured.excerpt}</p>
              {featured.venue && (
                <p className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-muted">
                  <MapPin aria-hidden className="size-4" /> {featured.venue}
                </p>
              )}
            </div>
          </article>
          <aside aria-labelledby="upcoming" className="rounded-2xl border border-line bg-navy-900 p-6 text-white">
            <h2 id="upcoming" className="flex items-center gap-2 font-semibold">
              <CalendarDays aria-hidden className="size-5 text-leaf-200" /> {t.news.upcoming}
            </h2>
            <ul className="mt-4 space-y-4">
              {events.length === 0 && <li className="text-sm text-navy-200">{t.news.noUpcoming}</li>}
              {events.map((e) => {
                const d = datePartsL(e.date, lang);
                return (
                  <li key={e.date + e.title} className="flex gap-3">
                    <span className="flex w-12 shrink-0 flex-col items-center rounded-md bg-white/10 py-1 text-center">
                      <span className="text-[0.65rem] text-navy-200 uppercase">{d.month}</span>
                      <span className="font-serif text-lg leading-none font-semibold">{d.day}</span>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{e.title}</span>
                      <span lang={lang === "bn" ? "en" : "bn"} className="block text-xs text-navy-200">
                        {e.titleBn}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>}

      <section aria-labelledby="all-news" className="border-t border-line bg-surface py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading id="all-news" title={c.all} />
          <div className="mt-6">
            <NewsExplorer articles={sortedNews} />
          </div>
        </div>
      </section>
    </>
  );
}
