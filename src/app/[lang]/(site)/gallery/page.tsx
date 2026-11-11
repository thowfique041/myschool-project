import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { PageHeader } from "@/components/ui/PageHeader";
import { FullWidth } from "@/components/portal/Sidebar";
import { getGallery } from "@/content/site-content";
import { getI18n } from "@/i18n/server";
import { num } from "@/lib/utils";

const copy = {
  en: { title: "Gallery", meta: "Photo albums: campus, classroom, sports, activities and events at Webnion School & College.", photos: (n: string) => `${n} photos` },
  bn: { title: "গ্যালারি", meta: "ফটো অ্যালবাম: ওয়েবনিয়ন স্কুল এন্ড কলেজের ক্যাম্পাস, শ্রেণিকক্ষ, খেলাধুলা, কার্যক্রম ও অনুষ্ঠান।", photos: (n: string) => `${n}টি ছবি` },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getI18n();
  return { title: copy[lang].title, description: copy[lang].meta };
}

/** Album index: one album per category. */
export default async function GalleryPage() {
  const [{ items, categories }, { t, lang }] = await Promise.all([getGallery(), getI18n()]);
  const c = copy[lang];
  const albums = Object.entries(categories).map(([key, label]) => ({ key, label, photos: items.filter((i) => i.category === key) }));
  return (
    <>
      <PageHeader path="/gallery" title={c.title} />
      <FullWidth>
        {albums.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((a) => (
              <li key={a.key} className="relative border border-line bg-surface hover:border-navy-700">
                <div className="relative aspect-[16/10] bg-paper-dark">
                  {a.photos[0] && <Image src={a.photos[0].image.src} alt="" fill sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
                </div>
                <div className="px-4 py-3">
                  <h2 className="text-lg font-semibold text-heading">
                    <Link href={`/gallery/${a.key}`} className="hover:text-accent hover:underline after:absolute after:inset-0">
                      {a.label}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted">{c.photos(num(a.photos.length, lang))}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">{t.gallery.empty}</p>
        )}
      </FullWidth>
    </>
  );
}
