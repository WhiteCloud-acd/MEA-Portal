import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Plus } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, s as asPerson, u as isStaff } from "./shell-DXc7oAuR.mjs";
import { m as listPeople, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { t as Input } from "./label-CoFsrUaQ.mjs";
import { n as PersonFormSheet } from "./editors-Bkado7VQ.mjs";
import { t as PersonCard } from "./person-card-CRsMXcl1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people-B3hKrCQ2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PeoplePage() {
	const { t } = useI18n();
	const [q, setQ] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("all");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const staff = isStaff(boot.data?.member?.role);
	const allStudents = (people.data ?? []).map(asPerson).filter((p) => p.kind === "student");
	const students = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return allStudents.filter((p) => {
			if (year !== "all" && p.year_level !== year) return false;
			if (!needle) return true;
			return `${p.name_ar} ${p.name_en} ${p.student_no ?? ""}`.toLowerCase().includes(needle);
		});
	}, [
		allStudents,
		q,
		year
	]);
	const grouped = [
		1,
		2,
		3,
		4,
		5
	].map((y) => ({
		y,
		rows: students.filter((s) => s.year_level === y)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("roster"),
			title: t("navStudents"),
			lead: `${allStudents.length} ${t("students")}`,
			actions: staff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setCreating(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("addStudent")]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col gap-3 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: t("searchPeople"),
				className: "sm:max-w-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setYear("all"),
					className: `h-10 rounded-full px-3 text-xs font-medium ${year === "all" ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`,
					children: t("allYears")
				}), [
					1,
					2,
					3,
					4,
					5
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setYear(n),
					className: `h-10 rounded-full px-3 text-xs font-medium ${year === n ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`,
					children: yearLabel(t, n)
				}, n))]
			})]
		}),
		students.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: t("noResults")
		}) : year === "all" ? grouped.filter((g) => g.rows.length).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: yearLabel(t, g.y)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/years/$year",
					params: { year: g.y === 5 ? "alumni" : String(g.y) },
					className: "text-xs text-accent underline-offset-4 hover:underline",
					children: t("viewAll")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: g.rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, { person: p }, p.id))
			})]
		}, g.y)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: students.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, { person: p }, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonFormSheet, {
			open: creating,
			onOpenChange: setCreating,
			person: null,
			kind: "student"
		})
	] });
}
//#endregion
export { PeoplePage as component };
