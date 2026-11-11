import { PageHeader } from "@/components/ui/PageHeader";
import { getI18n } from "@/i18n/server";

type Section = { heading: string; body: string[] };

export async function LegalPage({ title, titleBn, updated, intro, sections }: { title: string; titleBn: string; updated: string; intro: string; sections: Section[] }) {
  const { t } = await getI18n();
  return (
    <>
      <PageHeader title={title} titleBn={titleBn} description={`${t.legal.updated}: ${updated}`} />
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <p className="text-muted">{intro}</p>
          <div className="mt-8 space-y-8">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`s-${i}`}>
                <h2 id={`s-${i}`} className="font-serif text-2xl leading-tight font-semibold text-heading">
                  {s.heading}
                </h2>
                <div className="mt-2 space-y-3 leading-relaxed text-ink">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
