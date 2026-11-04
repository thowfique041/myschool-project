"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut, Menu, UserRound, X } from "lucide-react";
import type { NavGroup } from "./nav";
import { signOut } from "./demo-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  groups: NavGroup[];
  badges: Record<string, number>;
  user: { name: string; email: string; roleLabel: string };
  siteName: string;
  children: React.ReactNode;
};

function NavList({ groups, badges, pathname, onNavigate }: { groups: NavGroup[]; badges: Record<string, number>; pathname: string; onNavigate?: () => void }) {
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <nav aria-label="Admin" className="space-y-5 px-3 py-4">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="px-3 text-[0.68rem] font-semibold tracking-wider text-navy-300 uppercase">{g.label}</p>
          <ul className="mt-1.5 space-y-0.5">
            {g.links.map((l) => {
              const active = isActive(l.href);
              const count = l.badge ? badges[l.badge] : 0;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn("flex min-h-9 items-center justify-between gap-2 rounded-lg px-3 text-sm", active ? "bg-white/12 font-semibold text-white" : "text-navy-100 hover:bg-white/6 hover:text-white")}
                  >
                    {l.label}
                    {count > 0 && <span className="rounded-full bg-leaf-500 px-1.5 text-[0.7rem] font-bold text-white">{count}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AdminFrame({ groups, badges, user, siteName, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);

  const brand = (
    <Link href="/admin/dashboard" className="block px-6 py-5">
      <span className="block font-serif text-lg font-semibold text-white">{siteName}</span>
      <span className="block text-xs text-navy-300">Admin panel</span>
    </Link>
  );

  return (
    <div className="min-h-dvh bg-paper lg:grid lg:grid-cols-[16.5rem_1fr]">
      <aside className="sticky top-0 hidden h-dvh flex-col overflow-y-auto bg-navy-950 lg:flex">
        {brand}
        <NavList groups={groups} badges={badges} pathname={pathname} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-navy-950/50" onClick={() => setOpen(false)} />
          <aside id="admin-menu" className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-navy-950">
            <div className="flex items-center justify-between pr-3">
              {brand}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-md p-2 text-navy-100">
                <X aria-hidden className="size-5" />
              </button>
            </div>
            <NavList groups={groups} badges={badges} pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-6">
          <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="admin-menu" className="inline-flex size-10 items-center justify-center rounded-lg border border-line lg:hidden" aria-label="Open menu">
            <Menu aria-hidden className="size-5" />
          </button>
          <a href="/" target="_blank" rel="noopener" className="hidden items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-leaf-700 sm:inline-flex">
            View website <ExternalLink aria-hidden className="size-3.5" />
          </a>
          <div className="flex items-center gap-2">
            <Link href="/admin/profile" className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-paper">
              <UserRound aria-hidden className="size-5 text-navy-500" />
              <span className="text-right leading-tight">
                <span className="block max-w-40 truncate text-sm font-semibold text-navy-900">{user.name}</span>
                <span className="block text-[0.7rem] text-muted">{user.roleLabel}</span>
              </span>
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signOut();
                router.push("/admin");
              }}
            >
              <button type="submit" className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-navy-800 hover:border-navy-300">
                <LogOut aria-hidden className="size-4" /> <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </header>
        <main id="main" className="px-4 py-6 sm:px-6 lg:px-8">
          <p className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-900">
            <strong>Frontend demo.</strong> Changes are saved only in this browser and do not change the public website. Roles are simulated — this is not real security.
          </p>
          {children}
        </main>
      </div>
    </div>
  );
}
