import type { NavItem } from "@/types";

export type Crumb = { label: string; href?: string };

const norm = (h: string) => h.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";

/**
 * Breadcrumb trail for a path, taken from the same list as the header menu:
 * a top-level item, or a parent group followed by its child. Pages outside
 * the menu are looked up in `extras`.
 */
export function navTrail(items: NavItem[], extras: NavItem[], path: string): Crumb[] {
  const target = norm(path);
  for (const item of items) {
    const child = item.children?.find((c) => norm(c.href) === target);
    if (child) return [{ label: item.label, href: item.href }, { label: child.label, href: child.href }];
  }
  const top = [...items, ...extras].find((i) => norm(i.href) === target);
  return top ? [{ label: top.label, href: top.href }] : [];
}
