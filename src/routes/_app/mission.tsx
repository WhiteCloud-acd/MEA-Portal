import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GOALS, PROGRAM } from "@/lib/catalog";
import { loc, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_app/mission")({ component: MissionPage });

function MissionPage() {
  const { t, locale } = useI18n();
  return (
    <div>
      <PageHeader kicker={t("program")} title={t("navMission")} lead={t("missionLead")} />
      <Card className="mb-6">
        <CardContent>
          <p className="text-sm leading-relaxed text-muted">{loc(locale, PROGRAM.about_ar, PROGRAM.about_en)}</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{locale === "ar" ? "الرسالة" : "Mission"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted">{loc(locale, PROGRAM.mission_ar, PROGRAM.mission_en)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{locale === "ar" ? "الرؤية" : "Vision"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted">{loc(locale, PROGRAM.vision_ar, PROGRAM.vision_en)}</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="mb-3 mt-8 text-lg font-semibold">{locale === "ar" ? "أهداف الخطة" : "Plan goals"}</h2>
      <ol className="grid gap-3">
        {GOALS.map((g, i) => (
          <li key={g.en} className="flex gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
            <span className="font-mono text-sm text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm leading-relaxed">{locale === "ar" ? g.ar : g.en}</span>
          </li>
        ))}
      </ol>
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">{t("partners")}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[t("partner"), t("ncd"), t("planning")].map((p) => (
            <Card key={p}>
              <CardContent className="py-5 text-sm font-medium">{p}</CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-subtle">
          {t("faculty")} · {t("university")} · {loc(locale, PROGRAM.campus_ar, PROGRAM.campus_en)}
        </p>
      </section>
    </div>
  );
}
