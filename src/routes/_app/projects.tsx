import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { listProjects } from "@/lib/server/api";

export const Route = createFileRoute("/_app/projects")({ component: ProjectsPage });

function kindKey(k: string) {
  if (k === "graduation") return "graduation";
  if (k === "course") return "course";
  return "researchKind";
}

function ProjectsPage() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<"all" | "defended" | "ongoing" | "proposed">("all");
  const q = useQuery({ queryKey: ["projects"], queryFn: () => listProjects() });
  const rows = (q.data ?? []).filter((p) => (filter === "all" ? true : p.status === filter));
  return (
    <div>
      <PageHeader kicker={t("firstCohort")} title={t("navProjects")} lead={t("missionLead")} />
      <div className="mb-5 flex flex-wrap gap-2">
        {(["all", "defended", "ongoing", "proposed"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`h-9 rounded-full px-3 text-xs font-medium ${filter === s ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`}
          >
            {s === "all" ? t("viewAll") : t(s)}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {rows.map((p) => (
          <Link
            key={String(p.id)}
            to="/projects/$id"
            params={{ id: String(p.id) }}
            className="rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-card)] hover:border-line-strong"
          >
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="muted">{t(kindKey(String(p.kind)))}</Badge>
              <Badge>{t(String(p.status))}</Badge>
              <Badge variant="outline">{yearLabel(t, Number(p.year_level))}</Badge>
            </div>
            <h2 className="text-base font-semibold">{loc(locale, String(p.title_ar), String(p.title_en))}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{loc(locale, String(p.abstract_ar), String(p.abstract_en))}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
