import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Privacy Policy",
    alt: "",
    meta: "How the Webnion School & College website handles information.",
    updated: "1 November 2026",
    intro: "This page explains what information the Webnion School & College website uses and how.",
    sections: [
      {
        heading: "What this website collects",
        body: [
          "The website does not collect or store personal information on a server. The result search and the admission form are checked in your browser.",
          "The contact form opens your own email app with your message addressed to the school office. Your email is then handled like any other email you send to the school.",
          "The website does not use analytics or advertising trackers. It remembers only your light/dark choice and language in your own browser.",
        ],
      },
      {
        heading: "Information given at the office",
        body: [
          "Details submitted on paper at the school office (for example a student's name, date of birth and a guardian's phone number) are used only for admission and school records and are seen only by authorised staff.",
          "Guardians can ask the office to correct their information at any time.",
        ],
      },
      { heading: "Links to other websites", body: ["Social media links open the platforms' pages. Those services have their own privacy policies."] },
      { heading: "Contact", body: ["Questions about this policy can be sent to the school office through the contact page."] },
    ],
  },
  bn: {
    title: "গোপনীয়তা নীতি",
    alt: "",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ওয়েবসাইট কীভাবে তথ্য ব্যবহার করে।",
    updated: "১ নভেম্বর ২০২৬",
    intro: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ওয়েবসাইট কোন তথ্য কীভাবে ব্যবহার করে, এই পাতায় তা জানানো হলো।",
    sections: [
      {
        heading: "এই ওয়েবসাইট কী তথ্য নেয়",
        body: [
          "ওয়েবসাইটটি কোনো সার্ভারে ব্যক্তিগত তথ্য সংগ্রহ বা সংরক্ষণ করে না। ফলাফল অনুসন্ধান ও ভর্তি ফর্ম আপনার ব্রাউজারেই যাচাই হয়।",
          "যোগাযোগ ফর্ম আপনার নিজের ইমেইল অ্যাপে বিদ্যালয়ের অফিসের ঠিকানায় বার্তাটি তৈরি করে খোলে। এরপর সেটি বিদ্যালয়ে পাঠানো অন্য যেকোনো ইমেইলের মতোই বিবেচিত হয়।",
          "ওয়েবসাইটটি কোনো অ্যানালিটিক্স বা বিজ্ঞাপন ট্র্যাকার ব্যবহার করে না। শুধু আপনার লাইট/ডার্ক মোড ও ভাষার পছন্দ আপনার নিজের ব্রাউজারে মনে রাখে।",
        ],
      },
      {
        heading: "অফিসে দেওয়া তথ্য",
        body: [
          "বিদ্যালয়ের অফিসে কাগজে জমা দেওয়া তথ্য (যেমন শিক্ষার্থীর নাম, জন্ম তারিখ ও অভিভাবকের ফোন নম্বর) শুধু ভর্তি ও বিদ্যালয়ের রেকর্ডের কাজে ব্যবহৃত হয় এবং শুধু দায়িত্বপ্রাপ্ত কর্মীরা তা দেখতে পারেন।",
          "অভিভাবকেরা যেকোনো সময় অফিসে নিজেদের তথ্য সংশোধনের অনুরোধ করতে পারেন।",
        ],
      },
      { heading: "অন্য ওয়েবসাইটের লিংক", body: ["সামাজিক মাধ্যমের লিংকগুলো সংশ্লিষ্ট প্ল্যাটফর্মের পাতা খোলে। ওই সেবাগুলোর নিজস্ব গোপনীয়তা নীতি আছে।"] },
      { heading: "যোগাযোগ", body: ["এই নীতি নিয়ে প্রশ্ন যোগাযোগ পাতা থেকে বিদ্যালয়ের অফিসে পাঠানো যায়।"] },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function PrivacyPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return <LegalPage title={c.title} titleBn={c.alt} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
