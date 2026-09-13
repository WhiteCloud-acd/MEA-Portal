import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { CourseFormSheet, PersonFormSheet } from "@/components/editors";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asCourse, asPerson, isStaff, type CourseRec, type PersonRec } from "@/lib/member";
import { getBootstrap, listCourses, listPeople } from "@/lib/server/api";

export const Route = createFileRoute("/_app/registry")({ component: RegistryPage });

function RegistryPage() {
  const { t, locale } = useI18n();
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const coursesQ = useQuery({ queryKey: ["courses"], queryFn: () => listCourses() });
  const [q, setQ] = useState("");
  const [person, setPerson] = useState<PersonRec | null>(null);
  const [personKind, setPersonKind] = useState<"student" | "faculty">("student");
  const [personOpen, setPersonOpen] = useState(false);
  const [course, setCourse] = useState<CourseRec | null>(null);
  const [courseOpen, setCourseOpen] = useState(false);

  const staff = isStaff(boot.data?.member?.role);
  const needle = q.trim().toLowerCase();
  const all = (people.data ?? []).map(asPerson);
  const catalog = (coursesQ.data ?? []).map(asCourse);

  const students = useMemo(
    () =>
      all.filter((p) => {
        if (p.kind !== "student") return false;
        if (!needle) return true;
        return `${p.name_ar} ${p.name_en} ${p.student_no ?? ""}`.toLowerCase().includes(needle);
      }),
    [all, needle],
  );
  const faculty = useMemo(
    () =>
      all.filter((p) => {
        if (p.kind !== "faculty") return false;
        if (!needle) return true;
        return `${p.name_ar} ${p.name_en} ${p.title_ar ?? ""} ${p.title_en ?? ""}`.toLowerCase().includes(needle);
      }),
    [all, needle],
  );
  const courseRows = useMemo(
    () =>
      catalog.filter((c) => {
        if (!needle) return true;
        return `${c.code} ${c.name_ar} ${c.name_en}`.toLowerCase().includes(needle);
      }),
    [catalog, needle],
  );

  const openPerson = (kind: "student" | "faculty", rec: PersonRec | null) => {
    setPersonKind(kind);
    setPerson(rec);
    setPersonOpen(true);
  };

  if (!staff) {
    return (
      <div>
        <PageHeader title={t("navRegistry")} lead={t("onlyFaculty")} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader kicker={t("sectionAdmin")} title={t("navRegistry")} lead={t("registryLead")} />
      <div className="mb-4">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPeople")} className="sm:max-w-sm" />
      </div>
      <Tabs defaultValue="students">
        <TabsList className="flex h-auto w-full flex-wrap">
          <TabsTrigger value="students">{t("navStudents")}</TabsTrigger>
          <TabsTrigger value="faculty">{t("navFaculty")}</TabsTrigger>
          <TabsTrigger value="courses">{t("navCurriculum")}</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => openPerson("student", null)}>
              <Plus />
              {t("addStudent")}
            </Button>
          </div>
          {students.length === 0 ? (
            <p className="text-sm text-muted">{t("noResults")}</p>
          ) : (
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
              {students.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <Link to="/people/$id" params={{ id: p.id }} className="min-w-0 flex-1">
                    <p className="truncate font-medium">{loc(locale, p.name_ar, p.name_en)}</p>
                    <p className="truncate text-xs text-muted">
                      {yearLabel(t, p.year_level)}
                      {p.student_no ? ` · ${p.student_no}` : ""}
                    </p>
                  </Link>
                  <Button size="sm" variant="secondary" onClick={() => openPerson("student", p)}>
                    <Pencil />
                    {t("edit")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="faculty">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => openPerson("faculty", null)}>
              <Plus />
              {t("addFaculty")}
            </Button>
          </div>
          {faculty.length === 0 ? (
            <p className="text-sm text-muted">{t("noResults")}</p>
          ) : (
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
              {faculty.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <Link to="/people/$id" params={{ id: p.id }} className="min-w-0 flex-1">
                    <p className="truncate font-medium">{loc(locale, p.name_ar, p.name_en)}</p>
                    <p className="truncate text-xs text-muted">{loc(locale, p.title_ar, p.title_en) || p.office || ""}</p>
                  </Link>
                  <Button size="sm" variant="secondary" onClick={() => openPerson("faculty", p)}>
                    <Pencil />
                    {t("edit")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="courses">
          <div className="mb-3 flex justify-end">
            <Button
              onClick={() => {
                setCourse(null);
                setCourseOpen(true);
              }}
            >
              <Plus />
              {t("addCourse")}
            </Button>
          </div>
          {courseRows.length === 0 ? (
            <p className="text-sm text-muted">{t("noResults")}</p>
          ) : (
            <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
              {courseRows.map((c) => (
                <li key={c.code} className="flex items-center gap-3 px-4 py-3">
                  <Link to="/courses/$code" params={{ code: c.code }} className="min-w-0 flex-1">
                    <p className="truncate font-medium">{loc(locale, c.name_ar, c.name_en)}</p>
                    <p className="truncate text-xs text-muted">
                      {c.code} · {yearLabel(t, c.year_level)} · {c.semester === 1 ? t("semester1") : t("semester2")}
                    </p>
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setCourse(c);
                      setCourseOpen(true);
                    }}
                  >
                    <Pencil />
                    {t("edit")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
      <PersonFormSheet open={personOpen} onOpenChange={setPersonOpen} person={person} kind={personKind} />
      <CourseFormSheet open={courseOpen} onOpenChange={setCourseOpen} course={course} />
    </div>
  );
}
