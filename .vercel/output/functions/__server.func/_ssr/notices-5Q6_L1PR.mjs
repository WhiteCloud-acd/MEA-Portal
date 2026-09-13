import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, s as fmtDate, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { p as listNotices } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notices-5Q6_L1PR.js
var import_jsx_runtime = require_jsx_runtime();
function NoticesPage() {
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["notices"],
		queryFn: () => listNotices()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("navNotices"),
		lead: t("closedNote")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-3",
		children: (q.data ?? []).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/notices/$id",
			params: { id: String(n.id) },
			className: "rounded-[var(--radius-xl)] border border-line bg-surface p-5 shadow-[var(--shadow-card)] hover:border-line-strong",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex flex-wrap items-center gap-2",
					children: [
						n.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("pinned") }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "muted",
							children: t(String(n.category))
						}),
						n.year_level != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: yearLabel(t, Number(n.year_level))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: t("allYears")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-subtle",
							children: fmtDate(String(n.published_at), locale)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: loc(locale, String(n.title_ar), String(n.title_en))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted",
					children: loc(locale, String(n.body_ar), String(n.body_en))
				})
			]
		}, String(n.id)))
	})] });
}
//#endregion
export { NoticesPage as component };
