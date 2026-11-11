import type { MetadataRoute } from "next";
import { getNews, getNotices, getSiteUrl } from "@/content/site-content";

const staticRoutes = [
  "",
  "/about",
  "/academic",
  "/admission",
  "/notices",
  "/results",
  "/teachers",
  "/gallery",
  "/news",
  "/contact",
  "/calendar",
  "/policies",
  "/faq",
  "/students-guardians",
  "/privacy",
  "/terms",
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
