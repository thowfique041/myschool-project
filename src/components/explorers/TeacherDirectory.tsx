"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { TeacherCard } from "@/components/shared/cards";
import { FilterChips, SearchBox } from "./NoticeExplorer";
import type { Department, Teacher } from "@/types";
import { normalize } from "@/lib/utils";

export function TeacherDirectory({ teachers, departments }: { teachers: Teacher[]; departments: Department[] }) {
  const [dept, setDept] = useState<Department | "all">("all");
  const [section, setSection] = useState<Teacher["section"] | "any">("any");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const q = normalize(deferred);
    return teachers.filter(
      (t) =>
        (dept === "all" || t.department === dept) &&
        (section === "any" || t.section === section || t.section === "All") &&
        (!q || normalize(`${t.name} ${t.nameBn} ${t.subjects.join(" ")} ${t.designation}`).includes(q)),
    );
  }, [teachers, dept, section, deferred]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_14rem]">
        <SearchBox value={query} onChange={setQuery} label="Search teachers" placeholder="Search by name or subject…" />
        <label className="sr-only" htmlFor="section-filter">
          Section
        </label>
        <select
          id="section-filter"
          value={section}
          onChange={(e) => setSection(e.target.value as Teacher["section"] | "any")}
          className="min-h-11 rounded-lg border border-line bg-surface px-3 text-ink"
        >
          <option value="any">All sections</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Higher Secondary">Higher Secondary</option>
        </select>
      </div>
      <div className="mt-4">
        <FilterChips
          label="Filter by department"
          value={dept}
          onChange={setDept}
          options={[{ value: "all" as const, label: "All departments" }, ...departments.map((d) => ({ value: d, label: d }))]}
        />
      </div>
      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "teacher" : "teachers"} found
      </p>
      {results.length ? (
        <ul className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((t) => (
            <li key={t.id}>
              <TeacherCard teacher={t} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <p className="font-semibold text-heading">No teachers match these filters.</p>
          <button
            type="button"
            onClick={() => {
              setDept("all");
              setSection("any");
              setQuery("");
            }}
            className="mt-3 text-sm font-semibold text-accent hover:underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
