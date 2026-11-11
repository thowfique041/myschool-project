import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { GalleryGrid } from "@/components/explorers/GalleryGrid";
import { getGallery } from "@/content/site-content";
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
  const [{ items }, { t, lang }] = await Promise.all([getGallery(), getI18n()]);
  const c = copy[lang];
  return (
    <>
      <PageHeader path="/gallery" title={c.title} titleBn={c.alt} description={c.intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page">
          {items.length ? <GalleryGrid items={items} /> : <p className="text-muted">{t.gallery.empty}</p>}

        </div>
      </section>
    </>
  );
}
