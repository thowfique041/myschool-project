"use client";

import { useI18n } from "@/i18n/client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import Link from "@/components/i18n/Link";
import { ArrowRight, Paperclip } from "lucide-react";
import { buttonClasses } from "@/components/ui/primitives";
import { Search, X } from "lucide-react";
import type { Notice, NoticeCategory } from "@/types";
import { num, cn, normalize, datePartsL } from "@/lib/utils";

type Filter = NoticeCategory | "all";

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  const { lang } = useI18n();
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors",
              active ? "border-brand bg-brand hover:bg-brand-hover text-white" : "border-line bg-surface text-heading hover:border-line-strong",
            )}
          >
            {o.label}
            {o.count !== undefined && <span className={cn("text-xs", active ? "text-white/85" : "text-muted")}>{num(o.count, lang)}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function SearchBox({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) {
  const { t } = useI18n();
  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        {label}
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
      <input
        id="search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-11 w-full rounded-lg border border-line bg-surface py-2.5 pr-10 pl-10 text-base focus:border-leaf-600 focus:outline-2 focus:outline-offset-0 focus:outline-leaf-600/25"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label={t.common.clearSearch} className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink">
          <X aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}

const PAGE = 5;

/** One notice as an editorial row. Important notices get a burgundy rule, a tinted ground and a larger title. */
function NoticeItem({ n }: { n: Notice }) {
  const { t, lang } = useI18n();
  const { day, month, year } = datePartsL(n.date, lang);
  return (
    <article className={cn("group relative grid grid-cols-[4rem_1fr] gap-x-5 border-b border-line py-5 pr-2 sm:grid-cols-[4.5rem_1fr_auto]", n.important ? "border-l-4 border-l-signal-600 bg-signal-50/60 pl-4" : "pl-5")}>
      <time dateTime={n.date} className="border-r border-line pr-3 text-center">
        <span className="block font-serif text-[1.8rem] leading-none font-semibold text-heading">{day}</span>
        <span className="eyebrow mt-1 block text-leaf-600 dark:text-accent">{month}</span>
        <span className="mt-0.5 block text-xs text-muted">{year}</span>
      </time>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="eyebrow text-subheading">{n.categoryLabel ?? n.category}</span>
          {n.important && <span className="bg-signal-600 px-1.5 py-px font-bold tracking-wider text-white uppercase">{t.common.important}</span>}
          {n.attachment && (
            <span className="inline-flex items-center gap-1 text-muted">
              <Paperclip aria-hidden className="size-3" />
              {t.common.attachment}
            </span>
          )}
        </p>
        <h3 className={cn("mt-1.5 font-semibold text-heading group-hover:text-accent", n.important ? "font-serif text-xl leading-snug" : "leading-snug")}>
          <Link href={`/notices/${n.slug}`} className="after:absolute after:inset-0">
            {n.title}
          </Link>
        </h3>
        {n.titleEn && lang === "bn" && <p className="mt-0.5 text-sm text-muted">{n.titleEn}</p>}
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{n.summary}</p>
      </div>
      <span aria-hidden className="hidden self-center text-sm font-semibold text-accent sm:inline-flex sm:items-center sm:gap-1">
        {t.notices.read}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </article>
  );
}

export function NoticeExplorer({ notices }: { notices: Notice[] }) {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [limit, setLimit] = useState(PAGE);
  const deferred = useDeferredValue(query);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = normalize(deferred);
    return notices
      .filter((n) => category === "all" || n.category === category)
      .filter((n) => !q || normalize(`${n.title} ${n.titleEn ?? ""} ${n.summary}`).includes(q))
      .sort((a, b) => (sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [notices, deferred, category, sort]);
  // A new search, filter or order starts again from the first page.
  const onQuery = (v: string) => {
    setQuery(v);
    setLimit(PAGE);
  };
  const onCategory = (v: Filter) => {
    setCategory(v);
    setLimit(PAGE);
  };
  const onSort = (v: "new" | "old") => {
    setSort(v);
    setLimit(PAGE);
  };

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: t.common.all, count: notices.length },
    ...([...new Set(notices.map((n) => n.category))] as NoticeCategory[])
      .map((c) => ({ value: c as Filter, label: notices.find((n) => n.category === c)?.categoryLabel ?? c, count: notices.filter((n) => n.category === c).length }))
      .filter((o) => o.count > 0),
  ];
  const active = query !== "" || category !== "all" || sort !== "new";
  const clear = () => {
    setQuery("");
    setCategory("all");
    setSort("new");
    setLimit(PAGE);
  };
  const showMore = () => {
    const first = limit;
    setLimit((l) => l + PAGE);
    // Move focus to the first newly shown notice so keyboard users keep their place.
    requestAnimationFrame(() => (listRef.current?.querySelectorAll("article a")[first] as HTMLElement | undefined)?.focus());
  };
  const shown = results.slice(0, limit);

  return (
    <div>
      {/* Toolbar */}
      <div className="border-t-2 border-navy-800 pt-5 dark:border-navy-300">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <SearchBox value={query} onChange={onQuery} label={t.notices.search} placeholder={t.notices.searchPlaceholder} />
          <label className="flex items-center gap-2 text-sm text-muted">
            <span className="shrink-0">{t.common.sort}</span>
            <select aria-label={t.notices.sortLabel} value={sort} onChange={(e) => onSort(e.target.value as "new" | "old")} className="min-h-11 w-full border border-line-strong bg-surface px-3 text-ink sm:w-auto">
              <option value="new">{t.common.newest}</option>
              <option value="old">{t.common.oldest}</option>
            </select>
          </label>
        </div>
        <div role="group" aria-label={t.common.filterCategory} className="-mx-4 mt-4 flex gap-1 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              aria-pressed={o.value === category}
              onClick={() => onCategory(o.value)}
              className={cn(
                "-mb-px inline-flex min-h-11 shrink-0 items-center gap-1.5 border-b-2 px-3 text-sm font-medium whitespace-nowrap transition-colors",
                o.value === category ? "border-leaf-600 text-heading dark:border-accent" : "border-transparent text-muted hover:text-heading",
              )}
            >
              {o.label}
              <span className="text-xs tabular-nums">{num(o.count, lang)}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <p className="text-muted" aria-live="polite">
            {t.notices.showing(results.length, notices.length)}
          </p>
          {active && (
            <button type="button" onClick={clear} className="inline-flex min-h-9 items-center gap-1 font-semibold text-accent hover:underline underline-offset-4">
              <X aria-hidden className="size-4" />
              {t.notices.clearFilters}
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <>
          <div ref={listRef} className="mt-2 border-t border-line">
            {shown.map((n) => (
              <NoticeItem key={n.slug} n={n} />
            ))}
          </div>
          {results.length > limit && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={showMore} className={buttonClasses("outline")}>
                {t.notices.loadMore}
              </button>
              <span className="text-sm text-muted">
                {num(shown.length, lang)} / {num(results.length, lang)}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 border-t-2 border-b border-t-navy-800 border-b-line px-1 py-12 text-center dark:border-t-navy-300">
          <p className="font-serif text-xl font-semibold text-heading">{t.notices.none}</p>
          <p className="mt-1 text-sm text-muted">{t.notices.noneHint}</p>
          <button type="button" onClick={clear} className={cn(buttonClasses("outline", "sm"), "mt-5")}>
            {t.notices.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
