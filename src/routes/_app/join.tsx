import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import { asPerson } from "@/lib/member";
import { getBootstrap, joinProgram, listPeople } from "@/lib/server/api";

export const Route = createFileRoute("/_app/join")({ component: JoinPage });

function JoinPage() {
  const { t, locale } = useI18n();
  const user = useCurrentUser();
  const nav = useNavigate();
  const qc = useQueryClient();
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const display = user?.displayName ?? "";
  const [role, setRole] = useState<"student" | "faculty" | "coordinator">("student");
  const [year, setYear] = useState("1");
  const [nameAr, setNameAr] = useState(display);
  const [nameEn, setNameEn] = useState(display);
  const [personId, setPersonId] = useState("none");

  const roster = useMemo(() => {
    const rows = (people.data ?? []).map(asPerson);
    if (role === "student") {
      const y = Number(year);
      return rows.filter((p) => p.kind === "student" && p.year_level === y);
    }
    if (role === "faculty" || role === "coordinator") {
      return rows.filter((p) => p.kind === "faculty");
    }
    return [];
  }, [people.data, role, year]);

  const mut = useMutation({
    mutationFn: () =>
      joinProgram({
        data: {
          role,
          name_ar: nameAr,
          name_en: nameEn,
          year_level: role === "student" ? Number(year) : null,
          person_id: personId === "none" ? null : personId,
        },
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["bootstrap"] });
      nav({ to: "/" });
    },
  });

  if (boot.data?.member) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <PageHeader kicker={t("app")} title={t("joinTitle")} lead={t("joinLead")} />
      <Card>
        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label>{t("role")}</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(["student", "faculty", "coordinator"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`h-11 rounded-[var(--radius-md)] border text-sm font-medium ${
                    role === r ? "border-accent bg-accent-soft text-accent" : "border-line bg-raised text-ink"
                  }`}
                >
                  {t(r === "student" ? "roleStudent" : r === "faculty" ? "roleFaculty" : "roleCoordinator")}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="nar">{t("yourNameAr")}</Label>
              <Input id="nar" value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nen">{t("yourNameEn")}</Label>
              <Input id="nen" value={nameEn} onChange={(e) => setNameEn(e.target.value)} dir="ltr" />
            </div>
          </div>
          {role === "student" || role === "faculty" || role === "coordinator" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {role === "student" ? (
                <div className="grid gap-2">
                  <Label>{t("pickYear")}</Label>
                  <Select value={year} onValueChange={setYear}>
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
                </div>
              ) : null}
              <div className="grid gap-2">
                <Label>{role === "student" ? t("linkedRoster") : t("linkedFaculty")}</Label>
                <Select value={personId} onValueChange={setPersonId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("none")}</SelectItem>
                    {roster.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {loc(locale, p.name_ar, p.name_en)}
                        {p.student_no ? ` · ${p.student_no}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : null}
          <Button
            className="h-11 sm:w-56"
            disabled={mut.isPending || !nameAr.trim()}
            onClick={() => mut.mutate()}
          >
            {mut.isPending ? t("joining") : t("joinCta")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
