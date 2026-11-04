import type { Metadata } from "next";
import { SettingsView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return <SettingsView />;
}
