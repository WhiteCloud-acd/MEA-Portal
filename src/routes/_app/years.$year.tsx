import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PersonCard } from "@/components/person-card";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COHORTS } from "@/lib/catalog";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse, asPerson, yearFromParam } from "@/lib/member";
import { listCourses, listPeople, listProjects } from "@/lib/server/api";

export const Route = createFileRoute("/_app/years/$year")({ component: YearPage });

function YearPage() {
  const { year } = Route.useParams();
  const y = yearFromParam(year);
  const { t, locale } = useI18n();
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const projects = useQuery({ queryKey: ["projects"], queryFn: () => listProjects() });
  const coursesQ = useQuery({ queryKey: ["courses"], queryFn: () => listCourses() });
  const students = (people.data ?? []).map(asPerson).filter((p) => p.kind === "student" && p.year_level === y);
  const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty");
  const advisors = faculty.filter((f) => students.some((s) => s.advisor_id === f.id));
  const catalog = (coursesQ.data ?? []).map(asCourse);
  const courses = catalog.filter((c) => (y === 5 ? c.year_level === 4 : c.year_level === y));
  const yearProjects = (projects.data ?? []).filter((p) => Number(p.year_level) === y);
  const cohort = COHORTS[y];

  return (
    <div>
      <PageHeader
        kicker={`${t("cohort")} ${cohort?.years ?? ""}`}
        title={yearLabel(t, y)}
        lead={y === 5 ? t("firstCohort") : `${students.length} ${t("students")} · ${courses.length} ${t("courses")}`}
        actions={
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Link
                key={n}
                to="/years/$year"
                params={{ year: n === 5 ? "alumni" : String(n) }}
                className={`inline-flex h-9 items-center rounded-full px-3 text-xs font-medium ${
                  n === y ? "bg-accent text-accent-fg" : "bg-secondary text-muted"
                }`}
              >
                {yearLabel(t, n)}
              </Link>
            ))}
          </div>
        }
      />
      <Tabs defaultValue="people">
        <TabsList className="flex h-auto w-full flex-wrap">
          <TabsTrigger value="people">{t("students")}</TabsTrigger>
          <TabsTrigger value="plan">{t("navCurriculum")}</TabsTrigger>
          <TabsTrigger value="projects">{t("projects")}</TabsTrigger>
        </TabsList>
        <TabsContent value="people">
          {advisors.length > 0 ? (
            <p className="mb-3 text-sm text-muted">
              {t("advisor")}: {advisors.map((a) => loc(locale, a.name_ar, a.name_en)).join(" · ")}
            </p>
          ) : null}
          {students.length === 0 ? (
            <p className="text-sm text-muted">{t("emptyYear")}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {students.map((p) => (
                <PersonCard key={p.id} person={p} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="plan">
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((sem) => (
              <Card key={sem}>
                <CardHeader>
                  <CardTitle>{sem === 1 ? t("semester1") : t("semester2")}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {courses
                    .filter((c) => c.semester === sem)
                    .map((c) => (
                      <Link
                        key={c.code}
                        to="/courses/$code"
                        params={{ code: c.code }}
                        className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-line bg-raised px-3 py-2.5"
                      >
                        <span>
                          <span className="block font-mono text-[11px] text-subtle">{c.code}</span>
                          <span className="text-sm">{loc(locale, c.name_ar, c.name_en)}</span>
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {c.hours_theory}+{c.hours_lab}
                        </span>
                      </Link>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="projects">
          {yearProjects.length === 0 ? (
            <p className="text-sm text-muted">{t("noResults")}</p>
          ) : (
            <div className="grid gap-3">
              {yearProjects.map((p) => (
                <Link
                  key={String(p.id)}
                  to="/projects/$id"
                  params={{ id: String(p.id) }}
                  className="rounded-[var(--radius-lg)] border border-line bg-surface p-4"
                >
                  <div className="mb-2 flex gap-2">
                    <Badge variant="muted">{t(String(p.kind) === "graduation" ? "graduation" : String(p.kind) === "course" ? "course" : "researchKind")}</Badge>
                    <Badge>{t(String(p.status))}</Badge>
                  </div>
                  <p className="font-medium">{loc(locale, String(p.title_ar), String(p.title_en))}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">
                    {loc(locale, String(p.abstract_ar), String(p.abstract_en))}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
