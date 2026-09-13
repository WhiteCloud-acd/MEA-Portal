import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { PersonFormSheet } from "@/components/editors";
import { PersonCard } from "@/components/person-card";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n, yearLabel } from "@/lib/i18n";
import { asPerson, isStaff } from "@/lib/member";
import { getBootstrap, listPeople } from "@/lib/server/api";

export const Route = createFileRoute("/_app/people")({ component: PeoplePage });

function PeoplePage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [creating, setCreating] = useState(false);
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const staff = isStaff(boot.data?.member?.role);
  const allStudents = (people.data ?? []).map(asPerson).filter((p) => p.kind === "student");
  const students = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return allStudents.filter((p) => {
      if (year !== "all" && p.year_level !== year) return false;
      if (!needle) return true;
      const blob = `${p.name_ar} ${p.name_en} ${p.student_no ?? ""}`.toLowerCase();
      return blob.includes(needle);
    });
  }, [allStudents, q, year]);

  const grouped = [1, 2, 3, 4, 5].map((y) => ({
    y,
    rows: students.filter((s) => s.year_level === y),
  }));

  return (
    <div>
      <PageHeader
        kicker={t("roster")}
        title={t("navStudents")}
        lead={`${allStudents.length} ${t("students")}`}
        actions={
          staff ? (
            <Button onClick={() => setCreating(true)}>
              <Plus />
              {t("addStudent")}
            </Button>
          ) : null
        }
      />
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPeople")} className="sm:max-w-sm" />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setYear("all")} className={`h-10 rounded-full px-3 text-xs font-medium ${year === "all" ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`}>
            {t("allYears")}
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setYear(n)} className={`h-10 rounded-full px-3 text-xs font-medium ${year === n ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`}>
              {yearLabel(t, n)}
            </button>
          ))}
        </div>
      </div>
      {students.length === 0 ? (
        <p className="text-sm text-muted">{t("noResults")}</p>
      ) : year === "all" ? (
        grouped
          .filter((g) => g.rows.length)
          .map((g) => (
            <section key={g.y} className="mb-8">
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-lg font-semibold">{yearLabel(t, g.y)}</h2>
                <Link to="/years/$year" params={{ year: g.y === 5 ? "alumni" : String(g.y) }} className="text-xs text-accent underline-offset-4 hover:underline">
                  {t("viewAll")}
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.rows.map((p) => (
                  <PersonCard key={p.id} person={p} />
                ))}
              </div>
            </section>
          ))
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </div>
      )}
      <PersonFormSheet open={creating} onOpenChange={setCreating} person={null} kind="student" />
    </div>
  );
}
