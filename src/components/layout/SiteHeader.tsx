"use client";

import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/primitives";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { stripLocale } from "@/i18n/config";

const menuLink = "block px-2.5 py-2.5 text-[0.95rem] font-medium whitespace-nowrap text-white hover:bg-navy-950 xl:px-3.5";

function isActive(rawPath: string, item: NavItem): boolean {
  const pathname = stripLocale(rawPath);
  if (item.href === "/") return pathname === "/";
  const paths = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
  return paths.some((p) => p !== "/" && pathname.startsWith(p));
}

function DesktopDropdown({ item, active, alignRight = false }: { item: NavItem; active: boolean; alignRight?: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuId = useId();
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={cn(menuLink, "flex items-center gap-1", (active || open) && "bg-navy-950")}
      >
        {item.label}
        <ChevronDown aria-hidden className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className={cn("absolute top-full z-50 w-60", alignRight ? "right-0" : "left-0")}
          >
            <div className="border border-line bg-surface text-ink shadow-[var(--shadow-lift)]">
              <ul className="divide-y divide-line">
                {item.children?.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-[0.92rem] text-heading hover:bg-tint focus-visible:bg-tint"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileMenu({ onClose, pathname, items, ctaLabel, ctaHref }: { onClose: () => void; pathname: string; items: NavItem[]; ctaLabel: string; ctaHref: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const { t } = useI18n();
  return (
    <motion.div
      id="mobile-menu"
      initial={reduce ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden border-t border-line bg-surface text-ink lg:hidden"
    >
      <nav aria-label={t.common.mobileNav} className="container-page max-h-[calc(100dvh-5rem)] overflow-y-auto py-3">
        <ul className="divide-y divide-line">
          {items.map((item) => {
            const active = isActive(pathname, item);
            if (!item.children) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn("flex min-h-12 items-center text-base font-medium", active ? "text-accent" : "text-heading")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = expanded === item.label;
            return (
              <li key={item.href}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                  className={cn("flex min-h-12 w-full items-center justify-between text-base font-medium", active ? "text-accent" : "text-heading")}
                >
                  {item.label}
                  <ChevronDown aria-hidden className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={onClose} className="flex min-h-11 items-center border-l-2 border-line-strong pl-4 text-[0.95rem] text-muted hover:text-heading">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
        <Link href={ctaHref} onClick={onClose} className={cn(buttonClasses("secondary"), "mt-4 mb-2 w-full")}>
          {ctaLabel}
        </Link>
        <LanguageSwitcher className="mb-2 w-full justify-center" />
      </nav>
    </motion.div>
  );
}

export type HeaderProps = {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  /** name: in the page language; alt: in the other language; established: "স্থাপিত ১৯৯৮". */
  brand: { name: string; alt: string; established: string; logo?: string };
};

/**
 * Logo banner (not sticky), then the green menu bar, which sticks to the top
 * of the window. On small screens the bar holds the menu button.
 */
export function SiteHeader({ items, ctaLabel, ctaHref, brand }: HeaderProps) {
  const pathname = usePathname();
  const { t, lang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="container-page flex items-center justify-between gap-4 py-3 sm:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            {brand.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logo} alt="" className="h-14 w-auto object-contain sm:h-[4.5rem]" />
            ) : (
              <LogoMark className="h-14 w-auto sm:h-[4.5rem]" />
            )}
            <span className="flex min-w-0 flex-col">
              <span className="brand-name truncate font-serif text-xl leading-tight font-bold text-heading sm:text-3xl">{brand.name}</span>
              <span lang={lang === "bn" ? "en" : "bn"} className="truncate text-sm text-muted sm:text-base" style={{ lineHeight: 1.4 }}>
                {brand.alt}
              </span>
              <span className="text-xs text-accent sm:text-sm" style={{ lineHeight: 1.4 }}>{brand.established}</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Link href={ctaHref} className={cn(buttonClasses("secondary", "sm"), "max-md:hidden")}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </header>

      <div className="menu-bar sticky top-0 z-40 bg-navy-800 text-white shadow-[0_1px_0_rgb(0_0_0/0.08)]">
        <div className="container-page flex min-h-11 items-center justify-between">
          <nav aria-label={t.common.mainNav} className="hidden lg:block">
            <ul className="flex items-center">
              {items.map((item, i) => {
                const active = isActive(pathname, item);
                return item.children ? (
                  <DesktopDropdown key={item.label} item={item} active={active} alignRight={i >= items.length - 3} />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(menuLink, active && "bg-navy-950")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 font-semibold lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            <span>{lang === "bn" ? "মেনু" : "Menu"}</span>
            <span className="sr-only">{mobileOpen ? t.common.closeMenu : t.common.openMenu}</span>
          </button>
          <Link href={ctaHref} className="text-sm font-semibold underline underline-offset-4 md:hidden">
            {ctaLabel}
          </Link>
        </div>
        <AnimatePresence>
          {mobileOpen && <MobileMenu pathname={pathname} items={items} ctaLabel={ctaLabel} ctaHref={ctaHref} onClose={() => setMobileOpen(false)} />}
        </AnimatePresence>
      </div>
    </>
  );
}
