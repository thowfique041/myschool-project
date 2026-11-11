import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getI18n } from "@/i18n/server";
import { StaffIntroPart } from "@/components/about/AboutParts";

const copy = {
  en: { title: "Staff", meta: "Office, library, laboratory and support staff." },
  bn: { title: "কর্মচারীবৃন্দ", meta: "অফিস, পাঠাগার, গবেষণাগার ও সহায়ক কর্মচারীবৃন্দ।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function StaffPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/staff" />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl space-y-6">
          <StaffIntroPart />
          <p className="border border-dashed border-line-strong bg-surface px-6 py-10 text-center text-muted">{lang === "bn" ? "কর্মচারীদের তালিকা শিগগির যোগ করা হবে।" : "The staff list will be added soon."}</p>
        </div>
      </section>
    </>
  );
}
