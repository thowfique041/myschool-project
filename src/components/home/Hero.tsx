import Image from "next/image";
import Link from "@/components/i18n/Link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { NoticeTicker } from "./motion-bits";
import type { Notice } from "@/types";
import type { HomeContent } from "./types";

export function Hero({ home, notices }: { home: HomeContent; notices: Notice[] }) {
  const photo = { src: home.heroImage || "/images/hero-campus.jpg", alt: home.heroImageAlt };
  return (
    <section aria-labelledby="hero-title" className="bg-paper">
      <div className="container-page pt-5 sm:pt-6">
        <div className="relative isolate overflow-hidden rounded-md bg-navy-950">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="-z-20 object-cover object-[70%_center]"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/65 md:bg-gradient-to-r md:from-navy-950/80 md:via-navy-950/50 md:to-navy-950/10" />

          <div className="flex min-h-[19rem] flex-col justify-center px-5 py-10 sm:min-h-[22rem] sm:px-10 lg:px-12">
            <div className="max-w-2xl text-white">
              <h1 id="hero-title" className="font-serif text-4xl leading-tight font-semibold sm:text-5xl">
                {home.heroTitle}
              </h1>
              <p className="mt-3 text-base text-navy-100 sm:text-lg">{home.heroSubtitle}</p>
              {home.heroTagline && <p className="mt-1 text-sm text-navy-200 italic">{home.heroTagline}</p>}
              {home.heroNote && <p className="mt-5 text-base font-semibold sm:text-lg">{home.heroNote}</p>}
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink href={home.primaryHref || "/admission"} variant="secondary">
                  {home.primaryLabel}
                  <ArrowRight aria-hidden className="size-4" />
                </ButtonLink>
                {home.secondaryLabel && (
                  <Link href={home.secondaryHref || "/about"} className="text-sm font-semibold text-white underline underline-offset-4 hover:text-navy-100">
                    {home.secondaryLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {home.heroCaption && (
            <p className="absolute right-3 bottom-2 rounded bg-navy-950/60 px-2 py-0.5 text-xs text-white/85 sm:right-5">{home.heroCaption}</p>
          )}
        </div>
      </div>

      <div className="container-page py-5">
        <NoticeTicker notices={notices} />
      </div>
    </section>
  );
}
