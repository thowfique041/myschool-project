import type { Metadata } from "next";
import { ContentListView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Content" };

export default function Page() {
  return <ContentListView />;
}
