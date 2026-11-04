"use client";

import { useSyncExternalStore } from "react";
import { buildSchema, issuesToErrors, slugify, type Field } from "@/cms/fields";
import { getResource, resourceFields, type ResourceConfig } from "@/cms/resources";
import { getSingleton } from "@/cms/singletons";
import { gpaFor } from "@/cms/grading";
import { allPermissions, defaultRolePermissions, hasPermission, type Permission, type RoleKey } from "@/cms/permissions";
import { seedCollections, seedExams, seedResultsFor, singletonDefaults } from "@/content/defaults";

/*
 * Frontend-only admin demo. All data lives in this browser's localStorage.
 * Nothing is sent to a server and nothing here changes the public website.
 * The permission checks below only simulate roles for the demo — they are
 * not security. A real deployment needs server-side auth and a database.
 */

export type Doc = Record<string, unknown> & { _id: string; createdAt?: string; updatedAt?: string };
export type ActionResult<T = undefined> = { ok: true; data?: T; message?: string } | { ok: false; error: string; fieldErrors?: Record<string, string> };
export type MediaItem = { id: string; url: string; kind: "image" | "document"; mimeType: string; size: number; originalName: string; alt: string; category: string; uploadedBy: string; createdAt: string };
export type DemoUser = { id: string; name: string; email: string; role: RoleKey; active: boolean; createdAt: string; lastLoginAt?: string };
export type ActivityEntry = { id: string; adminName: string; action: string; resource: string; summary: string; createdAt: string };
type SettingEntry = { data: Record<string, unknown>; draft?: Record<string, unknown> | null; publishedAt?: string; updatedBy?: string };

type Db = {
  v: 1;
  collections: Record<string, Doc[]>;
  settings: Record<string, SettingEntry>;
  media: MediaItem[];
  users: DemoUser[];
  roles: { admin: Permission[]; editor: Permission[] };
  activity: ActivityEntry[];
  session: { userId: string } | null;
};

const KEY = "webnion-admin-demo-v1";
const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().replace(/-/g, "").slice(0, 24) : Math.random().toString(16).slice(2) + Date.now().toString(16));
const now = () => new Date().toISOString();
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

function seed(): Db {
  const stamp = now();
  const withIds = (rows: Record<string, unknown>[]): Doc[] => rows.map((r) => ({ ...r, _id: uid(), createdAt: stamp, updatedAt: stamp }));
  const collections: Record<string, Doc[]> = {};
  for (const [k, rows] of Object.entries(seedCollections())) collections[k] = withIds(rows);
  const exams = withIds(seedExams() as unknown as Record<string, unknown>[]);
  collections.exams = exams;
  const byKey = Object.fromEntries(exams.map((e) => [`${e.name}|${e.year}`, e._id]));
  collections.results = withIds(seedResultsFor(byKey).filter((r) => r.exam) as Record<string, unknown>[]);
  const d = Date.now();
  collections.applications = withIds([
    { reference: "WSC-27-418230", status: "pending", studentName: "Ayesha Siddika", dob: "2016-03-14", gender: "Female", classApplied: "Class 5", shift: "Morning", previousSchool: "Sunrise Kindergarten", guardianName: "Abdul Karim", relation: "Father", phone: "01700000001", email: "", address: "Upashahar, Sylhet", notes: "", adminNotes: "" },
    { reference: "WSC-27-552901", status: "under_review", studentName: "Tanvir Hasan", dob: "2014-07-02", gender: "Male", classApplied: "Class 6", shift: "Day", previousSchool: "Green Valley School", guardianName: "Nasima Begum", relation: "Mother", phone: "01800000002", email: "", address: "Shibganj, Sylhet", notes: "", adminNotes: "" },
  ]).map((a, i) => ({ ...a, createdAt: new Date(d - (i + 1) * 864e5 * 9).toISOString() }));
  collections.messages = withIds([
    { name: "Rahima Khatun", phone: "01900000003", email: "", topic: "Admission", message: "Is there any seat available in Class 3 for the day shift?", status: "new" },
  ]);
  collections.students = withIds([
    { name: "Sample Student One", className: "Class 8", section: "A", roll: "101", status: "active", guardianName: "Sample Guardian", guardianPhone: "01700000000" },
    { name: "Sample Student Two", className: "Class 9", section: "B", roll: "205", status: "active", guardianName: "Sample Guardian", guardianPhone: "01700000000" },
  ]);
  collections.albums = collections.albums ?? [];
  const settings: Record<string, SettingEntry> = {};
  for (const [k, v] of Object.entries(singletonDefaults)) settings[k] = { data: clone(v) };
  const superAdmin: DemoUser = { id: uid(), name: "Demo Super Admin", email: "superadmin@webnion.example", role: "super_admin", active: true, createdAt: stamp };
  return {
    v: 1,
    collections,
    settings,
    media: [],
    users: [
      superAdmin,
      { id: uid(), name: "Demo Admin", email: "admin@webnion.example", role: "admin", active: true, createdAt: stamp },
      { id: uid(), name: "Demo Editor", email: "editor@webnion.example", role: "editor", active: true, createdAt: stamp },
    ],
    roles: { admin: [...defaultRolePermissions.admin], editor: [...defaultRolePermissions.editor] },
    activity: [{ id: uid(), adminName: "System", action: "setup", resource: "demo", summary: "Demo data loaded from the website's built-in content", createdAt: stamp }],
    session: null,
  };
}

/* ------------------------------------------------------------ store core */

let db: Db | null = null;
let version = 0;
const listeners = new Set<() => void>();

function load(): Db {
  if (db) return db;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Db;
      if (parsed?.v === 1) return (db = parsed);
    }
  } catch {
    /* storage unavailable */
  }
  return (db = seed());
}

let quotaWarned = false;
function commit() {
  version++;
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
    quotaWarned = false;
  } catch {
    if (!quotaWarned) console.warn("Demo storage is full — changes are kept until the page is reloaded.");
    quotaWarned = true;
  }
  listeners.forEach((l) => l());
}

export function useDemo() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => version,
    () => -1,
  );
}

export function isReady() {
  return typeof window !== "undefined";
}

export function resetDemo() {
  const session = load().session;
  db = seed();
  db.session = session;
  commit();
}

/* --------------------------------------------------------- session / RBAC */

export function currentUser(): (DemoUser & { permissions: Permission[] }) | null {
  const d = load();
  const u = d.session ? d.users.find((x) => x.id === d.session!.userId && x.active) : null;
  if (!u) return null;
  return { ...u, permissions: u.role === "super_admin" ? allPermissions : d.roles[u.role] };
}

export function signIn(role: RoleKey) {
  const d = load();
  const u = d.users.find((x) => x.role === role && x.active);
  if (!u) return { ok: false as const, error: "No active demo account has this role." };
  d.session = { userId: u.id };
  u.lastLoginAt = now();
  log("login", "auth", "Signed in to the demo");
  commit();
  return { ok: true as const };
}

export function signOut() {
  const d = load();
  log("logout", "auth", "Signed out");
  d.session = null;
  commit();
}

export const can = (p: Permission) => {
  const u = currentUser();
  return Boolean(u && hasPermission(u.permissions, p));
};

class Forbidden extends Error {}
function authorize(p: Permission) {
  const u = currentUser();
  if (!u) throw new Forbidden("Your demo session has ended. Sign in again.");
  if (!hasPermission(u.permissions, p)) throw new Forbidden("Your role does not have permission for this action.");
  return u;
}

function guard<T>(fn: () => ActionResult<T>): ActionResult<T> {
  try {
    return fn();
  } catch (e) {
    if (e instanceof Forbidden) return { ok: false, error: e.message };
    console.error(e);
    return { ok: false, error: "Something went wrong." };
  }
}

function log(action: string, resource: string, summary: string) {
  const d = load();
  const u = currentUser();
  d.activity.unshift({ id: uid(), adminName: u?.name ?? "System", action, resource, summary: summary.slice(0, 300), createdAt: now() });
  d.activity = d.activity.slice(0, 500);
}

/* ---------------------------------------------------------------- content */

function requireResource(key: string): ResourceConfig {
  const r = getResource(key);
  if (!r) throw new Error("Unknown section");
  return r;
}

export function collection(key: string): Doc[] {
  const d = load();
  return (d.collections[key] ??= []);
}

export type ListQuery = { q?: string; filters?: Record<string, string>; sort?: string; dir?: "asc" | "desc"; page?: number; pageSize?: number };

export function listItems(key: string, query: ListQuery = {}) {
  const r = requireResource(key);
  let rows = [...collection(key)];
  const q = query.q?.trim().toLowerCase();
  if (q) rows = rows.filter((d) => r.searchFields.some((f) => String(d[f] ?? "").toLowerCase().includes(q)));
  for (const [k, v] of Object.entries(query.filters ?? {})) if (v) rows = rows.filter((d) => String(d[k] ?? "") === v);
  const sort = query.sort || r.sort.field;
  const dir = query.dir ? (query.dir === "asc" ? 1 : -1) : query.sort ? 1 : r.sort.dir;
  rows.sort((a, b) => {
    const x = a[sort];
    const y = b[sort];
    if (typeof x === "number" && typeof y === "number") return (x - y) * dir;
    return String(x ?? "").localeCompare(String(y ?? ""), undefined, { numeric: true }) * dir;
  });
  const pageSize = query.pageSize ?? 15;
  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(query.page ?? 1, 1), pages);
  return { items: rows.slice((page - 1) * pageSize, page * pageSize), total, page, pageSize, sort, dir: (dir === 1 ? "asc" : "desc") as "asc" | "desc" };
}

export function getItem(key: string, id: string): Doc | null {
  return collection(key).find((d) => d._id === id) ?? null;
}

export function optionsFor(fields: Field[]) {
  const out: Record<string, { value: string; label: string }[]> = {};
  const walk = (fs: Field[]) => {
    for (const f of fs) {
      if (f.type === "repeater") walk(f.fields);
      if (f.type !== "select") continue;
      if (f.taxonomy)
        out[f.name] = collection("categories")
          .filter((c) => c.group === f.taxonomy)
          .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))
          .map((c) => ({ value: String(c.value), label: String(c.label) }));
      else if (f.ref) {
        const ref = requireResource(f.ref);
        out[f.name] = collection(f.ref).map((d) => ({ value: d._id, label: f.ref === "exams" ? `${d.name} ${d.year}` : String(d[ref.titleField] ?? d._id) }));
      }
    }
  };
  walk(fields);
  return out;
}

function normalise(fields: Field[], input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const v = input[f.name];
    if (f.type === "paragraphs")
      out[f.name] = Array.isArray(v) ? v : String(v ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    else if (f.type === "lines") out[f.name] = Array.isArray(v) ? v : String(v ?? "").split("\n").map((p) => p.trim()).filter(Boolean);
    else if (f.type === "repeater") out[f.name] = Array.isArray(v) ? v.map((row) => normalise(f.fields, (row ?? {}) as Record<string, unknown>)) : [];
    else out[f.name] = v;
  }
  return out;
}

export function saveItem(key: string, id: string | null, input: Record<string, unknown>): ActionResult<{ id: string }> {
  return guard(() => {
    const r = requireResource(key);
    const user = authorize(`${r.area}.edit` as Permission);
    if (!id && r.canCreate === false) return { ok: false, error: "New items in this section come from the public website forms." };
    const fields = resourceFields(r);
    const raw = normalise(fields, input);
    if (r.slugSource && !raw.slug) raw.slug = slugify(String(raw[r.slugSource] || raw.title || raw.name || "")) || `${r.key}-${Date.now().toString(36)}`;
    if (r.publishable && !raw.status) raw.status = "draft";
    const parsed = buildSchema(fields).safeParse(raw);
    if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: issuesToErrors(parsed.error) };
    const data = JSON.parse(JSON.stringify(parsed.data)) as Record<string, unknown>;
    if (r.publishable) {
      if (data.status !== "draft" && !hasPermission(user.permissions, `${r.area}.publish` as Permission))
        return { ok: false, error: "Your role can save drafts but cannot publish.", fieldErrors: { status: "Not allowed for your role" } };
      if (data.status === "scheduled" && !data.publishAt) return { ok: false, error: "Choose when the item should be published.", fieldErrors: { publishAt: "Required for scheduled items" } };
    }
    if (r.key === "results") data.gpa = gpaFor(((data.subjects as { marks: number }[]) ?? []).map((s) => Number(s.marks)));
    const rows = collection(key);
    for (const u of r.unique ?? []) {
      if (data[u] && rows.some((d) => d[u] === data[u] && d._id !== id)) return { ok: false, error: `Another ${r.singular.toLowerCase()} already uses this ${u}.`, fieldErrors: { [u]: "Already in use" } };
    }
    if (r.key === "categories" && rows.some((d) => d.group === data.group && d.value === data.value && d._id !== id))
      return { ok: false, error: "This key already exists in the same group.", fieldErrors: { value: "Already in use" } };
    let savedId = id;
    if (id) {
      const i = rows.findIndex((d) => d._id === id);
      if (i < 0) return { ok: false, error: "Item not found — it may have been deleted." };
      rows[i] = { ...rows[i], ...data, _id: id, updatedAt: now() };
    } else {
      savedId = uid();
      rows.unshift({ ...data, _id: savedId, createdAt: now(), updatedAt: now() });
    }
    log(id ? "update" : "create", r.key, `${id ? "Updated" : "Created"} ${r.singular.toLowerCase()} “${String(data[r.titleField] ?? "").slice(0, 80)}”`);
    commit();
    return { ok: true, data: { id: savedId! }, message: `${r.singular} saved.` };
  });
}

export function setField(key: string, id: string, field: string, value: unknown): ActionResult {
  return guard(() => {
    const r = requireResource(key);
    const f = resourceFields(r).find((x) => x.name === field);
    if (!f) return { ok: false, error: "Unknown field" };
    authorize(`${r.area}.${field === "status" && r.publishable && value !== "draft" ? "publish" : "edit"}` as Permission);
    const doc = getItem(key, id);
    if (!doc) return { ok: false, error: "Item not found." };
    doc[field] = value;
    doc.updatedAt = now();
    log("update", r.key, `Set ${f.label.toLowerCase()} of “${String(doc[r.titleField] ?? "").slice(0, 60)}” to ${String(value)}`);
    commit();
    return { ok: true };
  });
}

export function deleteItem(key: string, id: string): ActionResult {
  return guard(() => {
    const r = requireResource(key);
    authorize(`${r.area}.delete` as Permission);
    if (r.key === "exams") {
      const n = collection("results").filter((x) => x.exam === id).length;
      if (n) return { ok: false, error: `This examination has ${n} result(s). Delete them first.` };
    }
    const rows = collection(key);
    const i = rows.findIndex((d) => d._id === id);
    if (i < 0) return { ok: false, error: "Item not found." };
    const [doc] = rows.splice(i, 1);
    log("delete", r.key, `Deleted ${r.singular.toLowerCase()} “${String(doc[r.titleField] ?? "").slice(0, 80)}”`);
    commit();
    return { ok: true, message: `${r.singular} deleted.` };
  });
}

export function bulk(key: string, ids: string[], op: { kind: "delete" } | { kind: "set"; field: string; value: unknown }): ActionResult {
  let n = 0;
  for (const id of ids) {
    const res = op.kind === "delete" ? deleteItem(key, id) : setField(key, id, op.field, op.value);
    if (!res.ok) return { ok: false, error: `${n} done, then: ${res.error}` };
    n++;
  }
  return { ok: true, message: `${n} item${n === 1 ? "" : "s"} ${op.kind === "delete" ? "deleted" : "updated"}.` };
}

/* --------------------------------------------------------------- settings */

export function getSetting(key: string) {
  const d = load();
  const s = (d.settings[key] ??= { data: clone(singletonDefaults[key] ?? {}) });
  return { data: s.data, draft: s.draft ? { ...s.data, ...s.draft } : null, publishedAt: s.publishedAt ?? null, updatedBy: s.updatedBy ?? null };
}

export function saveSetting(key: string, input: Record<string, unknown>, mode: "save" | "draft" | "publish"): ActionResult {
  return guard(() => {
    const s = getSingleton(key);
    if (!s) return { ok: false, error: "Unknown settings page" };
    const user = authorize((mode === "draft" ? `${s.area}.edit` : s.draftable ? `${s.area}.publish` : `${s.area}.edit`) as Permission);
    const parsed = buildSchema(s.fields).safeParse(normalise(s.fields, input));
    if (!parsed.success) return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: issuesToErrors(parsed.error) };
    const data = JSON.parse(JSON.stringify(parsed.data)) as Record<string, unknown>;
    const d = load();
    const entry = (d.settings[key] ??= { data: {} });
    if (mode === "draft") {
      entry.draft = data;
      entry.updatedBy = user.name;
      log("draft", "settings", `Saved draft of ${s.label}`);
      commit();
      return { ok: true, message: "Draft saved." };
    }
    entry.data = data;
    entry.draft = null;
    entry.publishedAt = now();
    entry.updatedBy = user.name;
    log(mode === "publish" ? "publish" : "update", "settings", `${mode === "publish" ? "Published" : "Updated"} ${s.label}`);
    commit();
    return { ok: true, message: mode === "publish" ? `${s.label} published (demo).` : `${s.label} saved.` };
  });
}

export function discardDraft(key: string): ActionResult {
  return guard(() => {
    const s = getSingleton(key);
    if (!s) return { ok: false, error: "Unknown settings page" };
    authorize(`${s.area}.edit` as Permission);
    const entry = load().settings[key];
    if (entry) entry.draft = null;
    log("discard", "settings", `Discarded draft of ${s.label}`);
    commit();
    return { ok: true, message: "Draft discarded." };
  });
}

/* ------------------------------------------------------------------ media */

export const MAX_DEMO_FILE = 1.5 * 1024 * 1024;

export function listMedia(query: { kind?: "image" | "document"; q?: string; page?: number }) {
  let rows = load().media;
  if (query.kind) rows = rows.filter((m) => m.kind === query.kind);
  const q = query.q?.trim().toLowerCase();
  if (q) rows = rows.filter((m) => `${m.originalName} ${m.alt} ${m.category}`.toLowerCase().includes(q));
  const pageSize = 24;
  const page = Math.max(1, query.page ?? 1);
  return { items: rows.slice((page - 1) * pageSize, page * pageSize), total: rows.length, page, pageSize };
}

export function addMedia(item: Omit<MediaItem, "id" | "createdAt" | "uploadedBy">): ActionResult<MediaItem> {
  return guard(() => {
    const u = authorize("files.edit");
    const m: MediaItem = { ...item, id: uid(), createdAt: now(), uploadedBy: u.name };
    load().media.unshift(m);
    log("upload", "media", `Uploaded “${item.originalName.slice(0, 80)}”`);
    commit();
    return { ok: true, data: m };
  });
}

export function updateMedia(id: string, values: { alt: string; category: string }): ActionResult {
  return guard(() => {
    authorize("files.edit");
    const m = load().media.find((x) => x.id === id);
    if (!m) return { ok: false, error: "File not found." };
    m.alt = values.alt.trim().slice(0, 300);
    m.category = values.category.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 40) || "general";
    log("update", "media", `Updated details of “${m.originalName}”`);
    commit();
    return { ok: true, message: "File details saved." };
  });
}

export function deleteMedia(id: string): ActionResult {
  return guard(() => {
    authorize("files.delete");
    const d = load();
    const m = d.media.find((x) => x.id === id);
    if (!m) return { ok: false, error: "File not found." };
    d.media = d.media.filter((x) => x.id !== id);
    log("delete", "media", `Deleted file “${m.originalName}”`);
    commit();
    return { ok: true, message: "File deleted." };
  });
}

/* ------------------------------------------------------------------ users */

export const users = () => load().users;
export const roles = () => load().roles;
export const activity = () => load().activity;

export function createUser(v: { name: string; email: string; role: RoleKey }): ActionResult {
  return guard(() => {
    const me = authorize("users.edit");
    const fe: Record<string, string> = {};
    if (v.name.trim().length < 3) fe.name = "Enter the full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) fe.email = "Enter a valid email.";
    if (load().users.some((u) => u.email === v.email.trim().toLowerCase())) fe.email = "Already in use";
    if (Object.keys(fe).length) return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: fe };
    if (v.role === "super_admin" && me.role !== "super_admin") return { ok: false, error: "Only a Super Admin can create another Super Admin." };
    load().users.push({ id: uid(), name: v.name.trim(), email: v.email.trim().toLowerCase(), role: v.role, active: true, createdAt: now() });
    log("create", "users", `Created ${v.role.replace("_", " ")} account for ${v.email}`);
    commit();
    return { ok: true, message: "Account created (demo)." };
  });
}

function activeSupers(except?: string) {
  return load().users.filter((u) => u.role === "super_admin" && u.active && u.id !== except).length;
}

export function updateUser(id: string, v: { name: string; role: RoleKey; active: boolean }): ActionResult {
  return guard(() => {
    const me = authorize("users.edit");
    const t = load().users.find((u) => u.id === id);
    if (!t) return { ok: false, error: "Account not found." };
    if ((t.role === "super_admin" || v.role === "super_admin") && me.role !== "super_admin") return { ok: false, error: "Only a Super Admin can change Super Admin accounts." };
    if (id === me.id && (v.role !== t.role || !v.active)) return { ok: false, error: "You cannot change your own role or deactivate yourself." };
    if (t.role === "super_admin" && (v.role !== "super_admin" || !v.active) && activeSupers(id) === 0) return { ok: false, error: "There must always be at least one active Super Admin." };
    if (v.name.trim().length < 3) return { ok: false, error: "Enter the full name." };
    Object.assign(t, { name: v.name.trim(), role: v.role, active: v.active });
    log("update", "users", `Updated account ${t.email}`);
    commit();
    return { ok: true, message: "Account updated." };
  });
}

export function deleteUser(id: string): ActionResult {
  return guard(() => {
    const me = authorize("users.delete");
    if (id === me.id) return { ok: false, error: "You cannot delete your own account." };
    const d = load();
    const t = d.users.find((u) => u.id === id);
    if (!t) return { ok: false, error: "Account not found." };
    if (t.role === "super_admin" && me.role !== "super_admin") return { ok: false, error: "Only a Super Admin can delete a Super Admin." };
    if (t.role === "super_admin" && activeSupers(id) === 0) return { ok: false, error: "There must always be at least one active Super Admin." };
    d.users = d.users.filter((u) => u.id !== id);
    log("delete", "users", `Deleted account ${t.email}`);
    commit();
    return { ok: true, message: "Account deleted." };
  });
}

export function saveRole(role: "admin" | "editor", perms: string[]): ActionResult {
  return guard(() => {
    const me = authorize("users.edit");
    if (me.role !== "super_admin") return { ok: false, error: "Only a Super Admin can change role permissions." };
    load().roles[role] = perms.filter((p): p is Permission => (allPermissions as string[]).includes(p));
    log("update", "roles", `Changed permissions of the ${role} role`);
    commit();
    return { ok: true, message: "Role permissions saved." };
  });
}

export function updateProfile(name: string): ActionResult {
  return guard(() => {
    const me = currentUser();
    if (!me) return { ok: false, error: "Not signed in." };
    if (name.trim().length < 3) return { ok: false, error: "Enter your full name.", fieldErrors: { name: "Enter your full name." } };
    const u = load().users.find((x) => x.id === me.id)!;
    u.name = name.trim();
    log("update", "profile", "Updated profile name");
    commit();
    return { ok: true, message: "Profile updated." };
  });
}

/* --------------------------------------------------------- results import */

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some((x) => x.trim())) rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim())) rows.push(row);
  return rows;
}

const fixed = ["roll", "registration", "name", "classname", "section", "group", "position"];

export function importResults(examId: string, csv: string, publish: boolean): ActionResult {
  return guard(() => {
    authorize("results.edit");
    if (publish) authorize("results.publish");
    const exam = getItem("exams", examId);
    if (!exam) return { ok: false, error: "Choose an examination." };
    const rows = parseCsv(csv.replace(/^﻿/, ""));
    if (rows.length < 2) return { ok: false, error: "The CSV needs a header row and at least one result row." };
    const header = rows[0].map((h) => h.trim());
    const lower = header.map((h) => h.toLowerCase().replace(/\s+/g, ""));
    for (const need of ["roll", "name", "classname"]) if (!lower.includes(need)) return { ok: false, error: `Missing column “${need}”.` };
    const subjects = header.map((h, i) => ({ h, i })).filter(({ i }) => !fixed.includes(lower[i]));
    if (!subjects.length) return { ok: false, error: "Add at least one subject column with marks." };
    const col = (r: string[], n: string) => (r[lower.indexOf(n)] ?? "").trim();
    const errors: string[] = [];
    let saved = 0;
    const results = collection("results");
    rows.slice(1).forEach((r, n) => {
      const line = n + 2;
      const roll = col(r, "roll");
      const name = col(r, "name");
      const className = col(r, "classname");
      if (!/^\d{1,6}$/.test(roll) || !name || !className) return void errors.push(`Row ${line}: roll, name and class are required.`);
      const subs = subjects.map(({ h, i }) => ({ subject: h, marks: (r[i] ?? "").trim() })).filter((s) => s.marks !== "").map((s) => ({ subject: s.subject, marks: Number(s.marks) }));
      if (subs.some((s) => !Number.isFinite(s.marks) || s.marks < 0 || s.marks > 100)) return void errors.push(`Row ${line}: marks must be 0–100.`);
      const data = { exam: examId, roll, name, className, registration: col(r, "registration"), section: col(r, "section"), group: col(r, "group"), position: Number(col(r, "position")) || undefined, subjects: subs, gpa: gpaFor(subs.map((s) => s.marks)), published: publish };
      const existing = results.find((x) => x.exam === examId && x.className === className && x.roll === roll);
      if (existing) Object.assign(existing, data, { updatedAt: now() });
      else results.unshift({ ...data, _id: uid(), createdAt: now(), updatedAt: now() });
      saved++;
    });
    log("import", "results", `Imported ${saved} result(s) for ${String(exam.name)} ${String(exam.year)}`);
    commit();
    if (!saved) return { ok: false, error: errors.slice(0, 6).join(" ") || "No rows were imported." };
    return { ok: true, message: `${saved} result(s) imported.${errors.length ? ` ${errors.length} row(s) skipped: ${errors.slice(0, 4).join(" ")}` : ""}` };
  });
}

export function exportCsv(key: string, filters: Record<string, string>) {
  const r = requireResource(key);
  if (!can(`${r.area}.view` as Permission)) return;
  const cell = (v: unknown) => {
    let s = Array.isArray(v) ? v.map((x) => (typeof x === "object" ? JSON.stringify(x) : String(x))).join(" | ") : v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = listItems(key, { filters, pageSize: 100000 }).items;
  const header = [...resourceFields(r).map((f) => f.name), "createdAt"];
  const csv = "﻿" + [header.join(","), ...rows.map((d) => header.map((h) => cell(d[h])).join(","))].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = `${key}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  log("export", key, `Exported ${rows.length} ${r.label.toLowerCase()} to CSV`);
  commit();
}

export function pendingCounts() {
  return {
    applications: collection("applications").filter((a) => a.status === "pending").length,
    messages: collection("messages").filter((m) => m.status === "new").length,
  };
}
