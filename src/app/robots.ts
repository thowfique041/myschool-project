import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site-content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const url = await getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${url}/sitemap.xml`,
  };
}
