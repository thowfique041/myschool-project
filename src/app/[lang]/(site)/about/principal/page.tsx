import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getI18n } from "@/i18n/server";
import { PrincipalPart } from "@/components/about/AboutParts";

const copy = {
  en: { title: "Principal’s Message", meta: "A message from the principal to students and guardians." },
  bn: { title: "অধ্যক্ষের বাণী", meta: "শিক্ষার্থী ও অভিভাবকদের উদ্দেশে অধ্যক্ষের বাণী।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function PrincipalPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/about/principal" />
      <PrincipalPart />
    </>
  );
}
