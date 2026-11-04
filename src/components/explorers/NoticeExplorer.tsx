"use client";

import { useI18n } from "@/i18n/client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { NoticeRow } from "@/components/shared/cards";
import type { Notice, NoticeCategory } from "@/types";
import { num, cn, normalize } from "@/lib/utils";

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
            {o.count !== undefined && <span className={cn("text-xs", active ? "text-navy-200" : "text-muted")}>{num(o.count, lang)}</span>}
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
        className="min-h-11 w-full rounded-lg border border-line bg-surface py-2.5 pr-10 pl-10 text-[0.95rem] focus:border-leaf-600 focus:outline-2 focus:outline-offset-0 focus:outline-leaf-600/25"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label={t.common.clearSearch} className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink">
          <X aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}

export function NoticeExplorer({ notices }: { notices: Notice[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("all");
  const [sort, setSort] = useState<"new" | "old">("new");
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const q = normalize(deferred);
    return notices
      .filter((n) => category === "all" || n.category === category)
      .filter((n) => !q || normalize(`${n.title} ${n.titleEn ?? ""} ${n.summary}`).includes(q))
      .sort((a, b) => (sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [notices, deferred, category, sort]);

  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: t.common.all, count: notices.length },
    ...([...new Set(notices.map((n) => n.category))] as NoticeCategory[])
      .map((c) => ({ value: c as Filter, label: notices.find((n) => n.category === c)?.categoryLabel ?? c, count: notices.filter((n) => n.category === c).length }))
      .filter((o) => o.count > 0),
  ];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <SearchBox value={query} onChange={setQuery} label={t.notices.search} placeholder={t.notices.searchPlaceholder} />
        <label className="flex items-center gap-2 text-sm text-muted">
          {t.common.sort}
          <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")} className="min-h-11 rounded-lg border border-line bg-surface px-3 text-ink">
            <option value="new">{t.common.newest}</option>
            <option value="old">{t.common.oldest}</option>
          </select>
        </label>
      </div>
      <div className="mt-4">
        <FilterChips label={t.common.filterCategory} options={options} value={category} onChange={setCategory} />
      </div>
      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {t.notices.showing(results.length, notices.length)}
      </p>
      {results.length > 0 ? (
        <div className="mt-2 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-surface px-5 shadow-[var(--shadow-card)]">
          {results.map((n) => (
            <NoticeRow key={n.slug} notice={n} />
          ))}
        </div>
      ) : (
        <div className="mt-2 rounded-[var(--radius-card)] border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold text-heading">{t.notices.none}</p>
          <p className="mt-1 text-sm text-muted">{t.notices.noneHint}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 text-sm font-semibold text-accent hover:underline underline-offset-4"
          >
            {t.common.reset}
          </button>
        </div>
      )}
    </div>
  );
}
