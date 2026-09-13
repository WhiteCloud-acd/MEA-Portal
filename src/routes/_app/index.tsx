import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradeBadge } from "@/components/grade-badge";
import { fmtDate, loc, useI18n, yearLabel } from "@/lib/i18n";
import { weightedMean } from "@/lib/grades";
import { asCourse, type Member } from "@/lib/member";
import { getBootstrap, getMyGrades, listCourses, listEvents, listNotices, listProjects } from "@/lib/server/api";

export const Route = createFileRoute("/_app/")({ component: Dashboard });

function Dashboard() {
  const { t, locale } = useI18n();
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const notices = useQuery({ queryKey: ["notices"], queryFn: () => listNotices() });
  const events = useQuery({ queryKey: ["events"], queryFn: () => listEvents() });
  const grades = useQuery({ queryKey: ["my-grades"], queryFn: () => getMyGrades() });
  const projects = useQuery({ queryKey: ["projects"], queryFn: () => listProjects() });
  const coursesQ = useQuery({ queryKey: ["courses"], queryFn: () => listCourses() });
  const member = boot.data?.member as Member | null;
  const stats = boot.data?.stats;
  const name = member ? loc(locale, member.name_ar, member.name_en) : "";
  const catalog = (coursesQ.data ?? []).map(asCourse);
  const yearPath =
    member?.role === "student" && member.year_level
      ? member.year_level === 5
        ? "/years/alumni"
        : `/years/${member.year_level}`
      : "/years/1";

  const gradeRows = (grades.data?.grades?.length ? grades.data.grades : grades.data?.roster) ?? [];
  const withCredits = gradeRows.map((g) => {
    const c = catalog.find((x) => x.code === g.course_code);
    return { total: g.total, credits: c?.credits ?? 4 };
  });
  const avg = weightedMean(withCredits);
  const doneCredits = withCredits.filter((g) => g.total != null).reduce((s, g) => s + g.credits, 0);
  const today = "2026-09-12";
  const upcoming = (events.data ?? [])
    .filter((e) => String(e.starts_on) >= today)
    .slice(0, 5);
  const latest = (notices.data ?? []).slice(0, 4);
  const liveProjects = (projects.data ?? []).filter((p) => p.status !== "defended").slice(0, 3);

  const yearCourses =
    member?.role === "student" && member.year_level && member.year_level < 5
      ? catalog.filter((c) => c.year_level === member.year_level && c.semester === 1)
      : [];

  return (
    <div>
      <PageHeader
        kicker={t("academicYear")}
        title={`${t("welcome")}${name ? `، ${name}` : ""}`}
        lead={t("dashboardLead")}
      />
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { n: stats?.students ?? "—", l: t("students") },
          { n: stats?.faculty ?? "—", l: t("professors") },
          { n: stats?.courses ?? "—", l: t("courses") },
          { n: stats?.projects ?? "—", l: t("projects") },
        ].map((s) => (
          <Card key={s.l}>
            <CardContent className="py-5">
              <p className="font-mono text-2xl tabular-nums text-ink">{s.n}</p>
              <p className="mt-1 text-xs text-muted">{s.l}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          {member?.role === "student" ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("transcript")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted">{t("gpa")}</p>
                  <p className="mt-1 font-mono text-3xl tabular-nums">{avg ?? "—"}</p>
                  {avg != null ? <div className="mt-2"><GradeBadge total={avg} /></div> : null}
                </div>
                <div>
                  <p className="text-xs text-muted">{t("completedCredits")}</p>
                  <p className="mt-1 font-mono text-3xl tabular-nums">{doneCredits}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">{t("myYear")}</p>
                  <Link to={yearPath} className="mt-1 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">
                    {yearLabel(t, member.year_level)}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("navRegistry")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">{t("youDecide")}</p>
                <Link to="/registry" className="mt-3 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline">
                  {t("openRegistry")}
                </Link>
              </CardContent>
            </Card>
          )}
          {yearCourses.length > 0 ? (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>{t("enrolledCourses")}</CardTitle>
                <Link to="/curriculum" className="text-xs text-accent underline-offset-4 hover:underline">
                  {t("viewCurriculum")}
                </Link>
              </CardHeader>
              <CardContent className="grid gap-2">
                {yearCourses.map((c) => (
                  <Link
                    key={c.code}
                    to="/courses/$code"
                    params={{ code: c.code }}
                    className="flex items-center justify-between rounded-[var(--radius-md)] border border-line bg-raised px-3 py-2.5"
                  >
                    <span>
                      <span className="block font-mono text-[11px] text-subtle">{c.code}</span>
                      <span className="text-sm">{loc(locale, c.name_ar, c.name_en)}</span>
                    </span>
                    <span className="text-xs text-muted">
                      {c.credits} {t("hoursShort")}
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ) : null}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t("recentNotices")}</CardTitle>
              <Link to="/notices" className="text-xs text-accent underline-offset-4 hover:underline">
                {t("viewAll")}
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {latest.map((n) => (
                <Link key={String(n.id)} to="/notices/$id" params={{ id: String(n.id) }} className="block">
                  <div className="flex items-center gap-2">
                    {n.pinned ? <Badge>{t("pinned")}</Badge> : null}
                    <Badge variant="muted">{t(String(n.category))}</Badge>
                    <span className="text-[11px] text-subtle">{fmtDate(String(n.published_at), locale)}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{loc(locale, String(n.title_ar), String(n.title_en))}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t("upcoming")}</CardTitle>
              <Link to="/calendar" className="text-xs text-accent underline-offset-4 hover:underline">
                {t("viewAll")}
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {upcoming.map((e) => (
                <div key={String(e.id)} className="flex gap-3">
                  <div className="w-16 shrink-0 text-xs text-muted">{fmtDate(String(e.starts_on), locale)}</div>
                  <div>
                    <p className="text-sm font-medium">{loc(locale, String(e.title_ar), String(e.title_en))}</p>
                    <p className="text-[11px] text-subtle">{t(String(e.kind) === "teaching" ? "teachingKind" : String(e.kind))}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t("projects")}</CardTitle>
              <Link to="/projects" className="text-xs text-accent underline-offset-4 hover:underline">
                {t("viewAll")}
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {liveProjects.map((p) => (
                <Link key={String(p.id)} to="/projects/$id" params={{ id: String(p.id) }}>
                  <p className="text-sm font-medium">{loc(locale, String(p.title_ar), String(p.title_en))}</p>
                  <p className="text-[11px] text-subtle">{t(String(p.status))}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
