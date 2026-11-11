import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { WithSidebar } from "@/components/portal/Sidebar";
import { getI18n } from "@/i18n/server";
import { HistoryPart, MissionPart, OverviewPart } from "@/components/about/AboutParts";

const copy = {
  en: { title: "History", meta: "How the school began in 1998 and how it has grown: overview, mission, values and milestones." },
  bn: { title: "ইতিহাস", meta: "১৯৯৮ সালে বিদ্যালয়ের শুরু ও পথচলা: পরিচিতি, লক্ষ্য, মূল্যবোধ ও উল্লেখযোগ্য ঘটনা।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function HistoryPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/about/history" />
      <WithSidebar>
      <OverviewPart />
      <MissionPart />
      <HistoryPart />
      </WithSidebar>
    </>
  );
}
