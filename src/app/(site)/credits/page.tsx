import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { images } from "@/data/images";
import type { ImageAsset } from "@/types";

export const metadata: Metadata = {
  title: "Photo Credits",
  description: "Sources and photographers of the photographs used on the Webnion School & College demonstration website.",
};

export default function CreditsPage() {
  const list: ImageAsset[] = Object.values(images).filter((img: ImageAsset) => Boolean(img.credit));
  return (
    <>
      <PageHeader title="Photo Credits" titleBn="ছবির কৃতজ্ঞতা" description="Photographs from Unsplash are used under the Unsplash License. The home page photo was supplied by the site owner." />
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <DemoNote>
            The photos are representative images from schools and places in Bangladesh and India. None of them shows Webnion School
            &amp; College, which is a fictional institution. Licence details:{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
              unsplash.com/license
            </a>
            .
          </DemoNote>
          <ul className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
            {list.map((img) => (
              <li key={img.src} className="flex items-center gap-4 p-4">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-paper-dark">
                  <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="text-ink">{img.alt}</p>
                  <p className="text-muted">
                    {img.credit?.author ? `Photo by ${img.credit.author}` : "Photographer listed on Unsplash"}
                    {img.credit?.location ? ` · ${img.credit.location}` : ""}
                  </p>
                </div>
                {img.credit && (
                  <a href={img.credit.page} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-accent hover:underline underline-offset-4">
                    View<span className="sr-only"> on Unsplash (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
