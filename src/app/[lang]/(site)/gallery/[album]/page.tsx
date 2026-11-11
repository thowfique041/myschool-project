import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { FullWidth } from "@/components/portal/Sidebar";
import { AlbumGrid } from "@/components/explorers/AlbumGrid";
import { getGallery } from "@/content/site-content";
import { getI18n } from "@/i18n/server";

export async function generateStaticParams() {
  const { categories } = await getGallery();
  const keys = Object.keys(categories);
  return keys.length ? keys.map((album) => ({ album })) : [{ album: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery/[album]">): Promise<Metadata> {
  const { album } = await params;
  const { categories } = await getGallery();
  return { title: categories[album] ?? "404" };
}

export default async function AlbumPage({ params }: PageProps<"/[lang]/gallery/[album]">) {
  const { album } = await params;
  const [{ items, categories }, { lang }] = await Promise.all([getGallery(), getI18n()]);
  const label = categories[album];
  if (!label) notFound();
  return (
    <>
      <PageHeader path="/gallery" current={label} title={label} />
      <FullWidth>
        <AlbumGrid items={items.filter((i) => i.category === album)} />
        <p>
          <Link href="/gallery" className="text-sm font-semibold text-accent underline underline-offset-4 hover:text-heading">
            {lang === "bn" ? "সকল অ্যালবাম" : "All albums"}
          </Link>
        </p>
      </FullWidth>
    </>
  );
}
