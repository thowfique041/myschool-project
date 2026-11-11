import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Chairman’s Message", meta: "A message from the chairman of the governing body." },
  bn: { title: "সভাপতির বাণী", meta: "পরিচালনা পর্ষদের সভাপতির বাণী।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function ChairmanPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} path="/about/chairman" />
      <section className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="border border-dashed border-line-strong bg-surface px-6 py-10 text-center text-muted">{lang === "bn" ? "এই পাতার তথ্য শিগগির যোগ করা হবে।" : "Information for this page will be added soon."}</p>
        </div>
      </section>
    </>
  );
}
