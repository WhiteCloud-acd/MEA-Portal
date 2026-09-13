import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, s as fmtDate, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { f as listEvents } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-CbJ1hvmy.js
var import_jsx_runtime = require_jsx_runtime();
function kindLabel(t, kind) {
	if (kind === "teaching") return t("teachingKind");
	return t(kind);
}
function CalendarPage() {
	const { t, locale } = useI18n();
	const rows = useQuery({
		queryKey: ["events"],
		queryFn: () => listEvents()
	}).data ?? [];
	const months = /* @__PURE__ */ new Map();
	for (const e of rows) {
		const key = String(e.starts_on).slice(0, 7);
		const arr = months.get(key) ?? [];
		arr.push(e);
		months.set(key, arr);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: t("academicYear"),
		title: t("navCalendar")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-8",
		children: [...months.entries()].map(([month, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-3 text-lg font-semibold",
			children: [fmtDate(`${month}-01`, locale).replace(/\d{1,2}\s/, "").replace(/,?\s*\d{4}/, "") || month, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ms-2 font-mono text-sm text-subtle",
				children: month
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "divide-y divide-line rounded-[var(--radius-lg)] border border-line bg-surface",
			children: items.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-36 shrink-0 text-sm text-muted",
						children: fmtDate(String(e.starts_on), locale)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-sm font-medium",
						children: loc(locale, String(e.title_ar), String(e.title_en))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "muted",
							children: kindLabel(t, String(e.kind))
						}), e.year_level != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: yearLabel(t, Number(e.year_level))
						}) : null]
					})
				]
			}, String(e.id)))
		})] }, month))
	})] });
}
//#endregion
export { CalendarPage as component };
