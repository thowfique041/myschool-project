import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Terms of Use",
    alt: "",
    meta: "Terms of use for the Webnion School & College website.",
    updated: "1 November 2026",
    intro: "By using the Webnion School & College website you agree to the terms below.",
    sections: [
      {
        heading: "Information on this website",
        body: [
          "We try to keep notices, dates, fees and results up to date. Official notices on the school notice board and documents issued by the office take priority if anything differs.",
          "Please confirm important admission, examination and fee details with the school office.",
        ],
      },
      {
        heading: "Images and documents",
        body: [
          "Photographs from Unsplash are used under the Unsplash License. Photographers are listed on the Photo Credits page.",
          "Downloadable forms and documents may be printed for school use.",
        ],
      },
      { heading: "Forms", body: ["The admission form prepares a summary to print and submit at the office. An application is complete only after it has been submitted at the office with the required documents."] },
    ],
  },
  bn: {
    title: "ব্যবহারের শর্তাবলি",
    alt: "",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ওয়েবসাইট ব্যবহারের শর্তাবলি।",
    updated: "১ নভেম্বর ২০২৬",
    intro: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ওয়েবসাইট ব্যবহার করলে আপনি নিচের শর্তগুলোতে সম্মত হচ্ছেন।",
    sections: [
      {
        heading: "এই ওয়েবসাইটের তথ্য",
        body: [
          "নোটিশ, তারিখ, ফি ও ফলাফল হালনাগাদ রাখার চেষ্টা করা হয়। কোনো অমিল হলে বিদ্যালয়ের নোটিশ বোর্ডের দাপ্তরিক নোটিশ ও অফিস থেকে দেওয়া কাগজপত্রই চূড়ান্ত।",
          "ভর্তি, পরীক্ষা ও ফি সংক্রান্ত গুরুত্বপূর্ণ তথ্য বিদ্যালয়ের অফিস থেকে নিশ্চিত হয়ে নিন।",
        ],
      },
      {
        heading: "ছবি ও কাগজপত্র",
        body: [
          "আনস্প্ল্যাশের ছবিগুলো আনস্প্ল্যাশ লাইসেন্সের অধীনে ব্যবহার করা হয়েছে। আলোকচিত্রীদের নাম ছবির কৃতজ্ঞতা পাতায় আছে।",
          "ডাউনলোডযোগ্য ফর্ম ও কাগজপত্র বিদ্যালয়ের কাজে প্রিন্ট করা যাবে।",
        ],
      },
      { heading: "ফর্ম", body: ["ভর্তি ফর্মটি প্রিন্ট করে অফিসে জমা দেওয়ার জন্য একটি সারাংশ তৈরি করে। প্রয়োজনীয় কাগজপত্রসহ অফিসে জমা দেওয়ার পরই আবেদন সম্পন্ন হয়।"] },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function TermsPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  return <LegalPage title={c.title} titleBn={c.alt} updated={c.updated} intro={c.intro} sections={c.sections} />;
}
