import type { Metadata } from "next";
import { MediaView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Media library" };

export default function Page() {
  return <MediaView />;
}
