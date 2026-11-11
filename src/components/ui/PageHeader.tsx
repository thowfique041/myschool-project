import Link from "@/components/i18n/Link";
import { ChevronRight } from "lucide-react";
import { getI18n } from "@/i18n/server";
import { getNavigation } from "@/content/site-content";
import { navTrail, type Crumb } from "@/lib/nav";

type PageHeaderProps = {
  title: string;
  /** This page's route; the breadcrumb is looked up in the site map from it. */
  path: string;
  /** Detail pages (an article, a notice) add their own title after the listing page. */
  current?: string;
  /** Use "p" when the page renders its own <h1> (e.g. article pages). */
  headingAs?: "h1" | "p";
};

/** Compact title bar for inner pages: breadcrumb and the page title, nothing else. */
export async function PageHeader({ title, path, current, headingAs = "h1" }: PageHeaderProps) {
  const [{ t }, nav] = await Promise.all([getI18n(), getNavigation()]);
  const Heading = headingAs;
  const found = navTrail(nav.items, nav.extras, path);
  const home: Crumb = { label: nav.items.find((i) => i.href === "/")?.label ?? t.common.home, href: "/" };
  // The last crumb is the current page and is not a link.
  const trail: Crumb[] = [home, ...found, ...(current ? [{ label: current }] : [])].map((c, i, all) => (i === all.length - 1 ? { label: c.label } : c));
  return (
    <div className="page-title border-b border-line bg-tint">
      <div className="container-page py-4">
        <nav aria-label={t.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {trail.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex min-w-0 items-center gap-1">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5 shrink-0" />}
                {c.href ? (
                  <Link href={c.href} className="text-heading hover:text-accent hover:underline underline-offset-4">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="line-clamp-1">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Heading className="mt-1 font-serif text-2xl leading-snug font-bold text-heading sm:text-[1.75rem]">{title}</Heading>
      </div>
    </div>
  );
}
