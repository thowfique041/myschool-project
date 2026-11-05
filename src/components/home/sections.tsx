import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { Badge, ButtonLink, Card, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink, NoticeRow, TeacherCard } from "@/components/shared/cards";
import { ContactForm } from "@/components/forms/ContactForm";
import type { HomeData, HomeContent, SectionCopy } from "./types";
import { cn, formatDate, num } from "@/lib/utils";
import { FlaskConical, HeartPulse, Library, Monitor, Trophy, Users } from "lucide-react";
import { images } from "@/data/images";

const STATS_IMAGE = images.campus;
const STATS_PHOTO = images.scienceLab;

/** Plain underlined text link, used where an arrow link would be one too many. */
function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
      {children}
    </Link>
  );
}

/* ------------------------------------------- Notice board + admission */

export function NoticesAdmissionSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const adm = data.admission;
  return (
    <section aria-label={data.t.home.noticesAdmission} className="border-t border-line py-14 sm:py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading id="notices-title" variant="rule" title={copy.title} />
          <div className="divide-y divide-line border-b border-line">
            {data.notices.slice(0, 3).map((n) => (
              <NoticeRow key={n.slug} notice={n} compact />
            ))}
          </div>
          <p className="mt-4">
            <ArrowLink href="/notices">{data.t.home.allNotices}</ArrowLink>
          </p>
        </div>

        <div id="admission" className="self-start rounded-md border border-line-strong bg-surface">
          <div className="border-b border-line bg-leaf-50 px-5 py-4 sm:px-6">
            <Badge tone={adm.open ? "leaf" : "neutral"}>{adm.open ? data.t.home.admissionOpen : data.t.home.admissionClosed}</Badge>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-heading">
              {data.t.home.admission} {num(adm.year, data.lang)}
            </h2>
            {(data.lang === "bn" ? adm.noticeTitleBn : adm.noticeTitle) && (
              <p className="text-sm text-muted">{data.lang === "bn" ? adm.noticeTitleBn : adm.noticeTitle}</p>
            )}
          </div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-line">
              {adm.dates.slice(0, 5).map((d) => (
                <tr key={d.label}>
                  <th scope="row" className="px-5 py-2.5 text-left font-normal text-ink sm:px-6">{d.label}</th>
                  <td className="px-5 py-2.5 text-right font-semibold whitespace-nowrap text-heading tabular-nums sm:px-6">{formatDate(d.date, data.lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line px-5 py-4 sm:px-6">
            <ButtonLink href="/admission#apply" variant="secondary">
              {data.t.home.applyInquire}
            </ButtonLink>
            <TextLink href="/notices#downloads">{data.t.home.downloadForm}</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------- About + principal's letter */

export function WelcomeSection({ home, copy, data }: { home: HomeContent; copy: SectionCopy; data: HomeData }) {
  const p = data.principal;
  return (
    <section aria-labelledby="welcome-title" className="border-t border-line bg-surface py-14 sm:py-16">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading id="welcome-title" variant="small" title={copy.title || home.welcomeTitle} />
          <div className="mt-4 space-y-3 leading-relaxed text-ink">
            {home.welcomeText.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          {home.welcomePoints.length > 0 && (
            <ul className="mt-5 list-disc space-y-1.5 pl-5 text-ink marker:text-navy-400">
              {home.welcomePoints.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <p className="mt-5">
            <TextLink href="/about">{data.t.home.readHistory}</TextLink>
          </p>
        </div>

        <figure id="principal" className="grid gap-5 border-l-4 border-navy-700 pl-5 sm:grid-cols-[auto_1fr] sm:pl-7 dark:border-navy-300">
          {p.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photo} alt="" className="size-24 rounded-md object-cover" />
          ) : (
            <DefaultAvatar gender={p.gender === "male" ? "male" : "female"} className="size-24 rounded-md" />
          )}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-heading">{data.t.home.principalMessage}</h2>
            <blockquote className="mt-3 leading-relaxed text-ink">
              <p>{p.quote}</p>
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="block font-semibold text-heading">{p.name}</span>
              <span className="block text-muted">{p.title}</span>
            </figcaption>
            <p className="mt-4">
              <TextLink href="/about#principal">{data.t.home.readFull}</TextLink>
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Classes and sections */

export function LevelsSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const L = data.levels;
  const r = data.t.home.levelRows;
  const dash = "–";
  const rows: { label: string; cell: (l: (typeof L)[number]) => string }[] = [
    { label: r.classes, cell: (l) => l.classes },
    { label: r.ages, cell: (l) => l.ages.replace(/^(Ages|বয়স)\s*/, "") },
    { label: r.shift, cell: (l) => l.shift ?? dash },
    { label: r.groups, cell: (l) => (l.groups?.length ? l.groups.join(", ") : dash) },
    { label: r.size, cell: (l) => l.sectionSize ?? dash },
  ];
  return (
    <section aria-labelledby="levels-title" className="border-t border-line py-14 sm:py-16">
      <div className="container-page">
        <SectionHeading id="levels-title" title={copy.title} />
        <div className="mt-6 overflow-x-auto border-y border-line-strong" tabIndex={0} aria-labelledby="levels-title">
          <table className="w-full min-w-[40rem] text-left">
            <thead>
              <tr className="border-b border-line-strong">
                <td className="w-40 py-3 pr-4" />
                {L.map((l) => (
                  <th key={l.id} scope="col" className="py-3 pr-4 font-serif text-xl font-semibold text-heading">
                    {l.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="py-2.5 pr-4 text-sm font-semibold text-muted">{row.label}</th>
                  {L.map((l) => (
                    <td key={l.id} className="py-2.5 pr-4 text-ink">{row.cell(l)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          <ArrowLink href="/academic">{data.t.home.curriculum}</ArrowLink>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Statistics band */

export function StatsSection({ home, data }: { home: HomeContent; copy?: SectionCopy; data: HomeData }) {
  const n = (v: number | string) => num(v, data.lang);
  const ssc = [...data.board.rows].filter((r) => r.exam === "SSC" || r.exam === "এসএসসি").sort((a, b) => b.year.localeCompare(a.year))[0];
  const computed: Record<string, string> = {
    teachers: n(data.people.filter((p) => p.kind !== "staff").length),
    years: n(Math.max(0, data.year - data.site.established)),
    ssc: ssc && ssc.examinees ? `${n(((ssc.passed / ssc.examinees) * 100).toFixed(1))}%` : "",
  };
  const items = (home.stats ?? [])
    .map((s) => ({ label: s.key === "ssc" && ssc ? `${s.label} ${ssc.year}` : s.label, value: s.value || computed[s.key] || "" }))
    .filter((s) => s.value);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="stats-title" className="relative isolate overflow-hidden bg-navy-950 py-16 text-white sm:py-20">
      <Image src={STATS_IMAGE.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/80" />
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="stats-title" className="font-serif text-3xl font-semibold sm:text-4xl">
            {data.lang === "bn" ? data.site.nameBn : data.site.name}
          </h2>
          {home.statsText && <p className="mt-3 text-base text-navy-100 sm:text-lg">{home.statsText}</p>}
        </div>
        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="relative min-h-64 overflow-hidden rounded-md sm:min-h-80">
            <Image src={STATS_PHOTO.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <dl className="grid grid-cols-2 gap-4 sm:gap-6">
            {items.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center rounded-md border border-white/25 bg-white/[0.04] px-3 py-8 text-center sm:py-10">
                <dd className="font-serif text-4xl font-semibold tabular-nums sm:text-5xl">{s.value}</dd>
                <dt className="mt-2 text-sm font-semibold tracking-wide text-navy-100 uppercase sm:text-base">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Public examination results */

export function ResultsSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const T = data.t.home.table;
  const n = (v: number | string) => num(v, data.lang);
  const rows = [...data.board.rows]
    .filter((r) => r.examinees > 0)
    .sort((a, b) => a.exam.localeCompare(b.exam) || b.year.localeCompare(a.year));
  return (
    <section aria-labelledby="results-title" className="border-t border-line bg-surface py-14 sm:py-16">
      <div className="container-page">
        <div className="max-w-4xl overflow-x-auto" tabIndex={0} aria-labelledby="results-title">
          <table className="w-full min-w-[36rem] text-left">
            <caption id="results-title" className="pb-4 text-left font-serif text-3xl font-semibold text-heading">
              {copy.title}
            </caption>
            <thead className="border-y-2 border-navy-800 text-sm dark:border-navy-300">
              <tr>
                <th scope="col" className="py-2.5 pr-4 font-semibold">{T.exam}</th>
                <th scope="col" className="py-2.5 pr-4 font-semibold">{T.year}</th>
                <th scope="col" className="py-2.5 pr-4 text-right font-semibold">{T.examinees}</th>
                <th scope="col" className="py-2.5 pr-4 text-right font-semibold">{T.passed}</th>
                <th scope="col" className="py-2.5 pr-4 text-right font-semibold">{T.rate}</th>
                <th scope="col" className="py-2.5 text-right font-semibold">{T.gpa5}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line tabular-nums">
              {rows.map((r) => (
                <tr key={`${r.exam}-${r.year}`}>
                  <th scope="row" className="py-2.5 pr-4 font-semibold text-heading">{r.exam}</th>
                  <td className="py-2.5 pr-4">{r.year}</td>
                  <td className="py-2.5 pr-4 text-right">{n(r.examinees)}</td>
                  <td className="py-2.5 pr-4 text-right">{n(r.passed)}</td>
                  <td className="py-2.5 pr-4 text-right font-semibold text-heading">{n(((r.passed / r.examinees) * 100).toFixed(1))}%</td>
                  <td className="py-2.5 text-right">{n(r.aPlus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl border-t border-line pt-3">
          <TextLink href="/results">{data.t.home.resultSearch}</TextLink>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Facilities */

const FACILITY_ICONS = [FlaskConical, Monitor, Library, Trophy, HeartPulse, Users];

export function WhyFacilitiesSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  // Checkerboard of filled cards, like a printed prospectus page.
  const filled: Record<number, string> = { 1: "bg-leaf-700 text-white border-leaf-700", 3: "bg-navy-800 text-white border-navy-800", 5: "bg-navy-800 text-white border-navy-800" };
  const iconTone = ["bg-leaf-700", "bg-navy-800"];
  return (
    <section aria-labelledby="why-title" className="border-t border-line py-14 sm:py-16">
      <div className="container-page">
        <SectionHeading id="why-title" align="center" title={copy.title} />
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.facilities.map(({ title, text }, i) => {
            const Icon = FACILITY_ICONS[i % FACILITY_ICONS.length];
            const fill = filled[i];
            return (
              <li key={title} className={cn("rounded-md border p-6", fill ?? "border-line bg-surface")}>
                <span className={cn("flex size-11 items-center justify-center rounded-md", fill ? "bg-white/15" : iconTone[i % 2], "text-white")}>
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className={cn("mt-4 text-lg font-semibold", fill ? "text-white" : "text-heading")}>{title}</h3>
                <p className={cn("mt-1.5 text-sm leading-relaxed", fill ? "text-white/85" : "text-muted")}>{text}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-center">
          <TextLink href="/about#campus">{data.t.home.allFacilities}</TextLink>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ News */

export function NewsSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const featured = data.news.find((n) => n.featured) ?? data.news[0];
  const rest = data.news.filter((n) => n !== featured).slice(0, 4);
  if (!featured) return null;
  return (
    <section aria-labelledby="news-title" className="border-t border-line bg-surface py-14 sm:py-16">
      <div className="container-page">
        <SectionHeading id="news-title" variant="small" title={copy.title} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <article>
            <Picture image={featured.image} className="rounded-md" sizes="(min-width: 1024px) 55vw, 100vw" />
            <time dateTime={featured.date} className="mt-4 block text-sm text-muted">
              {formatDate(featured.date, data.lang)}
            </time>
            <h3 className="mt-1 font-serif text-2xl leading-snug font-semibold text-heading">
              <Link href={`/news/${featured.slug}`} className="hover:underline underline-offset-4">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{featured.excerpt}</p>
          </article>
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {rest.map((a) => (
                <li key={a.slug} className="py-3">
                  <time dateTime={a.date} className="text-sm text-muted">
                    {formatDate(a.date, data.lang)}
                  </time>
                  <h3 className="mt-0.5 leading-snug font-semibold text-heading">
                    <Link href={`/news/${a.slug}`} className="hover:underline underline-offset-4">
                      {a.title}
                    </Link>
                  </h3>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <ArrowLink href="/news">{data.t.home.allNews}</ArrowLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Gallery */

export function GalleryPreview({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  // The featured news photo is already on this page; don't show it twice.
  const featured = data.news.find((n) => n.featured) ?? data.news[0];
  const used = new Set([featured?.image.src, STATS_IMAGE.src, STATS_PHOTO.src, ...(data.slideImages ?? [])].filter(Boolean));
  const picks = data.gallery.filter((g) => !used.has(g.image.src)).slice(0, 8);
  if (picks.length === 0) return null;
  return (
    <section aria-labelledby="gallery-title" className="border-t border-line py-14 sm:py-16">
      <div className="container-page">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionHeading id="gallery-title" variant="small" title={copy.title} />
          <TextLink href="/gallery">{data.t.home.openGallery}</TextLink>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {picks.map((g) => (
            <li key={g.id}>
              <figure>
                <Link href="/gallery" className="block" aria-label={data.t.home.galleryOpen(g.caption)}>
                  <Picture image={g.image} ratio="aspect-[4/3]" className="rounded-md" sizes="(min-width: 768px) 25vw, 50vw" />
                </Link>
                <figcaption className="mt-1.5 text-sm text-muted">{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Teachers + quotes */

export function PeopleSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const picks = data.people.filter((t) => t.kind !== "staff").slice(0, 4);
  const quotes = data.testimonials.slice(0, 2);
  return (
    <section aria-labelledby="faculty-title" className="border-t border-line bg-surface py-14 sm:py-16">
      <div className="container-page">
        <SectionHeading id="faculty-title" variant="small" title={copy.title} />
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((t) => (
            <li key={t.id}>
              <TeacherCard teacher={t} />
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <ArrowLink href="/teachers">{data.t.home.allTeachers}</ArrowLink>
        </p>

        {quotes.length > 0 && (
          <div className="mt-12 max-w-3xl">
            <h3 className="font-serif text-xl font-semibold text-heading">{data.t.home.testimonials}</h3>
            <ul className="mt-4 space-y-6">
              {quotes.map((q) => (
                <li key={q.name}>
                  <figure className="border-l-4 border-line-strong pl-4">
                    <blockquote className="leading-relaxed text-ink">
                      <p>“{q.quote}”</p>
                    </blockquote>
                    <figcaption className="mt-2 text-sm text-muted">
                      <span className="font-semibold text-heading">{q.name}</span>, {q.role}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------- FAQ + contact */

export function FaqContactSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const site = data.site;
  return (
    <section aria-label={data.t.home.faqContact} className="border-t border-line py-14 sm:py-16">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading variant="small" title={copy.title} />
          <Accordion className="mt-5" items={data.faqs.slice(0, 6)} />
          <p className="mt-4">
            <TextLink href="/faq">{data.t.home.moreQuestions}</TextLink>
          </p>
        </div>
        <div>
          <SectionHeading variant="small" title={data.t.home.writeOffice} description={data.t.home.officeCall(site.officeHours, site.phone)} />
          <Card className="mt-5 p-5 sm:p-6">
            <ContactForm to={site.email} />
          </Card>
        </div>
      </div>
    </section>
  );
}
