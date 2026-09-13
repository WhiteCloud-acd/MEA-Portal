import { i as weightedMean } from "./_ssr/grades-DE5L2NBr.mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, s as fmtDate, u as yearLabel } from "./_ssr/router-CWYVQirn.mjs";
import { n as PageHeader, o as asCourse } from "./_ssr/shell-DXc7oAuR.mjs";
import { d as listCourses, f as listEvents, h as listProjects, o as getMyGrades, p as listNotices, r as getBootstrap } from "./_ssr/api-mZgPxTX8.mjs";
import { t as Badge } from "./_ssr/badge-Cp6ZCxRW.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./_ssr/card-BXJOuR0G.mjs";
import { t as GradeBadge } from "./_ssr/grade-badge-BQwz4FM8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-CB2atL0M.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { t, locale } = useI18n();
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const notices = useQuery({
		queryKey: ["notices"],
		queryFn: () => listNotices()
	});
	const events = useQuery({
		queryKey: ["events"],
		queryFn: () => listEvents()
	});
	const grades = useQuery({
		queryKey: ["my-grades"],
		queryFn: () => getMyGrades()
	});
	const projects = useQuery({
		queryKey: ["projects"],
		queryFn: () => listProjects()
	});
	const coursesQ = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses()
	});
	const member = boot.data?.member;
	const stats = boot.data?.stats;
	const name = member ? loc(locale, member.name_ar, member.name_en) : "";
	const catalog = (coursesQ.data ?? []).map(asCourse);
	const yearPath = member?.role === "student" && member.year_level ? member.year_level === 5 ? "/years/alumni" : `/years/${member.year_level}` : "/years/1";
	const withCredits = ((grades.data?.grades?.length ? grades.data.grades : grades.data?.roster) ?? []).map((g) => {
		const c = catalog.find((x) => x.code === g.course_code);
		return {
			total: g.total,
			credits: c?.credits ?? 4
		};
	});
	const avg = weightedMean(withCredits);
	const doneCredits = withCredits.filter((g) => g.total != null).reduce((s, g) => s + g.credits, 0);
	const today = "2026-09-12";
	const upcoming = (events.data ?? []).filter((e) => String(e.starts_on) >= today).slice(0, 5);
	const latest = (notices.data ?? []).slice(0, 4);
	const liveProjects = (projects.data ?? []).filter((p) => p.status !== "defended").slice(0, 3);
	const yearCourses = member?.role === "student" && member.year_level && member.year_level < 5 ? catalog.filter((c) => c.year_level === member.year_level && c.semester === 1) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("academicYear"),
			title: `${t("welcome")}${name ? `، ${name}` : ""}`,
			lead: t("dashboardLead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				{
					n: stats?.students ?? "—",
					l: t("students")
				},
				{
					n: stats?.faculty ?? "—",
					l: t("professors")
				},
				{
					n: stats?.courses ?? "—",
					l: t("courses")
				},
				{
					n: stats?.projects ?? "—",
					l: t("projects")
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-2xl tabular-nums text-ink",
					children: s.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: s.l
				})]
			}) }, s.l))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					member?.role === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("transcript") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
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
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: t("completedCredits")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-3xl tabular-nums",
								children: doneCredits
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: t("myYear")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: yearPath,
								className: "mt-1 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline",
								children: yearLabel(t, member.year_level)
							})] })
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("navRegistry") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t("youDecide")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/registry",
						className: "mt-3 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline",
						children: t("openRegistry")
					})] })] }),
					yearCourses.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex-row items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("enrolledCourses") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/curriculum",
							className: "text-xs text-accent underline-offset-4 hover:underline",
							children: t("viewCurriculum")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "grid gap-2",
						children: yearCourses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses/$code",
							params: { code: c.code },
							className: "flex items-center justify-between rounded-[var(--radius-md)] border border-line bg-raised px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-[11px] text-subtle",
								children: c.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: loc(locale, c.name_ar, c.name_en)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									c.credits,
									" ",
									t("hoursShort")
								]
							})]
						}, c.code))
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex-row items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("recentNotices") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notices",
							className: "text-xs text-accent underline-offset-4 hover:underline",
							children: t("viewAll")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "flex flex-col gap-3",
						children: latest.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notices/$id",
							params: { id: String(n.id) },
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									n.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("pinned") }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "muted",
										children: t(String(n.category))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-subtle",
										children: fmtDate(String(n.published_at), locale)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-medium",
								children: loc(locale, String(n.title_ar), String(n.title_en))
							})]
						}, String(n.id)))
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("upcoming") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/calendar",
						className: "text-xs text-accent underline-offset-4 hover:underline",
						children: t("viewAll")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "flex flex-col gap-3",
					children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-16 shrink-0 text-xs text-muted",
							children: fmtDate(String(e.starts_on), locale)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: loc(locale, String(e.title_ar), String(e.title_en))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle",
							children: t(String(e.kind) === "teaching" ? "teachingKind" : String(e.kind))
						})] })]
					}, String(e.id)))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("projects") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/projects",
						className: "text-xs text-accent underline-offset-4 hover:underline",
						children: t("viewAll")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "flex flex-col gap-3",
					children: liveProjects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects/$id",
						params: { id: String(p.id) },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: loc(locale, String(p.title_ar), String(p.title_en))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-subtle",
							children: t(String(p.status))
						})]
					}, String(p.id)))
				})] })]
			})]
		})
	] });
}
//#endregion
export { Dashboard as component };
