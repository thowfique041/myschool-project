import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { images } from "@/data/images";
import type { ImageAsset } from "@/types";
import { getI18n } from "@/i18n/server";

const altBn: Record<string, string> = {
  "A large white college building behind a green lawn and trees in Sylhet": "সিলেটে সবুজ মাঠ ও গাছের পেছনে একটি বড় সাদা কলেজ ভবন",
  "A classroom full of students sitting at their desks": "ডেস্কে বসা শিক্ষার্থীতে ভরা একটি শ্রেণিকক্ষ",
  "A group of young children in school uniform sitting in a classroom": "শ্রেণিকক্ষে স্কুলের পোশাক পরে বসে থাকা একদল ছোট শিশু",
  "A teacher and a student conducting a science experiment in a classroom": "শ্রেণিকক্ষে শিক্ষক ও এক শিক্ষার্থী বিজ্ঞানের পরীক্ষা করছেন",
  "Students working at desktop computers in a bright school computer lab": "আলো-ঝলমলে কম্পিউটার ল্যাবে ডেস্কটপ কম্পিউটারে কাজ করছে শিক্ষার্থীরা",
  "A large library with long shelves filled with books": "লম্বা তাকভর্তি বইসহ একটি বড় পাঠাগার",
  "Young people playing cricket in an open field during the day": "দিনের বেলা খোলা মাঠে ক্রিকেট খেলছে তরুণেরা",
  "Young people playing a game in an open field": "খোলা মাঠে খেলায় মেতে আছে তরুণেরা",
  "A group of school children posing together for a photograph": "ছবি তোলার জন্য একসঙ্গে দাঁড়ানো একদল স্কুলশিক্ষার্থী",
  "A girl in school uniform standing to answer in class while her classmates look on": "সহপাঠীরা তাকিয়ে আছে, আর স্কুলের পোশাক পরা এক ছাত্রী দাঁড়িয়ে উত্তর দিচ্ছে",
  "Two young girls studying together at a classroom desk": "শ্রেণিকক্ষের ডেস্কে একসঙ্গে পড়ছে দুই ছোট মেয়ে",
  "Two young boys sitting at a desk reading a book": "ডেস্কে বসে বই পড়ছে দুই ছোট ছেলে",
  "A group of children working together at a table": "একটি টেবিলে একসঙ্গে কাজ করছে একদল শিশু",
  "Two young children in school uniforms standing outdoors": "বাইরে দাঁড়িয়ে থাকা স্কুলের পোশাক পরা দুই শিশু",
  "A teacher showing a young student a science experiment in a lab": "ল্যাবে এক ছোট শিক্ষার্থীকে বিজ্ঞানের পরীক্ষা দেখাচ্ছেন শিক্ষক",
  "A person holding the green and red flag of Bangladesh": "বাংলাদেশের লাল-সবুজ পতাকা হাতে একজন",
  "A young woman speaking into a microphone": "মাইক্রোফোনে কথা বলছেন এক তরুণী",
  "Rolling hills covered with green tea plantations": "সবুজ চা-বাগানে ঢাকা ঢেউখেলানো টিলা",
};
const placeBn: Record<string, string> = {
  "MC College, Sylhet, Bangladesh": "এমসি কলেজ, সিলেট, বাংলাদেশ",
  "Chinsurah, West Bengal, India": "চুঁচুড়া, পশ্চিমবঙ্গ, ভারত",
  "Chennai, India": "চেন্নাই, ভারত",
  "Alibag, India": "আলিবাগ, ভারত",
};

const copy = {
  en: {
    title: "Photo Credits",
    alt: "ছবির কৃতজ্ঞতা",
    meta: "Sources and photographers of the photographs used on the Webnion School & College website.",
    intro: "Photographs from Unsplash are used under the Unsplash License. The home page photo was supplied by the site owner.",
    note: "Licence details:",
    by: (a: string) => `Photo by ${a}`,
    listed: "Photographer listed on Unsplash",
    view: "View",
    viewSr: " on Unsplash (opens in a new tab)",
  },
  bn: {
    title: "ছবির কৃতজ্ঞতা",
    alt: "Photo Credits",
    meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ওয়েবসাইটে ব্যবহৃত ছবির উৎস ও আলোকচিত্রী।",
    intro: "আনস্প্ল্যাশের ছবিগুলো আনস্প্ল্যাশ লাইসেন্সের অধীনে ব্যবহার করা হয়েছে। হোম পাতার ছবিটি সাইটের মালিক দিয়েছেন।",
    note: "লাইসেন্সের বিস্তারিত:",
    by: (a: string) => `ছবি: ${a}`,
    listed: "আলোকচিত্রীর নাম আনস্প্ল্যাশে আছে",
    view: "দেখুন",
    viewSr: " আনস্প্ল্যাশে (নতুন ট্যাবে খুলবে)",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function CreditsPage() {
  const { lang } = await getI18n();
  const c = copy[lang];
  const list: ImageAsset[] = Object.values(images).filter((img: ImageAsset) => Boolean(img.credit));
  return (
    <>
      <PageHeader path="/credits" title={c.title} />
      <section className="py-6 sm:py-8">
        <div className="container-page max-w-4xl">
          <p className="text-ink">{c.intro}</p>
          <p className="mt-2 text-sm text-muted">
            {c.note}{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
              unsplash.com/license
            </a>
            .
          </p>
          <ul className="mt-5 divide-y divide-line border border-line bg-surface">
            {list.map((img) => (
              <li key={img.src} className="flex items-center gap-4 p-4">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden bg-paper-dark">
                  <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="text-ink">{lang === "bn" ? (altBn[img.alt] ?? img.alt) : img.alt}</p>
                  <p className="text-muted">
                    {img.credit?.author ? c.by(img.credit.author) : c.listed}
                    {img.credit?.location ? ` · ${lang === "bn" ? (placeBn[img.credit.location] ?? img.credit.location) : img.credit.location}` : ""}
                  </p>
                </div>
                {img.credit && (
                  <a href={img.credit.page} target="_blank" rel="noopener noreferrer" className="shrink-0 text-sm font-semibold text-accent hover:underline underline-offset-4">
                    {c.view}
                    <span className="sr-only">{c.viewSr}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
