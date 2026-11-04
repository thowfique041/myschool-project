import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function PageTitle({ title, description, back, actions }: { title: string; description?: string; back?: { href: string; label: string }; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {back && (
          <Link href={back.href} className="mb-1 inline-flex items-center gap-1 text-sm font-semibold text-subheading hover:text-accent">
            <ChevronLeft aria-hidden className="size-4" /> {back.label}
          </Link>
        )}
        <h1 className="font-serif text-2xl font-semibold text-heading">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
