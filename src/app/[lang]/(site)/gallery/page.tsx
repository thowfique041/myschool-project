import Link from "@/components/i18n/Link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DemoNote } from "@/components/ui/primitives";
import { GalleryGrid } from "@/components/explorers/GalleryGrid";
import { getGallery, getSite } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

const copy = {
  en: { title: "Photo Gallery", alt: "ফটো গ্যালারি", crumb: "Campus Life", intro: "Moments from classrooms, labs, the playground and school programmes.", meta: "Campus, classroom, sports, cultural programmes and events at Webnion School & College." },
  bn: { title: "ফটো গ্যালারি", alt: "Photo Gallery", crumb: "ক্যাম্পাস জীবন", intro: "শ্রেণিকক্ষ, ল্যাব, খেলার মাঠ আর বিদ্যালয়ের অনুষ্ঠানের মুহূর্ত।", meta: "ওয়েবনিয়ন স্কুল এন্ড কলেজের ক্যাম্পাস, শ্রেণিকক্ষ, খেলাধুলা, সাংস্কৃতিক অনুষ্ঠান ও আয়োজনের ছবি।" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

export default async function GalleryPage() {
  const [{ items }, site, { t, lang }] = await Promise.all([getGallery(), getSite(), getI18n()]);
  const c = copy[lang];
  return (
    <>
      <PageHeader title={c.title} titleBn={c.alt} crumbs={[{ label: c.crumb }]} description={c.intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          {items.length ? <GalleryGrid items={items} /> : <p className="text-muted">{t.gallery.empty}</p>}
          {site.demoNote && <DemoNote className="mt-8">
            {lang === "bn" ? (
              <>
                এগুলো আনস্প্ল্যাশ (বিনামূল্যের আনস্প্ল্যাশ লাইসেন্স) থেকে নেওয়া প্রতীকী ছবি, বাংলাদেশ ও ভারতের বিভিন্ন বিদ্যালয় ও স্থানে তোলা। এগুলো কাল্পনিক ওয়েবনিয়ন স্কুল এন্ড কলেজের ছবি নয়। দেখুন{" "}
                <Link href="/credits" className="font-semibold underline underline-offset-2">
                  ছবির কৃতজ্ঞতা
                </Link>
                ।
              </>
            ) : (
              <>
                These are representative photographs from Unsplash (free Unsplash License), taken at schools and places in Bangladesh and India. They do not show
                Webnion School &amp; College, which is fictional. See{" "}
                <Link href="/credits" className="font-semibold underline underline-offset-2">
                  photo credits
                </Link>
                .
              </>
            )}
          </DemoNote>}
        </div>
      </section>
    </>
  );
}
