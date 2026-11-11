import { extraRoutes, navigation } from "@/data/site";
import { cacheLife, cacheTag } from "next/cache";
import { seedCollections, seedExams, singletonDefaults } from "./defaults";
import { slugify } from "@/lib/utils";
import { mockResults } from "@/data/results";
import { getLang } from "@/i18n/server";
import {
  bnNum,
  categoriesBn,
  downloadsBn,
  facilitiesBn,
  faqsBn,
  levelsBn,
  navLabel,
  newsBn,
  policiesBn,
  routineTitlesBn,
  settingsBn,
  subjectLevelsBn,
  term,
  testimonialsBn,
} from "./bn";
import { noticesEn } from "./en-notices";
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
 * Content for the public website. Every getter is cached with `use cache`.
 * The language comes from the [lang] root segment (next/root-params), which
 * becomes part of each cache key; on the Bangla site the Bangla text from
 * ./bn.ts is laid over the English defaults.
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
  if ((await getLang()) !== "bn" || !settingsBn[key]) return defaults as T;
  return mergeBn(defaults, settingsBn[key], key) as T;
}

/** Lays Bangla text over English defaults; arrays of objects merge item by item. */
function mergeBn(base: Record<string, unknown>, over: Record<string, unknown>, key: string): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    const b = base[k];
    if (key === "homepage" && k === "sections" && Array.isArray(b)) {
      const map = v as Record<string, Record<string, string>>;
      out[k] = (b as Record<string, unknown>[]).map((sec) => ({ ...sec, ...(map[String(sec.key)] ?? {}), title: map[String(sec.key)]?.title || sec.title }));
    } else if (Array.isArray(v) && Array.isArray(b) && v.every((x) => x && typeof x === "object") && b.length === v.length) {
      out[k] = b.map((item, i) => ({ ...(item as object), ...(v[i] as object) }));
    } else out[k] = v;
  }
  return out;
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
  const [s, social, branding, lang] = await Promise.all([getSetting("site"), getSetting("social"), getSetting("branding"), getLang()]);
  const bn = lang === "bn";
  return {
    name: str(s.name),
    nameBn: str(s.nameBn),
    shortName: str(s.shortName),
    established: Number(s.established) || 1998,
    tagline: str(s.tagline),
    taglineBn: str(s.taglineBn),
    eiin: str(s.eiin),
    address: bn ? str(s.addressBn) || str(s.address) : str(s.address),
    addressBn: bn ? str(s.address) : str(s.addressBn),
    area: str(s.area),
    phone: str(s.phone),
    phoneHref: telHref(str(s.phone)),
    officePhone: str(s.officePhone),
    officePhoneHref: telHref(str(s.officePhone)),
    email: str(s.email),
    admissionEmail: str(s.admissionEmail),
    officeHours: bn ? str(s.officeHoursBn) || str(s.officeHours) : str(s.officeHours),
    officeHoursBn: bn ? str(s.officeHours) : str(s.officeHoursBn),
    mapUrl: str(s.mapUrl),
    demoNote: str(s.demoNote),
    social: arr<{ label: string; href: string }>(social.links),
    logo: str(branding.logo),
    favicon: str(branding.favicon),
    primary: str(branding.primary),
    accent: str(branding.accent),
  };
}

export async function getNavigation(): Promise<{ items: NavItem[]; extras: NavItem[]; ctaLabel: string; ctaHref: string }> {
  const [n, lang] = await Promise.all([getSetting("navigation"), getLang()]);
  const pick = (i: { label: string; labelBn?: string }) => (lang === "bn" ? i.labelBn || navLabel(i.label) : i.label);
  const map = (i: NavItem): NavItem => ({
    label: pick(i),
    href: i.href,
    children: i.children && i.children.length ? i.children.map((c) => ({ label: pick(c), href: c.href })) : undefined,
  });
  const items = arr<NavItem>(n.items).map(map);
  const L = (v: string | undefined) => (lang === "bn" && v ? navLabel(v) : v);
  return { items, extras: extraRoutes.map(map), ctaLabel: L(str(n.ctaLabel))!, ctaHref: str(n.ctaHref) || "/admission" };
}

/** Footer content with link labels in the visitor's language. */
export async function getFooter<T extends Record<string, unknown>>(): Promise<T> {
  const [f, lang] = await Promise.all([getSetting("footer"), getLang()]);
  if (lang !== "bn") return f as T;
  // Footer links reuse the Bangla label of the same page in the site map.
  const byHref = new Map<string, string>();
  for (const i of [...navigation, ...extraRoutes]) {
    if (i.labelBn) byHref.set(i.href, i.labelBn);
    for (const c of i.children ?? []) if (c.labelBn) byHref.set(c.href, c.labelBn);
  }
  const links = (v: unknown) => arr<{ label: string; href: string }>(v).map((l) => ({ ...l, label: byHref.get(l.href) ?? navLabel(l.label) }));
  return { ...f, quick: links(f.quick), institution: links(f.institution), help: links(f.help) } as unknown as T;
}

/* --------------------------------------------------------------- Categories */

export type CategoryMap = Record<string, { label: string; labelBn?: string }>;

export async function getCategories(group: string): Promise<CategoryMap> {
  "use cache";
  cacheTag("categories");
  cacheLife("max");
  const bn = (await getLang()) === "bn";
  const toMap = (rows: Doc[]) =>
    Object.fromEntries(
      rows
        .filter((r) => r.group === group)
        .map((r) => {
          const label = str(r.label);
          const labelBn = str(r.labelBn) || categoriesBn[group]?.[str(r.value)] || undefined;
          return [str(r.value), bn ? { label: labelBn ?? label, labelBn: label } : { label, labelBn }];
        }),
    );
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
  const bn = (await getLang()) === "bn";
  return rows
    .map((d) => toNotice(d, cats))
    .map((n) => {
      if (bn) return { ...n, titleEn: undefined, categoryLabelBn: undefined };
      const e = noticesEn[n.slug];
      if (!e) return { ...n, title: n.titleEn || n.title, titleEn: undefined, categoryLabelBn: undefined };
      return {
        ...n,
        title: e.title ?? n.titleEn ?? n.title,
        titleEn: undefined,
        categoryLabelBn: undefined,
        summary: e.summary,
        body: e.body,
        issuedBy: e.issuedBy,
        attachment: n.attachment ? { ...n.attachment, label: e.attachmentLabel ?? n.attachment.label } : undefined,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
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
  const bn = (await getLang()) === "bn";
  return rows
    .map((d) => toNews(d, cats))
    .map((a) => {
      const t = bn ? newsBn[a.slug] : undefined;
      return t ? { ...a, title: t.title, excerpt: t.excerpt, body: t.body, venue: t.venue ?? a.venue, image: { ...a.image, alt: t.title } } : a;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
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
  const bn = (await getLang()) === "bn";
  return rows
    .map((d) => ({
      date: str(d.date),
      endDate: str(d.endDate) || undefined,
      title: bn ? str(d.titleBn) || str(d.title) : str(d.title),
      titleBn: bn ? str(d.title) : str(d.titleBn),
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
  const bn = (await getLang()) === "bn";
  const T = (v: string) => (bn ? term(v) : v);
  return rows.map((d) => ({
    id: id(d) || str(d.email),
    kind: (str(d.kind) || "teacher") as "teacher" | "staff",
    name: bn ? str(d.nameBn) || str(d.name) : str(d.name),
    nameBn: bn ? str(d.name) : str(d.nameBn),
    designation: T(str(d.designation)),
    department: cats[str(d.department)]?.label ?? str(d.department),
    subjects: arr(d.subjects).map(T),
    qualification: T(str(d.qualification)),
    joined: Number(d.joined) || 0,
    section: (str(d.section) || "All") as Teacher["section"],
    gender: str(d.gender) === "female" ? "female" : "male",
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
  const bn = (await getLang()) === "bn";
  const items = rows.map((d, i) => ({
    id: id(d) || `g${i}`,
    category: str(d.category),
    categoryLabel: cats[str(d.category)]?.label ?? str(d.category),
    caption: bn ? str(d.captionBn) || str(d.caption) : str(d.caption),
    captionBn: bn ? str(d.caption) : str(d.captionBn),
    image: { src: str(d.image), alt: bn ? str(d.captionBn) || str(d.alt) : str(d.alt) || str(d.caption), width: 1600, height: 1000 },
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
  const bn = (await getLang()) === "bn";
  return rows.map((d, i) => {
    const href = str(d.file);
    const ext = href.split("?")[0].split(".").pop()?.toUpperCase() ?? "FILE";
    const t = bn ? downloadsBn[str(d.title)] : undefined;
    return {
      id: id(d) || `d${i}`,
      title: t?.title ?? str(d.title),
      titleBn: bn ? undefined : str(d.titleBn) || undefined,
      category: str(d.category),
      categoryLabel: cats[str(d.category)]?.label ?? str(d.category),
      description: t?.description ?? str(d.description),
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
  const bn = (await getLang()) === "bn";
  return (await simpleList("faqs", "faqs")).map((d) => {
    const t = bn ? faqsBn[str(d.question)] : undefined;
    return { question: t?.question ?? str(d.question), answer: t?.answer ?? str(d.answer), topic: str(d.topic) as FaqItem["topic"] };
  });
}

/** English versions of quotes that were written in Bangla. */
const testimonialsEn: Record<string, { quote?: string; name?: string; role?: string }> = {
  "Guardian, Class 5, Morning shift": {
    quote: "My daughter has studied here since Class 1. Her class teacher checks in regularly and calls us if there is ever a problem. That gives us the most confidence.",
  },
  "Former student, HSC 2025, Business Studies": {
    quote: "The tutorial classes helped a lot in HSC. We could take our questions to the teachers even after class.",
  },
};

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag("testimonials");
  cacheLife("max");
  const bn = (await getLang()) === "bn";
  return (await simpleList("testimonials", "testimonials")).map((d) => {
    const t: { quote?: string; name?: string; role?: string } | undefined = bn ? testimonialsBn[str(d.role)] : testimonialsEn[str(d.role)];
    return { quote: t?.quote ?? str(d.quote), name: t?.name ?? str(d.name), role: t?.role ?? str(d.role) };
  });
}

export async function getFacilities(): Promise<{ title: string; text: string; image: string; imageAlt: string }[]> {
  "use cache";
  cacheTag("facilities");
  cacheLife("max");
  const bn = (await getLang()) === "bn";
  return (await simpleList("facilities", "facilities")).map((d) => {
    const t = bn ? facilitiesBn[str(d.title)] : undefined;
    return { title: t?.title ?? str(d.title), text: t?.text ?? str(d.text), image: str(d.image), imageAlt: t?.title ?? (str(d.imageAlt) || str(d.title)) };
  });
}

export type AcademicContent = {
  levels: AcademicLevel[];
  subjects: { level: string; compulsory: string[]; optional: string[] }[];
  routines: { title: string; rows: Record<string, string>[]; rowsEn: Record<string, string>[] }[];
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
  const bn = (await getLang()) === "bn";
  return {
    levels: levels.map((d, i) => {
      const t = bn ? levelsBn[str(d.name)] : undefined;
      return {
        id: id(d) || `l${i}`,
        name: bn ? str(d.nameBn) || str(d.name) : str(d.name),
        nameBn: bn ? str(d.name) : str(d.nameBn),
        classes: t?.classes ?? str(d.classes),
        ages: t?.ages ?? str(d.ages),
        summary: t?.summary ?? str(d.summary),
        highlights: t?.highlights ?? arr(d.highlights),
        groups: (t?.groups ?? arr(d.groups)).length ? (t?.groups ?? arr(d.groups)) : undefined,
        shift: t?.shift ?? (str(d.shift) || undefined),
        sectionSize: t?.sectionSize ?? (str(d.sectionSize) || undefined),
      };
    }),
    subjects: subjects.map((d) => {
      const t = bn ? subjectLevelsBn[str(d.level)] : undefined;
      return { level: t?.level ?? str(d.level), compulsory: arr(d.compulsory).map((c) => (bn ? term(c) : c)), optional: t?.optional ?? arr(d.optional) };
    }),
    routines: routines.map((d) => ({
      title: bn ? (routineTitlesBn[str(d.title)] ?? str(d.title)) : str(d.title),
      rows: arr<Record<string, string>>(d.rows).map((r) => (bn ? Object.fromEntries(Object.entries(r).map(([k, v]) => [k, k === "time" ? bnNum(v) : term(v)])) : r)),
      /** Untranslated rows: used for subject colours, lab detection and timing. */
      rowsEn: arr<Record<string, string>>(d.rows),
    })),
    policies: policies.map((d, i) => {
      const t = bn ? policiesBn[str(d.title)] : undefined;
      return { id: slugify(str(d.title)) || `p${i}`, title: t?.title ?? str(d.title), points: t?.points ?? arr(d.points) };
    }),
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
  const bn = (await getLang()) === "bn";
  const T = (v: string) => (bn ? term(v) : v);
  return {
    name: T(str(e.name)),
    year: bn ? bnNum(str(e.year)) : str(e.year),
    classes: T(str(e.classes)),
    note: bn && str(e.scheduleNote).startsWith("All papers start at 10:00 AM") ? "সব পরীক্ষা সকাল ১০টায় শুরু হবে। ব্যবহারিক পরীক্ষা ল্যাবে নেওয়া হবে।" : str(e.scheduleNote),
    file: str(e.routineFile),
    rows: arr<{ date: string; day: string; subject: string; classes: string }>(e.schedule).map((r) => ({ ...r, day: T(r.day), subject: T(r.subject), classes: T(r.classes) })),
  };
}

export type ResultOptions = { exams: { id: string; label: string; name: string; year: string }[]; classes: string[]; classLabels: Record<string, string> };

export async function getResultOptions(): Promise<ResultOptions> {
  "use cache";
  cacheTag("exams", "results");
  cacheLife("max");
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  const bn = (await getLang()) === "bn";
  const classLabels = Object.fromEntries(classes.map((c) => [c, bn ? term(c) : c]));
  const label = (name: string, year: string) => (bn ? `${term(name)} ${bnNum(year)}` : `${name} ${year}`);
  return withFallback(
    null,
    () => ({
      exams: [
        { id: "Half-Yearly Examination|2026", name: "Half-Yearly Examination", year: "2026", label: label("Half-Yearly Examination", "2026") },
        { id: "Annual Examination|2025", name: "Annual Examination", year: "2025", label: label("Annual Examination", "2025") },
      ],
      classes,
      classLabels,
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
  const [s, lang] = await Promise.all([getSetting("boardResults"), getLang()]);
  const rows = arr<{ exam: string; year: string; examinees: number; passed: number; aPlus: number }>(s.rows);
  return { isSample: Boolean(s.isSample), rows: lang === "bn" ? rows.map((r) => ({ ...r, exam: term(r.exam), year: bnNum(r.year) })) : rows };
}

/** Current year for copyright lines, refreshed daily. */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Today's date (YYYY-MM-DD, Asia/Dhaka), refreshed hourly, for "upcoming" lists. */
export async function getToday(): Promise<string> {
  "use cache";
  cacheLife("hours");
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date());
}

/** Public site URL from SEO settings (no trailing slash). */
export async function getSiteUrl(): Promise<string> {
  "use cache";
  const seo = await getSetting<{ siteUrl?: string }>("seo");
  return (seo.siteUrl || "https://webnion-school-college.vercel.app").replace(/\/+$/, "");
}
