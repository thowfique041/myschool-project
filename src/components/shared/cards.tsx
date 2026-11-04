import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, MapPin, Paperclip, Phone } from "lucide-react";
import { Badge } from "@/components/ui/primitives";
import { Picture } from "@/components/ui/Picture";
import type { NewsArticle, Notice, Teacher } from "@/types";
import { cn, dateParts, formatDateBn, formatDateEn } from "@/lib/utils";

/* ------------------------------------------------------------ Notice row */

export function DateBlock({ iso, className }: { iso: string; className?: string }) {
  const { day, month, year } = dateParts(iso);
  return (
    <time
      dateTime={iso}
      className={cn(
        "flex w-14 shrink-0 flex-col items-center overflow-hidden rounded-md border border-line bg-white text-center",
        className,
      )}
    >
      <span className="w-full bg-navy-800 py-0.5 text-[0.65rem] font-semibold tracking-wider text-white uppercase">{month}</span>
      <span className="pt-1 font-serif text-xl leading-none font-semibold text-navy-900">{day}</span>
      <span className="pb-1 text-[0.65rem] text-muted">{year}</span>
    </time>
  );
}

export function NoticeRow({ notice, compact = false }: { notice: Notice; compact?: boolean }) {
  return (
    <article className="group relative flex gap-4 py-4">
      <DateBlock iso={notice.date} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={notice.category === "admission" ? "leaf" : notice.category === "exam" ? "navy" : "neutral"}>
            {notice.categoryLabel ?? notice.category}
          </Badge>
          {notice.important && <Badge tone="signal">Important</Badge>}
          {notice.attachment && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Paperclip aria-hidden className="size-3" /> Attachment
            </span>
          )}
        </div>
        <h3 lang="bn" className="mt-1.5 font-semibold text-navy-900 group-hover:text-leaf-700" style={{ lineHeight: 1.55 }}>
          <Link href={`/notices/${notice.slug}`} className="after:absolute after:inset-0">
            {notice.title}
          </Link>
        </h3>
        {!compact && (
          <p lang="bn" className="mt-1 line-clamp-2 text-sm text-muted">
            {notice.summary}
          </p>
        )}
        <p className="mt-1 text-xs text-muted">
          <span lang="bn">{formatDateBn(notice.date)}</span>
        </p>
      </div>
    </article>
  );
}

/* --------------------------------------------------------------- News card */

export function NewsCard({ article, headingLevel = "h3" }: { article: NewsArticle; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Picture image={article.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" imgClassName="transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-muted">
          <Badge tone="leaf">{article.categoryLabel ?? article.category}</Badge>
          <time dateTime={article.date}>{formatDateEn(article.date)}</time>
        </div>
        <H className="mt-3 text-lg leading-snug font-semibold text-navy-900 group-hover:text-leaf-700">
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
                {formatDateEn(article.eventDate)}
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

const avatarTones = [
  "bg-navy-100 text-navy-800",
  "bg-leaf-100 text-leaf-800",
  "bg-[#f3e6c8] text-[#6e5214]",
  "bg-[#ecdfe6] text-[#6b2f4f]",
];

function initials(name: string): string {
  return name
    .replace(/^(Dr\.|Md\.|Maulana)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function hash(s: string): number {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function TeacherAvatar({ teacher, size = "md" }: { teacher: Teacher; size?: "md" | "lg" }) {
  const tone = avatarTones[hash(teacher.name) % avatarTones.length];
  if (teacher.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={teacher.photo}
        alt=""
        className={cn("shrink-0 rounded-full object-cover ring-4 ring-white", size === "lg" ? "size-24" : "size-16")}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-serif font-semibold ring-4 ring-white",
        size === "lg" ? "size-24 text-2xl" : "size-16 text-lg",
        tone,
      )}
    >
      {initials(teacher.name)}
    </div>
  );
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="flex h-full flex-col items-center rounded-[var(--radius-card)] border border-line bg-white p-6 text-center shadow-[var(--shadow-card)]">
      <TeacherAvatar teacher={teacher} size="lg" />
      <h3 className="mt-4 font-semibold text-navy-900">{teacher.name}</h3>
      <p lang="bn" className="text-sm text-muted" style={{ lineHeight: 1.5 }}>
        {teacher.nameBn}
      </p>
      <p className="mt-2 text-sm font-medium text-leaf-700">{teacher.designation}</p>
      <p className="mt-1 text-sm text-muted">{teacher.subjects.join(", ")}</p>
      <dl className="mt-auto w-full border-t border-line pt-3 text-xs text-muted">
        <div className="flex justify-between gap-2 pt-1">
          <dt>Qualification</dt>
          <dd className="text-right text-ink">{teacher.qualification}</dd>
        </div>
        <div className="flex justify-between gap-2 pt-1">
          <dt>Section</dt>
          <dd className="text-ink">{teacher.section === "All" ? "All sections" : teacher.section}</dd>
        </div>
      </dl>
      <div className="mt-3 w-full space-y-1.5 border-t border-line pt-3 text-left text-sm">
        <a href={`tel:${teacher.phone.replace(/[\s-]/g, "")}`} className="flex items-center gap-2 text-navy-800 hover:text-leaf-700">
          <Phone aria-hidden className="size-4 shrink-0 text-leaf-600" />
          <span className="sr-only">Phone: </span>
          {teacher.phone}
        </a>
        <a href={`mailto:${teacher.email}`} className="flex min-w-0 items-center gap-2 text-navy-800 hover:text-leaf-700">
          <Mail aria-hidden className="size-4 shrink-0 text-leaf-600" />
          <span className="sr-only">Email: </span>
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
      className={cn("group inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-leaf-700", className)}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
