import { i as weightedMean } from "./grades-DE5L2NBr.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { n as PageHeader, o as asCourse } from "./shell-DXc7oAuR.mjs";
import { d as listCourses, o as getMyGrades, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { n as CardContent, t as Card } from "./card-BXJOuR0G.mjs";
import { t as GradeBadge } from "./grade-badge-BQwz4FM8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grades-B06xgu1n.js
var import_jsx_runtime = require_jsx_runtime();
function GradesPage() {
	const { t, locale } = useI18n();
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const mine = useQuery({
		queryKey: ["my-grades"],
		queryFn: () => getMyGrades()
	});
	const coursesQ = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses()
	});
	const member = boot.data?.member;
	const catalog = (coursesQ.data ?? []).map(asCourse);
	const byCode = new Map(catalog.map((c) => [c.code, c]));
	const mapped = ((mine.data?.grades?.length ? mine.data.grades : mine.data?.roster) ?? []).map((g) => {
		const c = byCode.get(g.course_code);
		return {
			...g,
			course: c
		};
	}).filter((g) => g.course).sort((a, b) => a.course.year_level - b.course.year_level || a.course.code.localeCompare(b.course.code));
	const avg = weightedMean(mapped.map((g) => ({
		total: g.total,
		credits: g.course.credits
	})));
	const years = [
		1,
		2,
		3,
		4
	];
	const isStaff = member?.role === "faculty" || member?.role === "coordinator";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: t("transcript"),
		title: t("navGrades"),
		lead: isStaff ? t("onlyFaculty") : t("closedNote")
	}), !isStaff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 grid grid-cols-2 gap-3 md:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: t("gpa")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-3xl tabular-nums",
					children: avg ?? "—"
				}),
				avg != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeBadge, { total: avg })
				}) : null
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: t("courses")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-3xl tabular-nums",
				children: mapped.length
			})]
		}) })]
	}), mapped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: t("noGrades")
	}) : years.filter((y) => mapped.some((g) => g.course.year_level === y)).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-lg font-semibold",
			children: yearLabel(t, y)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[36rem] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-xs text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-start font-medium",
							children: t("code")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-start font-medium",
							children: t("name")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-start font-medium",
							children: t("coursework")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-start font-medium",
							children: t("midterm")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-start font-medium",
							children: t("final")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 text-start font-medium",
							children: t("total")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: mapped.filter((g) => g.course.year_level === y).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-[11px] text-subtle",
							children: g.course_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/courses/$code",
								params: { code: g.course_code },
								className: "hover:text-accent",
								children: loc(locale, g.course.name_ar, g.course.name_en)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono tabular-nums",
							children: g.coursework ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono tabular-nums",
							children: g.midterm ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono tabular-nums",
							children: g.final ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeBadge, { total: g.total })
						})
					]
				}, g.course_code)) })]
			})
		})]
	}, y))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: catalog.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/courses/$code",
			params: { code: c.code },
			className: "rounded-[var(--radius-lg)] border border-line bg-surface p-4 hover:border-line-strong",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-subtle",
					children: c.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium",
					children: loc(locale, c.name_ar, c.name_en)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						yearLabel(t, c.year_level),
						" · ",
						t("editGrades")
					]
				})
			]
		}, c.code))
	})] });
}
//#endregion
export { GradesPage as component };
