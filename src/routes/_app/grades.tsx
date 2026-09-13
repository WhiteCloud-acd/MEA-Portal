import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GradeBadge } from "@/components/grade-badge";
import { PageHeader } from "@/components/shell";
import { Card, CardContent } from "@/components/ui/card";
import { weightedMean } from "@/lib/grades";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse } from "@/lib/member";
import { getBootstrap, getMyGrades, listCourses } from "@/lib/server/api";

export const Route = createFileRoute("/_app/grades")({ component: GradesPage });

function GradesPage() {
  const { t, locale } = useI18n();
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const mine = useQuery({ queryKey: ["my-grades"], queryFn: () => getMyGrades() });
  const coursesQ = useQuery({ queryKey: ["courses"], queryFn: () => listCourses() });
  const member = boot.data?.member;
  const catalog = (coursesQ.data ?? []).map(asCourse);
  const byCode = new Map(catalog.map((c) => [c.code, c]));
  const rows = (mine.data?.grades?.length ? mine.data.grades : mine.data?.roster) ?? [];
  const mapped = rows
    .map((g) => {
      const c = byCode.get(g.course_code);
      return { ...g, course: c };
    })
    .filter((g) => g.course)
    .sort((a, b) => (a.course!.year_level - b.course!.year_level) || a.course!.code.localeCompare(b.course!.code));
  const avg = weightedMean(mapped.map((g) => ({ total: g.total, credits: g.course!.credits })));
  const years = [1, 2, 3, 4];
  const isStaff = member?.role === "faculty" || member?.role === "coordinator";

  return (
    <div>
      <PageHeader kicker={t("transcript")} title={t("navGrades")} lead={isStaff ? t("onlyFaculty") : t("closedNote")} />
      {!isStaff ? (
        <>
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            <Card>
              <CardContent className="py-5">
                <p className="text-xs text-muted">{t("gpa")}</p>
                <p className="mt-1 font-mono text-3xl tabular-nums">{avg ?? "—"}</p>
                {avg != null ? <div className="mt-2"><GradeBadge total={avg} /></div> : null}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-5">
                <p className="text-xs text-muted">{t("courses")}</p>
                <p className="mt-1 font-mono text-3xl tabular-nums">{mapped.length}</p>
              </CardContent>
            </Card>
          </div>
          {mapped.length === 0 ? (
            <p className="text-sm text-muted">{t("noGrades")}</p>
          ) : (
            years
              .filter((y) => mapped.some((g) => g.course!.year_level === y))
              .map((y) => (
                <section key={y} className="mb-8">
                  <h2 className="mb-3 text-lg font-semibold">{yearLabel(t, y)}</h2>
                  <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-surface">
                    <table className="w-full min-w-[36rem] text-sm">
                      <thead>
                        <tr className="border-b border-line text-xs text-subtle">
                          <th className="px-3 py-2 text-start font-medium">{t("code")}</th>
                          <th className="px-3 py-2 text-start font-medium">{t("name")}</th>
                          <th className="px-3 py-2 text-start font-medium">{t("coursework")}</th>
                          <th className="px-3 py-2 text-start font-medium">{t("midterm")}</th>
                          <th className="px-3 py-2 text-start font-medium">{t("final")}</th>
                          <th className="px-3 py-2 text-start font-medium">{t("total")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mapped
                          .filter((g) => g.course!.year_level === y)
                          .map((g) => (
                            <tr key={g.course_code} className="border-t border-line">
                              <td className="px-3 py-2 font-mono text-[11px] text-subtle">{g.course_code}</td>
                              <td className="px-3 py-2">
                                <Link to="/courses/$code" params={{ code: g.course_code }} className="hover:text-accent">
                                  {loc(locale, g.course!.name_ar, g.course!.name_en)}
                                </Link>
                              </td>
                              <td className="px-3 py-2 font-mono tabular-nums">{g.coursework ?? "—"}</td>
                              <td className="px-3 py-2 font-mono tabular-nums">{g.midterm ?? "—"}</td>
                              <td className="px-3 py-2 font-mono tabular-nums">{g.final ?? "—"}</td>
                              <td className="px-3 py-2">
                                <GradeBadge total={g.total} />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))
          )}
        </>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((c) => (
            <Link
              key={c.code}
              to="/courses/$code"
              params={{ code: c.code }}
              className="rounded-[var(--radius-lg)] border border-line bg-surface p-4 hover:border-line-strong"
            >
              <p className="font-mono text-[11px] text-subtle">{c.code}</p>
              <p className="mt-1 font-medium">{loc(locale, c.name_ar, c.name_en)}</p>
              <p className="mt-1 text-xs text-muted">
                {yearLabel(t, c.year_level)} · {t("editGrades")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
