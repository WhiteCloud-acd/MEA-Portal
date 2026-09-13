import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { g as listRegulations } from "./api-mZgPxTX8.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXJOuR0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/charter-Cc-1Lcsl.js
var import_jsx_runtime = require_jsx_runtime();
function CharterPage() {
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["regulations"],
		queryFn: () => listRegulations()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("navCharter"),
		lead: t("charterLead")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-4",
		children: (q.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-mono text-subtle",
			children: String(r.chapter).padStart(2, "0")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: loc(locale, String(r.title_ar), String(r.title_en)) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: loc(locale, String(r.body_ar), String(r.body_en))
		}) })] }, String(r.id)))
	})] });
}
//#endregion
export { CharterPage as component };
