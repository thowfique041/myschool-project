import type { MetadataRoute } from "next";
import { getGallery, getNews, getNotices, getSiteUrl } from "@/content/site-content";

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
  "/admission/apply",
  "/notices",
  "/results",
  "/gallery",
  "/downloads",
  "/contact",
  "/news",
  "/credits",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [url, notices, news, gallery] = await Promise.all([getSiteUrl(), getNotices(), getNews(), getGallery()]);
  const entry = (path: string, lastModified?: string) => ({
    url: `${url}${path}`,
    lastModified,
    alternates: { languages: { bn: `${url}${path}`, en: `${url}/en${path}` } },
  });
  return [
    ...staticRoutes.map((path) => entry(path)),
    ...notices.map((n) => entry(`/notices/${n.slug}`, n.date)),
    ...news.map((n) => entry(`/news/${n.slug}`, n.date)),
    ...Object.keys(gallery.categories).map((k) => entry(`/gallery/${k}`)),
  ];
}
