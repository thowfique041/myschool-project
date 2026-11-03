import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/explorers/GalleryGrid";
import { gallery } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Campus, classroom, sports, cultural programmes and events at Webnion School & College.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Photo Gallery" titleBn="ফটো গ্যালারি" crumbs={[{ label: "Campus Life" }]} description="Moments from classrooms, labs, the playground and school programmes." />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <GalleryGrid items={gallery} />
          <DemoNote className="mt-8">
            These are original illustrations made for this demonstration, not photographs of a real campus. Licensed photographs
            can replace them by updating one image registry file.
          </DemoNote>
        </div>
      </section>
    </>
  );
}
