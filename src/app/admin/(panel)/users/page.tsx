import type { Metadata } from "next";
import { UsersView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Admin users" };

export default function Page() {
  return <UsersView />;
}
