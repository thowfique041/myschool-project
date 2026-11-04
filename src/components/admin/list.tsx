"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDown, ArrowUp, Check, FileText, Search, Trash2, X } from "lucide-react";
import { bulk as bulkOp, setField } from "./demo-store";
import { AdminButton, ConfirmDialog, StatusBadge, inputCls, useToast } from "./ui";
import { cn } from "@/lib/utils";

export type ListColumn = { key: string; label: string; format?: string; labels?: Record<string, string> };
export type QuickAction = { label: string; field: string; value: unknown; when?: { field: string; not: unknown } };
type Row = Record<string, unknown> & { _id: string };

export function ListFilters({ filters, searchPlaceholder }: { filters: { key: string; label: string; options: { value: string; label: string }[] }[]; searchPlaceholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [pending, start] = useTransition();
  const push = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(changes)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    next.delete("page");
    start(() => router.push(`${pathname}?${next.toString()}`));
  };
  const active = filters.some((f) => params.get(f.key)) || params.get("q");
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        push({ q });
      }}
      className={cn("flex flex-wrap items-end gap-2", pending && "opacity-70")}
    >
      <div className="relative min-w-56 flex-1">
        <Search aria-hidden className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
        <input aria-label="Search" type="search" placeholder={searchPlaceholder} className={cn(inputCls(), "pl-9")} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {filters.map((f) => (
        <label key={f.key} className="min-w-36">
          <span className="sr-only">{f.label}</span>
          <select className={inputCls()} value={params.get(f.key) ?? ""} onChange={(e) => push({ [f.key]: e.target.value })}>
            <option value="">Any {f.label.toLowerCase()}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      <AdminButton type="submit" variant="outline">
        Search
      </AdminButton>
      {active && (
        <AdminButton
          variant="ghost"
          onClick={() => {
            setQ("");
            start(() => router.push(pathname));
          }}
        >
          <X aria-hidden className="size-4" /> Clear
        </AdminButton>
      )}
    </form>
  );
}

function Cell({ col, value }: { col: ListColumn; value: unknown }) {
  const v = value;
  switch (col.format) {
    case "badge":
      return v ? <StatusBadge value={String(v)} label={col.labels?.[String(v)] ?? String(v).replace(/_/g, " ")} /> : <span className="text-muted">N/A</span>;
    case "boolean":
      return v ? <Check aria-label="Yes" className="size-4 text-accent" /> : <span className="text-muted" aria-label="No">N/A</span>;
    case "date":
      return <span className="whitespace-nowrap">{v ? new Date(String(v) + (String(v).length === 10 ? "T00:00:00" : "")).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}</span>;
    case "datetime":
      return <span className="whitespace-nowrap">{v ? new Date(String(v)).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "N/A"}</span>;
    case "image":
      return v ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(v)} alt="" className="size-10 rounded-md object-cover" loading="lazy" />
      ) : (
        <span className="flex size-10 items-center justify-center rounded-md bg-paper text-navy-200">
          <FileText aria-hidden className="size-4" />
        </span>
      );
    case "count":
      return <span className="tabular-nums">{Array.isArray(v) ? v.length : 0}</span>;
    case "bn":
      return <span lang="bn">{String(v ?? "")}</span>;
    default: {
      const s = col.labels?.[String(v)] ?? (Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v));
      return <span className="line-clamp-2">{s || "N/A"}</span>;
    }
  }
}

export function ResourceTable({
  resource,
  rows,
  columns,
  titleField,
  baseHref,
  canEdit,
  canDelete,
  quickActions,
  sort,
  dir,
}: {
  resource: string;
  rows: Row[];
  columns: ListColumn[];
  titleField: string;
  baseHref: string;
  canEdit: boolean;
  canDelete: boolean;
  quickActions: QuickAction[];
  sort: string;
  dir: "asc" | "desc";
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const toast = useToast();
  const [selected, setSelected] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<{ ids: string[]; label: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const sortHref = (key: string) => {
    const next = new URLSearchParams(params.toString());
    next.set("sort", key);
    next.set("dir", sort === key && dir === "asc" ? "desc" : "asc");
    return `${pathname}?${next.toString()}`;
  };

  async function runQuick(ids: string[], a: QuickAction) {
    setBusy(true);
    const res = ids.length === 1 ? setField(resource, ids[0], a.field, a.value) : bulkOp(resource, ids, { kind: "set", field: a.field, value: a.value });
    setBusy(false);
    if (!res.ok) return toast("error", res.error);
    toast("success", res.message ?? `${a.label}: done.`);
    setSelected([]);
  }

  async function runDelete() {
    if (!confirm) return;
    setBusy(true);
    const res = bulkOp(resource, confirm.ids, { kind: "delete" });
    setBusy(false);
    setConfirm(null);
    if (!res.ok) return toast("error", res.error);
    toast("success", res.message ?? "Deleted.");
    setSelected([]);
  }

  const allChecked = rows.length > 0 && selected.length === rows.length;
  const bulk = (canEdit && quickActions.length > 0) || canDelete;

  return (
    <div>
      {selected.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-line-strong bg-tint px-4 py-2.5 text-sm">
          <span className="font-semibold text-heading">{selected.length} selected</span>
          {canEdit &&
            quickActions.map((a) => (
              <AdminButton key={a.label} size="sm" variant="outline" busy={busy} onClick={() => runQuick(selected, a)}>
                {a.label}
              </AdminButton>
            ))}
          {canDelete && (
            <AdminButton size="sm" variant="danger" onClick={() => setConfirm({ ids: selected, label: `${selected.length} items` })}>
              <Trash2 aria-hidden className="size-3.5" /> Delete
            </AdminButton>
          )}
          <AdminButton size="sm" variant="ghost" onClick={() => setSelected([])}>
            Clear selection
          </AdminButton>
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs text-muted uppercase">
            <tr>
              {bulk && (
                <th scope="col" className="w-10 px-3 py-3">
                  <input type="checkbox" aria-label="Select all on this page" checked={allChecked} onChange={(e) => setSelected(e.target.checked ? rows.map((r) => r._id) : [])} className="size-4 accent-leaf-600" />
                </th>
              )}
              {columns.map((c) => (
                <th key={c.key} scope="col" className="px-3 py-3 font-semibold" aria-sort={sort === c.key ? (dir === "asc" ? "ascending" : "descending") : undefined}>
                  {c.format === "image" ? (
                    <span className="sr-only">{c.label}</span>
                  ) : (
                    <Link href={sortHref(c.key)} className="inline-flex items-center gap-1 hover:text-heading">
                      {c.label}
                      {sort === c.key && (dir === "asc" ? <ArrowUp aria-hidden className="size-3" /> : <ArrowDown aria-hidden className="size-3" />)}
                    </Link>
                  )}
                </th>
              ))}
              <th scope="col" className="px-3 py-3 text-right font-semibold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => {
              const title = String(r[titleField] ?? "Untitled");
              return (
                <tr key={r._id} className={cn("hover:bg-paper/60", selected.includes(r._id) && "bg-navy-50/50")}>
                  {bulk && (
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        aria-label={`Select ${title}`}
                        checked={selected.includes(r._id)}
                        onChange={(e) => setSelected((s) => (e.target.checked ? [...s, r._id] : s.filter((x) => x !== r._id)))}
                        className="size-4 accent-leaf-600"
                      />
                    </td>
                  )}
                  {columns.map((c, i) => (
                    <td key={c.key} className={cn("px-3 py-2.5 align-middle", i === (columns[0].format === "image" ? 1 : 0) && "font-semibold text-heading")}>
                      {i === (columns[0].format === "image" ? 1 : 0) ? (
                        <Link href={`${baseHref}/${r._id}`} className="hover:text-accent hover:underline underline-offset-2">
                          <Cell col={c} value={r[c.key]} />
                        </Link>
                      ) : (
                        <Cell col={c} value={r[c.key]} />
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center justify-end gap-1">
                      {canEdit &&
                        quickActions
                          .filter((a) => r[a.field] !== a.value)
                          .slice(0, 2)
                          .map((a) => (
                            <AdminButton key={a.label} size="sm" variant="ghost" busy={busy} onClick={() => runQuick([r._id], a)}>
                              {a.label}
                            </AdminButton>
                          ))}
                      <Link href={`${baseHref}/${r._id}`} className="inline-flex min-h-8 items-center rounded-lg px-3 text-xs font-semibold text-heading hover:bg-paper">
                        {canEdit ? "Edit" : "View"}
                      </Link>
                      {canDelete && (
                        <button type="button" onClick={() => setConfirm({ ids: [r._id], label: `“${title.slice(0, 60)}”` })} aria-label={`Delete ${title}`} className="rounded-lg p-2 text-muted hover:bg-signal-50 hover:text-danger">
                          <Trash2 aria-hidden className="size-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={Boolean(confirm)}
        title="Delete permanently?"
        message={<>Delete {confirm?.label}? This cannot be undone and removes it from the website immediately.</>}
        busy={busy}
        onConfirm={runDelete}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}
