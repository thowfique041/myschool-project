"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/primitives";
import { navigation } from "@/data/site";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  const paths = [item.href, ...(item.children?.map((c) => c.href.split("#")[0]) ?? [])];
  return paths.some((p) => p !== "/" && pathname.startsWith(p));
}

function DesktopDropdown({ item, active }: { item: NavItem; active: boolean }) {
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
          "flex items-center gap-1 rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors xl:px-3",
          active ? "text-leaf-700" : "text-navy-800 hover:text-leaf-700",
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
            className="absolute left-0 top-full z-50 w-64 pt-2"
          >
            <ul className="overflow-hidden rounded-lg border border-line bg-white py-1.5 shadow-[var(--shadow-lift)]">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 hover:bg-paper focus-visible:bg-paper"
                  >
                    <span className="block text-sm font-semibold text-navy-900">{child.label}</span>
                    {child.description && <span className="block text-xs text-muted">{child.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduce = useReducedMotion();
  return (
    <motion.div
      id="mobile-menu"
      initial={reduce ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden border-t border-line bg-white lg:hidden"
    >
      <nav aria-label="Mobile" className="container-page max-h-[calc(100dvh-5rem)] overflow-y-auto py-3">
        <ul className="divide-y divide-line">
          {navigation.map((item) => {
            const active = isActive(pathname, item);
            if (!item.children) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn("flex min-h-12 items-center text-base font-medium", active ? "text-leaf-700" : "text-navy-900")}
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
                  className={cn("flex min-h-12 w-full items-center justify-between text-base font-medium", active ? "text-leaf-700" : "text-navy-900")}
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
                          <Link href={child.href} onClick={onClose} className="flex min-h-11 items-center border-l-2 border-leaf-200 pl-4 text-[0.95rem] text-muted hover:text-navy-900">
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
        <Link href="/admission#apply" onClick={onClose} className={cn(buttonClasses("secondary"), "mt-4 mb-2 w-full")}>
          Apply for Admission 2027
        </Link>
      </nav>
    </motion.div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
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
        "sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 transition-shadow",
        scrolled ? "shadow-[0_1px_0_var(--color-line),0_6px_20px_-12px_rgb(15_31_54/0.25)]" : "border-b border-line",
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
        <Link href="/" aria-label="Webnion School & College — home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {navigation.map((item) => {
              const active = isActive(pathname, item);
              return item.children ? (
                <DesktopDropdown key={item.label} item={item} active={active} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-2.5 py-2 text-[0.92rem] font-medium transition-colors xl:px-3",
                      active ? "text-leaf-700" : "text-navy-800 hover:text-leaf-700",
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
          <Link href="/admission#apply" className={cn(buttonClasses("secondary", "sm"), "hidden xl:inline-flex")}>
            Apply Now
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy-900 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
