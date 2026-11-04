import type { ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <LogoMark className="h-14 w-auto" />
          <h1 className="mt-4 font-serif text-2xl font-semibold text-heading">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">{children}</div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-semibold text-heading hover:text-accent">
            ← Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}

export function EnvMissing() {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-ink">
      <p className="font-semibold text-danger">The admin panel needs a database before anyone can sign in.</p>
      <p>Add these environment variables to the hosting project (Vercel → Settings → Environment Variables), then redeploy:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          <code>MONGODB_URI</code>: MongoDB Atlas connection string
        </li>
        <li>
          <code>ADMIN_SETUP_TOKEN</code>: a long random secret used once to create the first Super Admin
        </li>
        <li>
          <code>BLOB_READ_WRITE_TOKEN</code>: Vercel Blob token for image and file uploads
        </li>
      </ul>
      <p className="text-muted">Until then, the public website shows its built-in content.</p>
    </div>
  );
}
