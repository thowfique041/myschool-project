import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/explorers/GalleryGrid";
import { getGallery, getSite } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Campus, classroom, sports, cultural programmes and events at Webnion School & College.",
};

export default async function GalleryPage() {
  const [{ items }, site] = await Promise.all([getGallery(), getSite()]);
  return (
    <>
      <PageHeader title="Photo Gallery" titleBn="ফটো গ্যালারি" crumbs={[{ label: "Campus Life" }]} description="Moments from classrooms, labs, the playground and school programmes." />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          {items.length ? <GalleryGrid items={items} /> : <p className="text-muted">No photos have been published yet.</p>}
          {site.demoNote && <DemoNote className="mt-8">
            These are representative photographs from Unsplash (free Unsplash License), taken at schools and places in Bangladesh
            and India. They do not show Webnion School &amp; College, which is fictional. See <Link href="/credits" className="font-semibold underline underline-offset-2">photo credits</Link>.
          </DemoNote>}
        </div>
      </section>
    </>
  );
}
