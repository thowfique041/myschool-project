import Link from "next/link";

export default function AdminNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-paper p-8 text-center">
      <h1 className="font-serif text-2xl font-semibold text-heading">Page not found</h1>
      <Link href="/admin/dashboard" className="font-semibold text-accent underline">
        Back to the dashboard
      </Link>
    </main>
  );
}
