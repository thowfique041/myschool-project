import type { Metadata } from "next";
import { DashboardView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Dashboard" };

export default function Page() {
  return <DashboardView />;
}
