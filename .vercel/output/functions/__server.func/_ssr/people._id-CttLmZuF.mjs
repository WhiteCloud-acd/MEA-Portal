import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as Pencil } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, i as Route$3, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as initials } from "./utils-boGw2iwM.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, o as asCourse, s as asPerson, u as isStaff } from "./shell-DXc7oAuR.mjs";
import { c as getPerson, d as listCourses, h as listProjects, m as listPeople, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXJOuR0G.mjs";
import { n as PersonFormSheet } from "./editors-Bkado7VQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people._id-CttLmZuF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonPage() {
	const { id } = Route$3.useParams();
	const { t, locale } = useI18n();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const q = useQuery({
		queryKey: ["person", id],
		queryFn: () => getPerson({ data: id })
	});
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const projects = useQuery({
		queryKey: ["projects"],
		queryFn: () => listProjects()
	});
	const courses = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses()
	});
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: q.isPending ? t("loading") : t("noResults")
	});
	const p = asPerson(q.data);
	const name = loc(locale, p.name_ar, p.name_en);
	const all = (people.data ?? []).map(asPerson);
	const catalog = (courses.data ?? []).map(asCourse);
	const advisor = p.advisor_id ? all.find((x) => x.id === p.advisor_id) : null;
	const advisees = all.filter((x) => x.advisor_id === p.id);
	const taught = p.course_codes ? p.course_codes.split(",").filter(Boolean) : [];
	const ownProjects = (projects.data ?? []).filter((pr) => {
		return String(pr.student_ids).split(",").includes(p.id) || pr.supervisor_id === p.id;
	});
	const staff = isStaff(boot.data?.member?.role);
	const kind = p.kind === "faculty" ? "faculty" : "student";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: p.kind === "faculty" ? t("navFaculty") : yearLabel(t, p.year_level),
			title: name,
			lead: p.kind === "faculty" ? loc(locale, p.title_ar, p.title_en) : p.student_no ?? void 0,
			actions: staff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				onClick: () => setEditing(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("edit")]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-14 shrink-0 place-items-center rounded-full bg-accent-soft text-base font-medium text-accent",
					children: initials(name)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: loc(locale, p.bio_ar, p.bio_en)
					}), p.research_ar || p.research_en ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [t("research"), ": "]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: loc(locale, p.research_ar, p.research_en)
						})]
					}) : null]
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("contact") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-2 text-sm",
				children: [
					p.office ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						t("office"),
						": ",
						p.office
					] }) : null,
					p.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						dir: "ltr",
						className: "font-mono text-xs text-muted",
						children: p.email
					}) : null,
					p.cohort ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						t("cohort"),
						": ",
						p.cohort
					] }) : null,
					advisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						t("advisor"),
						":",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/people/$id",
							params: { id: advisor.id },
							className: "text-accent underline-offset-4 hover:underline",
							children: loc(locale, advisor.name_ar, advisor.name_en)
						})
					] }) : null
				]
			})] })]
		}),
		taught.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: t("teaching")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: taught.map((code) => {
					const c = catalog.find((x) => x.code === code);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/courses/$code",
						params: { code },
						className: "rounded-full border border-line bg-surface px-3 py-1.5 text-xs",
						children: [
							code,
							" · ",
							c ? loc(locale, c.name_ar, c.name_en) : code
						]
					}, code);
				})
			})]
		}) : null,
		advisees.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: t("students")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: advisees.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/people/$id",
					params: { id: s.id },
					className: "rounded-full bg-secondary px-3 py-1.5 text-xs",
					children: loc(locale, s.name_ar, s.name_en)
				}, s.id))
			})]
		}) : null,
		ownProjects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: t("projects")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: ownProjects.map((pr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$id",
					params: { id: String(pr.id) },
					className: "rounded-[var(--radius-lg)] border border-line bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 flex gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "muted",
							children: t(String(pr.status))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: loc(locale, String(pr.title_ar), String(pr.title_en))
					})]
				}, String(pr.id)))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonFormSheet, {
			open: editing,
			onOpenChange: setEditing,
			person: p,
			kind
		})
	] });
}
//#endregion
export { PersonPage as component };
