"use client";

import { useI18n } from "@/i18n/client";
import { num } from "@/lib/utils";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { FilterChips } from "./NoticeExplorer";
import type { GalleryCategory, GalleryItem } from "@/types";

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
            className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
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
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-navy-900">
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
          className="absolute top-1/2 left-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-heading shadow hover:bg-surface sm:-left-5"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t.gallery.next}
          className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-heading shadow hover:bg-surface sm:-right-5"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { t } = useI18n();
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const visible = useMemo(() => items.filter((i) => category === "all" || i.category === category), [items, category]);

  const close = useCallback(() => {
    setOpen(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const options = [
    { value: "all" as const, label: t.common.all, count: items.length },
    ...([...new Set(items.map((i) => i.category))] as GalleryCategory[]).map((c) => ({
      value: c,
      label: items.find((i) => i.category === c)?.categoryLabel ?? c,
      count: items.filter((i) => i.category === c).length,
    })),
  ];

  return (
    <div>
      <FilterChips label={t.gallery.filter} options={options} value={category} onChange={setCategory} />
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setOpen(i);
              }}
              className="group relative block w-full overflow-hidden rounded-md bg-paper-dark text-left"
              aria-label={t.gallery.open(item.caption)}
            >
              <span className="relative block aspect-[4/3]">
                <Image
                  src={item.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  unoptimized={item.image.src.endsWith(".svg")}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent px-3 pt-8 pb-2.5 text-[0.82rem] leading-snug font-medium text-white">
                {item.caption}
              </span>
              <span aria-hidden className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-surface/90 text-heading opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {open !== null && visible[open] && <Lightbox items={visible} index={open} onClose={close} onIndex={setOpen} />}
      </AnimatePresence>
    </div>
  );
}
