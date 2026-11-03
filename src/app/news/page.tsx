import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { NewsExplorer } from "@/components/explorers/NewsExplorer";
import { calendarEvents } from "@/data/calendar";
import { news, newsCategories, sortedNews } from "@/data/news";
import { dateParts, formatDateEn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news, achievements and upcoming events at Webnion School & College.",
};

export default function NewsPage() {
  const featured = news.find((n) => n.featured) ?? sortedNews[0];
  const events = calendarEvents.filter((e) => e.type === "event" || e.type === "academic").filter((e) => e.date >= "2026-11-03");

  return (
    <>
      <PageHeader title="News & Events" titleBn="খবর ও অনুষ্ঠান" crumbs={[{ label: "Campus Life" }]} description="Stories from classrooms, competitions and school programmes." />

      <section aria-labelledby="featured" className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="group relative grid overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] md:grid-cols-2">
            <Picture image={featured.image} ratio="aspect-[16/10] md:aspect-auto md:h-full" sizes="(min-width: 768px) 40vw, 100vw" />
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-muted">
                <Badge tone="leaf">Featured · {newsCategories[featured.category]}</Badge>
                <time dateTime={featured.date}>{formatDateEn(featured.date)}</time>
              </div>
              <h2 id="featured" className="mt-3 font-serif text-2xl leading-snug font-semibold text-navy-900 group-hover:text-leaf-700">
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
              <CalendarDays aria-hidden className="size-5 text-leaf-200" /> Upcoming events
            </h2>
            <ul className="mt-4 space-y-4">
              {events.map((e) => {
                const d = dateParts(e.date);
                return (
                  <li key={e.date + e.title} className="flex gap-3">
                    <span className="flex w-12 shrink-0 flex-col items-center rounded-md bg-white/10 py-1 text-center">
                      <span className="text-[0.65rem] text-navy-200 uppercase">{d.month}</span>
                      <span className="font-serif text-lg leading-none font-semibold">{d.day}</span>
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{e.title}</span>
                      <span lang="bn" className="block text-xs text-navy-200">{e.titleBn}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      <section aria-labelledby="all-news" className="border-t border-line bg-white py-12 sm:py-16">
        <div className="container-page">
          <SectionHeading id="all-news" title="All news" />
          <div className="mt-6">
            <NewsExplorer articles={sortedNews} />
          </div>
        </div>
      </section>
    </>
  );
}
