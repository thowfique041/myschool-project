"use client";

import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/primitives";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { stripLocale } from "@/i18n/config";

function isActive(rawPath: string, item: NavItem): boolean {
  const pathname = stripLocale(rawPath);
  if (item.href === "/") return pathname === "/";
  // Children that are anchors on another page (e.g. /about#committee) don't make this item active.
  const paths = [item.href, ...(item.children?.filter((c) => !c.href.includes("#")).map((c) => c.href) ?? [])];
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
        className={cn(
          "flex items-center gap-0.5 rounded-md px-1.5 py-2 text-[0.86rem] font-medium whitespace-nowrap transition-colors xl:gap-1 xl:px-2 xl:text-[0.92rem] 2xl:px-3",
          active ? "text-accent" : "text-heading hover:text-accent",
        )}
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
            className={cn("absolute top-full z-50 w-80 pt-2", alignRight ? "right-0" : "left-0")}
          >
            <div className="overflow-hidden rounded-md border border-line border-t-[3px] border-t-navy-700 bg-surface shadow-[var(--shadow-lift)] dark:border-t-navy-300">
              <p className="border-b border-line bg-paper px-5 py-2.5 text-xs font-semibold tracking-wide text-muted uppercase">{item.label}</p>
              <ul className="p-2">
                {item.children?.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block rounded px-3 py-2.5 hover:bg-paper focus-visible:bg-paper"
                    >
                      <span className="block text-sm font-semibold text-heading">{child.label}</span>
                      {child.description && <span className="mt-0.5 block text-xs text-muted">{child.description}</span>}
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
      className="overflow-hidden border-t border-line bg-surface lg:hidden"
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
  brand: { name: string; nameBn: string; logo?: string };
};

export function SiteHeader({ items, ctaLabel, ctaHref, brand }: HeaderProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface transition-shadow",
        scrolled ? "shadow-[0_1px_0_var(--color-line),0_6px_20px_-12px_rgb(15_31_54/0.25)]" : "border-b border-line",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-3 sm:h-20 xl:gap-4">
        <Link href="/" aria-label={`${brand.name}, ${t.common.home}`} className="rounded-md">
          <Logo name={brand.name} nameBn={brand.nameBn} src={brand.logo} />
        </Link>

        <nav aria-label={t.common.mainNav} className="hidden lg:block">
          <ul className="flex items-center">
            {items.map((item, i) => {
              const active = isActive(pathname, item);
              return item.children ? (
                <DesktopDropdown key={item.label} item={item} active={active} alignRight={i >= items.length - 3} />
              ) : (
                <li key={item.href} className={item.href === "/" ? "hidden 2xl:block" : undefined}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-1.5 py-2 text-[0.86rem] font-medium whitespace-nowrap transition-colors xl:px-2 xl:text-[0.92rem] 2xl:px-3",
                      active ? "text-accent" : "text-heading hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href={ctaHref} className={cn(buttonClasses("secondary", "sm"), "max-xl:hidden")}>
            {ctaLabel}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-heading lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} items={items} ctaLabel={ctaLabel} ctaHref={ctaHref} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
