import { DefaultAvatar } from "@/components/ui/DefaultAvatar";
import Link from "@/components/i18n/Link";
import {
  CheckCircle2,
  ClipboardList,
  Music4,
  Quote,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge, ButtonLink, Card, SectionHeading } from "@/components/ui/primitives";
import { SampleTag } from "@/components/ui/SampleTag";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink, NoticeRow, TeacherCard } from "@/components/shared/cards";
import { ContactForm } from "@/components/forms/ContactForm";
import { StatCounter } from "./motion-bits";
import type { HomeData, HomeContent, SectionCopy } from "./types";
import { cn, formatDate, num } from "@/lib/utils";

/* ------------------------------------------------- About + principal */

export function WelcomeSection({ home, copy, data }: { home: HomeContent; copy: SectionCopy; data: HomeData }) {
  const p = data.principal;
  return (
    <section aria-labelledby="welcome-title" className="py-16 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="welcome-title"
            kicker={copy.kicker}
            title={copy.title || home.welcomeTitle}
          />
          <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-muted">
            {home.welcomeText.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {home.welcomePoints.map((t) => (
              <li key={t} className="flex gap-2.5 text-[0.95rem] text-ink">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                {t}
              </li>
            ))}
          </ul>
          <ArrowLink href="/about" className="mt-7">
            {data.t.home.readHistory}
          </ArrowLink>
        </Reveal>

        <Reveal delay={0.08}>
          <figure id="principal" className="relative h-full rounded-2xl bg-navy-900 p-7 text-white sm:p-9">
            <Quote aria-hidden className="size-9 text-leaf-200/60" />
            <p className="mt-2 text-sm font-medium text-leaf-200">
              {data.t.home.principalMessage}
            </p>
            <blockquote className="mt-3 font-serif text-[1.2rem] leading-relaxed sm:text-[1.3rem]">
              “{p.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4 border-t border-white/15 pt-5">
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt="" className="size-14 rounded-full object-cover" />
              ) : (
                <DefaultAvatar gender={p.gender === "male" ? "male" : "female"} className="size-14" />
              )}
              <span>
                <span className="block font-semibold">{p.name}</span>
                <span className="block text-sm text-navy-200">{p.title}</span>
              </span>
            </figcaption>
            <Link href="/about#principal" className="mt-5 inline-block text-sm font-semibold text-leaf-200 hover:text-white hover:underline underline-offset-4">
              {data.t.home.readFull}
            </Link>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Levels */

export function LevelsSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  return (
    <section aria-labelledby="levels-title" className="border-y border-line bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="levels-title"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description || undefined}
          />
          <ArrowLink href="/academic">{data.t.home.curriculum}</ArrowLink>
        </div>
        <ol className={cn("mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line", data.levels.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {data.levels.map((level, i) => (
            <Reveal as="li" key={level.id} delay={i * 0.06} className="flex flex-col bg-surface p-7">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-4xl font-semibold text-navy-100 dark:text-navy-700">{num(String(i + 1).padStart(2, "0"), data.lang)}</span>
                <span className="text-xs font-medium text-muted">{level.ages}</span>
              </div>
              <h3 className="mt-3 font-serif text-xl font-semibold text-heading">
                {level.name}
              </h3>
              <p className="text-sm font-semibold text-accent">{level.classes}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{level.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink">
                {level.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                    {h}
                  </li>
                ))}
              </ul>
              {level.groups && level.groups.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {level.groups.map((g) => (
                    <Badge key={g} tone="navy">
                      {g}
                    </Badge>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------- Notices + admission */

export function NoticesAdmissionSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const adm = data.admission;
  return (
    <section aria-label={data.t.home.noticesAdmission} className="py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading kicker={copy.kicker} title={copy.title} description={copy.description || undefined} />
            <ArrowLink href="/notices">{data.t.home.allNotices}</ArrowLink>
          </div>
          <Card className="mt-6 divide-y divide-line px-5">
            {data.notices.slice(0, 5).map((n) => (
              <NoticeRow key={n.slug} notice={n} compact />
            ))}
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <div id="admission" className="h-full rounded-2xl border border-leaf-200 bg-leaf-50 p-6 sm:p-8">
            <Badge tone={adm.open ? "leaf" : "neutral"}>{adm.open ? data.t.home.admissionOpen : data.t.home.admissionClosed}</Badge>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-heading">
              {data.t.home.admission} {num(adm.year, data.lang)}
            </h2>
            {(data.lang === "bn" ? adm.noticeTitleBn : adm.noticeTitle) && (
              <p className="text-sm text-accent">
                {data.lang === "bn" ? adm.noticeTitleBn : adm.noticeTitle}
              </p>
            )}
            <ol className="mt-6 space-y-4">
              {adm.steps.slice(0, 4).map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-sm font-semibold text-white">
                    {num(i + 1, data.lang)}
                  </span>
                  <div>
                    <p className="font-semibold text-heading">{step.title}</p>
                    <p className="text-sm text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <dl className="mt-6 space-y-2 border-t border-leaf-200 pt-5 text-sm">
              {adm.dates.slice(0, 4).map((d) => (
                <div key={d.label} className="flex justify-between gap-4">
                  <dt className="text-muted">{d.label}</dt>
                  <dd className="shrink-0 font-semibold text-heading">{formatDate(d.date, data.lang)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/admission#apply" variant="secondary">
                {data.t.home.applyInquire}
              </ButtonLink>
              <ButtonLink href="/notices#downloads" variant="outline">
                {data.t.home.downloadForm}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------- Why us + facilities */

const reasonIcons = [Users, ShieldCheck, ClipboardList, Music4];


export function WhyFacilitiesSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  return (
    <section aria-labelledby="why-title" className="bg-navy-950 py-16 text-white sm:py-20">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="why-title"
              tone="dark"
              kicker={copy.kicker}
              title={copy.title}
              description={copy.description || undefined}
            />
            <ul className="mt-8 space-y-6">
              {data.t.home.reasons.map(({ title, text }, i) => {
                const Icon = reasonIcons[i % reasonIcons.length];
                return (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon aria-hidden className="size-5 text-leaf-200" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-navy-200">{text}</p>
                  </div>
                </li>
                );
              })}
            </ul>
          </Reveal>
          <div>
            <Reveal>
              <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-leaf-200 uppercase">{data.t.home.facilities}</h3>
            </Reveal>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.facilities.map(({ title, text, image, imageAlt }, i) => (
                <Reveal as="li" key={title} delay={i * 0.05} className="overflow-hidden rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                  {image && (
                    <Picture image={{ src: image, alt: imageAlt, width: 1600, height: 900 }} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" ratio="aspect-[16/9]" />
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold">
                      {title}
                    </h4>
                    <p className="mt-1 text-sm text-navy-200">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-4 text-sm text-navy-200">
              {data.t.home.alsoFacilities}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- Results */

export function ResultsSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const rows = data.board.rows;
  const latest = (exam: string) => rows.filter((r) => r.exam === exam).sort((a, b) => b.year.localeCompare(a.year))[0];
  const stats = [latest("SSC"), latest("HSC")]
    .filter((r): r is NonNullable<typeof r> => Boolean(r && r.examinees))
    .flatMap((r) => [
      { label: data.t.home.passRate(r.exam, r.year), value: (r.passed / r.examinees) * 100, suffix: "%", decimals: 1 },
      { label: data.t.home.gpa5(r.exam, r.year), value: r.aPlus, suffix: "", decimals: 0 },
    ]);
  return (
    <section aria-labelledby="results-title" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="results-title"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description || undefined}
          />
          <div className="flex items-center gap-3">
            {data.board.isSample && <SampleTag />}
            <ArrowLink href="/results">{data.t.home.resultSearch}</ArrowLink>
          </div>
        </div>
        <dl className={cn("mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line", stats.length >= 4 && "lg:grid-cols-4")}>
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-6">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1 font-serif text-4xl font-semibold text-heading">
                <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals} bn={data.lang === "bn"} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- News */

export function NewsSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const featured = data.news.find((n) => n.featured) ?? data.news[0];
  const rest = data.news.filter((n) => n !== featured);
  if (!featured) return null;
  return (
    <section aria-labelledby="news-title" className="border-y border-line bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="news-title" kicker={copy.kicker} title={copy.title} description={copy.description || undefined} />
          <ArrowLink href="/news">{data.t.home.allNews}</ArrowLink>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper">
              <Picture image={featured.image} sizes="(min-width: 1024px) 55vw, 100vw" imgClassName="transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <Badge tone="leaf">{data.t.common.featured}</Badge>
                  <time dateTime={featured.date}>{formatDate(featured.date, data.lang)}</time>
                </div>
                <h3 className="mt-3 font-serif text-2xl leading-snug font-semibold text-heading group-hover:text-accent">
                  <Link href={`/news/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{featured.excerpt}</p>
              </div>
            </article>
          </Reveal>
          <ul className="flex flex-col divide-y divide-line">
            {rest.slice(0, 4).map((a) => (
              <li key={a.slug} className="group relative flex gap-4 py-4 first:pt-0">
                <Picture image={a.image} ratio="aspect-[4/3]" className="w-28 shrink-0 rounded-lg sm:w-36" sizes="144px" />
                <div className="min-w-0">
                  <time dateTime={a.date} className="text-xs text-muted">
                    {formatDate(a.date, data.lang)}
                  </time>
                  <h3 className="mt-1 leading-snug font-semibold text-heading group-hover:text-accent">
                    <Link href={`/news/${a.slug}`} className="after:absolute after:inset-0">
                      {a.title}
                    </Link>
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- Gallery */

export function GalleryPreview({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const picks = data.gallery.slice(0, 8);
  return (
    <section aria-labelledby="gallery-title" className="py-16 sm:py-20">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="gallery-title" kicker={copy.kicker} title={copy.title} description={copy.description || undefined} />
          <ArrowLink href="/gallery">{data.t.home.openGallery}</ArrowLink>
        </div>
        <ul className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4">
          {picks.map((g, i) => (
            <Reveal
              as="li"
              key={g.id}
              delay={i * 0.04}
              className={cn("group relative overflow-hidden rounded-xl", i === 0 && "col-span-2 row-span-2", i === 3 && "md:col-span-2")}
            >
              <Link href="/gallery" className="block h-full" aria-label={data.t.home.galleryOpen(g.caption)}>
                <Picture image={g.image} ratio="h-full" sizes="(min-width: 768px) 50vw, 100vw" imgClassName="transition-transform duration-500 group-hover:scale-[1.04]" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent px-3 pt-8 pb-2.5 text-sm font-medium text-white">
                  {g.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------- Teachers + testimonials */

export function PeopleSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const picks = data.people.filter((t) => t.kind !== "staff").slice(0, 4);
  return (
    <section aria-labelledby="faculty-title" className="border-y border-line bg-surface py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="faculty-title"
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description || undefined}
          />
          <ArrowLink href="/teachers">{data.t.home.allTeachers}</ArrowLink>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 0.05}>
              <TeacherCard teacher={t} />
            </Reveal>
          ))}
        </ul>

        {data.testimonials.length > 0 && <div className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-serif text-xl font-semibold text-heading">{data.t.home.testimonials}</h3>
            {data.site.demoNote && <SampleTag />}
          </div>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {data.testimonials.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.05}>
                <figure className="flex h-full flex-col rounded-xl border border-line bg-paper p-6">
                  <Quote aria-hidden className="size-6 text-leaf-500" />
                  <blockquote className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                    <span className="font-semibold text-heading">{t.name}</span>
                    <span className="block text-muted">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>}
      </div>
    </section>
  );
}

/* ------------------------------------------------- FAQ + contact */

export function FaqContactSection({ copy, data }: { copy: SectionCopy; data: HomeData }) {
  const site = data.site;
  return (
    <section aria-label={data.t.home.faqContact} className="py-16 sm:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading kicker={copy.kicker} title={copy.title} description={copy.description || undefined} />
          <Accordion className="mt-6" items={data.faqs.slice(0, 6)} />
          <ArrowLink href="/faq" className="mt-5">
            {data.t.home.moreQuestions}
          </ArrowLink>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading kicker={data.t.home.contactKicker} title={data.t.home.writeOffice} description={data.t.home.officeCall(site.officeHours, site.phone)} />
          <Card className="mt-6 p-5 sm:p-7">
            <ContactForm to={site.email} />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
