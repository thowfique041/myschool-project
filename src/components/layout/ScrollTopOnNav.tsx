"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

let pending = false;

/** Called by the site Link just before it navigates to another page. */
export function requestScrollTop() {
  pending = true;
}

/**
 * After a link click lands on a new page, put it at the very top. Back/forward
 * navigation is untouched, so the browser can restore where the visitor was.
 */
export function ScrollTopOnNav() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pending) return;
    pending = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    const id = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
