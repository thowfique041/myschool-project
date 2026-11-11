"use client";

import { useI18n } from "@/i18n/client";
import { num } from "@/lib/utils";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types";

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const prev = useCallback(() => onIndex((index - 1 + items.length) % items.length), [index, items.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    closeRef.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        // keep focus inside the dialog
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.gallery.imageOf(index + 1, items.length, item.caption)}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <p className="text-sm text-navy-200">
            {num(index + 1, lang)} / {num(items.length, lang)} · {item.categoryLabel ?? item.category}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.gallery.close}
            className="inline-flex size-11 items-center justify-center bg-white/10 hover:bg-white/20"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={item.id}
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.18 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
              <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 64rem, 100vw" unoptimized={item.image.src.endsWith(".svg")} className="object-contain" />
            </div>
            <figcaption className="mt-3 text-white">
              <span className="font-semibold">{item.caption}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <button
          type="button"
          onClick={prev}
          aria-label={t.gallery.prev}
          className="absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-surface/90 text-heading hover:bg-surface sm:-left-5"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t.gallery.next}
          className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center bg-surface/90 text-heading hover:bg-surface sm:-right-5"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}

/** One album: a uniform grid of photos with captions; a photo opens in a lightbox. */
export function AlbumGrid({ items }: { items: GalleryItem[] }) {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id} className="border border-line bg-surface">
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              className="block w-full text-left"
              aria-label={t.gallery.open(item.caption)}
            >
              <span className="relative block aspect-[4/3] bg-paper-dark">
                <Image src={item.image.src} alt="" fill sizes="(min-width: 1024px) 18rem, (min-width: 768px) 33vw, 50vw" unoptimized={item.image.src.endsWith(".svg")} className="object-cover" />
              </span>
              <span className="block px-2.5 py-2 text-sm leading-snug text-ink">{item.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>{open !== null && items[open] && <Lightbox items={items} index={open} onClose={close} onIndex={setOpen} />}</AnimatePresence>
    </div>
  );
}
