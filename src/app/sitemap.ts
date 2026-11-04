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
  return [
    ...staticRoutes.map((path) => ({ url: `${url}${path}` })),
    ...notices.map((n) => ({ url: `${url}/notices/${n.slug}`, lastModified: n.date })),
    ...news.map((n) => ({ url: `${url}/news/${n.slug}`, lastModified: n.date })),
  ];
}
