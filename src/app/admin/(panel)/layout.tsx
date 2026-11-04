import { Suspense } from "react";
import { AdminShell } from "@/components/admin/views";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>{children}</Suspense>
    </AdminShell>
  );
}
