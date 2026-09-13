import { Badge } from "@/components/ui/badge";
import { bandFor, type GradeBand } from "@/lib/grades";
import { useI18n } from "@/lib/i18n";

const variant: Record<Exclude<GradeBand, "enrolled">, "bad" | "muted" | "info" | "good" | "default"> = {
  fail: "bad",
  pass: "muted",
  good: "info",
  vgood: "good",
  excellent: "default",
};

export function GradeBadge({ total }: { total: number | null | undefined }) {
  const { t } = useI18n();
  const b = bandFor(total);
  if (b === "enrolled") return <Badge variant="outline">{t("enrolled")}</Badge>;
  return (
    <Badge variant={variant[b]}>
      {total != null ? `${total} · ${t(b)}` : t(b)}
    </Badge>
  );
}
