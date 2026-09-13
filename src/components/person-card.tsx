import { Link } from "@tanstack/react-router";
import { loc, useI18n, yearLabel } from "@/lib/i18n";
import type { PersonRec } from "@/lib/member";
import { initials } from "@/lib/utils";

export function PersonCard({ person }: { person: PersonRec }) {
  const { locale, t } = useI18n();
  const name = loc(locale, person.name_ar, person.name_en);
  const sub =
    person.kind === "faculty"
      ? loc(locale, person.title_ar, person.title_en)
      : `${yearLabel(t, person.year_level)}${person.cohort ? ` · ${person.cohort}` : ""}`;
  return (
    <Link
      to="/people/$id"
      params={{ id: person.id }}
      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4 shadow-[var(--shadow-card)] transition-colors hover:border-line-strong"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-medium text-accent">
        {initials(name)}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium text-ink">{name}</span>
        <span className="block truncate text-xs text-muted">{sub}</span>
        {person.student_no ? (
          <span className="mt-0.5 block font-mono text-[11px] text-subtle">{person.student_no}</span>
        ) : null}
      </span>
    </Link>
  );
}
