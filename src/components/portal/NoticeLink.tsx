import Link from "@/components/i18n/Link";
import type { ReactNode } from "react";
import type { Notice } from "@/types";

/** A notice title opens its PDF when there is one, otherwise the notice page. */
export function NoticeLink({ notice, className, children }: { notice: Notice; className?: string; children?: ReactNode }) {
  if (notice.attachment?.href) {
    return (
      <a href={notice.attachment.href} target="_blank" rel="noopener" className={className}>
        {children ?? notice.title}
      </a>
    );
  }
  return (
    <Link href={`/notices/${notice.slug}`} className={className}>
      {children ?? notice.title}
    </Link>
  );
}
