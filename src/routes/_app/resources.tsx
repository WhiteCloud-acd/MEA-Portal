import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { listResources } from "@/lib/server/api";

export const Route = createFileRoute("/_app/resources")({ component: ResourcesPage });

function kindKey(k: string) {
  if (k === "software") return "software";
  if (k === "data") return "data";
  if (k === "lab") return "labKind";
  return "reading";
}

function ResourcesPage() {
  const { t, locale } = useI18n();
  const q = useQuery({ queryKey: ["resources"], queryFn: () => listResources() });
  const groups = ["software", "data", "reading", "lab"];
  return (
    <div>
      <PageHeader title={t("navResources")} lead={t("resourcesLead")} />
      {groups.map((g) => {
        const items = (q.data ?? []).filter((r) => r.kind === g);
        if (items.length === 0) return null;
        return (
          <section key={g} className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">{t(kindKey(g))}</h2>
            <div className="grid gap-3">
              {items.map((r) => (
                <Card key={String(r.id)}>
                  <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium">{loc(locale, String(r.title_ar), String(r.title_en))}</p>
                      <p className="mt-1 text-sm text-muted">{loc(locale, String(r.note_ar), String(r.note_en))}</p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {r.year_level != null ? <Badge variant="outline">{yearLabel(t, Number(r.year_level))}</Badge> : null}
                      {r.url ? (
                        <a href={String(r.url)} target="_blank" rel="noreferrer" className="text-xs text-accent underline-offset-4 hover:underline">
                          {String(r.url).replace(/^https?:\/\//, "").split("/")[0]}
                        </a>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
