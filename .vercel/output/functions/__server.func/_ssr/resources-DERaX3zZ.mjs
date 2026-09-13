import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { _ as listResources } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
import { n as CardContent, t as Card } from "./card-BXJOuR0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-DERaX3zZ.js
var import_jsx_runtime = require_jsx_runtime();
function kindKey(k) {
	if (k === "software") return "software";
	if (k === "data") return "data";
	if (k === "lab") return "labKind";
	return "reading";
}
function ResourcesPage() {
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["resources"],
		queryFn: () => listResources()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("navResources"),
		lead: t("resourcesLead")
	}), [
		"software",
		"data",
		"reading",
		"lab"
	].map((g) => {
		const items = (q.data ?? []).filter((r) => r.kind === g);
		if (items.length === 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: t(kindKey(g))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: loc(locale, String(r.title_ar), String(r.title_en))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: loc(locale, String(r.note_ar), String(r.note_en))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-wrap gap-2",
						children: [r.year_level != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: yearLabel(t, Number(r.year_level))
						}) : null, r.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: String(r.url),
							target: "_blank",
							rel: "noreferrer",
							className: "text-xs text-accent underline-offset-4 hover:underline",
							children: String(r.url).replace(/^https?:\/\//, "").split("/")[0]
						}) : null]
					})]
				}) }, String(r.id)))
			})]
		}, g);
	})] });
}
//#endregion
export { ResourcesPage as component };
