"use client";

import Link from "next/link";
import { buttonClasses } from "@/components/ui/primitives";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="py-20">
      <div className="container-page max-w-xl text-center">
        <h1 className="font-serif text-3xl font-semibold text-heading">Something went wrong</h1>
        <p lang="bn" className="mt-2 text-muted">দুঃখিত, পাতাটি লোড করতে সমস্যা হয়েছে।</p>
        <p className="mt-2 text-muted">Please try again. If the problem continues, return to the home page.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={reset} className={buttonClasses("primary")}>
            Try again
          </button>
          <Link href="/" className={buttonClasses("outline")}>
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
