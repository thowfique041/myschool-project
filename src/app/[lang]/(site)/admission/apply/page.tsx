import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { AdmissionForm } from "@/components/forms/AdmissionForm";
import { Box } from "@/components/portal/Box";
import { FullWidth } from "@/components/portal/Sidebar";
import { getFaqs, getSetting } from "@/content/site-content";
import type { AdmissionContent } from "@/components/home/types";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Online application",
    meta: "Admission inquiry and application form.",
    form: "Admission inquiry / application form",
    text: "Fill in the form, then print the summary and submit it at the school office with the required documents.",
    faq: "Admission FAQ",
  },
  bn: {
    title: "অনলাইন আবেদন",
    meta: "ভর্তি জিজ্ঞাসা ও আবেদন ফরম।",
    form: "ভর্তি জিজ্ঞাসা / আবেদন ফরম",
    text: "ফর্মটি পূরণ করে সারাংশ প্রিন্ট করুন, তারপর প্রয়োজনীয় কাগজপত্রসহ বিদ্যালয়ের অফিসে জমা দিন।",
    faq: "ভর্তি সংক্রান্ত প্রশ্নোত্তর",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function AdmissionApplyPage() {
  const [a, faqs, { lang }] = await Promise.all([getSetting<AdmissionContent>("admission"), getFaqs(), getI18n()]);
  const c = copy[lang];
  return (
    <>
      <PageHeader path="/admission" current={c.title} title={c.title} />
      <FullWidth narrow>
        <Box id="apply-h" title={c.form}>
          <p className="mb-5 text-ink">{c.text}</p>
          <AdmissionForm classOptions={a.classOptions} open={a.open} />
        </Box>
        <Box id="adm-faq" title={c.faq}>
          <Accordion items={faqs.filter((f) => f.topic === "admission" || f.topic === "fees")} />
        </Box>
      </FullWidth>
    </>
  );
}
