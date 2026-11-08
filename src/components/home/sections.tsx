import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { Badge, ButtonLink, Card, SectionHeading } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink, DateBlock, NoticeRow } from "@/components/shared/cards";
import { ContactForm } from "@/components/forms/ContactForm";
import type { HomeData, HomeContent, SectionCopy } from "./types";
import { cn, formatDate, num } from "@/lib/utils";
import { images } from "@/data/images";
import { FacilitiesCarousel } from "./FacilitiesCarousel";


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
          <SectionHeading id="notices-title" variant="small" title={copy.title} />
          {/* A framed announcement board: label bar, then an endless bottom-to-top list about three notices tall.
              Pauses on hover or keyboard focus; the second copy only fills the loop and is hidden from assistive tech. */}
          <div className="mt-4 border border-line bg-surface">
          <div className="flex items-center justify-between gap-4 border-b-2 border-navy-800 px-5 py-3 dark:border-navy-300">
            <p className="eyebrow flex items-center gap-2 text-heading">
              <span aria-hidden className="size-2 rounded-full bg-leaf-600 dark:bg-accent" />
              {data.t.ticker.latestBn}
            </p>
            <ArrowLink href="/notices">{data.t.home.allNotices}</ArrowLink>
          </div>
          <div
            className="vmarquee no-reveal h-[19.5rem] px-5"
            style={{ "--marquee-duration": `${Math.max(data.notices.length, 3) * 4}s` } as React.CSSProperties}
          >
            <div className="vmarquee-track">
              {[0, 1].map((copyNo) => (
                <ul key={copyNo} className={cn(copyNo === 1 && "marquee-dup")} aria-hidden={copyNo === 1 || undefined} inert={copyNo === 1 || undefined}>
                  {data.notices.map((n) => (
                    <li key={n.slug} className="border-b border-line">
                      <NoticeRow notice={n} compact />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          </div>
        </div>

        <div id="admission" className="self-start border border-line bg-surface">
          <div className="border-b-2 border-leaf-600 bg-tint px-5 py-4 sm:px-6 dark:border-accent">
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

        {/* Principal: an editorial pull quote on a beige panel, signed with a small portrait. */}
        <figure id="principal" className="bg-tint p-7 sm:p-10">
          <h2 className="font-serif text-2xl leading-tight font-semibold text-heading">{data.t.home.principalMessage}</h2>
          <blockquote className="mt-5">
            <p className="font-serif text-[1.35rem] leading-snug text-heading italic sm:text-2xl">
              <span aria-hidden className="mr-1 font-serif text-4xl leading-none text-leaf-600 not-italic dark:text-accent">“</span>
              {p.quote}
            </p>
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-4 border-t border-line-strong pt-6">
            {p.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.photo} alt="" className="size-20 shrink-0 object-cover" />
            ) : (
              <DefaultAvatar gender={p.gender === "male" ? "male" : "female"} className="size-20 shrink-0 rounded-none" />
            )}
            <div>
              <span className="block font-serif text-lg font-semibold text-heading">{p.name}</span>
              <span className="block text-sm text-muted">{p.title}</span>
              <span className="mt-1.5 block">
                <TextLink href="/about#principal">{data.t.home.readFull}</TextLink>
              </span>
            </div>
          </figcaption>
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
  // A quiet information strip: the figures read across one ruled line, with no photo, boxes or icons.
  return (
    <section aria-labelledby="stats-title" className="bg-navy-900 py-12 text-white sm:py-14">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
        <div>
          <h2 id="stats-title" className="font-serif text-2xl font-semibold">
            {data.lang === "bn" ? data.site.nameBn : data.site.name}
          </h2>
          {home.statsText && <p className="mt-2 max-w-sm leading-relaxed text-navy-100">{home.statsText}</p>}
        </div>
        <dl className="grid grid-cols-2 border-t border-white/20 sm:grid-cols-4 sm:border-t-0 sm:border-l">
          {items.map((s) => (
            <div key={s.label} className="border-b border-white/20 py-5 sm:border-b-0 sm:px-6 sm:py-1 sm:not-first:border-l">
              <dd className="font-serif text-4xl font-semibold tabular-nums sm:text-[2.6rem]">{s.value}</dd>
              <dt className="mt-1 text-sm text-on-navy-accent">{s.label}</dt>
            </div>
          ))}
        </dl>
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

export function WhyFacilitiesSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const bn = data.lang === "bn";
  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-hidden bg-navy-950 py-16 text-white sm:py-20">
      {/* Owner-supplied campus photograph under a dark overlay. */}
      <Image src="/images/footer-campus.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/75" />
      <div className="container-page">
        <h2 id="why-title" className="text-center font-serif text-3xl font-semibold sm:text-4xl">{copy.title}</h2>
        <div className="mt-10">
          <FacilitiesCarousel
            items={data.facilities.map(({ title, text }) => ({ title, text }))}
            labels={{
              region: copy.title,
              prev: bn ? "আগের সুবিধা" : "Previous facility",
              next: bn ? "পরের সুবিধা" : "Next facility",
              position: bn ? "{total}টির মধ্যে {from}–{to} দেখানো হচ্ছে" : "Showing {from}–{to} of {total}",
            }}
          />
        </div>
        <p className="mt-6 text-center">
          <Link href="/about#campus" className="text-sm font-semibold text-white underline underline-offset-4 hover:text-on-navy-accent">
            {data.t.home.allFacilities}
          </Link>
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
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* Lead story: photo, then a dated kicker, headline and standfirst. */}
          <article>
            <Link href={`/news/${featured.slug}`} tabIndex={-1} aria-hidden className="block">
              <Picture image={featured.image} sizes="(min-width: 1024px) 55vw, 100vw" />
            </Link>
            <p className="eyebrow mt-5 text-leaf-600 dark:text-accent">
              <time dateTime={featured.date}>{formatDate(featured.date, data.lang)}</time>
              {featured.categoryLabel && <span className="text-muted"> · {featured.categoryLabel}</span>}
            </p>
            <h3 className="mt-2 font-serif text-[1.7rem] leading-tight font-semibold text-heading">
              <Link href={`/news/${featured.slug}`} className="hover:text-accent">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">{featured.excerpt}</p>
          </article>
          {/* Other stories: date block, headline. */}
          <div>
            <ul className="divide-y divide-line border-y-2 border-y-navy-800 dark:border-y-navy-300">
              {rest.map((a) => (
                <li key={a.slug} className="flex gap-4 py-4">
                  <DateBlock iso={a.date} />
                  <h3 className="self-center leading-snug font-semibold text-heading">
                    <Link href={`/news/${a.slug}`} className="hover:text-accent">
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

/** Cell spans for the 4-column gallery: lead 2×2, a tall photo, a wide one, then singles (12 cells). */
const GALLERY_SPANS = [
  "col-span-2 row-span-2",
  "",
  "md:row-span-2",
  "",
  "col-span-2",
  "",
  "",
];

export function GalleryPreview({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  // The featured news photo is already on this page; don't show it twice.
  const featured = data.news.find((n) => n.featured) ?? data.news[0];
  // The campus photo in the library shows another institution's building, so it is not used as a lead image here.
  const used = new Set([featured?.image.src, images.campus.src, ...(data.slideImages ?? [])].filter(Boolean));
  const picks = data.gallery.filter((g) => !used.has(g.image.src)).slice(0, GALLERY_SPANS.length);
  if (picks.length === 0) return null;
  return (
    <section aria-labelledby="gallery-title" className="border-t border-line py-14 sm:py-16">
      <div className="container-page">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <SectionHeading id="gallery-title" variant="small" title={copy.title} />
          <TextLink href="/gallery">{data.t.home.openGallery}</TextLink>
        </div>
        {/* Asymmetric editorial grid: one lead photograph, the rest arranged around it. */}
        <ul className="mt-6 grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-2 sm:auto-rows-[11rem] md:grid-cols-4 md:gap-3">
          {picks.map((g, i) => (
            <li key={g.id} className={GALLERY_SPANS[i] ?? ""}>
              <figure className="group relative h-full overflow-hidden bg-paper-dark">
                <Link href="/gallery" className="block h-full" aria-label={data.t.home.galleryOpen(g.caption)}>
                  <Image
                    src={g.image.src}
                    alt={g.image.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </Link>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-navy-950/80 px-3 py-1.5 text-xs text-white sm:text-sm">{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Teachers + quotes */

export function PeopleSection({ data }: { copy: SectionCopy; data: HomeData }) {
  // The teacher strip was removed from the home page; guardian and student quotes remain here.
  const quotes = data.testimonials.slice(0, 2);
  if (quotes.length === 0) return null;
  return (
    <section aria-labelledby="faculty-title" className="border-t border-line bg-surface py-14 sm:py-16">
      <div className="container-page">
        <h2 id="faculty-title" className="font-serif text-2xl leading-tight font-semibold text-heading">{data.t.home.testimonials}</h2>
        <ul className="mt-6 grid gap-10 md:grid-cols-2 md:gap-12">
          {quotes.map((q) => (
            <li key={q.name}>
              <figure>
                <blockquote>
                  <p className="font-serif text-xl leading-relaxed text-heading italic">
                    <span aria-hidden className="mr-1 text-3xl leading-none text-leaf-600 not-italic dark:text-accent">“</span>
                    {q.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 text-sm">
                  <span aria-hidden className="h-px w-8 bg-leaf-600 dark:bg-accent" />
                  <span>
                    <span className="font-semibold text-heading">{q.name}</span>
                    <span className="text-muted">, {q.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
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
