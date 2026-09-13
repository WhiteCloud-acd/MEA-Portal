import { createFileRoute, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { SignInGate } from "@/lib/auth/gates";
import { Mark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({ component: Login });

function ProviderButtons() {
  const { t } = useI18n();
  return (
    <div className="flex w-full flex-col gap-2">
      {GROK_PROVIDERS.map((p) => (
        <Button
          key={p.providerId}
          type="button"
          variant={p.idp === "google" ? "default" : "outline"}
          className="h-11 w-full"
          onClick={() => signIn(p.providerId, { callbackURL: "/" })}
        >
          {p.idp === "google" ? t("continueGoogle") : t("continueX")}
        </Button>
      ))}
    </div>
  );
}

function Login() {
  const { t, toggle } = useI18n();
  return (
    <main className="grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <section className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-fg lattice-dark lg:flex">
        <div className="flex items-center gap-3">
          <Mark />
          <span className="text-sm font-medium">{t("app")}</span>
        </div>
        <div className="max-w-md">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-sidebar-muted">
            {t("faculty")} · {t("university")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">{t("program")}</h1>
          <p className="mt-4 text-sm leading-relaxed text-sidebar-muted">{t("internal")}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-sidebar-muted">4</dt>
              <dd className="text-xs text-sidebar-muted">{t("year")}</dd>
            </div>
            <div>
              <dt className="text-sidebar-muted">{t("partner")}</dt>
              <dd className="text-xs text-sidebar-muted">{t("ncd")}</dd>
            </div>
            <div>
              <dt className="text-sidebar-muted">{t("baramkeh")}</dt>
              <dd className="text-xs text-sidebar-muted">2022—</dd>
            </div>
          </dl>
        </div>
        <p className="text-xs text-sidebar-muted">{t("closedNote")}</p>
      </section>
      <section className="flex flex-col bg-bg px-6 py-8 md:px-12">
        <div className="mb-10 flex items-center justify-between lg:justify-end">
          <div className="flex items-center gap-2 lg:hidden">
            <Mark />
            <span className="text-sm font-semibold">{t("app")}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={toggle}>
            {t("language")}
          </Button>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">{t("academicYear")}</p>
          <h2 className="mt-3 text-2xl font-semibold">{t("signIn")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t("signInHint")}</p>
          <div className="mt-8 min-h-28">
            <SignInGate fallback={<ProviderButtons />}>
              <Navigate to="/" />
            </SignInGate>
          </div>
        </div>
      </section>
    </main>
  );
}
