import { NoticeTicker } from "./motion-bits";
import { HeroSlider, type Slide } from "./HeroSlider";
import type { Notice } from "@/types";
import type { HomeContent } from "./types";

export function Hero({ home, notices }: { home: HomeContent; notices: Notice[] }) {
  const first: Slide = {
    image: home.heroImage || "/images/hero-campus.jpg",
    imageAlt: home.heroImageAlt,
    title: home.heroTitle,
    lines: [home.heroSubtitle, home.heroNote ?? ""].filter(Boolean),
    motto: home.heroTagline,
    href: home.primaryHref || "/admission",
    label: home.primaryLabel,
    secondary: home.secondaryLabel ? { href: home.secondaryHref || "/about", label: home.secondaryLabel } : undefined,
  };
  const rest: Slide[] = (Array.isArray(home.slides) ? home.slides : [])
    .filter((s) => s.image && s.title)
    .map((s) => ({ image: s.image, imageAlt: s.imageAlt, title: s.title, lines: [s.text].filter(Boolean), href: s.href, label: s.label }));
  return (
    <>
      <HeroSlider slides={[first, ...rest]} />
      <div className="container-page py-5">
        <NoticeTicker notices={notices} />
      </div>
    </>
  );
}
