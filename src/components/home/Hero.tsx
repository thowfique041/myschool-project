import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { HeroIntro, NoticeTicker } from "./motion-bits";
import type { Notice } from "@/types";
import type { HomeContent } from "./types";

export function Hero({ home, notices }: { home: HomeContent; notices: Notice[] }) {
  const photo = { src: home.heroImage || "/images/hero-campus.jpg", alt: home.heroImageAlt };
  const facts = Array.isArray(home.facts) ? home.facts : [];
  return (
    <section aria-labelledby="hero-title" className="relative bg-paper">
      <div className="container-page pt-5 sm:pt-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)]">
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
              className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/55 via-45% to-transparent max-md:bg-gradient-to-b max-md:from-navy-950/80 max-md:via-navy-950/75 max-md:to-navy-950/85"
            />

            <div className="flex min-h-[28rem] flex-col justify-center px-5 py-14 sm:min-h-[32rem] sm:px-10 lg:min-h-[34rem] lg:px-14">
              <div className="max-w-2xl">
                <HeroIntro>
                  <p
                    lang="bn"
                    className="font-serif text-xl font-semibold text-leaf-200 sm:text-2xl"
                    style={{ lineHeight: 1.5 }}
                  >
                    {home.heroTagline}
                  </p>
                  <h1
                    id="hero-title"
                    className="mt-2 font-serif text-[2.3rem] leading-[1.08] font-semibold tracking-tight text-white sm:text-[3.4rem]"
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
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/60 px-5 text-[0.95rem] font-semibold whitespace-nowrap text-white transition-colors hover:border-white hover:bg-white/10"
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

          {/* Key facts bar */}
          {facts.length > 0 && <div className="bg-surface">
            <div className="px-5 sm:px-10 lg:px-14">
              <dl className="grid max-w-3xl grid-flow-col auto-cols-fr divide-x divide-line py-4 sm:py-5">
                {facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={i === 0 ? "pr-3 sm:pr-8" : "px-3 sm:px-8"}
                  >
                    <dt className="text-xs text-muted">{f.label}</dt>
                    <dd className="mt-0.5 text-[0.95rem] font-semibold text-heading sm:text-xl">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>}
        </div>
      </div>

      <div className="container-page py-6">
        <NoticeTicker notices={notices} />
      </div>
    </section>
  );
}
