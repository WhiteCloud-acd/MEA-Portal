import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, n as Route$1, u as yearLabel } from "./router-CWYVQirn.mjs";
import { d as yearFromParam, n as PageHeader, o as asCourse, s as asPerson } from "./shell-DXc7oAuR.mjs";
import { d as listCourses, h as listProjects, m as listPeople } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXJOuR0G.mjs";
import { t as COHORTS } from "./types-XAPqpnyM.mjs";
import { t as PersonCard } from "./person-card-CRsMXcl1.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-UZLdiBN7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/years._year-DuvW2_Yx.js
var import_jsx_runtime = require_jsx_runtime();
function YearPage() {
	const { year } = Route$1.useParams();
	const y = yearFromParam(year);
	const { t, locale } = useI18n();
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const projects = useQuery({
		queryKey: ["projects"],
		queryFn: () => listProjects()
	});
	const coursesQ = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses()
	});
	const students = (people.data ?? []).map(asPerson).filter((p) => p.kind === "student" && p.year_level === y);
	const advisors = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty").filter((f) => students.some((s) => s.advisor_id === f.id));
	const courses = (coursesQ.data ?? []).map(asCourse).filter((c) => y === 5 ? c.year_level === 4 : c.year_level === y);
	const yearProjects = (projects.data ?? []).filter((p) => Number(p.year_level) === y);
	const cohort = COHORTS[y];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: `${t("cohort")} ${cohort?.years ?? ""}`,
		title: yearLabel(t, y),
		lead: y === 5 ? t("firstCohort") : `${students.length} ${t("students")} · ${courses.length} ${t("courses")}`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				1,
				2,
				3,
				4,
				5
			].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/years/$year",
				params: { year: n === 5 ? "alumni" : String(n) },
				className: `inline-flex h-9 items-center rounded-full px-3 text-xs font-medium ${n === y ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`,
				children: yearLabel(t, n)
			}, n))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "people",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
				className: "flex h-auto w-full flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "people",
						children: t("students")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "plan",
						children: t("navCurriculum")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "projects",
						children: t("projects")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "people",
				children: [advisors.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 text-sm text-muted",
					children: [
						t("advisor"),
						": ",
						advisors.map((a) => loc(locale, a.name_ar, a.name_en)).join(" · ")
					]
				}) : null, students.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t("emptyYear")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: students.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, { person: p }, p.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "plan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [1, 2].map((sem) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: sem === 1 ? t("semester1") : t("semester2") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "flex flex-col gap-2",
						children: courses.filter((c) => c.semester === sem).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses/$code",
							params: { code: c.code },
							className: "flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-line bg-raised px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-[11px] text-subtle",
								children: c.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: loc(locale, c.name_ar, c.name_en)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-xs text-muted",
								children: [
									c.hours_theory,
									"+",
									c.hours_lab
								]
							})]
						}, c.code))
					})] }, sem))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "projects",
				children: yearProjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t("noResults")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: yearProjects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects/$id",
						params: { id: String(p.id) },
						className: "rounded-[var(--radius-lg)] border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "muted",
									children: t(String(p.kind) === "graduation" ? "graduation" : String(p.kind) === "course" ? "course" : "researchKind")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(String(p.status)) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: loc(locale, String(p.title_ar), String(p.title_en))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted",
								children: loc(locale, String(p.abstract_ar), String(p.abstract_en))
							})
						]
					}, String(p.id)))
				})
			})
		]
	})] });
}
//#endregion
export { YearPage as component };
