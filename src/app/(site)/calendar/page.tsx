import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, DemoNote } from "@/components/ui/primitives";
import { getCategories, getDownloads, getEvents, getSite } from "@/content/site-content";
import type { CalendarEvent } from "@/types";
import { dateParts, formatDateEn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Academic Calendar",
  description: "Examinations, holidays, admission dates and events for the 2026–27 session at Webnion School & College.",
};

const tone: Record<string, "navy" | "leaf" | "signal" | "gold" | "neutral"> = {
  exam: "navy",
  holiday: "signal",
  event: "leaf",
  academic: "neutral",
  admission: "gold",
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default async function CalendarPage() {
  const [calendarEvents, types, downloads, site] = await Promise.all([getEvents(), getCategories("event"), getDownloads(), getSite()]);
  const calendarFile = downloads.find((d) => /calendar/i.test(d.title));
  const groups = new Map<string, CalendarEvent[]>();
  for (const e of [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date))) {
    const key = e.date.slice(0, 7);
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }

  return (
    <>
      <PageHeader title="Academic Calendar" titleBn="একাডেমিক ক্যালেন্ডার" crumbs={[{ label: "Academic", href: "/academic" }]} description="Session 2026–27. Holidays follow the government holiday list; dates may change by notice.">
        {calendarFile && <a href={calendarFile.href} target="_blank" rel="noopener" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-surface px-5 text-sm font-semibold text-heading hover:bg-tint">
          Download calendar (PDF)
        </a>}
      </PageHeader>
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <ul className="mb-8 flex flex-wrap gap-2" aria-label="Legend">
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
                    {monthNames[m - 1]} {y}
                  </h2>
                  <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
                    {events.map((e) => {
                      const d = dateParts(e.date);
                      return (
                        <li key={e.date + e.title} className="flex items-start gap-4 p-4 sm:px-5">
                          <span className="flex w-12 shrink-0 flex-col items-center rounded-md border border-line py-1 text-center">
                            <span className="text-[0.65rem] text-muted uppercase">{d.month}</span>
                            <span className="font-serif text-lg leading-none font-semibold text-heading">{d.day}</span>
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-heading">{e.title}</p>
                            <p lang="bn" className="text-sm text-muted">
                              {e.titleBn}
                            </p>
                            {e.endDate && <p className="mt-0.5 text-xs text-muted">Until {formatDateEn(e.endDate)}</p>}
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
          {groups.size === 0 && <p className="text-muted">No calendar entries have been published yet.</p>}
          {site.demoNote && <DemoNote className="mt-10">This calendar is sample content. Always confirm dates from the official notice board.</DemoNote>}
        </div>
      </section>
    </>
  );
}
