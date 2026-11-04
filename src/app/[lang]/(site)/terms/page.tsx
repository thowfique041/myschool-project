import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/LegalPage";
import { getI18n } from "@/i18n/server";

const copy = {
  en: {
    title: "Terms of Use",
    alt: "ব্যবহারের শর্তাবলি",
    meta: "Terms of use for the Webnion School & College demonstration website.",
    updated: "1 November 2026",
    intro: "Webnion School & College is fictional. This website is a frontend portfolio and client-presentation project.",
    sections: [
      {
        heading: "Sample content",
        body: [
          "All names, notices, results, fees, dates, contact details and statistics are illustrative. They do not describe any real school, person or examination result.",
          "Do not rely on this website for admission, examination or fee decisions.",
        ],
      },
      {
        heading: "Images and documents",
        body: [
          "Photographs are free images from Unsplash used under the Unsplash License. They are representative and do not show Webnion School & College. Photographers are listed on the Photo Credits page.",
          "Downloadable PDFs are short placeholder documents marked as samples.",
        ],
      },
      { heading: "Forms", body: ["Forms validate input and show confirmation messages in the browser only. They do not submit to a school server and do not create any application or record."] },
    ],
  },
  bn: {
    title: "ব্যবহারের শর্তাবলি",
    alt: "Terms of Use",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ডেমো ওয়েবসাইট ব্যবহারের শর্তাবলি।",
    updated: "১ নভেম্বর ২০২৬",
    intro: "ওয়েবনিয়ন স্কুল এন্ড কলেজ একটি কাল্পনিক প্রতিষ্ঠান। এই ওয়েবসাইটটি একটি ফ্রন্টএন্ড পোর্টফোলিও ও ক্লায়েন্ট-উপস্থাপনা প্রকল্প।",
    sections: [
      {
        heading: "নমুনা বিষয়বস্তু",
        body: [
          "সব নাম, নোটিশ, ফলাফল, ফি, তারিখ, যোগাযোগের তথ্য ও পরিসংখ্যান প্রতীকী। এগুলো কোনো আসল বিদ্যালয়, ব্যক্তি বা পরীক্ষার ফলাফল নয়।",
          "ভর্তি, পরীক্ষা বা ফি সংক্রান্ত সিদ্ধান্তের জন্য এই ওয়েবসাইটের ওপর নির্ভর করবেন না।",
        ],
      },
      {
        heading: "ছবি ও কাগজপত্র",
        body: [
          "ছবিগুলো আনস্প্ল্যাশ লাইসেন্সের অধীনে আনস্প্ল্যাশ থেকে নেওয়া বিনামূল্যের ছবি। এগুলো প্রতীকী, ওয়েবনিয়ন স্কুল এন্ড কলেজের নয়। আলোকচিত্রীদের নাম ছবির কৃতজ্ঞতা পাতায় আছে।",
          "ডাউনলোডযোগ্য পিডিএফগুলো নমুনা হিসেবে চিহ্নিত ছোট কাগজপত্র।",
        ],
      },
      { heading: "ফর্ম", body: ["ফর্মগুলো শুধু ব্রাউজারে তথ্য যাচাই করে নিশ্চিতকরণ দেখায়। এগুলো কোনো বিদ্যালয় সার্ভারে জমা হয় না এবং কোনো আবেদন বা রেকর্ড তৈরি করে না।"] },
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
