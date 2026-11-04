import Image from "next/image";
import Link from "@/components/i18n/Link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { HeroIntro, NoticeTicker } from "./motion-bits";
import type { Notice } from "@/types";
import type { HomeContent } from "./types";

export function Hero({ home, notices }: { home: HomeContent; notices: Notice[] }) {
  const photo = { src: home.heroImage || "/images/hero-campus.jpg", alt: home.heroImageAlt };
  return (
    <section aria-labelledby="hero-title" className="relative bg-paper">
      <div className="container-page pt-5 sm:pt-8">
        <div className="overflow-hidden rounded-md">
          {/* Photo with a dark gradient on the text side, contained to the page width */}
          <div className="relative isolate overflow-hidden bg-navy-950">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="-z-20 object-cover object-[70%_center]"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-navy-950/60 md:bg-gradient-to-r md:from-navy-950/85 md:via-navy-950/50 md:to-navy-950/10"
            />

            <div className="flex min-h-[28rem] flex-col justify-center px-5 py-14 sm:min-h-[32rem] sm:px-10 lg:min-h-[34rem] lg:px-14">
              <div className="max-w-2xl">
                <HeroIntro>
                  <h1
                    id="hero-title"
                    className="font-serif text-[2.1rem] leading-[1.15] font-bold text-white sm:text-[3rem]"
                  >
                    {home.heroTitle}
                  </h1>
                </HeroIntro>
                <HeroIntro delay={0.08}>
                  <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-navy-100 sm:text-lg">
                    {home.heroSubtitle}
                  </p>
                </HeroIntro>
                <HeroIntro delay={0.16} className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={home.primaryHref || "/admission"} variant="secondary">
                    {home.primaryLabel}
                    <ArrowRight aria-hidden className="size-4" />
                  </ButtonLink>
                  {home.secondaryLabel && <Link
                    href={home.secondaryHref || "/about"}
                    className="inline-flex min-h-11 items-center justify-center rounded border border-white/60 px-5 text-[0.95rem] font-semibold whitespace-nowrap text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    {home.secondaryLabel}
                  </Link>}
                </HeroIntro>
              </div>
            </div>

            {home.heroCaption && (
              <p className="absolute right-3 bottom-2 rounded bg-navy-950/60 px-2 py-0.5 text-[0.7rem] text-white/85 sm:right-5">
                {home.heroCaption}
              </p>
            )}
          </div>

        </div>
      </div>

      <div className="container-page py-6">
        <NoticeTicker notices={notices} />
      </div>
    </section>
  );
}
