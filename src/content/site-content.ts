import { cacheLife, cacheTag } from "next/cache";
import { seedCollections, seedExams, singletonDefaults } from "./defaults";
import { slugify } from "@/cms/fields";
import { mockResults } from "@/data/results";
import type {
  AcademicLevel,
  CalendarEvent,
  DownloadResource,
  FaqItem,
  GalleryItem,
  NavItem,
  NewsArticle,
  Notice,
  StudentResult,
  Teacher,
  Testimonial,
} from "@/types";

/**
 * Read side of the CMS for the public website. Every getter is cached with
 * `use cache` and tagged; admin mutations call updateTag() for the matching
 * tag so the public site shows the change on the next request.
 *
 * Without MONGODB_URI the getters return the built-in default content, so the
 * website still works before the database is connected.
 */

type Doc = Record<string, unknown> & { _id?: unknown };

const str = (v: unknown) => (typeof v === "string" ? v : v == null ? "" : String(v));
const arr = <T = string>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const id = (d: Doc) => str(d._id);

/** Static site: content always comes from the built-in default content. */
async function withFallback<T>(_load: unknown, fallback: () => T, _label?: string): Promise<T> {
  void _load;
  void _label;
  return fallback();
}

const seed = () => seedCollections();

/* ----------------------------------------------------------------- Settings */

export async function getSetting<T extends Record<string, unknown> = Record<string, unknown>>(key: string): Promise<T> {
  "use cache";
  cacheTag(`setting:${key}`, key === "homepage" ? "homepage" : "site");
  cacheLife("max");
  const defaults = singletonDefaults[key] ?? {};
  return defaults as T;
}

export type SiteInfo = {
  name: string;
  nameBn: string;
  shortName: string;
  established: number;
  tagline: string;
  taglineBn: string;
  eiin: string;
  address: string;
  addressBn: string;
  area: string;
  phone: string;
  phoneHref: string;
  officePhone: string;
  officePhoneHref: string;
  email: string;
  admissionEmail: string;
  officeHours: string;
  officeHoursBn: string;
  mapUrl: string;
  demoNote: string;
  social: { label: string; href: string }[];
  logo: string;
  favicon: string;
  primary: string;
  accent: string;
};

const telHref = (p: string) => (p ? `tel:${p.replace(/[^\d+]/g, "")}` : "");

export async function getSite(): Promise<SiteInfo> {
  const [s, social, branding] = await Promise.all([getSetting("site"), getSetting("social"), getSetting("branding")]);
  return {
    name: str(s.name),
    nameBn: str(s.nameBn),
    shortName: str(s.shortName),
    established: Number(s.established) || 1998,
    tagline: str(s.tagline),
    taglineBn: str(s.taglineBn),
    eiin: str(s.eiin),
    address: str(s.address),
    addressBn: str(s.addressBn),
    area: str(s.area),
    phone: str(s.phone),
    phoneHref: telHref(str(s.phone)),
    officePhone: str(s.officePhone),
    officePhoneHref: telHref(str(s.officePhone)),
    email: str(s.email),
    admissionEmail: str(s.admissionEmail),
    officeHours: str(s.officeHours),
    officeHoursBn: str(s.officeHoursBn),
    mapUrl: str(s.mapUrl),
    demoNote: str(s.demoNote),
    social: arr<{ label: string; href: string }>(social.links),
    logo: str(branding.logo),
    favicon: str(branding.favicon),
    primary: str(branding.primary),
    accent: str(branding.accent),
  };
}

export async function getNavigation(): Promise<{ items: NavItem[]; ctaLabel: string; ctaHref: string }> {
  const n = await getSetting("navigation");
  const items = arr<{ label: string; href: string; children?: { label: string; href: string; description?: string }[] }>(n.items).map((i) => ({
    label: i.label,
    href: i.href,
    children: i.children && i.children.length ? i.children.map((c) => ({ label: c.label, href: c.href, description: c.description || undefined })) : undefined,
  }));
  return { items, ctaLabel: str(n.ctaLabel), ctaHref: str(n.ctaHref) || "/admission#apply" };
}

/* --------------------------------------------------------------- Categories */

export type CategoryMap = Record<string, { label: string; labelBn?: string }>;

export async function getCategories(group: string): Promise<CategoryMap> {
  "use cache";
  cacheTag("categories");
  cacheLife("max");
  const toMap = (rows: Doc[]) =>
    Object.fromEntries(rows.filter((r) => r.group === group).map((r) => [str(r.value), { label: str(r.label), labelBn: str(r.labelBn) || undefined }]));
  return withFallback(
    null,
    () => toMap(seed().categories as Doc[]),
    "categories",
  );
}

/* ------------------------------------------------------------------ Notices */

function toNotice(d: Doc, cats: CategoryMap): Notice {
  const category = str(d.category);
  return {
    slug: str(d.slug),
    title: str(d.title),
    titleEn: str(d.titleEn) || undefined,
    category,
    categoryLabel: cats[category]?.label ?? category,
    categoryLabelBn: cats[category]?.labelBn,
    date: str(d.date),
    important: Boolean(d.important),
    summary: str(d.summary),
    body: arr(d.body),
    issuedBy: str(d.issuedBy),
    attachment: d.attachmentUrl ? { label: str(d.attachmentLabel) || "Attachment", href: str(d.attachmentUrl), size: "PDF" } : undefined,
  };
}

export async function getNotices(): Promise<Notice[]> {
  "use cache";
  cacheTag("notices", "categories");
  cacheLife("minutes");
  const cats = await getCategories("notice");
  const rows = await withFallback(null, () => seed().notices as Doc[], "notices");
  return rows.map((d) => toNotice(d, cats)).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNotice(slug: string): Promise<Notice | null> {
  const all = await getNotices();
  return all.find((n) => n.slug === slug) ?? null;
}

/* --------------------------------------------------------------------- News */

function toNews(d: Doc, cats: CategoryMap): NewsArticle {
  const category = str(d.category);
  return {
    slug: str(d.slug),
    title: str(d.title),
    category,
    categoryLabel: cats[category]?.label ?? category,
    date: str(d.date),
    eventDate: str(d.eventDate) || undefined,
    venue: str(d.venue) || undefined,
    featured: Boolean(d.featured),
    excerpt: str(d.excerpt),
    body: arr(d.body),
    image: { src: str(d.image) || "/images/hero-campus.jpg", alt: str(d.imageAlt) || str(d.title), width: 1600, height: 1000 },
  };
}

export async function getNews(): Promise<NewsArticle[]> {
  "use cache";
  cacheTag("news", "categories");
  cacheLife("minutes");
  const cats = await getCategories("news");
  const rows = await withFallback(null, () => seed().news as Doc[], "news");
  return rows.map((d) => toNews(d, cats)).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string): Promise<NewsArticle | null> {
  return (await getNews()).find((n) => n.slug === slug) ?? null;
}

/* ------------------------------------------------------------------- Events */

export async function getEvents(): Promise<CalendarEvent[]> {
  "use cache";
  cacheTag("events", "categories");
  cacheLife("minutes");
  const cats = await getCategories("event");
  const rows = await withFallback(null, () => seed().events as Doc[], "events");
  return rows
    .map((d) => ({
      date: str(d.date),
      endDate: str(d.endDate) || undefined,
      title: str(d.title),
      titleBn: str(d.titleBn),
      type: str(d.type),
      typeLabel: cats[str(d.type)]?.label ?? str(d.type),
      venue: str(d.venue) || undefined,
      description: str(d.description) || undefined,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/* ----------------------------------------------------------------- Teachers */

export async function getPeople(): Promise<Teacher[]> {
  "use cache";
  cacheTag("teachers", "categories");
  cacheLife("max");
  const cats = await getCategories("department");
  const rows = await withFallback(null, () => seed().teachers as Doc[], "teachers");
  return rows.map((d) => ({
    id: id(d) || str(d.email),
    kind: (str(d.kind) || "teacher") as "teacher" | "staff",
    name: str(d.name),
    nameBn: str(d.nameBn),
    designation: str(d.designation),
    department: cats[str(d.department)]?.label ?? str(d.department),
    subjects: arr(d.subjects),
    qualification: str(d.qualification),
    joined: Number(d.joined) || 0,
    section: (str(d.section) || "All") as Teacher["section"],
    phone: str(d.phone),
    email: str(d.email),
    photo: str(d.photo) || undefined,
  }));
}

/* ------------------------------------------------------------------ Gallery */

export async function getGallery(): Promise<{ items: GalleryItem[]; categories: Record<string, string> }> {
  "use cache";
  cacheTag("gallery", "categories");
  cacheLife("max");
  const cats = await getCategories("gallery");
  const rows = await withFallback(null, () => seed().gallery as Doc[], "gallery");
  const items = rows.map((d, i) => ({
    id: id(d) || `g${i}`,
    category: str(d.category),
    categoryLabel: cats[str(d.category)]?.label ?? str(d.category),
    caption: str(d.caption),
    captionBn: str(d.captionBn),
    image: { src: str(d.image), alt: str(d.alt) || str(d.caption), width: 1600, height: 1000 },
  }));
  const used = new Set(items.map((i) => i.category));
  const categories = Object.fromEntries(Object.entries(cats).filter(([k]) => used.has(k)).map(([k, v]) => [k, v.label]));
  return { items, categories };
}

/* ---------------------------------------------------------------- Downloads */

export async function getDownloads(): Promise<DownloadResource[]> {
  "use cache";
  cacheTag("downloads", "categories");
  cacheLife("max");
  const cats = await getCategories("download");
  const rows = await withFallback(null, () => seed().downloads as Doc[], "downloads");
  return rows.map((d, i) => {
    const href = str(d.file);
    const ext = href.split("?")[0].split(".").pop()?.toUpperCase() ?? "FILE";
    return {
      id: id(d) || `d${i}`,
      title: str(d.title),
      titleBn: str(d.titleBn) || undefined,
      category: str(d.category),
      categoryLabel: cats[str(d.category)]?.label ?? str(d.category),
      description: str(d.description),
      href,
      size: ext.length <= 4 ? ext : "FILE",
      updated: str(d.updated) || str(d.updatedAt).slice(0, 10),
    };
  });
}

/* ---------------------------------------------------------- Misc. listings */

async function simpleList(key: string, tag: string): Promise<Doc[]> {
  return withFallback(
    null,
    () => (seed()[key] ?? []) as Doc[],
    key,
  ).then((rows) => {
    void tag;
    return rows;
  });
}

export async function getFaqs(): Promise<FaqItem[]> {
  "use cache";
  cacheTag("faqs");
  cacheLife("max");
  return (await simpleList("faqs", "faqs")).map((d) => ({ question: str(d.question), answer: str(d.answer), topic: str(d.topic) as FaqItem["topic"] }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag("testimonials");
  cacheLife("max");
  return (await simpleList("testimonials", "testimonials")).map((d) => ({ quote: str(d.quote), name: str(d.name), role: str(d.role) }));
}

export async function getFacilities(): Promise<{ title: string; text: string; image: string; imageAlt: string }[]> {
  "use cache";
  cacheTag("facilities");
  cacheLife("max");
  return (await simpleList("facilities", "facilities")).map((d) => ({ title: str(d.title), text: str(d.text), image: str(d.image), imageAlt: str(d.imageAlt) || str(d.title) }));
}

export type AcademicContent = {
  levels: AcademicLevel[];
  subjects: { level: string; compulsory: string[]; optional: string[] }[];
  routines: { title: string; rows: Record<string, string>[] }[];
  policies: { id: string; title: string; points: string[] }[];
};

export async function getAcademic(): Promise<AcademicContent> {
  "use cache";
  cacheTag("academic");
  cacheLife("max");
  const [levels, subjects, routines, policies] = await Promise.all([
    simpleList("levels", "academic"),
    simpleList("subjects", "academic"),
    simpleList("routines", "academic"),
    simpleList("policies", "academic"),
  ]);
  return {
    levels: levels.map((d, i) => ({
      id: id(d) || `l${i}`,
      name: str(d.name),
      nameBn: str(d.nameBn),
      classes: str(d.classes),
      ages: str(d.ages),
      summary: str(d.summary),
      highlights: arr(d.highlights),
      groups: arr(d.groups).length ? arr(d.groups) : undefined,
    })),
    subjects: subjects.map((d) => ({ level: str(d.level), compulsory: arr(d.compulsory), optional: arr(d.optional) })),
    routines: routines.map((d) => ({ title: str(d.title), rows: arr<Record<string, string>>(d.rows) })),
    policies: policies.map((d, i) => ({ id: slugify(str(d.title)) || `p${i}`, title: str(d.title), points: arr(d.points) })),
  };
}

/* --------------------------------------------------------- Exams & results */

export type ExamSchedule = { name: string; year: string; classes: string; note: string; file: string; rows: { date: string; day: string; subject: string; classes: string }[] };

export async function getExamSchedule(): Promise<ExamSchedule | null> {
  "use cache";
  cacheTag("exams");
  cacheLife("max");
  const rows = await withFallback(
    null,
    () => seedExams().filter((e) => e.showSchedule) as unknown as Doc[],
    "exams",
  );
  const e = rows[0];
  if (!e) return null;
  return { name: str(e.name), year: str(e.year), classes: str(e.classes), note: str(e.scheduleNote), file: str(e.routineFile), rows: arr(e.schedule) };
}

export type ResultOptions = { exams: { id: string; label: string; name: string; year: string }[]; classes: string[] };

export async function getResultOptions(): Promise<ResultOptions> {
  "use cache";
  cacheTag("exams", "results");
  cacheLife("max");
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  return withFallback(
    null,
    () => ({
      exams: [
        { id: "Half-Yearly Examination|2026", name: "Half-Yearly Examination", year: "2026", label: "Half-Yearly Examination 2026" },
        { id: "Annual Examination|2025", name: "Annual Examination", year: "2025", label: "Annual Examination 2025" },
      ],
      classes,
    }),
    "result options",
  );
}

/** Not cached: answers a single student's lookup. */
export async function findResult(examId: string, className: string, roll: string): Promise<StudentResult | null> {
  const [name, year] = examId.split("|");
  return mockResults.find((r) => r.exam === name && r.year === year && r.className === className && r.roll === roll) ?? null;
}

export async function getBoardResults(): Promise<{ isSample: boolean; rows: { exam: string; year: string; examinees: number; passed: number; aPlus: number }[] }> {
  const s = await getSetting("boardResults");
  return { isSample: Boolean(s.isSample), rows: arr(s.rows) };
}

/** Current year for copyright lines, refreshed daily. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Today's date (YYYY-MM-DD, Asia/Dhaka), refreshed hourly — for "upcoming" lists. */
export async function getToday(): Promise<string> {
  "use cache";
  cacheLife("hours");
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date());
}

/** Public site URL from SEO settings (no trailing slash). */
export async function getSiteUrl(): Promise<string> {
  const seo = await getSetting<{ siteUrl?: string }>("seo");
  return (seo.siteUrl || "https://webnion-school-college.vercel.app").replace(/\/+$/, "");
}
