import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse, asPerson, emptyCourse, emptyPerson, type CourseRec, type PersonRec } from "@/lib/member";
import { deleteCourse, deletePerson, listCourses, listPeople, saveCourse, savePerson } from "@/lib/server/api";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function invalidateAll(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: ["people"] });
  qc.invalidateQueries({ queryKey: ["person"] });
  qc.invalidateQueries({ queryKey: ["courses"] });
  qc.invalidateQueries({ queryKey: ["course"] });
  qc.invalidateQueries({ queryKey: ["bootstrap"] });
  qc.invalidateQueries({ queryKey: ["gradebook"] });
}

export function PersonFormSheet({
  open,
  onOpenChange,
  person,
  kind,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  person: PersonRec | null;
  kind: "student" | "faculty";
}) {
  const { t, locale } = useI18n();
  const qc = useQueryClient();
  const creating = !person?.id;
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople(), enabled: open });
  const courses = useQuery({ queryKey: ["courses"], queryFn: () => listCourses(), enabled: open });
  const [form, setForm] = useState<PersonRec>(emptyPerson(kind));

  useEffect(() => {
    if (!open) return;
    setForm(person ?? emptyPerson(kind));
  }, [open, person, kind]);

  const save = useMutation({
    mutationFn: () =>
      savePerson({
        data: {
          id: creating ? undefined : form.id,
          kind,
          name_ar: form.name_ar,
          name_en: form.name_en,
          year_level: form.year_level,
          student_no: form.student_no,
          cohort: form.cohort,
          title_ar: form.title_ar,
          title_en: form.title_en,
          office: form.office,
          email: form.email,
          bio_ar: form.bio_ar,
          bio_en: form.bio_en,
          research_ar: form.research_ar,
          research_en: form.research_en,
          course_codes: form.course_codes,
          advisor_id: form.advisor_id,
        },
      }),
    onSuccess: () => {
      invalidateAll(qc);
      onOpenChange(false);
    },
  });

  const remove = useMutation({
    mutationFn: () => deletePerson({ data: form.id }),
    onSuccess: () => {
      invalidateAll(qc);
      onOpenChange(false);
    },
  });

  const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty" && p.id !== form.id);
  const catalog = (courses.data ?? []).map(asCourse);
  const selectedCodes = new Set(form.course_codes.split(",").map((s) => s.trim()).filter(Boolean));
  const set = <K extends keyof PersonRec>(key: K, value: PersonRec[K]) => setForm((f) => ({ ...f, [key]: value }));
  const title = creating ? t("newRecord") : t("edit");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="end" tone="panel" title={title} className="overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="border-b border-line px-5 py-4 pe-14">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{kind === "student" ? t("roleStudent") : t("roleFaculty")}</p>
            <h2 className="mt-1 text-lg font-semibold">{creating ? (kind === "student" ? t("addStudent") : t("addFaculty")) : loc(locale, form.name_ar, form.name_en) || t("edit")}</h2>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={`${t("yourNameAr")} *`}>
                <Input value={form.name_ar} onChange={(e) => set("name_ar", e.target.value)} dir="rtl" />
              </Field>
              <Field label={`${t("yourNameEn")} *`}>
                <Input value={form.name_en} onChange={(e) => set("name_en", e.target.value)} dir="ltr" />
              </Field>
            </div>
            <Field label={t("email")}>
              <Input value={form.email ?? ""} onChange={(e) => set("email", e.target.value)} dir="ltr" />
            </Field>
            {kind === "student" ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={t("pickYear")}>
                    <Select value={String(form.year_level ?? 1)} onValueChange={(v) => set("year_level", Number(v))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((y) => (
                          <SelectItem key={y} value={String(y)}>
                            {yearLabel(t, y)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label={t("studentNo")}>
                    <Input value={form.student_no ?? ""} onChange={(e) => set("student_no", e.target.value)} dir="ltr" />
                  </Field>
                </div>
                <Field label={t("cohort")}>
                  <Input value={form.cohort ?? ""} onChange={(e) => set("cohort", e.target.value)} />
                </Field>
                <Field label={t("pickAdvisor")}>
                  <Select value={form.advisor_id ?? "none"} onValueChange={(v) => set("advisor_id", v === "none" ? null : v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t("none")}</SelectItem>
                      {faculty.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {loc(locale, p.name_ar, p.name_en)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </>
            ) : (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={`${t("title")} (AR)`}>
                    <Input value={form.title_ar ?? ""} onChange={(e) => set("title_ar", e.target.value)} dir="rtl" />
                  </Field>
                  <Field label={`${t("title")} (EN)`}>
                    <Input value={form.title_en ?? ""} onChange={(e) => set("title_en", e.target.value)} dir="ltr" />
                  </Field>
                </div>
                <Field label={t("office")}>
                  <Input value={form.office ?? ""} onChange={(e) => set("office", e.target.value)} />
                </Field>
                <Field label={t("coursesTaught")}>
                  <div className="flex max-h-40 flex-col gap-1 overflow-y-auto rounded-[var(--radius-sm)] border border-line bg-raised p-2">
                    {catalog.map((c) => {
                      const on = selectedCodes.has(c.code);
                      return (
                        <label key={c.code} className="flex min-h-9 items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => {
                              const next = new Set(selectedCodes);
                              if (on) next.delete(c.code);
                              else next.add(c.code);
                              set("course_codes", [...next].join(","));
                            }}
                          />
                          <span className="font-mono text-[11px] text-subtle">{c.code}</span>
                          <span className="truncate">{loc(locale, c.name_ar, c.name_en)}</span>
                        </label>
                      );
                    })}
                  </div>
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label={`${t("research")} (AR)`}>
                    <Textarea rows={3} value={form.research_ar} onChange={(e) => set("research_ar", e.target.value)} dir="rtl" />
                  </Field>
                  <Field label={`${t("research")} (EN)`}>
                    <Textarea rows={3} value={form.research_en} onChange={(e) => set("research_en", e.target.value)} dir="ltr" />
                  </Field>
                </div>
              </>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={`${t("bio")} (AR)`}>
                <Textarea rows={4} value={form.bio_ar} onChange={(e) => set("bio_ar", e.target.value)} dir="rtl" />
              </Field>
              <Field label={`${t("bio")} (EN)`}>
                <Textarea rows={4} value={form.bio_en} onChange={(e) => set("bio_en", e.target.value)} dir="ltr" />
              </Field>
            </div>
            {save.isError ? <p className="text-sm text-bad">{t("saveFailed")}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4">
            <Button className="min-w-28" disabled={save.isPending || !form.name_ar.trim() || !form.name_en.trim()} onClick={() => save.mutate()}>
              {save.isPending ? t("joining") : creating ? t("create") : t("save")}
            </Button>
            {!creating ? (
              <Button
                variant="destructive"
                disabled={remove.isPending}
                onClick={() => {
                  if (window.confirm(t("confirmDelete"))) remove.mutate();
                }}
              >
                {t("delete")}
              </Button>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function CourseFormSheet({
  open,
  onOpenChange,
  course,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  course: CourseRec | null;
}) {
  const { t, locale } = useI18n();
  const qc = useQueryClient();
  const creating = !course?.code;
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople(), enabled: open });
  const courses = useQuery({ queryKey: ["courses"], queryFn: () => listCourses(), enabled: open });
  const [form, setForm] = useState<CourseRec>(emptyCourse());

  useEffect(() => {
    if (!open) return;
    setForm(course ?? emptyCourse());
  }, [open, course]);

  const save = useMutation({
    mutationFn: () =>
      saveCourse({
        data: {
          mode: creating ? "create" : "update",
          code: form.code,
          name_ar: form.name_ar,
          name_en: form.name_en,
          year_level: form.year_level,
          semester: form.semester,
          hours_theory: form.hours_theory,
          hours_lab: form.hours_lab,
          credits: form.credits,
          desc_ar: form.desc_ar,
          desc_en: form.desc_en,
          instructor_id: form.instructor_id,
          prereq: form.prereq,
        },
      }),
    onSuccess: () => {
      invalidateAll(qc);
      onOpenChange(false);
    },
  });

  const remove = useMutation({
    mutationFn: () => deleteCourse({ data: form.code }),
    onSuccess: () => {
      invalidateAll(qc);
      onOpenChange(false);
    },
  });

  const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty");
  const others = (courses.data ?? []).map(asCourse).filter((c) => c.code !== form.code);
  const set = <K extends keyof CourseRec>(key: K, value: CourseRec[K]) => setForm((f) => ({ ...f, [key]: value }));
  const title = creating ? t("addCourse") : t("edit");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="end" tone="panel" title={title} className="overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="border-b border-line px-5 py-4 pe-14">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{t("course")}</p>
            <h2 className="mt-1 text-lg font-semibold">{creating ? t("addCourse") : loc(locale, form.name_ar, form.name_en) || t("edit")}</h2>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
            <Field label={`${t("courseCode")} *`}>
              <Input
                value={form.code}
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                dir="ltr"
                disabled={!creating}
                className="font-mono"
              />
              {!creating ? <p className="text-[11px] text-subtle">{t("codeLocked")}</p> : null}
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={`${t("name")} (AR) *`}>
                <Input value={form.name_ar} onChange={(e) => set("name_ar", e.target.value)} dir="rtl" />
              </Field>
              <Field label={`${t("name")} (EN) *`}>
                <Input value={form.name_en} onChange={(e) => set("name_en", e.target.value)} dir="ltr" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("year")}>
                <Select value={String(form.year_level)} onValueChange={(v) => set("year_level", Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {yearLabel(t, y)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t("semester")}>
                <Select value={String(form.semester)} onValueChange={(v) => set("semester", Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t("semester1")}</SelectItem>
                    <SelectItem value="2">{t("semester2")}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Field label={t("hoursTheory")}>
                <Input
                  type="number"
                  min={0}
                  value={form.hours_theory}
                  onChange={(e) => set("hours_theory", Number(e.target.value) || 0)}
                />
              </Field>
              <Field label={t("hoursLab")}>
                <Input
                  type="number"
                  min={0}
                  value={form.hours_lab}
                  onChange={(e) => set("hours_lab", Number(e.target.value) || 0)}
                />
              </Field>
              <Field label={t("credits")}>
                <Input
                  type="number"
                  min={0}
                  value={form.credits}
                  onChange={(e) => set("credits", Number(e.target.value) || 0)}
                />
              </Field>
            </div>
            <Field label={t("pickInstructor")}>
              <Select value={form.instructor_id ?? "none"} onValueChange={(v) => set("instructor_id", v === "none" ? null : v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("none")}</SelectItem>
                  {faculty.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {loc(locale, p.name_ar, p.name_en)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label={t("prereq")}>
              <Select value={form.prereq ?? "none"} onValueChange={(v) => set("prereq", v === "none" ? null : v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("none")}</SelectItem>
                  {others.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} · {loc(locale, c.name_ar, c.name_en)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={`${t("bio")} (AR)`}>
                <Textarea rows={5} value={form.desc_ar} onChange={(e) => set("desc_ar", e.target.value)} dir="rtl" />
              </Field>
              <Field label={`${t("bio")} (EN)`}>
                <Textarea rows={5} value={form.desc_en} onChange={(e) => set("desc_en", e.target.value)} dir="ltr" />
              </Field>
            </div>
            {save.isError ? <p className="text-sm text-bad">{t("saveFailed")}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4">
            <Button
              className="min-w-28"
              disabled={save.isPending || !form.code.trim() || !form.name_ar.trim() || !form.name_en.trim()}
              onClick={() => save.mutate()}
            >
              {save.isPending ? t("joining") : creating ? t("create") : t("save")}
            </Button>
            {!creating ? (
              <Button
                variant="destructive"
                disabled={remove.isPending}
                onClick={() => {
                  if (window.confirm(t("confirmDelete"))) remove.mutate();
                }}
              >
                {t("delete")}
              </Button>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
