import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bangla, banglaSerif, inter, serifEn } from "@/lib/fonts";
import { getSetting, getSite } from "@/content/site-content";
import { themeScript } from "@/components/layout/ThemeToggle";

type Seo = { title?: string; description?: string; keywords?: string[]; ogImage?: string; siteUrl?: string };

export async function generateMetadata(): Promise<Metadata> {
  const [seo, site] = await Promise.all([getSetting<Seo>("seo"), getSite()]);
  let base: URL;
  try {
    base = new URL(seo.siteUrl || "https://webnion-school-college.vercel.app");
  } catch {
    base = new URL("https://webnion-school-college.vercel.app");
  }
  return {
    metadataBase: base,
    title: { default: seo.title || site.name, template: `%s | ${site.name}` },
    description: seo.description,
    applicationName: site.name,
    keywords: seo.keywords,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_BD",
      images: [{ url: seo.ogImage || "/icon.svg", alt: site.name }],
    },
    icons: site.favicon ? { icon: site.favicon } : undefined,
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#172c4a",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${serifEn.variable} ${bangla.variable} ${banglaSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip">{children}</body>
    </html>
  );
}
