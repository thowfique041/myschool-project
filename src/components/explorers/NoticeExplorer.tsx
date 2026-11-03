"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { NoticeRow } from "@/components/shared/cards";
import { noticeCategories } from "@/data/notices";
import type { Notice, NoticeCategory } from "@/types";
import { cn, normalize } from "@/lib/utils";

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
              active ? "border-navy-800 bg-navy-800 text-white" : "border-line bg-white text-navy-800 hover:border-navy-300",
            )}
          >
            {o.label}
            {o.count !== undefined && <span className={cn("text-xs", active ? "text-navy-200" : "text-muted")}>{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function SearchBox({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) {
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
        className="min-h-11 w-full rounded-lg border border-line bg-white py-2.5 pr-10 pl-10 text-[0.95rem] focus:border-leaf-600 focus:outline-2 focus:outline-offset-0 focus:outline-leaf-600/25"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink">
          <X aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}

export function NoticeExplorer({ notices }: { notices: Notice[] }) {
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
    { value: "all", label: "All", count: notices.length },
    ...(Object.keys(noticeCategories) as NoticeCategory[])
      .map((c) => ({ value: c as Filter, label: noticeCategories[c].label, count: notices.filter((n) => n.category === c).length }))
      .filter((o) => o.count > 0),
  ];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <SearchBox value={query} onChange={setQuery} label="Search notices" placeholder="Search notices in Bangla or English…" />
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")} className="min-h-11 rounded-lg border border-line bg-white px-3 text-ink">
            <option value="new">Newest first</option>
            <option value="old">Oldest first</option>
          </select>
        </label>
      </div>
      <div className="mt-4">
        <FilterChips label="Filter by category" options={options} value={category} onChange={setCategory} />
      </div>
      <p className="mt-5 text-sm text-muted" aria-live="polite">
        Showing {results.length} of {notices.length} notices
      </p>
      {results.length > 0 ? (
        <div className="mt-2 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white px-5 shadow-[var(--shadow-card)]">
          {results.map((n) => (
            <NoticeRow key={n.slug} notice={n} />
          ))}
        </div>
      ) : (
        <div className="mt-2 rounded-[var(--radius-card)] border border-dashed border-line bg-white px-6 py-12 text-center">
          <p className="font-semibold text-navy-900">No notices match your search.</p>
          <p className="mt-1 text-sm text-muted">Try a different word or choose “All” categories.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 text-sm font-semibold text-leaf-700 hover:underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
