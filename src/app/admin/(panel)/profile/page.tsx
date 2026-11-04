import type { Metadata } from "next";
import { ProfileView } from "@/components/admin/views";

export const metadata: Metadata = { title: "My profile" };

export default function Page() {
  return <ProfileView />;
}
