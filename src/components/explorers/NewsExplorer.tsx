"use client";

import { useI18n } from "@/i18n/client";

import { useDeferredValue, useMemo, useState } from "react";
import { NewsCard } from "@/components/shared/cards";
import { FilterChips, SearchBox } from "./NoticeExplorer";
import type { NewsArticle, NewsCategory } from "@/types";
import { normalize } from "@/lib/utils";

export function NewsExplorer({ articles }: { articles: NewsArticle[] }) {
  const { t } = useI18n();
  const [category, setCategory] = useState<NewsCategory | "all">("all");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const q = normalize(deferred);
    return articles.filter(
      (a) => (category === "all" || a.category === category) && (!q || normalize(`${a.title} ${a.excerpt}`).includes(q)),
    );
  }, [articles, category, deferred]);

  const used = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[20rem_1fr] lg:items-center">
        <SearchBox value={query} onChange={setQuery} label={t.news.search} placeholder={t.news.searchPlaceholder} />
        <FilterChips
          label={t.common.filterCategory}
          value={category}
          onChange={setCategory}
          options={[{ value: "all" as const, label: t.common.all }, ...used.map((c) => ({ value: c, label: articles.find((a) => a.category === c)?.categoryLabel ?? c }))]}
        />
      </div>
      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {t.news.count(results.length)}
      </p>
      {results.length ? (
        <ul className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <li key={a.slug}>
              <NewsCard article={a} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold text-heading">{t.news.none}</p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="mt-3 text-sm font-semibold text-accent hover:underline underline-offset-4"
          >
            {t.common.reset}
          </button>
        </div>
      )}
    </div>
  );
}
