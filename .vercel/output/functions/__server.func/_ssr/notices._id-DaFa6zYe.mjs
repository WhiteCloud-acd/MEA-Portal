import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Route$4, c as loc, l as useI18n, s as fmtDate, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { s as getNotice } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
import { n as CardContent, t as Card } from "./card-BXJOuR0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notices._id-DaFa6zYe.js
var import_jsx_runtime = require_jsx_runtime();
function NoticePage() {
	const { id } = Route$4.useParams();
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["notice", id],
		queryFn: () => getNotice({ data: id })
	});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: q.isPending ? t("loading") : t("noResults")
	});
	const n = q.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: fmtDate(String(n.published_at), locale),
			title: loc(locale, String(n.title_ar), String(n.title_en))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
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
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "whitespace-pre-line text-sm leading-relaxed text-muted",
			children: loc(locale, String(n.body_ar), String(n.body_en))
		}) }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/notices",
			className: "mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline",
			children: t("viewAll")
		})
	] });
}
//#endregion
export { NoticePage as component };
