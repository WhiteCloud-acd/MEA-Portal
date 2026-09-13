import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CourseFormSheet } from "@/components/editors";
import { GradeBadge } from "@/components/grade-badge";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { composeTotal } from "@/lib/grades";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse, asPerson, isStaff } from "@/lib/member";
import {
  getBootstrap,
  getCourse,
  getCourseGradebook,
  listPeople,
  saveRosterGrade,
} from "@/lib/server/api";

export const Route = createFileRoute("/_app/courses/$code")({ component: CoursePage });

function CoursePage() {
  const { code } = Route.useParams();
  const { t, locale } = useI18n();
  const qc = useQueryClient();
  const courseQ = useQuery({ queryKey: ["course", code], queryFn: () => getCourse({ data: code }) });
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const book = useQuery({ queryKey: ["gradebook", code], queryFn: () => getCourseGradebook({ data: code }) });
  const [draft, setDraft] = useState<Record<string, { cw: string; mid: string; fin: string }>>({});
  const [editing, setEditing] = useState(false);
  const save = useMutation({
    mutationFn: (row: { person_id: string; coursework: number | null; midterm: number | null; final: number | null }) =>
      saveRosterGrade({ data: { ...row, course_code: code } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gradebook", code] }),
  });

  if (!courseQ.data) return <p className="text-sm text-muted">{courseQ.isPending ? t("loading") : t("noResults")}</p>;
  const c = asCourse(courseQ.data);
  const faculty = (people.data ?? []).map(asPerson);
  const inst = faculty.find((p) => p.id === c.instructor_id);
  const member = boot.data?.member;
  const canEdit = member && isStaff(member.role) && book.data?.allowed;

  return (
    <div>
      <PageHeader
        kicker={c.code}
        title={loc(locale, c.name_ar, c.name_en)}
        lead={`${yearLabel(t, c.year_level)} · ${c.semester === 1 ? t("semester1") : t("semester2")}`}
        actions={
          isStaff(member?.role) ? (
            <Button variant="secondary" onClick={() => setEditing(true)}>
              <Pencil />
              {t("edit")}
            </Button>
          ) : null
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted">{loc(locale, c.desc_ar, c.desc_en)}</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-xs text-subtle">{t("theory")}</dt>
                <dd className="font-mono tabular-nums">{c.hours_theory}</dd>
              </div>
              <div>
                <dt className="text-xs text-subtle">{t("lab")}</dt>
                <dd className="font-mono tabular-nums">{c.hours_lab}</dd>
              </div>
              <div>
                <dt className="text-xs text-subtle">{t("credits")}</dt>
                <dd className="font-mono tabular-nums">{c.credits}</dd>
              </div>
            </dl>
            {c.prereq ? (
              <p className="mt-4 text-sm">
                {t("prereq")}:{" "}
                <Link to="/courses/$code" params={{ code: c.prereq }} className="font-mono text-accent underline-offset-4 hover:underline">
                  {c.prereq}
                </Link>
              </p>
            ) : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("instructor")}</CardTitle>
          </CardHeader>
          <CardContent>
            {inst ? (
              <Link to="/people/$id" params={{ id: inst.id }} className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                {loc(locale, inst.name_ar, inst.name_en)}
              </Link>
            ) : (
              <p className="text-sm text-muted">—</p>
            )}
            {inst?.office ? <p className="mt-1 text-xs text-muted">{inst.office}</p> : null}
            <Link to="/years/$year" params={{ year: String(c.year_level) }} className="mt-4 block text-xs text-accent underline-offset-4 hover:underline">
              {yearLabel(t, c.year_level)}
            </Link>
          </CardContent>
        </Card>
      </div>
      {canEdit ? (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">{t("gradebook")}</h2>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-surface">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-subtle">
                  <th className="px-3 py-2 text-start font-medium">{t("name")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("coursework")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("midterm")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("final")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("total")}</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {(book.data?.entries ?? []).map((e) => {
                  const d = draft[e.person_id] ?? {
                    cw: e.coursework?.toString() ?? "",
                    mid: e.midterm?.toString() ?? "",
                    fin: e.final?.toString() ?? "",
                  };
                  const parse = (s: string) => (s === "" ? null : Number(s));
                  const preview = composeTotal(parse(d.cw), parse(d.mid), parse(d.fin));
                  return (
                    <tr key={e.person_id} className="border-t border-line">
                      <td className="px-3 py-2">
                        <Link to="/people/$id" params={{ id: e.person_id }} className="hover:text-accent">
                          {loc(locale, e.name_ar, e.name_en)}
                        </Link>
                        <div className="font-mono text-[10px] text-subtle">{e.student_no}</div>
                      </td>
                      {(["cw", "mid", "fin"] as const).map((k) => (
                        <td key={k} className="px-3 py-2">
                          <Input
                            className="h-9 w-20 font-mono"
                            inputMode="numeric"
                            value={d[k]}
                            onChange={(ev) =>
                              setDraft((prev) => ({
                                ...prev,
                                [e.person_id]: { ...d, [k]: ev.target.value },
                              }))
                            }
                          />
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <GradeBadge total={preview ?? e.total} />
                      </td>
                      <td className="px-3 py-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={save.isPending}
                          onClick={() =>
                            save.mutate({
                              person_id: e.person_id,
                              coursework: parse(d.cw),
                              midterm: parse(d.mid),
                              final: parse(d.fin),
                            })
                          }
                        >
                          {t("save")}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : member && member.role === "student" ? null : (
        <p className="mt-6 text-sm text-muted">{t("onlyFaculty")}</p>
      )}
      <CourseFormSheet open={editing} onOpenChange={setEditing} course={c} />
    </div>
  );
}
