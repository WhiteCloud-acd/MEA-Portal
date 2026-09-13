import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Plus, o as Pencil } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, o as asCourse, s as asPerson, u as isStaff } from "./shell-DXc7oAuR.mjs";
import { d as listCourses, m as listPeople, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { t as Input } from "./label-CoFsrUaQ.mjs";
import { n as PersonFormSheet, t as CourseFormSheet } from "./editors-Bkado7VQ.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-UZLdiBN7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registry-nadqaeq1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegistryPage() {
	const { t, locale } = useI18n();
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const coursesQ = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses()
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [person, setPerson] = (0, import_react.useState)(null);
	const [personKind, setPersonKind] = (0, import_react.useState)("student");
	const [personOpen, setPersonOpen] = (0, import_react.useState)(false);
	const [course, setCourse] = (0, import_react.useState)(null);
	const [courseOpen, setCourseOpen] = (0, import_react.useState)(false);
	const staff = isStaff(boot.data?.member?.role);
	const needle = q.trim().toLowerCase();
	const all = (people.data ?? []).map(asPerson);
	const catalog = (coursesQ.data ?? []).map(asCourse);
	const students = (0, import_react.useMemo)(() => all.filter((p) => {
		if (p.kind !== "student") return false;
		if (!needle) return true;
		return `${p.name_ar} ${p.name_en} ${p.student_no ?? ""}`.toLowerCase().includes(needle);
	}), [all, needle]);
	const faculty = (0, import_react.useMemo)(() => all.filter((p) => {
		if (p.kind !== "faculty") return false;
		if (!needle) return true;
		return `${p.name_ar} ${p.name_en} ${p.title_ar ?? ""} ${p.title_en ?? ""}`.toLowerCase().includes(needle);
	}), [all, needle]);
	const courseRows = (0, import_react.useMemo)(() => catalog.filter((c) => {
		if (!needle) return true;
		return `${c.code} ${c.name_ar} ${c.name_en}`.toLowerCase().includes(needle);
	}), [catalog, needle]);
	const openPerson = (kind, rec) => {
		setPersonKind(kind);
		setPerson(rec);
		setPersonOpen(true);
	};
	if (!staff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("navRegistry"),
		lead: t("onlyFaculty")
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("sectionAdmin"),
			title: t("navRegistry"),
			lead: t("registryLead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: t("searchPeople"),
				className: "sm:max-w-sm"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "students",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "flex h-auto w-full flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "students",
							children: t("navStudents")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "faculty",
							children: t("navFaculty")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "courses",
							children: t("navCurriculum")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "students",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => openPerson("student", null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("addStudent")]
						})
					}), students.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t("noResults")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface",
						children: students.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/people/$id",
								params: { id: p.id },
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: loc(locale, p.name_ar, p.name_en)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted",
									children: [yearLabel(t, p.year_level), p.student_no ? ` · ${p.student_no}` : ""]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => openPerson("student", p),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("edit")]
							})]
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "faculty",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => openPerson("faculty", null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("addFaculty")]
						})
					}), faculty.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t("noResults")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface",
						children: faculty.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/people/$id",
								params: { id: p.id },
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: loc(locale, p.name_ar, p.name_en)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: loc(locale, p.title_ar, p.title_en) || p.office || ""
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => openPerson("faculty", p),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("edit")]
							})]
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "courses",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								setCourse(null);
								setCourseOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("addCourse")]
						})
					}), courseRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t("noResults")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface",
						children: courseRows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/courses/$code",
								params: { code: c.code },
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: loc(locale, c.name_ar, c.name_en)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted",
									children: [
										c.code,
										" · ",
										yearLabel(t, c.year_level),
										" · ",
										c.semester === 1 ? t("semester1") : t("semester2")
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => {
									setCourse(c);
									setCourseOpen(true);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("edit")]
							})]
						}, c.code))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonFormSheet, {
			open: personOpen,
			onOpenChange: setPersonOpen,
			person,
			kind: personKind
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseFormSheet, {
			open: courseOpen,
			onOpenChange: setCourseOpen,
			course
		})
	] });
}
//#endregion
export { RegistryPage as component };
