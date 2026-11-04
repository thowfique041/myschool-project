"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Bell, Download, FileText, GraduationCap, Image as ImageIcon, Inbox, Megaphone, Newspaper, Plus, RotateCcw, Users } from "lucide-react";
import { getResource, resourceFields, statusOptions, taxonomyGroups, type ResourceConfig } from "@/cms/resources";
import { getSingleton } from "@/cms/singletons";
import { emptyValues, type Option } from "@/cms/fields";
import { areas, actions, roleLabels, roleKeys, type Permission, type RoleKey } from "@/cms/permissions";
import * as store from "./demo-store";
import { AdminFrame } from "./Sidebar";
import { adminNav } from "./nav";
import { PageTitle } from "./PageTitle";
import { ListFilters, ResourceTable, type ListColumn, type QuickAction } from "./list";
import { ResourceForm, SettingsForm } from "./forms";
import { MediaLibrary } from "./media";
import { AdminButton, ConfirmDialog, FormRow, Modal, StatusBadge, adminBtn, inputCls, useToast } from "./ui";
import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/* ---------------------------------------------------------------- shell */

function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper">
      <p className="text-sm text-muted" role="status">
        Loading admin panel…
      </p>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const v = store.useDemo();
  const router = useRouter();
  const user = v === -1 ? null : store.currentUser();
  useEffect(() => {
    if (v !== -1 && !user) router.replace("/admin");
  }, [v, user, router]);
  if (v === -1 || !user) return <Loading />;
  const groups = adminNav.map((g) => ({ ...g, links: g.links.filter((l) => user.permissions.includes(l.perm)) })).filter((g) => g.links.length);
  return (
    <AdminFrame groups={groups} badges={store.pendingCounts()} user={{ name: user.name, email: user.email, roleLabel: roleLabels[user.role] }} siteName="Webnion">
      {children}
    </AdminFrame>
  );
}

function Denied() {
  return <p className="rounded-lg border border-signal-100 bg-signal-50 px-4 py-3 text-sm text-danger">Your role does not have access to this page.</p>;
}

function useCan() {
  store.useDemo();
  return (p: string) => store.can(p as Permission);
}

/* ---------------------------------------------------------------- login */

export function DemoLogin() {
  const v = store.useDemo();
  const router = useRouter();
  const [role, setRole] = useState<RoleKey>("super_admin");
  useEffect(() => {
    if (v !== -1 && store.currentUser()) router.replace("/admin/dashboard");
  }, [v, router]);
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-paper px-4 py-12">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <LogoMark className="h-14 w-auto" />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-heading">Admin panel (demo)</h1>
          <p className="mt-1 text-sm text-muted">Frontend preview of the school&apos;s content management panel.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const res = store.signIn(role);
            if (res.ok) router.push("/admin/dashboard");
          }}
          className="space-y-5 rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8"
        >
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
            This is a frontend-only demo. There is no real sign-in: choose a role to explore. Everything you change is stored only in this browser and does not affect the public website.
          </p>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-heading">Explore as</legend>
            <div className="space-y-2">
              {roleKeys.map((r) => (
                <label key={r} className={cn("flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5", role === r ? "border-leaf-500 bg-leaf-50" : "border-line")}>
                  <input type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} className="mt-1 accent-leaf-600" />
                  <span>
                    <span className="block text-sm font-semibold text-heading">{roleLabels[r]}</span>
                    <span className="block text-xs text-muted">
                      {r === "super_admin" ? "Everything, including users and role permissions" : r === "admin" ? "All content, admissions, results and settings" : "Notices, news, gallery and website pages"}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <AdminButton type="submit" className="w-full" disabled={v === -1}>
            Enter the demo
          </AdminButton>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-semibold text-heading hover:text-accent">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------ dashboard */

export function DashboardView() {
  const can = useCan();
  const toast = useToast();
  const [reset, setReset] = useState(false);
  const user = store.currentUser()!;
  const count = (k: string, f?: (d: store.Doc) => boolean) => store.collection(k).filter(f ?? (() => true)).length;
  const stats = [
    { label: "Published notices", value: count("notices", (d) => d.status === "published"), href: "/admin/content/notices", perm: "notices.view", icon: Megaphone },
    { label: "News articles", value: count("news", (d) => d.status === "published"), href: "/admin/content/news", perm: "news.view", icon: Newspaper },
    { label: "Pending applications", value: count("applications", (d) => d.status === "pending"), href: "/admin/content/applications?status=pending", perm: "admissions.view", icon: Inbox },
    { label: "New messages", value: count("messages", (d) => d.status === "new"), href: "/admin/content/messages?status=new", perm: "messages.view", icon: Bell },
    { label: "Active teachers & staff", value: count("teachers", (d) => Boolean(d.active)), href: "/admin/content/teachers", perm: "teachers.view", icon: Users },
    { label: "Active students", value: count("students", (d) => d.status === "active"), href: "/admin/content/students", perm: "students.view", icon: GraduationCap },
    { label: "Gallery photos", value: count("gallery"), href: "/admin/content/gallery", perm: "gallery.view", icon: ImageIcon },
    { label: "Media files", value: store.listMedia({}).total, href: "/admin/media", perm: "files.view", icon: FileText },
  ].filter((s) => can(s.perm));

  const months = useMemo(() => {
    const out: { key: string; label: string }[] = [];
    const d = new Date();
    for (let i = 5; i >= 0; i--) {
      const x = new Date(d.getFullYear(), d.getMonth() - i, 1);
      out.push({ key: `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`, label: x.toLocaleString("en-GB", { month: "short" }) });
    }
    return out;
  }, []);
  const apps = store.collection("applications");
  const series = months.map((m) => ({ ...m, n: apps.filter((a) => String(a.createdAt ?? "").startsWith(m.key)).length }));
  const max = Math.max(1, ...series.map((s) => s.n));
  const drafts = ["notices", "news", "events", "gallery", "downloads"].reduce((n, k) => n + count(k, (d) => d.status === "draft"), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-heading">Welcome, {user.name.split(" ")[0]}</h1>
        <p className="text-sm text-muted">Signed in as {roleLabels[user.role]}.</p>
      </div>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <li key={label}>
            <Link href={href} className="block h-full rounded-xl border border-line bg-surface p-4 hover:border-line-strong">
              <Icon aria-hidden className="size-5 text-accent" />
              <p className="mt-3 font-serif text-3xl font-semibold text-heading tabular-nums">{value}</p>
              <p className="text-sm text-muted">{label}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {can("admissions.view") && (
          <section aria-labelledby="apps-chart" className="rounded-xl border border-line bg-surface p-5">
            <h2 id="apps-chart" className="font-semibold text-heading">
              Admission applications per month
            </h2>
            <p className="text-xs text-muted">Last 6 months</p>
            <div className="mt-6 flex h-44 items-end gap-3 border-b border-line" aria-hidden>
              {series.map((s) => (
                <div key={s.key} className="group relative flex h-full flex-1 flex-col justify-end">
                  <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full rounded bg-navy-900 px-2 py-0.5 text-xs whitespace-nowrap text-white opacity-0 group-hover:opacity-100">
                    {s.label}: {s.n}
                  </span>
                  <div className="mx-auto w-full max-w-12 rounded-t bg-navy-700 group-hover:bg-navy-900" style={{ height: `${s.n ? Math.max(4, (s.n / max) * 100) : 0}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-3 text-center text-xs text-muted" aria-hidden>
              {series.map((s) => (
                <span key={s.key} className="flex-1">
                  {s.label}
                  <span className="block font-semibold text-heading tabular-nums">{s.n}</span>
                </span>
              ))}
            </div>
            <table className="sr-only">
              <caption>Applications per month</caption>
              <tbody>
                {series.map((s) => (
                  <tr key={s.key}>
                    <th scope="row">{s.label}</th>
                    <td>{s.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        <section aria-labelledby="sys" className="rounded-xl border border-line bg-surface p-5">
          <h2 id="sys" className="font-semibold text-heading">
            Demo status
          </h2>
          <dl className="mt-3 divide-y divide-line text-sm">
            <div className="flex justify-between py-2">
              <dt className="text-muted">Data storage</dt>
              <dd>
                <StatusBadge value="draft" label="This browser only" />
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-muted">Unpublished drafts</dt>
              <dd className="font-semibold text-heading">{drafts}</dd>
            </div>
          </dl>
          <AdminButton variant="outline" size="sm" className="mt-3" onClick={() => setReset(true)}>
            <RotateCcw aria-hidden className="size-3.5" /> Reset demo data
          </AdminButton>
          <ConfirmDialog
            open={reset}
            title="Reset the demo?"
            message="All changes made in this browser are replaced with the original content."
            confirmLabel="Reset"
            onClose={() => setReset(false)}
            onConfirm={() => {
              store.resetDemo();
              setReset(false);
              toast("success", "Demo data reset.");
            }}
          />
        </section>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {can("activity.view") && (
          <MiniList title="Recent activity" href="/admin/activity">
            {store.activity().slice(0, 7).map((a) => (
              <li key={a.id} className="py-2">
                <p className="text-ink">{a.summary}</p>
                <p className="text-xs text-muted">
                  {a.adminName} · {new Date(a.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </li>
            ))}
          </MiniList>
        )}
        {can("admissions.view") && (
          <MiniList title="Latest applications" href="/admin/content/applications">
            {[...apps].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 5).map((a) => (
              <li key={a._id} className="flex items-center justify-between gap-2 py-2">
                <Link href={`/admin/content/applications/${a._id}`} className="min-w-0 hover:text-accent">
                  <span className="block truncate font-semibold text-heading">{String(a.studentName)}</span>
                  <span className="text-xs text-muted">
                    {String(a.classApplied)} · {String(a.reference)}
                  </span>
                </Link>
                <StatusBadge value={String(a.status)} />
              </li>
            ))}
          </MiniList>
        )}
        {can("messages.view") && (
          <MiniList title="Latest messages" href="/admin/content/messages">
            {store.collection("messages").slice(0, 5).map((m) => (
              <li key={m._id} className="flex items-center justify-between gap-2 py-2">
                <Link href={`/admin/content/messages/${m._id}`} className="min-w-0 hover:text-accent">
                  <span className="block truncate font-semibold text-heading">{String(m.name)}</span>
                  <span className="block truncate text-xs text-muted">{String(m.topic)}</span>
                </Link>
                <StatusBadge value={String(m.status)} />
              </li>
            ))}
          </MiniList>
        )}
      </div>
    </div>
  );
}

function MiniList({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-heading">{title}</h2>
        <Link href={href} className="text-xs font-semibold text-accent hover:underline">
          View all
        </Link>
      </div>
      <ul className="mt-2 divide-y divide-line text-sm">{children}</ul>
    </section>
  );
}

/* --------------------------------------------------------------- content */

const quick: Record<string, QuickAction[]> = {
  applications: [
    { label: "Approve", field: "status", value: "approved" },
    { label: "Reject", field: "status", value: "rejected" },
    { label: "Mark under review", field: "status", value: "under_review" },
  ],
  messages: [
    { label: "Mark read", field: "status", value: "read" },
    { label: "Mark replied", field: "status", value: "replied" },
  ],
  results: [
    { label: "Publish", field: "published", value: true },
    { label: "Unpublish", field: "published", value: false },
  ],
  teachers: [
    { label: "Activate", field: "active", value: true },
    { label: "Deactivate", field: "active", value: false },
  ],
};

const publicUrl: Record<string, (d: Record<string, unknown>) => string> = {
  notices: (d) => `/notices/${String(d.slug ?? "")}`,
  news: (d) => `/news/${String(d.slug ?? "")}`,
  events: () => "/calendar",
  teachers: () => "/teachers",
  gallery: () => "/gallery",
  downloads: () => "/notices#downloads",
  faqs: () => "/faq",
  policies: () => "/policies",
  exams: () => "/results",
};

function labelMaps(r: ResourceConfig) {
  const fields = resourceFields(r);
  const dynamic = store.optionsFor(fields);
  const maps: Record<string, Record<string, string>> = {};
  const lists: Record<string, Option[]> = {};
  for (const f of fields) {
    if (f.type !== "select") continue;
    const opts = f.options && !f.taxonomy && !f.ref ? f.options : (dynamic[f.name] ?? []);
    lists[f.name] = opts;
    maps[f.name] = Object.fromEntries(opts.map((o) => [o.value, o.label]));
  }
  if (r.key === "categories") {
    lists.group = taxonomyGroups;
    maps.group = Object.fromEntries(taxonomyGroups.map((o) => [o.value, o.label]));
  }
  if (r.publishable) {
    lists.status = statusOptions;
    maps.status = Object.fromEntries(statusOptions.map((o) => [o.value, o.label]));
  }
  return { maps, lists, dynamic };
}

export function ContentListView() {
  const { resource } = useParams<{ resource: string }>();
  const sp = useSearchParams();
  const can = useCan();
  const r = getResource(resource);
  if (!r) return <p className="text-muted">This section does not exist.</p>;
  if (!can(`${r.area}.view`)) return <Denied />;
  const c = (a: string) => can(`${r.area}.${a}`);
  const filterKeys = [...(r.filters ?? []).map((f) => f.key), ...(r.publishable ? ["status"] : [])];
  const filters = Object.fromEntries(filterKeys.map((k) => [k, sp.get(k) ?? ""]));
  const q = sp.get("q") ?? "";
  const list = store.listItems(r.key, { q, filters, sort: sp.get("sort") ?? undefined, dir: sp.get("dir") === "asc" ? "asc" : sp.get("dir") === "desc" ? "desc" : undefined, page: Number(sp.get("page")) || 1 });
  const { maps, lists } = labelMaps(r);
  const filterDefs = [
    ...(r.filters ?? []).map((f) => ({ key: f.key, label: f.label, options: f.options ?? lists[f.key] ?? [] })),
    ...(r.publishable ? [{ key: "status", label: "Status", options: lists.status }] : []),
  ];
  const columns: ListColumn[] = r.columns.map((col) => ({ ...col, labels: maps[col.key] }));
  if (r.publishable && !columns.some((x) => x.key === "status")) columns.push({ key: "status", label: "Status", format: "badge", labels: maps.status });
  const quickActions =
    quick[r.key] ??
    (r.publishable && c("publish")
      ? [
          { label: "Publish", field: "status", value: "published" },
          { label: "Unpublish", field: "status", value: "draft" },
        ]
      : []);
  const pages = Math.max(1, Math.ceil(list.total / list.pageSize));
  const qs = (page: number) => {
    const p = new URLSearchParams(sp.toString());
    p.set("page", String(page));
    return `?${p.toString()}`;
  };
  const base = `/admin/content/${r.key}`;
  return (
    <div>
      <PageTitle
        title={r.label}
        description={r.description}
        actions={
          <>
            {r.exportable && (
              <AdminButton variant="outline" onClick={() => store.exportCsv(r.key, filters)}>
                <Download aria-hidden className="size-4" /> Export CSV
              </AdminButton>
            )}
            {r.key === "results" && c("edit") && (
              <Link href="/admin/results-import" className={adminBtn("outline")}>
                Import CSV
              </Link>
            )}
            {r.canCreate !== false && c("edit") && (
              <Link href={`${base}/new`} className={adminBtn("secondary")}>
                <Plus aria-hidden className="size-4" /> New {r.singular.toLowerCase()}
              </Link>
            )}
          </>
        }
      />
      <ListFilters key={r.key} filters={filterDefs} searchPlaceholder={`Search ${r.label.toLowerCase()}`} />
      <p className="mt-4 mb-2 text-sm text-muted" aria-live="polite">
        {list.total} {list.total === 1 ? r.singular.toLowerCase() : "items"}
        {q ? ` matching “${q}”` : ""}
      </p>
      {list.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-14 text-center">
          <p className="font-semibold text-heading">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">{q || Object.values(filters).some(Boolean) ? "Try a different search or clear the filters." : r.canCreate === false ? "Items appear here when visitors submit the form on the website." : `Create the first ${r.singular.toLowerCase()}.`}</p>
        </div>
      ) : (
        <ResourceTable resource={r.key} rows={list.items} columns={columns} titleField={r.titleField} baseHref={base} canEdit={c("edit")} canDelete={c("delete")} quickActions={quickActions} sort={list.sort} dir={list.dir} />
      )}
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">
            Page {list.page} of {pages}
          </span>
          <div className="flex gap-2">
            {list.page > 1 && (
              <Link href={qs(list.page - 1)} className={adminBtn("outline", "sm")}>
                Previous
              </Link>
            )}
            {list.page < pages && (
              <Link href={qs(list.page + 1)} className={adminBtn("outline", "sm")}>
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

export function ContentEditView() {
  const { resource, id } = useParams<{ resource: string; id: string }>();
  const sp = useSearchParams();
  const can = useCan();
  const r = getResource(resource);
  const isNew = id === "new";
  const [doc] = useState(() => (r && !isNew ? store.getItem(r.key, id) : null));
  useEffect(() => {
    if (r?.key === "messages" && doc?.status === "new" && store.can("messages.edit")) store.setField("messages", id, "status", "read");
  }, [r, doc, id]);
  if (!r) return <p className="text-muted">This section does not exist.</p>;
  if (!can(`${r.area}.view`)) return <Denied />;
  const c = (a: string) => can(`${r.area}.${a}`);
  if (!isNew && !doc) return <p className="text-muted">This item was not found. It may have been deleted.</p>;
  if (isNew && (r.canCreate === false || !c("edit"))) return <Denied />;
  const fields = resourceFields(r);
  let initial: Record<string, unknown> = doc ?? emptyValues(fields);
  if (isNew) {
    if (r.publishable) initial = { ...initial, status: c("publish") ? "published" : "draft" };
    if (r.key === "categories" && sp.get("group")) initial = { ...initial, group: sp.get("group") };
    if (r.key === "teachers") initial = { ...initial, active: true, kind: "teacher" };
    if (r.key === "students") initial = { ...initial, status: "active" };
    if (r.key === "results") initial = { ...initial, published: true };
  }
  const fmt = (v: unknown) => new Date(String(v)).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
  return (
    <div className="max-w-4xl">
      <PageTitle
        title={isNew ? `New ${r.singular.toLowerCase()}` : String(doc?.[r.titleField] ?? r.singular)}
        description={doc?.createdAt ? `Created ${fmt(doc.createdAt)}${doc.updatedAt ? ` · last updated ${fmt(doc.updatedAt)}` : ""}` : r.description}
        back={{ href: `/admin/content/${r.key}`, label: r.label }}
      />
      {r.key === "results" && doc && (
        <p className="mb-4 rounded-lg border border-line bg-surface px-4 py-3 text-sm">
          GPA (calculated from the marks when saved): <strong className="text-heading">{Number(doc.gpa ?? 0).toFixed(2)}</strong>
        </p>
      )}
      <ResourceForm
        resource={r.key}
        singular={r.singular}
        id={isNew ? null : id}
        fields={fields}
        initial={initial}
        options={labelMaps(r).dynamic}
        canEdit={c("edit")}
        canDelete={c("delete")}
        canPublish={c("publish")}
        publishable={Boolean(r.publishable)}
        viewUrl={doc && publicUrl[r.key] ? publicUrl[r.key](doc) : undefined}
        listHref={`/admin/content/${r.key}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------- settings */

export function SettingsView() {
  const { key } = useParams<{ key: string }>();
  const can = useCan();
  const s = getSingleton(key);
  const [state] = useState(() => (s ? store.getSetting(key) : null));
  if (!s || !state) return <p className="text-muted">This settings page does not exist.</p>;
  if (!can(`${s.area}.view`)) return <Denied />;
  const meta = state.publishedAt ? `Last published ${new Date(state.publishedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}${state.updatedBy ? ` by ${state.updatedBy}` : ""}.` : "";
  return (
    <div className="max-w-4xl">
      <PageTitle title={s.label} description={`${s.description} ${meta}`} />
      <SettingsForm
        key={key}
        settingKey={key}
        fields={s.fields}
        data={state.data}
        draft={state.draft}
        draftable={Boolean(s.draftable)}
        canEdit={can(`${s.area}.edit`)}
        canPublish={s.draftable ? can(`${s.area}.publish`) : can(`${s.area}.edit`)}
        publicPath={s.publicPath}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- media */

export function MediaView() {
  const can = useCan();
  if (!can("files.view")) return <Denied />;
  return (
    <div>
      <PageTitle title="Media library" description="Images and documents used across the website. Images need alternative text." />
      <MediaLibrary canEdit={can("files.edit")} canDelete={can("files.delete")} />
    </div>
  );
}

/* ----------------------------------------------------------------- users */

export function UsersView() {
  const can = useCan();
  const toast = useToast();
  const me = store.currentUser();
  const [editing, setEditing] = useState<store.DemoUser | "new" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "editor" as RoleKey, active: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState<store.DemoUser | null>(null);
  if (!can("users.view")) return <Denied />;
  const open = (u: store.DemoUser | "new") => {
    setErrors({});
    setForm(u === "new" ? { name: "", email: "", role: "editor", active: true } : { name: u.name, email: u.email, role: u.role, active: u.active });
    setEditing(u);
  };
  const save = () => {
    const res = editing === "new" ? store.createUser(form) : store.updateUser((editing as store.DemoUser).id, form);
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {});
      return toast("error", res.error);
    }
    toast("success", res.message ?? "Saved.");
    setEditing(null);
  };
  return (
    <div>
      <PageTitle
        title="Admin users"
        description="People who can sign in to the admin panel, and their roles."
        actions={
          can("users.edit") && (
            <AdminButton variant="secondary" onClick={() => open("new")}>
              <Plus aria-hidden className="size-4" /> New account
            </AdminButton>
          )
        }
      />
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs text-muted uppercase">
            <tr>
              <th scope="col" className="px-3 py-3">Name</th>
              <th scope="col" className="px-3 py-3">Role</th>
              <th scope="col" className="px-3 py-3">Status</th>
              <th scope="col" className="px-3 py-3">Last sign-in</th>
              <th scope="col" className="px-3 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {store.users().map((u) => (
              <tr key={u.id}>
                <td className="px-3 py-2.5">
                  <span className="block font-semibold text-heading">
                    {u.name} {u.id === me?.id && <span className="text-xs font-normal text-muted">(you)</span>}
                  </span>
                  <span className="text-xs text-muted">{u.email}</span>
                </td>
                <td className="px-3 py-2.5">{roleLabels[u.role]}</td>
                <td className="px-3 py-2.5">
                  <StatusBadge value={u.active ? "active" : "inactive"} />
                </td>
                <td className="px-3 py-2.5 text-muted">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "N/A"}</td>
                <td className="px-3 py-2.5 text-right">
                  {can("users.edit") && (
                    <AdminButton size="sm" variant="ghost" onClick={() => open(u)}>
                      Edit
                    </AdminButton>
                  )}
                  {can("users.delete") && u.id !== me?.id && (
                    <AdminButton size="sm" variant="ghost" className="text-danger" onClick={() => setConfirm(u)}>
                      Delete
                    </AdminButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing === "new" ? "New admin account" : "Edit account"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          className="space-y-4"
        >
          <FormRow label="Full name" htmlFor="u-name" required error={errors.name}>
            <input id="u-name" className={inputCls(Boolean(errors.name))} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </FormRow>
          <FormRow label="Email" htmlFor="u-email" required error={errors.email}>
            <input id="u-email" type="email" disabled={editing !== "new"} className={inputCls(Boolean(errors.email))} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </FormRow>
          <FormRow label="Role" htmlFor="u-role">
            <select id="u-role" className={inputCls()} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as RoleKey })}>
              {roleKeys.map((r) => (
                <option key={r} value={r}>
                  {roleLabels[r]}
                </option>
              ))}
            </select>
          </FormRow>
          {editing !== "new" && (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="size-4 accent-leaf-600" /> Account active
            </label>
          )}
          <p className="text-xs text-muted">Passwords and invitations need a real backend; in this demo, accounts are role placeholders.</p>
          <div className="flex justify-end gap-2">
            <AdminButton variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </AdminButton>
            <AdminButton type="submit">Save</AdminButton>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        open={Boolean(confirm)}
        title="Delete this account?"
        message={<>{confirm?.name} will no longer be able to sign in.</>}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          const res = store.deleteUser(confirm!.id);
          toast(res.ok ? "success" : "error", res.ok ? (res.message ?? "Deleted.") : res.error);
          setConfirm(null);
        }}
      />
    </div>
  );
}

export function RolesView() {
  const can = useCan();
  const toast = useToast();
  const me = store.currentUser();
  const [role, setRole] = useState<"admin" | "editor">("admin");
  const [perms, setPerms] = useState<string[]>(() => [...store.roles()[role]]);
  if (!can("users.view")) return <Denied />;
  const editable = me?.role === "super_admin";
  const toggle = (p: string) => setPerms((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));
  return (
    <div className="max-w-5xl">
      <PageTitle title="Roles & permissions" description="Super Admins always have every permission. Choose what Admins and Editors may do." />
      <div className="mb-4 flex gap-2" role="tablist">
        {(["admin", "editor"] as const).map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={role === r}
            type="button"
            onClick={() => {
              setRole(r);
              setPerms([...store.roles()[r]]);
            }}
            className={cn("min-h-9 rounded-full px-4 text-sm font-semibold", role === r ? "bg-brand hover:bg-brand-hover text-white" : "border border-line bg-surface text-heading")}
          >
            {roleLabels[r]}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[36rem] text-sm">
          <thead className="border-b border-line bg-paper text-xs text-muted uppercase">
            <tr>
              <th scope="col" className="px-3 py-3 text-left">Area</th>
              {actions.map((a) => (
                <th key={a} scope="col" className="px-3 py-3">
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {areas.map((a) => (
              <tr key={a.key}>
                <th scope="row" className="px-3 py-2.5 text-left font-medium text-heading">
                  {a.label}
                </th>
                {actions.map((x) => {
                  const p = `${a.key}.${x}`;
                  return (
                    <td key={x} className="px-3 py-2.5 text-center">
                      <input type="checkbox" aria-label={`${a.label}: ${x}`} disabled={!editable} checked={perms.includes(p)} onChange={() => toggle(p)} className="size-4 accent-leaf-600" />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editable ? (
        <div className="mt-4 flex justify-end">
          <AdminButton
            onClick={() => {
              const res = store.saveRole(role, perms);
              toast(res.ok ? "success" : "error", res.ok ? (res.message ?? "Saved.") : res.error);
            }}
          >
            Save {roleLabels[role]} permissions
          </AdminButton>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">Only a Super Admin can change role permissions.</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- activity */

export function ActivityView() {
  const can = useCan();
  const sp = useSearchParams();
  if (!can("activity.view")) return <Denied />;
  const q = (sp.get("q") ?? "").toLowerCase();
  const action = sp.get("action") ?? "";
  const rows = store.activity().filter((a) => (!action || a.action === action) && (!q || `${a.summary} ${a.adminName} ${a.resource}`.toLowerCase().includes(q)));
  const page = Math.max(1, Number(sp.get("page")) || 1);
  const size = 30;
  const pages = Math.max(1, Math.ceil(rows.length / size));
  const acts = [...new Set(store.activity().map((a) => a.action))];
  return (
    <div>
      <PageTitle title="Activity log" description="Every change made in the admin panel, with who made it and when." />
      <ListFilters filters={[{ key: "action", label: "Actions", options: acts.map((a) => ({ value: a, label: a })) }]} searchPlaceholder="Search the log" />
      <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs text-muted uppercase">
            <tr>
              <th scope="col" className="px-3 py-3">When</th>
              <th scope="col" className="px-3 py-3">Who</th>
              <th scope="col" className="px-3 py-3">Action</th>
              <th scope="col" className="px-3 py-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.slice((page - 1) * size, page * size).map((a) => (
              <tr key={a.id}>
                <td className="px-3 py-2.5 whitespace-nowrap text-muted">{new Date(a.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</td>
                <td className="px-3 py-2.5 font-semibold text-heading">{a.adminName}</td>
                <td className="px-3 py-2.5">
                  <span className="rounded bg-paper px-2 py-0.5 text-xs font-semibold">{a.action}</span>
                </td>
                <td className="px-3 py-2.5">{a.summary}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-muted">
                  No entries.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`?${new URLSearchParams({ ...Object.fromEntries(sp), page: String(page - 1) })}`} className={adminBtn("outline", "sm")}>
                Previous
              </Link>
            )}
            {page < pages && (
              <Link href={`?${new URLSearchParams({ ...Object.fromEntries(sp), page: String(page + 1) })}`} className={adminBtn("outline", "sm")}>
                Next
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- profile */

export function ProfileView() {
  store.useDemo();
  const toast = useToast();
  const me = store.currentUser()!;
  const [name, setName] = useState(me.name);
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      <PageTitle title="My profile" description={`${me.email} · ${roleLabels[me.role]}`} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const res = store.updateProfile(name);
          setError(res.ok ? "" : res.error);
          toast(res.ok ? "success" : "error", res.ok ? (res.message ?? "Saved.") : res.error);
        }}
        className="space-y-4 rounded-2xl border border-line bg-surface p-6"
      >
        <FormRow label="Full name" htmlFor="p-name" required error={error}>
          <input id="p-name" className={inputCls(Boolean(error))} value={name} onChange={(e) => setName(e.target.value)} />
        </FormRow>
        <FormRow label="Email" htmlFor="p-email">
          <input id="p-email" className={inputCls()} value={me.email} disabled />
        </FormRow>
        <AdminButton type="submit">Save profile</AdminButton>
      </form>
      <p className="mt-4 text-sm text-muted">Changing the password needs a real sign-in system (backend), which this frontend demo does not have.</p>
    </div>
  );
}

/* -------------------------------------------------------- results import */

const sampleCsv = `roll,registration,name,className,section,group,position,Bangla,English,Mathematics,Science
101,2026080101,Sample Student,Class 8,A,,1,82,78,91,85
102,2026080102,Another Student,Class 8,A,,,74,69,66,71`;

export function ResultsImportView() {
  const can = useCan();
  const toast = useToast();
  const exams = store.collection("exams");
  const [exam, setExam] = useState(exams[0]?._id ?? "");
  const [csv, setCsv] = useState("");
  const [publish, setPublish] = useState(true);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  if (!can("results.edit")) return <Denied />;
  return (
    <div className="max-w-3xl">
      <PageTitle title="Import results (CSV)" description="Upload or paste a CSV. Existing results for the same exam, class and roll are updated." back={{ href: "/admin/content/results", label: "Results" }} />
      <div className="space-y-5 rounded-2xl border border-line bg-surface p-6">
        <FormRow label="Examination" htmlFor="ri-exam" required>
          <select id="ri-exam" className={inputCls()} value={exam} onChange={(e) => setExam(e.target.value)}>
            {exams.map((e) => (
              <option key={e._id} value={e._id}>
                {String(e.name)} {String(e.year)}
              </option>
            ))}
          </select>
        </FormRow>
        <FormRow label="CSV file" htmlFor="ri-file" help="Columns: roll, registration, name, className, section, group, position, then one column per subject with marks (0–100).">
          <input id="ri-file" type="file" accept=".csv,text/csv" onChange={async (e) => setCsv((await e.target.files?.[0]?.text()) ?? "")} className="block text-sm" />
        </FormRow>
        <FormRow label="…or paste CSV" htmlFor="ri-text">
          <textarea id="ri-text" rows={8} className={cn(inputCls(), "font-mono text-xs")} value={csv} onChange={(e) => setCsv(e.target.value)} placeholder={sampleCsv} />
        </FormRow>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={publish} disabled={!can("results.publish")} onChange={(e) => setPublish(e.target.checked)} className="size-4 accent-leaf-600" /> Publish imported results
        </label>
        {msg && (
          <p role="status" className={cn("rounded-lg px-4 py-3 text-sm", msg.ok ? "bg-leaf-50 text-heading" : "bg-signal-50 text-danger")}>
            {msg.text}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <AdminButton
            disabled={!csv.trim() || !exam}
            onClick={() => {
              const res = store.importResults(exam, csv, publish && can("results.publish"));
              setMsg({ ok: res.ok, text: res.ok ? (res.message ?? "Imported.") : res.error });
              toast(res.ok ? "success" : "error", res.ok ? "Results imported." : res.error);
            }}
          >
            Import
          </AdminButton>
          <AdminButton variant="ghost" onClick={() => setCsv(sampleCsv)}>
            Use sample CSV
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
