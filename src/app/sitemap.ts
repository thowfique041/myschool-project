import type { MetadataRoute } from "next";
import { getNews, getNotices, getSiteUrl } from "@/content/site-content";

const staticRoutes = [
  "",
  "/about/history",
  "/about/principal",
  "/about/chairman",
  "/about/governing-body",
  "/about/infrastructure",
  "/teachers",
  "/staff",
  "/academic/classes",
  "/academic/students",
  "/academic/routine",
  "/academic/calendar",
  "/academic/syllabus",
  "/academic/rules",
  "/academic/clubs",
  "/admission",
  "/notices",
  "/results",
  "/gallery",
  "/downloads",
  "/contact",
  "/news",
  "/credits",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [url, notices, news] = await Promise.all([getSiteUrl(), getNotices(), getNews()]);
  const entry = (path: string, lastModified?: string) => ({
    url: `${url}${path}`,
    lastModified,
    alternates: { languages: { bn: `${url}${path}`, en: `${url}/en${path}` } },
  });
  return [
    ...staticRoutes.map((path) => entry(path)),
    ...notices.map((n) => entry(`/notices/${n.slug}`, n.date)),
    ...news.map((n) => entry(`/news/${n.slug}`, n.date)),
  ];
}
