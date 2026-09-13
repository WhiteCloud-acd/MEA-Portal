import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PersonFormSheet } from "@/components/editors";
import { PersonCard } from "@/components/person-card";
import { PageHeader } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { asPerson, isStaff } from "@/lib/member";
import { getBootstrap, listPeople } from "@/lib/server/api";

export const Route = createFileRoute("/_app/faculty")({ component: FacultyPage });

function FacultyPage() {
  const { t } = useI18n();
  const [creating, setCreating] = useState(false);
  const people = useQuery({ queryKey: ["people"], queryFn: () => listPeople() });
  const boot = useQuery({ queryKey: ["bootstrap"], queryFn: () => getBootstrap() });
  const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty");
  return (
    <div>
      <PageHeader
        kicker={t("faculty")}
        title={t("navFaculty")}
        lead={t("youDecide")}
        actions={
          isStaff(boot.data?.member?.role) ? (
            <Button onClick={() => setCreating(true)}>
              <Plus />
              {t("addFaculty")}
            </Button>
          ) : null
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {faculty.map((p) => (
          <PersonCard key={p.id} person={p} />
        ))}
      </div>
      <PersonFormSheet open={creating} onOpenChange={setCreating} person={null} kind="faculty" />
    </div>
  );
}
