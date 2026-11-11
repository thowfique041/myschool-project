import { Badge } from "./primitives";
import { getI18n } from "@/i18n/server";

/** Marks a block of content as sample/demonstration data. */
export async function SampleTag({ className }: { className?: string }) {
  const { t } = await getI18n();
  return (
    <Badge tone="gold" className={className}>
      {t.common.sample}
    </Badge>
  );
}
