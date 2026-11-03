import type { MetadataRoute } from "next";
import { news } from "@/data/news";
import { notices } from "@/data/notices";
import { site } from "@/data/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({ url: `${site.url}${path}`, lastModified: "2026-11-03" })),
    ...notices.map((n) => ({ url: `${site.url}/notices/${n.slug}`, lastModified: n.date })),
    ...news.map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: n.date })),
  ];
}
