import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bangla, banglaSerif, inter, serifEn } from "@/lib/fonts";
import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Sylhet`,
    template: `%s | ${site.name}`,
  },
  description:
    "Webnion School & College, Sylhet — Play to Class 12 under the national curriculum. Admission 2027, notices, results, academic calendar and campus life. (Demonstration website)",
  applicationName: site.name,
  keywords: ["school in Sylhet", "college in Sylhet", "admission 2027", "SSC", "HSC", "Bangladesh school"],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_BD",
    images: [{ url: "/icon.svg", alt: "Webnion School & College crest" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#172c4a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serifEn.variable} ${bangla.variable} ${banglaSerif.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900 focus:shadow"
        >
          Skip to main content
        </a>
        <TopBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
