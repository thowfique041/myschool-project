"use client";
import type { TeacherTone } from "./teacher-tones";
import { DefaultAvatar } from "@/components/ui/DefaultAvatar";

import Link from "@/components/i18n/Link";
import { ArrowRight, CalendarDays, Mail, MapPin, Paperclip, Phone } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import type { NewsArticle, Notice, Teacher } from "@/types";
import { cn, datePartsL, formatDate } from "@/lib/utils";
import { useI18n } from "@/i18n/client";

/* ------------------------------------------------------------ Notice row */

export function DateBlock({ iso, className }: { iso: string; className?: string }) {
  const { lang } = useI18n();
  const { day, month, year } = datePartsL(iso, lang);
  return (
    <time
      dateTime={iso}
      className={cn("flex w-16 shrink-0 flex-col items-center border-r border-line pr-3 text-center", className)}
    >
      <span className="eyebrow text-leaf-600 dark:text-accent">{month}</span>
      <span className="mt-1 font-serif text-[1.7rem] leading-none font-semibold text-heading">{day}</span>
      <span className="mt-1 text-xs text-muted">{year}</span>
    </time>
  );
}

export function NoticeRow({ notice, compact = false }: { notice: Notice; compact?: boolean }) {
  const { t, lang } = useI18n();
  return (
    <article className="group relative flex gap-4 py-4">
      <DateBlock iso={notice.date} />
      <div className="min-w-0 flex-1">
        {/* Printed-notice style meta line: CATEGORY · stamp · attachment */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="font-semibold tracking-wider text-subheading uppercase">{notice.categoryLabel ?? notice.category}</span>
          {notice.important && (
            <>
              <span aria-hidden className="text-line-strong">|</span>
              <span className="bg-signal-600 px-1.5 py-px font-bold tracking-wider text-white uppercase">{t.common.important}</span>
            </>
          )}
          {notice.attachment && (
            <>
              <span aria-hidden className="text-line-strong">|</span>
              <span className="inline-flex items-center gap-1 text-muted">
                <Paperclip aria-hidden className="size-3" />
                {t.common.attachment}
              </span>
            </>
          )}
        </div>
        <h3 className="mt-1.5 font-semibold text-heading group-hover:text-accent" style={{ lineHeight: 1.55 }}>
          <Link href={`/notices/${notice.slug}`} className="after:absolute after:inset-0">
            {notice.title}
          </Link>
        </h3>
        {!compact && (
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {notice.summary}
          </p>
        )}
        <p className="mt-1 text-xs text-muted">{formatDate(notice.date, lang)}</p>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- News card */

export function NewsCard({ article, headingLevel = "h3" }: { article: NewsArticle; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const { lang } = useI18n();
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Picture image={article.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-muted">
          <Badge tone="navy">{article.categoryLabel ?? article.category}</Badge>
          <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
        </div>
        <H className="mt-3 text-lg leading-snug font-semibold text-heading group-hover:text-accent">
          <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        {(article.eventDate || article.venue) && (
          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-muted">
            {article.eventDate && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays aria-hidden className="size-3.5" />
                {formatDate(article.eventDate, lang)}
              </span>
            )}
            {article.venue && (
              <span className="inline-flex items-center gap-1">
                <MapPin aria-hidden className="size-3.5" />
                {article.venue}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ Teacher card */


export function TeacherAvatar({ teacher, size = "md", ring }: { teacher: Teacher; size?: "md" | "lg"; ring?: string }) {
  if (teacher.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={teacher.photo}
        alt=""
        className={cn("shrink-0 rounded-full border-4 border-surface object-cover ring-2", ring ?? "ring-navy-700 dark:ring-navy-300", size === "lg" ? "size-24" : "size-16")}
      />
    );
  }
  return <DefaultAvatar gender={teacher.gender} className={cn(ring ? cn("border-4 border-surface ring-2", ring) : "ring-4 ring-surface", size === "lg" ? "size-24" : "size-16")} />;
}

export function TeacherCard({ teacher, tone, size = "md" }: { teacher: Teacher; tone?: TeacherTone; size?: "md" | "sm" }) {
  const { t } = useI18n();
  const sm = size === "sm";
  return (
    <article
      className={cn(
        "flex h-full flex-col items-center rounded-[var(--radius-card)] bg-surface text-center shadow-[var(--shadow-card)]",
        sm ? "p-4" : "p-6",
        tone ? cn("border border-line border-t-[3px]", tone.card) : "border border-line",
      )}
    >
      <TeacherAvatar teacher={teacher} size={sm ? "md" : "lg"} ring={tone?.ring} />
      <h3 className={cn("font-serif font-semibold text-heading", sm ? "mt-3 text-base" : "mt-4 text-lg")}>{teacher.name}</h3>
      <p className={cn("font-semibold", sm ? "mt-1 text-xs" : "mt-2 text-sm", tone ? tone.text : "text-accent")}>{teacher.designation}</p>
      <p className={cn("text-muted", sm ? "mt-0.5 line-clamp-1 text-xs" : "mt-1 text-sm")}>{teacher.subjects.join(", ")}</p>
      {!sm && (
        <dl className="mt-auto w-full border-t border-line pt-3 text-xs text-muted">
          <div className="flex justify-between gap-2 pt-1">
            <dt>{t.cards.qualification}</dt>
            <dd className="text-right text-ink">{teacher.qualification}</dd>
          </div>
          <div className="flex justify-between gap-2 pt-1">
            <dt>{t.cards.section}</dt>
            <dd className="text-ink">{t.sections[teacher.section] ?? teacher.section}</dd>
          </div>
        </dl>
      )}
      <div className={cn("w-full border-t border-line text-left", sm ? "mt-auto space-y-1 pt-2.5 text-xs" : "mt-3 space-y-1.5 pt-3 text-sm")}>
        <a href={`tel:${teacher.phone.replace(/[\s-]/g, "")}`} className="flex items-center gap-2 text-heading hover:text-accent">
          <Phone aria-hidden className={cn("shrink-0 text-accent", sm ? "size-3.5" : "size-4")} />
          <span className="sr-only">{t.common.phone}: </span>
          {teacher.phone}
        </a>
        <a href={`mailto:${teacher.email}`} className="flex min-w-0 items-center gap-2 text-heading hover:text-accent">
          <Mail aria-hidden className={cn("shrink-0 text-accent", sm ? "size-3.5" : "size-4")} />
          <span className="sr-only">{t.common.email}: </span>
          <span className="truncate">{teacher.email}</span>
        </a>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ Arrow link */

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-accent", className)}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
