import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as loc, l as useI18n } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXJOuR0G.mjs";
import { n as PROGRAM } from "./types-XAPqpnyM.mjs";
import { n as GOALS } from "./content-DqdwPZEu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mission-DA6kyfQZ.js
var import_jsx_runtime = require_jsx_runtime();
function MissionPage() {
	const { t, locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("program"),
			title: t("navMission"),
			lead: t("missionLead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: loc(locale, PROGRAM.about_ar, PROGRAM.about_en)
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: locale === "ar" ? "الرسالة" : "Mission" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: loc(locale, PROGRAM.mission_ar, PROGRAM.mission_en)
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: locale === "ar" ? "الرؤية" : "Vision" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: loc(locale, PROGRAM.vision_ar, PROGRAM.vision_en)
			}) })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 mt-8 text-lg font-semibold",
			children: locale === "ar" ? "أهداف الخطة" : "Plan goals"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-3",
			children: GOALS.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-sm text-subtle",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm leading-relaxed",
					children: locale === "ar" ? g.ar : g.en
				})]
			}, g.en))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-lg font-semibold",
					children: t("partners")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						t("partner"),
						t("ncd"),
						t("planning")
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-5 text-sm font-medium",
						children: p
					}) }, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-subtle",
					children: [
						t("faculty"),
						" · ",
						t("university"),
						" · ",
						loc(locale, PROGRAM.campus_ar, PROGRAM.campus_en)
					]
				})
			]
		})
	] });
}
//#endregion
export { MissionPage as component };
