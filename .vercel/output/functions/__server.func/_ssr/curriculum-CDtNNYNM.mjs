import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Plus } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, o as asCourse, u as isStaff } from "./shell-DXc7oAuR.mjs";
import { d as listCourses, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXJOuR0G.mjs";
import { t as CourseFormSheet } from "./editors-Bkado7VQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/curriculum-CDtNNYNM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CurriculumPage() {
	const { t, locale } = useI18n();
	const [creating, setCreating] = (0, import_react.useState)(false);
	const q = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses()
	});
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const courses = (q.data ?? []).map(asCourse);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("program"),
			title: t("navCurriculum"),
			lead: t("youDecide"),
			actions: isStaff(boot.data?.member?.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setCreating(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("addCourse")]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-8",
			children: [
				1,
				2,
				3,
				4
			].map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: yearLabel(t, year)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/years/$year",
					params: { year: String(year) },
					className: "text-xs text-accent underline-offset-4 hover:underline",
					children: t("myYear")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [1, 2].map((sem) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: sem === 1 ? t("semester1") : t("semester2") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-start text-xs text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: t("code")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: t("name")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-2 font-medium",
									children: t("hours")
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: courses.filter((c) => c.year_level === year && c.semester === sem).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pe-2 font-mono text-[11px] text-subtle",
									children: c.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pe-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/courses/$code",
										params: { code: c.code },
										className: "hover:text-accent",
										children: loc(locale, c.name_ar, c.name_en)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 font-mono text-xs tabular-nums text-muted",
									children: [
										c.hours_theory,
										"+",
										c.hours_lab
									]
								})
							]
						}, c.code)) })]
					})
				})] }, sem))
			})] }, year))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseFormSheet, {
			open: creating,
			onOpenChange: setCreating,
			course: null
		})
	] });
}
//#endregion
export { CurriculumPage as component };
