import type { Metadata } from "next";
import { ResultsImportView } from "@/components/admin/views";

export const metadata: Metadata = { title: "Import results" };

export default function Page() {
  return <ResultsImportView />;
}
