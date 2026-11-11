"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Building blocks that fade up: headings, text, cards, list items, pictures,
 * tables and forms in the page body and the footer. The outermost match wins,
 * so a card moves as one piece instead of each line inside it separately.
 */
const BLOCK = ":is(h2, h3, h4, p, blockquote, ul > li, ol > li, dl > div, dt, dd, article, figure, table, form, picture, img, [role='group'] > div)";
const SELECTOR = `main ${BLOCK}, footer ${BLOCK}`;
/** Places where movement would get in the way. */
const SKIP = "[aria-roledescription='carousel'], nav, [role='status'], [role='dialog'], .no-reveal";
/** Delay between neighbours that appear together, so a row of cards ripples in. */
const STAGGER_MS = 70;
/** Must match the translateY in globals.css (.tr). Elements are measured while shifted down by this much. */
const OFFSET_PX = 16;

/**
 * Fades page components up as they scroll into view. Classes are added by
 * script only, so without JavaScript (and for search engines) everything is
 * visible as normal. Things already on screen at load are left alone, and
 * nothing moves for visitors who prefer reduced motion.
 */
export function TextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        visible.forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 6) * STAGGER_MS}ms`;
          el.classList.add("tr-in");
          io.unobserve(el);
        });
      },
      { rootMargin: `0px 0px ${OFFSET_PX - 8}px 0px`, threshold: 0 },
    );

    const timer = window.setTimeout(() => {
      const fold = window.innerHeight;
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (el.closest(SKIP)) return;
        // Anything inside a block that is already moving moves with it.
        if (el.parentElement?.closest(".tr")) return;
        if (el.getBoundingClientRect().top < fold) return;
        el.classList.add("tr");
        io.observe(el);
      });
    }, 50);

    // Safety net: anything still waiting once its (unshifted) position is on screen
    // is shown, e.g. the last lines of the footer at the very bottom of the page.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        document.querySelectorAll<HTMLElement>(".tr:not(.tr-in)").forEach((el) => {
          if (el.getBoundingClientRect().top - OFFSET_PX < window.innerHeight - 24) {
            el.classList.add("tr-in");
            io.unobserve(el);
          }
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      io.disconnect();
      document.querySelectorAll<HTMLElement>(".tr").forEach((el) => {
        el.classList.remove("tr", "tr-in");
        el.style.transitionDelay = "";
      });
    };
  }, [pathname]);

  return null;
}
