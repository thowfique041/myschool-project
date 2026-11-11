import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getI18n } from "@/i18n/server";
import { CampusPart } from "@/components/about/AboutParts";

const copy = {
  en: { title: "Infrastructure", meta: "Buildings, laboratories, library, playground and other facilities." },
  bn: { title: "অবকাঠামো", meta: "ভবন, গবেষণাগার, পাঠাগার, খেলার মাঠ ও অন্যান্য সুযোগ-সুবিধা।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function InfrastructurePage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/about/infrastructure" />
      <CampusPart />
    </>
  );
}
