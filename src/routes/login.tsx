import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { SignInGate } from "@/lib/auth/gates";
import { Mark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({ component: Login });

function EmailPasswordForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "فشل تسجيل الدخول");
        setLoading(false);
        return;
      }

      // Success – reload to enter the app
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "حدث خطأ");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@example.com"
          required
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          dir="ltr"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" className="h-11 w-full" disabled={loading}>
        {loading ? "جاري الدخول..." : "دخول"}
      </Button>
    </form>
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
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
            {t("academicYear")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold">{t("signIn")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            أدخل البريد الإلكتروني وكلمة المرور التي حصلت عليها
          </p>

          <div className="mt-8">
            <SignInGate fallback={<EmailPasswordForm />}>
              <Navigate to="/" />
            </SignInGate>
          </div>
        </div>
      </section>
    </main>
  );
}
