import type { Metadata } from "next";
import { ContentEditView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Edit" };

export default function Page() {
  return <ContentEditView />;
}
