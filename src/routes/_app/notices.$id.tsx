import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { fmtDate, loc, useI18n, yearLabel } from "@/lib/i18n";
import { getNotice } from "@/lib/server/api";

export const Route = createFileRoute("/_app/notices/$id")({ component: NoticePage });

function NoticePage() {
  const { id } = Route.useParams();
  const { t, locale } = useI18n();
  const q = useQuery({ queryKey: ["notice", id], queryFn: () => getNotice({ data: id }) });
  if (!q.data) return <p className="text-sm text-muted">{q.isPending ? t("loading") : t("noResults")}</p>;
  const n = q.data;
  return (
    <div>
      <PageHeader
        kicker={fmtDate(String(n.published_at), locale)}
        title={loc(locale, String(n.title_ar), String(n.title_en))}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {n.pinned ? <Badge>{t("pinned")}</Badge> : null}
        <Badge variant="muted">{t(String(n.category))}</Badge>
        {n.year_level != null ? <Badge variant="outline">{yearLabel(t, Number(n.year_level))}</Badge> : <Badge variant="outline">{t("allYears")}</Badge>}
      </div>
      <Card>
        <CardContent>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted">{loc(locale, String(n.body_ar), String(n.body_en))}</p>
        </CardContent>
      </Card>
      <Link to="/notices" className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline">
        {t("viewAll")}
      </Link>
    </div>
  );
}
