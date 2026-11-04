import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Privacy Policy",
    alt: "গোপনীয়তা নীতি",
    meta: "How the Webnion School & College demonstration website handles information.",
    updated: "1 November 2026",
    intro: "This is a demonstration website for a fictional institution. It has no backend, so nothing you type into its forms is sent or stored.",
    sections: [
      {
        heading: "What this website collects",
        body: [
          "The contact form, admission form and result search run entirely in your browser. When you submit them, the website only shows a confirmation on screen; no data leaves your device.",
          "The website does not use analytics or advertising trackers. It remembers only your light/dark choice in your own browser.",
        ],
      },
      {
        heading: "If this were a live school website",
        body: [
          "A real institution would explain which details it collects through forms (for example the student's name, date of birth and a guardian's phone number), why it needs them, how long it keeps them, and who can see them.",
          "It would also explain how guardians can ask for their information to be corrected or deleted.",
        ],
      },
      { heading: "Links to other websites", body: ["Social media links open the platforms' home pages. Those services have their own privacy policies."] },
      { heading: "Contact", body: ["Questions about this demonstration can be sent through the contact page. The address uses the reserved .example domain and is not monitored."] },
    ],
  },
  bn: {
    title: "গোপনীয়তা নীতি",
    alt: "Privacy Policy",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ডেমো ওয়েবসাইট কীভাবে তথ্য ব্যবহার করে।",
    updated: "১ নভেম্বর ২০২৬",
    intro: "এটি একটি কাল্পনিক প্রতিষ্ঠানের ডেমো ওয়েবসাইট। এর কোনো ব্যাকএন্ড নেই, তাই ফর্মে যা লেখেন তা কোথাও পাঠানো বা সংরক্ষণ করা হয় না।",
    sections: [
      {
        heading: "এই ওয়েবসাইট কী তথ্য নেয়",
        body: [
          "যোগাযোগ ফর্ম, ভর্তি ফর্ম ও ফলাফল অনুসন্ধান পুরোপুরি আপনার ব্রাউজারেই চলে। জমা দিলে ওয়েবসাইট শুধু পর্দায় একটি নিশ্চিতকরণ দেখায়; কোনো তথ্য আপনার ডিভাইসের বাইরে যায় না।",
          "ওয়েবসাইটটি কোনো অ্যানালিটিক্স বা বিজ্ঞাপন ট্র্যাকার ব্যবহার করে না। শুধু আপনার লাইট/ডার্ক মোডের পছন্দ আপনার নিজের ব্রাউজারে মনে রাখে।",
        ],
      },
      {
        heading: "এটি আসল বিদ্যালয়ের ওয়েবসাইট হলে",
        body: [
          "একটি আসল প্রতিষ্ঠান জানাত ফর্মের মাধ্যমে কোন তথ্য নেয় (যেমন শিক্ষার্থীর নাম, জন্ম তারিখ ও অভিভাবকের ফোন নম্বর), কেন নেয়, কতদিন রাখে এবং কারা দেখতে পারে।",
          "অভিভাবকেরা কীভাবে নিজেদের তথ্য সংশোধন বা মুছে ফেলার অনুরোধ করতে পারেন, সেটিও জানাত।",
        ],
      },
      { heading: "অন্য ওয়েবসাইটের লিংক", body: ["সামাজিক মাধ্যমের লিংকগুলো সংশ্লিষ্ট প্ল্যাটফর্মের মূল পাতা খোলে। ওই সেবাগুলোর নিজস্ব গোপনীয়তা নীতি আছে।"] },
      { heading: "যোগাযোগ", body: ["এই ডেমো নিয়ে প্রশ্ন যোগাযোগ পাতা থেকে পাঠানো যায়। ঠিকানাটি সংরক্ষিত .example ডোমেইনের, তাই কেউ তা দেখে না।"] },
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
