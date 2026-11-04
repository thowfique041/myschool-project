import type { Metadata } from "next";
import { RolesView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Roles & permissions" };

export default function Page() {
  return <RolesView />;
}
