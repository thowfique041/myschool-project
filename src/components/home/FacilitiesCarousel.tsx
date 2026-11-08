"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { title: string; text: string };

/** How many facilities fit side by side at the current width: 1 on phones, 2 on tablets, 3 on desktop. */
function useVisible() {
  const [v, setV] = useState(3);
  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setV(lg.matches ? 3 : md.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);
  return v;
}

/**
 * Shows three facilities at a time over a campus photograph; the arrow buttons
 * move the row one facility left or right and wrap around at the ends.
 */
export function FacilitiesCarousel({ items, labels }: { items: Item[]; labels: { prev: string; next: string; region: string; position: string } }) {
  const visible = useVisible();
  const [start, setStart] = useState(0);
  const last = Math.max(0, items.length - visible);
  const index = Math.min(start, last);
  const prev = () => setStart(index <= 0 ? last : index - 1);
  const next = () => setStart(index >= last ? 0 : index + 1);
  const canMove = items.length > visible;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.region}>
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${(index * 100) / visible}%)` }}
        >
          {items.map((f, i) => {
            const shown = i >= index && i < index + visible;
            return (
              <li
                key={f.title}
                aria-hidden={!shown}
                className={cn(
                  "w-full shrink-0 px-6 py-4 text-center md:w-1/2 lg:w-1/3",
                  // A thin divider between neighbouring columns, as in a figures band.
                  i !== index && "border-l border-white/30",
                )}
              >
                <h3 className="font-serif text-2xl font-semibold sm:text-[1.7rem]">{f.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-white/85">{f.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="sr-only" aria-live="polite">
        {labels.position.replace("{from}", String(index + 1)).replace("{to}", String(Math.min(index + visible, items.length))).replace("{total}", String(items.length))}
      </p>
      {canMove && (
        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={prev} aria-label={labels.prev} className="flex size-11 items-center justify-center rounded-full bg-white text-navy-900 transition-colors hover:bg-beige">
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button type="button" onClick={next} aria-label={labels.next} className="flex size-11 items-center justify-center rounded-full bg-white text-navy-900 transition-colors hover:bg-beige">
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
