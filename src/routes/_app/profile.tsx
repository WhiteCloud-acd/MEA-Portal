import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n, yearLabel } from "@/lib/i18n";
import { getBootstrap, updateMember } from "@/lib/server/api";

export const Route = createFileRoute("/_app/profile")({ component: ProfilePage });

function ProfilePage() {
  const { t } = useI18n();
  const qc = useQueryClient();
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const m = boot.data?.member;
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [bioAr, setBioAr] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [office, setOffice] = useState("");
  useEffect(() => {
    if (!m) return;
    setNameAr(m.name_ar);
    setNameEn(m.name_en);
    setBioAr(m.bio_ar ?? "");
    setBioEn(m.bio_en ?? "");
    setTitleAr(m.title_ar ?? "");
    setTitleEn(m.title_en ?? "");
    setOffice(m.office ?? "");
  }, [m]);
  const mut = useMutation({
    mutationFn: () =>
      updateMember({
        data: {
          name_ar: nameAr,
          name_en: nameEn,
          bio_ar: bioAr,
          bio_en: bioEn,
          title_ar: titleAr,
          title_en: titleEn,
          office,
        },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bootstrap"] }),
  });
  if (!m) return <p className="text-sm text-muted">{t("loading")}</p>;
  return (
    <div>
      <PageHeader title={t("navProfile")} lead={t("profileHint")} />
      <Card>
        <CardContent className="grid gap-4">
          <p className="text-sm text-muted">
            {t("role")}:{" "}
            {t(m.role === "faculty" ? "roleFaculty" : m.role === "coordinator" ? "roleCoordinator" : "roleStudent")}
            {m.year_level ? ` · ${yearLabel(t, m.year_level)}` : ""}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>{t("yourNameAr")}</Label>
              <Input value={nameAr} onChange={(e) => setNameAr(e.target.value)} dir="rtl" />
            </div>
            <div className="grid gap-2">
              <Label>{t("yourNameEn")}</Label>
              <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} dir="ltr" />
            </div>
          </div>
          {m.role !== "student" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label>{t("title")} (AR)</Label>
                <Input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} dir="rtl" />
              </div>
              <div className="grid gap-2">
                <Label>{t("title")} (EN)</Label>
                <Input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} dir="ltr" />
              </div>
              <div className="grid gap-2">
                <Label>{t("office")}</Label>
                <Input value={office} onChange={(e) => setOffice(e.target.value)} />
              </div>
            </div>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>{t("bio")} (AR)</Label>
              <Textarea value={bioAr} onChange={(e) => setBioAr(e.target.value)} dir="rtl" rows={4} />
            </div>
            <div className="grid gap-2">
              <Label>{t("bio")} (EN)</Label>
              <Textarea value={bioEn} onChange={(e) => setBioEn(e.target.value)} dir="ltr" rows={4} />
            </div>
          </div>
          <Button className="sm:w-40" disabled={mut.isPending} onClick={() => mut.mutate()}>
            {mut.isSuccess ? t("saved") : t("updateProfile")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
