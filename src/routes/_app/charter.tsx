import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loc, useI18n } from "@/lib/i18n";
import { listRegulations } from "@/lib/server/api";

export const Route = createFileRoute("/_app/charter")({ component: CharterPage });

function CharterPage() {
  const { t, locale } = useI18n();
  const q = useQuery({ queryKey: ["regulations"], queryFn: () => listRegulations() });
  return (
    <div>
      <PageHeader title={t("navCharter")} lead={t("charterLead")} />
      <div className="flex flex-col gap-4">
        {(q.data ?? []).map((r) => (
          <Card key={String(r.id)}>
            <CardHeader>
              <p className="text-xs font-mono text-subtle">{String(r.chapter).padStart(2, "0")}</p>
              <CardTitle>{loc(locale, String(r.title_ar), String(r.title_en))}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted">{loc(locale, String(r.body_ar), String(r.body_en))}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
