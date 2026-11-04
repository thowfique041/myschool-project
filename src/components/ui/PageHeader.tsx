import Link from "@/components/i18n/Link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { getI18n } from "@/i18n/server";

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  titleBn?: string;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  /** Use "p" when the page renders its own <h1> (e.g. article pages). */
  headingAs?: "h1" | "p";
};

/** Title band used at the top of every inner page. */
export async function PageHeader({ title, crumbs = [], children, headingAs = "h1" }: PageHeaderProps) {
  const { t } = await getI18n();
  const Heading = headingAs;
  const trail: Crumb[] = [{ label: t.common.home, href: "/" }, ...crumbs, { label: title }];
  return (
    <section className="border-b-4 border-leaf-600 bg-surface">
      <div className="container-page py-7 sm:py-9">
        <nav aria-label={t.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
            {trail.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-70" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-accent hover:underline underline-offset-4">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Heading className="mt-1 text-[1.9rem] font-bold text-heading sm:text-[2.3rem] sm:leading-tight">
          {title}
        </Heading>
        {children}
      </div>
      <div aria-hidden className="h-1 bg-gradient-to-r from-leaf-600 via-leaf-500 to-navy-700" />
    </section>
  );
}
