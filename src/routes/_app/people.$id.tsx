import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { PersonFormSheet } from "@/components/editors";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse, asPerson, isStaff } from "@/lib/member";
import { initials } from "@/lib/utils";
import { getBootstrap, getPerson, listCourses, listPeople, listProjects } from "@/lib/server/api";

export const Route = createFileRoute("/_app/people/$id")({ component: PersonPage });

function PersonPage() {
  const { id } = Route.useParams();
  const { t, locale } = useI18n();
  const [editing, setEditing] = useState(false);
  const q = useQuery({ queryKey: ["person", id], queryFn: () => getPerson({ data: id }) });
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const projects = useQuery({ queryKey: ["projects"], queryFn: () => listProjects() });
  const courses = useQuery({ queryKey: ["courses"], queryFn: () => listCourses() });
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  if (!q.data) return <p className="text-sm text-muted">{q.isPending ? t("loading") : t("noResults")}</p>;
  const p = asPerson(q.data);
  const name = loc(locale, p.name_ar, p.name_en);
  const all = (people.data ?? []).map(asPerson);
  const catalog = (courses.data ?? []).map(asCourse);
  const advisor = p.advisor_id ? all.find((x) => x.id === p.advisor_id) : null;
  const advisees = all.filter((x) => x.advisor_id === p.id);
  const taught = p.course_codes ? p.course_codes.split(",").filter(Boolean) : [];
  const ownProjects = (projects.data ?? []).filter((pr) => {
    const ids = String(pr.student_ids).split(",");
    return ids.includes(p.id) || pr.supervisor_id === p.id;
  });
  const staff = isStaff(boot.data?.member?.role);
  const kind = p.kind === "faculty" ? "faculty" : "student";

  return (
    <div>
      <PageHeader
        kicker={p.kind === "faculty" ? t("navFaculty") : yearLabel(t, p.year_level)}
        title={name}
        lead={p.kind === "faculty" ? loc(locale, p.title_ar, p.title_en) : p.student_no ?? undefined}
        actions={
          staff ? (
            <Button variant="secondary" onClick={() => setEditing(true)}>
              <Pencil />
              {t("edit")}
            </Button>
          ) : null
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card>
          <CardContent className="flex gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-soft text-base font-medium text-accent">
              {initials(name)}
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-muted">{loc(locale, p.bio_ar, p.bio_en)}</p>
              {p.research_ar || p.research_en ? (
                <p className="mt-3 text-sm">
                  <span className="font-medium">{t("research")}: </span>
                  <span className="text-muted">{loc(locale, p.research_ar, p.research_en)}</span>
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("contact")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {p.office ? (
              <p>
                {t("office")}: {p.office}
              </p>
            ) : null}
            {p.email ? (
              <p dir="ltr" className="font-mono text-xs text-muted">
                {p.email}
              </p>
            ) : null}
            {p.cohort ? (
              <p>
                {t("cohort")}: {p.cohort}
              </p>
            ) : null}
            {advisor ? (
              <p>
                {t("advisor")}:{" "}
                <Link to="/people/$id" params={{ id: advisor.id }} className="text-accent underline-offset-4 hover:underline">
                  {loc(locale, advisor.name_ar, advisor.name_en)}
                </Link>
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
      {taught.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">{t("teaching")}</h2>
          <div className="flex flex-wrap gap-2">
            {taught.map((code) => {
              const c = catalog.find((x) => x.code === code);
              return (
                <Link key={code} to="/courses/$code" params={{ code }} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs">
                  {code} · {c ? loc(locale, c.name_ar, c.name_en) : code}
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
      {advisees.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">{t("students")}</h2>
          <div className="flex flex-wrap gap-2">
            {advisees.map((s) => (
              <Link key={s.id} to="/people/$id" params={{ id: s.id }} className="rounded-full bg-secondary px-3 py-1.5 text-xs">
                {loc(locale, s.name_ar, s.name_en)}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {ownProjects.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">{t("projects")}</h2>
          <div className="grid gap-3">
            {ownProjects.map((pr) => (
              <Link key={String(pr.id)} to="/projects/$id" params={{ id: String(pr.id) }} className="rounded-[var(--radius-lg)] border border-line bg-surface p-4">
                <div className="mb-1 flex gap-2">
                  <Badge variant="muted">{t(String(pr.status))}</Badge>
                </div>
                <p className="font-medium">{loc(locale, String(pr.title_ar), String(pr.title_en))}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <PersonFormSheet open={editing} onOpenChange={setEditing} person={p} kind={kind} />
    </div>
  );
}
