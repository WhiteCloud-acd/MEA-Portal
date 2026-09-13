import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  Compass,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Library,
  Menu,
  Megaphone,
  PenLine,
  ScrollText,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Mark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@/lib/auth/gates";
import { useI18n, yearLabel } from "@/lib/i18n";
import { isStaff, type Member } from "@/lib/member";
import { cn } from "@/lib/utils";

type NavItem = { to: string; key: string; icon: typeof LayoutDashboard; match?: string };

function navItems(member: Member | null): { labelKey: string; items: NavItem[] }[] {
  const yearTo =
    member?.role === "student" && member.year_level
      ? member.year_level === 5
        ? "/years/alumni"
        : `/years/${member.year_level}`
      : "/years/1";
  const groups: { labelKey: string; items: NavItem[] }[] = [
    {
      labelKey: "sectionStudy",
      items: [
        { to: "/", key: "navHome", icon: LayoutDashboard },
        { to: yearTo, key: "navYear", icon: GraduationCap, match: "/years" },
        { to: "/curriculum", key: "navCurriculum", icon: BookOpen },
        { to: "/grades", key: "navGrades", icon: ClipboardList },
        { to: "/calendar", key: "navCalendar", icon: CalendarDays },
      ],
    },
    {
      labelKey: "sectionCommunity",
      items: [
        { to: "/people", key: "navStudents", icon: Users },
        { to: "/faculty", key: "navFaculty", icon: Users },
        { to: "/projects", key: "navProjects", icon: FolderKanban },
      ],
    },
    {
      labelKey: "sectionProgram",
      items: [
        { to: "/notices", key: "navNotices", icon: Megaphone },
        { to: "/charter", key: "navCharter", icon: ScrollText },
        { to: "/mission", key: "navMission", icon: Compass },
        { to: "/resources", key: "navResources", icon: Library },
      ],
    },
  ];
  if (isStaff(member?.role)) {
    groups.push({
      labelKey: "sectionAdmin",
      items: [{ to: "/registry", key: "navRegistry", icon: PenLine }],
    });
  }
  return groups;
}

function isActive(pathname: string, item: NavItem) {
  if (item.match) return pathname.startsWith(item.match);
  if (item.to === "/") return pathname === "/";
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

function NavLinks({
  member,
  onNavigate,
}: {
  member: Member | null;
  onNavigate?: () => void;
}) {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-5 px-3 pb-8">
      {navItems(member).map((group) => (
        <div key={group.labelKey}>
          <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-sidebar-muted">
            {t(group.labelKey)}
          </p>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item);
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-[var(--radius-sm)] px-3 text-sm transition-colors",
                    active
                      ? "bg-sidebar-hover text-sidebar-fg"
                      : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg",
                  )}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                  <span>{t(item.key)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function BrandBlock() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex items-center gap-3 px-5 py-5">
      <Mark />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-sidebar-fg">{t("app")}</span>
        <span className="block truncate text-[11px] text-sidebar-muted">{t("program")}</span>
      </span>
    </Link>
  );
}

function SidebarBody({ member, onNavigate }: { member: Member | null; onNavigate?: () => void }) {
  const { t, locale } = useI18n();
  return (
    <>
      <BrandBlock />
      <p className="px-5 pb-4 text-[11px] leading-relaxed text-sidebar-muted">
        {t("faculty")} · {t("university")}
      </p>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <NavLinks member={member} onNavigate={onNavigate} />
      </div>
      <div className="border-t border-sidebar-line p-4">
        {member ? (
          <Link to="/profile" onClick={onNavigate} className="mb-3 block rounded-[var(--radius-sm)] px-1">
            <p className="truncate text-sm font-medium text-sidebar-fg">
              {locale === "ar" ? member.name_ar : member.name_en}
            </p>
            <p className="truncate text-[11px] text-sidebar-muted">
              {t(
                member.role === "faculty"
                  ? "roleFaculty"
                  : member.role === "coordinator"
                    ? "roleCoordinator"
                    : "roleStudent",
              )}
              {member.role === "student" && member.year_level ? ` · ${yearLabel(t, member.year_level)}` : null}
            </p>
          </Link>
        ) : null}
        <div className="text-sidebar-fg [&_button]:text-sidebar-muted [&_span]:text-sidebar-fg">
          <UserButton />
        </div>
      </div>
    </>
  );
}

export function AppShell({
  member,
  children,
}: {
  member: Member | null;
  children: ReactNode;
}) {
  const { t, toggle } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-dvh bg-bg">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-sidebar lattice-dark md:flex">
        <SidebarBody member={member} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-line bg-bg/90 px-3 backdrop-blur md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="start" className="p-0">
              <div className="flex h-full flex-col">
                <SidebarBody member={member} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-muted">{t("academicYear")}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={toggle} className="shrink-0">
            {t("language")}
          </Button>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        <footer className="border-t border-line px-4 py-4 text-center text-[11px] text-subtle md:px-8">
          {t("closedNote")} · {t("baramkeh")}
        </footer>
        <nav className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface md:hidden">
          {[
            { to: "/", icon: LayoutDashboard, key: "navHome" },
            { to: member?.role === "student" && member.year_level ? (member.year_level === 5 ? "/years/alumni" : `/years/${member.year_level}`) : "/years/1", icon: GraduationCap, key: "navYear" },
            { to: "/grades", icon: ClipboardList, key: "navGrades" },
            { to: "/notices", icon: Megaphone, key: "navNotices" },
          ].map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to.replace(/\/\d+$/, "")) || pathname === item.to;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 text-[10px]",
                  active ? "text-accent" : "text-muted",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  lead,
  actions,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {kicker ? <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-subtle">{kicker}</p> : null}
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h1>
        {lead ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{lead}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function ShellSkeleton() {
  return (
    <div className="flex min-h-dvh bg-bg">
      <div className="hidden w-64 bg-sidebar md:block" />
      <div className="flex-1 p-8">
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="mb-3 h-24 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
