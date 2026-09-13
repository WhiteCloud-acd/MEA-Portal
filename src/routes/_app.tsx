import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell, ShellSkeleton } from "@/components/shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { Member } from "@/lib/member";
import { getBootstrap } from "@/lib/server/api";

export const Route = createFileRoute("/_app")({ component: AppLayout });

function AppLayout() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const boot = useQuery({
    queryKey: ["bootstrap"],
    queryFn: () => getBootstrap(),
    enabled: Boolean(user),
  });

  if (isPending) return <ShellSkeleton />;
  if (!user) return <RedirectToSignIn />;
  if (boot.isPending) return <ShellSkeleton />;

  const member = (boot.data?.member ?? null) as Member | null;
  if (!member && pathname !== "/join") return <Navigate to="/join" />;

  return (
    <AppShell member={member}>
      <Outlet />
    </AppShell>
  );
}
