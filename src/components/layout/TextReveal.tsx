"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Text elements that fade up; images, cards, buttons and forms stay still. */
const TEXT = ":is(h2, h3, h4, p, blockquote, figcaption, dt, dd, li)";
const SELECTOR = `main ${TEXT}`;
/** Places where moving text would get in the way. */
const SKIP = "[aria-roledescription='carousel'], form, nav, table, [role='status'], [role='dialog'], .no-reveal";

/**
 * Fades text up as it scrolls into view. Classes are added by script only, so
 * without JavaScript (and for search engines) all text is visible as normal.
 * Text already on screen at load is left alone, and nothing moves for visitors
 * who prefer reduced motion.
 */
export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("tr-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px", threshold: 0 },
    );

    const timer = window.setTimeout(() => {
      const fold = window.innerHeight;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.closest(SKIP)) return;
        // Only plain text: anything holding a picture, icon or card stays still
        // (its own headings and paragraphs are picked up individually).
        if (el.querySelector("img, picture, svg, article, figure, video, iframe")) return;
        // Text inside an element that is already moving moves with it.
        if (el.parentElement?.closest(".tr")) return;
        if (el.getBoundingClientRect().top < fold) return;
        el.classList.add("tr");
        io.observe(el);
      });
    }, 50);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
      document.querySelectorAll(".tr").forEach((el) => el.classList.remove("tr", "tr-in"));
    };
  }, [pathname]);

  return null;
}
