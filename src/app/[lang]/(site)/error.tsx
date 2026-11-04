"use client";

import Link from "@/components/i18n/Link";
import { buttonClasses } from "@/components/ui/primitives";
import { useI18n } from "@/i18n/client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useI18n();
  return (
    <section className="py-20">
      <div className="container-page max-w-xl text-center">
        <h1 className="font-serif text-3xl font-semibold text-heading">{t.error.title}</h1>
        <p className="mt-2 text-muted">{t.error.text}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={reset} className={buttonClasses("primary")}>
            {t.error.retry}
          </button>
          <Link href="/" className={buttonClasses("outline")}>
            {t.common.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
