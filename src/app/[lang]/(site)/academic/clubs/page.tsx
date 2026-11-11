import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Clubs & Co-curricular", meta: "Clubs, scouts, sports and co-curricular activities." },
  bn: { title: "ক্লাব ও সহশিক্ষা", meta: "ক্লাব, স্কাউট, খেলাধুলা ও সহশিক্ষা কার্যক্রম।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function ClubsPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/academic/clubs" />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="border border-dashed border-line-strong bg-surface px-6 py-10 text-center text-muted">{lang === "bn" ? "এই পাতার তথ্য শিগগির যোগ করা হবে।" : "Information for this page will be added soon."}</p>
        </div>
      </section>
    </>
  );
}
