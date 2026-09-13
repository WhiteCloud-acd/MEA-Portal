import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asPerson } from "@/lib/member";
import { getProject, listPeople } from "@/lib/server/api";

export const Route = createFileRoute("/_app/projects/$id")({ component: ProjectPage });

function ProjectPage() {
  const { id } = Route.useParams();
  const { t, locale } = useI18n();
  const q = useQuery({ queryKey: ["project", id], queryFn: () => getProject({ data: id }) });
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  if (!q.data) return <p className="text-sm text-muted">{q.isPending ? t("loading") : t("noResults")}</p>;
  const p = q.data;
  const all = (people.data ?? []).map(asPerson);
  const students = String(p.student_ids)
    .split(",")
    .map((sid) => all.find((x) => x.id === sid))
    .filter(Boolean);
  const supervisor = all.find((x) => x.id === p.supervisor_id);
  return (
    <div>
      <PageHeader
        kicker={yearLabel(t, Number(p.year_level))}
        title={loc(locale, String(p.title_ar), String(p.title_en))}
        lead={`${t(String(p.status))} · ${p.year_label}`}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge>{t(String(p.kind) === "graduation" ? "graduation" : String(p.kind) === "course" ? "course" : "researchKind")}</Badge>
        <Badge variant="muted">{t(String(p.status))}</Badge>
      </div>
      <Card>
        <CardContent>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{t("abstract")}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{loc(locale, String(p.abstract_ar), String(p.abstract_en))}</p>
        </CardContent>
      </Card>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent>
            <p className="text-xs text-subtle">{t("team")}</p>
            <ul className="mt-2 space-y-1">
              {students.map((s) =>
                s ? (
                  <li key={s.id}>
                    <Link to="/people/$id" params={{ id: s.id }} className="text-sm text-accent underline-offset-4 hover:underline">
                      {loc(locale, s.name_ar, s.name_en)}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-subtle">{t("supervisor")}</p>
            {supervisor ? (
              <Link to="/people/$id" params={{ id: supervisor.id }} className="mt-2 block text-sm text-accent underline-offset-4 hover:underline">
                {loc(locale, supervisor.name_ar, supervisor.name_en)}
              </Link>
            ) : (
              <p className="mt-2 text-sm">—</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
