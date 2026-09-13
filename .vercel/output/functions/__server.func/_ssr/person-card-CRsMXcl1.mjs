import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as initials } from "./utils-boGw2iwM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/person-card-CRsMXcl1.js
var import_jsx_runtime = require_jsx_runtime();
function PersonCard({ person }) {
	const { locale, t } = useI18n();
	const name = loc(locale, person.name_ar, person.name_en);
	const sub = person.kind === "faculty" ? loc(locale, person.title_ar, person.title_en) : `${yearLabel(t, person.year_level)}${person.cohort ? ` · ${person.cohort}` : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/people/$id",
		params: { id: person.id },
		className: "flex items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4 shadow-[var(--shadow-card)] transition-colors hover:border-line-strong",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-medium text-accent",
			children: initials(name)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate font-medium text-ink",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-xs text-muted",
					children: sub
				}),
				person.student_no ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block font-mono text-[11px] text-subtle",
					children: person.student_no
				}) : null
			]
		})]
	});
}
//#endregion
export { PersonCard as t };
