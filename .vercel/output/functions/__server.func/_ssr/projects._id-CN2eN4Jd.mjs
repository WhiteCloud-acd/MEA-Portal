import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, r as Route$2, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader, s as asPerson } from "./shell-DXc7oAuR.mjs";
import { l as getProject, m as listPeople } from "./api-mZgPxTX8.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
import { n as CardContent, t as Card } from "./card-BXJOuR0G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._id-CN2eN4Jd.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectPage() {
	const { id } = Route$2.useParams();
	const { t, locale } = useI18n();
	const q = useQuery({
		queryKey: ["project", id],
		queryFn: () => getProject({ data: id })
	});
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: q.isPending ? t("loading") : t("noResults")
	});
	const p = q.data;
	const all = (people.data ?? []).map(asPerson);
	const students = String(p.student_ids).split(",").map((sid) => all.find((x) => x.id === sid)).filter(Boolean);
	const supervisor = all.find((x) => x.id === p.supervisor_id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: yearLabel(t, Number(p.year_level)),
			title: loc(locale, String(p.title_ar), String(p.title_en)),
			lead: `${t(String(p.status))} · ${p.year_label}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t(String(p.kind) === "graduation" ? "graduation" : String(p.kind) === "course" ? "course" : "researchKind") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "muted",
				children: t(String(p.status))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
			children: t("abstract")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: loc(locale, String(p.abstract_ar), String(p.abstract_en))
		})] }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: t("team")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1",
				children: students.map((s) => s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/people/$id",
					params: { id: s.id },
					className: "text-sm text-accent underline-offset-4 hover:underline",
					children: loc(locale, s.name_ar, s.name_en)
				}) }, s.id) : null)
			})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: t("supervisor")
			}), supervisor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/people/$id",
				params: { id: supervisor.id },
				className: "mt-2 block text-sm text-accent underline-offset-4 hover:underline",
				children: loc(locale, supervisor.name_ar, supervisor.name_en)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: "—"
			})] }) })]
		})
	] });
}
//#endregion
export { ProjectPage as component };
