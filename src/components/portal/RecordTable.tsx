"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "@/components/i18n/Link";
import { Download, Search, X } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { cn, formatDate, normalize, num } from "@/lib/utils";
import { NewBadge } from "./NewBadge";
import { table, tableWrap, td, th } from "./table";

export type RecordRow = {
  id: string;
  date: string;
  title: string;
  /** Where the title goes: the PDF when there is one, otherwise a page on this site. */
  href: string;
  external: boolean;
  category?: string;
  categoryLabel?: string;
  isNew?: boolean;
  fileHref?: string;
  /** Extra text matched by the search box. */
  searchText?: string;
};

const copy = {
  en: {
    no: "No.", date: "Date", title: "Title", file: "Download", year: "Year", allYears: "All years", all: "All", category: "Category",
    search: "Search", searchPh: "Search by title…", clear: "Clear search", none: "Nothing matches these filters.", reset: "Clear filters",
    pages: "Pages", prev: "Previous", next: "Next", page: (n: number) => `Page ${n}`, download: "Download", opens: "(opens in a new tab)",
  },
  bn: {
    no: "ক্রম", date: "তারিখ", title: "শিরোনাম", file: "ডাউনলোড", year: "বছর", allYears: "সব বছর", all: "সব", category: "বিভাগ",
    search: "খুঁজুন", searchPh: "শিরোনাম দিয়ে খুঁজুন…", clear: "খোঁজা মুছুন", none: "এই বাছাইয়ে কিছু পাওয়া যায়নি।", reset: "বাছাই মুছুন",
    pages: "পাতা", prev: "আগের", next: "পরের", page: (n: number) => `${num(n, "bn")} নম্বর পাতা`, download: "ডাউনলোড", opens: "(নতুন ট্যাবে খুলবে)",
  },
};

/**
 * A list of dated records (notices, downloads) as a table with a year filter
 * and page numbers. Notices also get a search box and category buttons.
 */
export function RecordTable({
  rows,
  caption,
  pageSize = 10,
  search = false,
  categories,
}: {
  rows: RecordRow[];
  caption: string;
  pageSize?: number;
  search?: boolean;
  categories?: { value: string; label: string }[];
}) {
  const { lang } = useI18n();
  const c = copy[lang];
  const [year, setYear] = useState("all");
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const q = useDeferredValue(query);

  const years = useMemo(() => [...new Set(rows.map((r) => r.date.slice(0, 4)))].sort().reverse(), [rows]);
  const filtered = useMemo(() => {
    const nq = normalize(q);
    return rows.filter(
      (r) =>
        (year === "all" || r.date.startsWith(year)) &&
        (cat === "all" || r.category === cat) &&
        (!nq || normalize(`${r.title} ${r.searchText ?? ""}`).includes(nq)),
    );
  }, [rows, year, cat, q]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * pageSize, cur * pageSize);
  const reset = () => {
    setYear("all");
    setCat("all");
    setQuery("");
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3 border border-line bg-surface p-3">
        {search && (
          <div className="relative min-w-0 flex-1 basis-60">
            <label htmlFor="rt-search" className="sr-only">{c.search}</label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              id="rt-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={c.searchPh}
              className="min-h-10 w-full border border-line-strong bg-surface py-2 pr-9 pl-9 text-base"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label={c.clear} className="absolute top-1/2 right-1.5 flex size-7 -translate-y-1/2 items-center justify-center text-muted hover:text-ink">
                <X aria-hidden className="size-4" />
              </button>
            )}
          </div>
        )}
        <label className="flex items-center gap-2 text-sm text-heading">
          {c.year}
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="min-h-10 border border-line-strong bg-surface px-2 text-base text-ink"
          >
            <option value="all">{c.allYears}</option>
            {years.map((y) => (
              <option key={y} value={y}>{num(y, lang)}</option>
            ))}
          </select>
        </label>
        {categories && categories.length > 1 && (
          <div role="group" aria-label={c.category} className="flex w-full flex-wrap gap-1.5">
            {[{ value: "all", label: c.all }, ...categories].map((o) => (
              <button
                key={o.value}
                type="button"
                aria-pressed={cat === o.value}
                onClick={() => {
                  setCat(o.value);
                  setPage(1);
                }}
                className={cn(
                  "min-h-9 border px-3 text-sm",
                  cat === o.value ? "border-navy-800 bg-navy-800 text-white" : "border-line-strong bg-surface text-heading hover:bg-tint",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <div className="border border-line bg-surface px-4 py-8 text-center">
          <p className="text-heading">{c.none}</p>
          <button type="button" onClick={reset} className="mt-2 text-sm font-semibold text-accent underline underline-offset-4">{c.reset}</button>
        </div>
      ) : (
        <div className={tableWrap} tabIndex={0} role="region" aria-label={caption}>
          <table className={`${table} min-w-[34rem]`}>
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr>
                <th scope="col" className={`${th} w-14`}>{c.no}</th>
                <th scope="col" className={`${th} w-32`}>{c.date}</th>
                <th scope="col" className={th}>{c.title}</th>
                <th scope="col" className={`${th} w-24 text-center`}>{c.file}</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((r, i) => (
                <tr key={r.id} className="hover:bg-tint">
                  <td className={`${td} text-muted`}>{num((cur - 1) * pageSize + i + 1, lang)}</td>
                  <td className={`${td} whitespace-nowrap`}>
                    <time dateTime={r.date}>{formatDate(r.date, lang)}</time>
                  </td>
                  <td className={td}>
                    {r.external ? (
                      <a href={r.href} target="_blank" rel="noopener" className="text-heading hover:text-accent hover:underline underline-offset-4">
                        {r.title}
                        <span className="sr-only"> {c.opens}</span>
                      </a>
                    ) : (
                      <Link href={r.href} className="text-heading hover:text-accent hover:underline underline-offset-4">{r.title}</Link>
                    )}
                    {r.isNew && (
                      <>
                        {" "}
                        <NewBadge lang={lang} />
                      </>
                    )}
                    {r.categoryLabel && <span className="mt-0.5 block text-xs text-muted">{r.categoryLabel}</span>}
                  </td>
                  <td className={`${td} text-center`}>
                    {r.fileHref ? (
                      <a href={r.fileHref} download target="_blank" rel="noopener" className="inline-flex size-9 items-center justify-center border border-line-strong text-heading hover:bg-navy-800 hover:text-white">
                        <Download aria-hidden className="size-4" />
                        <span className="sr-only">{c.download}: {r.title}</span>
                      </a>
                    ) : (
                      <span className="text-muted">–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label={c.pages} className="flex flex-wrap items-center gap-1">
          <button type="button" disabled={cur === 1} onClick={() => setPage(cur - 1)} className="min-h-9 border border-line-strong bg-surface px-3 text-sm disabled:opacity-50">{c.prev}</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-label={c.page(p)}
              aria-current={p === cur ? "page" : undefined}
              className={cn("min-h-9 min-w-9 border px-2 text-sm", p === cur ? "border-navy-800 bg-navy-800 text-white" : "border-line-strong bg-surface hover:bg-tint")}
            >
              {num(p, lang)}
            </button>
          ))}
          <button type="button" disabled={cur === pages} onClick={() => setPage(cur + 1)} className="min-h-9 border border-line-strong bg-surface px-3 text-sm disabled:opacity-50">{c.next}</button>
        </nav>
      )}
    </div>
  );
}
