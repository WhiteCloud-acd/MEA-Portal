import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { fmtDate, loc, useI18n, yearLabel } from "@/lib/i18n";
import { listNotices } from "@/lib/server/api";

export const Route = createFileRoute("/_app/notices")({ component: NoticesPage });

function NoticesPage() {
  const { t, locale } = useI18n();
  const q = useQuery({ queryKey: ["notices"], queryFn: () => listNotices() });
  return (
    <div>
      <PageHeader title={t("navNotices")} lead={t("closedNote")} />
      <div className="flex flex-col gap-3">
        {(q.data ?? []).map((n) => (
          <Link
            key={String(n.id)}
            to="/notices/$id"
            params={{ id: String(n.id) }}
            className="rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-card)] hover:border-line-strong"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {n.pinned ? <Badge>{t("pinned")}</Badge> : null}
              <Badge variant="muted">{t(String(n.category))}</Badge>
              {n.year_level != null ? <Badge variant="outline">{yearLabel(t, Number(n.year_level))}</Badge> : <Badge variant="outline">{t("allYears")}</Badge>}
              <span className="text-[11px] text-subtle">{fmtDate(String(n.published_at), locale)}</span>
            </div>
            <h2 className="font-semibold">{loc(locale, String(n.title_ar), String(n.title_en))}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{loc(locale, String(n.body_ar), String(n.body_en))}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
