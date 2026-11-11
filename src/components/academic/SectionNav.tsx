"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky in-page navigation that marks the section currently in view. */
export function SectionNav({ items, label }: { items: [string, string][]; label: string }) {
  const [active, setActive] = useState(items[0]?.[0] ?? "");
  useEffect(() => {
    const els = items.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={label} className="print-hide sticky top-[4.5rem] z-20 border-b border-line bg-paper sm:top-20">
      <ul className="container-page flex overflow-x-auto text-sm whitespace-nowrap">
        {items.map(([id, text]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={cn(
                "inline-flex min-h-12 items-center border-b-2 px-3 font-medium transition-colors",
                active === id ? "border-leaf-600 text-heading dark:border-accent" : "border-transparent text-muted hover:text-heading",
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
