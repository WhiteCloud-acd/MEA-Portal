import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { fmtDate, loc, useI18n, yearLabel } from "@/lib/i18n";
import { listEvents } from "@/lib/server/api";

export const Route = createFileRoute("/_app/calendar")({ component: CalendarPage });

function kindLabel(t: (k: string) => string, kind: string) {
  if (kind === "teaching") return t("teachingKind");
  return t(kind);
}

function CalendarPage() {
  const { t, locale } = useI18n();
  const q = useQuery({ queryKey: ["events"], queryFn: () => listEvents() });
  const rows = q.data ?? [];
  const months = new Map<string, typeof rows>();
  for (const e of rows) {
    const key = String(e.starts_on).slice(0, 7);
    const arr = months.get(key) ?? [];
    arr.push(e);
    months.set(key, arr);
  }
  return (
    <div>
      <PageHeader kicker={t("academicYear")} title={t("navCalendar")} />
      <div className="flex flex-col gap-8">
        {[...months.entries()].map(([month, items]) => (
          <section key={month}>
            <h2 className="mb-3 text-lg font-semibold">
              {fmtDate(`${month}-01`, locale).replace(/\d{1,2}\s/, "").replace(/,?\s*\d{4}/, "") || month}
              <span className="ms-2 font-mono text-sm text-subtle">{month}</span>
            </h2>
            <ol className="divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface">
              {items.map((e) => (
                <li key={String(e.id)} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <span className="w-36 shrink-0 text-sm text-muted">{fmtDate(String(e.starts_on), locale)}</span>
                  <span className="flex-1 text-sm font-medium">{loc(locale, String(e.title_ar), String(e.title_en))}</span>
                  <span className="flex gap-2">
                    <Badge variant="muted">{kindLabel(t, String(e.kind))}</Badge>
                    {e.year_level != null ? <Badge variant="outline">{yearLabel(t, Number(e.year_level))}</Badge> : null}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
