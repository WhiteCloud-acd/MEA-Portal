import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CourseFormSheet } from "@/components/editors";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse, isStaff } from "@/lib/member";
import { getBootstrap, listCourses } from "@/lib/server/api";

export const Route = createFileRoute("/_app/curriculum")({ component: CurriculumPage });

function CurriculumPage() {
  const { t, locale } = useI18n();
  const [creating, setCreating] = useState(false);
  const q = useQuery({ queryKey: ["courses"], queryFn: () => listCourses() });
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const courses = (q.data ?? []).map(asCourse);
  return (
    <div>
      <PageHeader
        kicker={t("program")}
        title={t("navCurriculum")}
        lead={t("youDecide")}
        actions={
          isStaff(boot.data?.member?.role) ? (
            <Button onClick={() => setCreating(true)}>
              <Plus />
              {t("addCourse")}
            </Button>
          ) : null
        }
      />
      <div className="flex flex-col gap-8">
        {[1, 2, 3, 4].map((year) => (
          <section key={year}>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">{yearLabel(t, year)}</h2>
              <Link to="/years/$year" params={{ year: String(year) }} className="text-xs text-accent underline-offset-4 hover:underline">
                {t("myYear")}
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((sem) => (
                <Card key={sem}>
                  <CardHeader>
                    <CardTitle>{sem === 1 ? t("semester1") : t("semester2")}</CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-start text-xs text-subtle">
                          <th className="pb-2 font-medium">{t("code")}</th>
                          <th className="pb-2 font-medium">{t("name")}</th>
                          <th className="pb-2 font-medium">{t("hours")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses
                          .filter((c) => c.year_level === year && c.semester === sem)
                          .map((c) => (
                            <tr key={c.code} className="border-t border-line">
                              <td className="py-2 pe-2 font-mono text-[11px] text-subtle">{c.code}</td>
                              <td className="py-2 pe-2">
                                <Link to="/courses/$code" params={{ code: c.code }} className="hover:text-accent">
                                  {loc(locale, c.name_ar, c.name_en)}
                                </Link>
                              </td>
                              <td className="py-2 font-mono text-xs tabular-nums text-muted">
                                {c.hours_theory}+{c.hours_lab}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
      <CourseFormSheet open={creating} onOpenChange={setCreating} course={null} />
    </div>
  );
}
