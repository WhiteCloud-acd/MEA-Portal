import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { h as listProjects } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-BmZJefkc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function kindKey(k) {
	if (k === "graduation") return "graduation";
	if (k === "course") return "course";
	return "researchKind";
}
function ProjectsPage() {
	const { t, locale } = useI18n();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const rows = (useQuery({
		queryKey: ["projects"],
		queryFn: () => listProjects()
	}).data ?? []).filter((p) => filter === "all" ? true : p.status === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("firstCohort"),
			title: t("navProjects"),
			lead: t("missionLead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [
				"all",
				"defended",
				"ongoing",
				"proposed"
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(s),
				className: `h-9 rounded-full px-3 text-xs font-medium ${filter === s ? "bg-accent text-accent-fg" : "bg-secondary text-muted"}`,
				children: s === "all" ? t("viewAll") : t(s)
			}, s))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/projects/$id",
				params: { id: String(p.id) },
				className: "rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-card)] hover:border-line-strong",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "muted",
								children: t(kindKey(String(p.kind)))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(String(p.status)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: yearLabel(t, Number(p.year_level))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: loc(locale, String(p.title_ar), String(p.title_en))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 line-clamp-2 text-sm text-muted",
						children: loc(locale, String(p.abstract_ar), String(p.abstract_en))
					})
				]
			}, String(p.id)))
		})
	] });
}
//#endregion
export { ProjectsPage as component };
