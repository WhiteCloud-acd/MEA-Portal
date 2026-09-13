import { o as __toESM } from "../_runtime.mjs";
import { n as composeTotal } from "./grades-DE5L2NBr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as Pencil } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, o as Route$5, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, o as asCourse, s as asPerson, u as isStaff } from "./shell-DXc7oAuR.mjs";
import { a as getCourseGradebook, b as saveRosterGrade, i as getCourse, m as listPeople, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-BXJOuR0G.mjs";
import { t as GradeBadge } from "./grade-badge-BQwz4FM8.mjs";
import { t as Input } from "./label-CoFsrUaQ.mjs";
import { t as CourseFormSheet } from "./editors-Bkado7VQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses._code-Cwm1boWo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursePage() {
	const { code } = Route$5.useParams();
	const { t, locale } = useI18n();
	const qc = useQueryClient();
	const courseQ = useQuery({
		queryKey: ["course", code],
		queryFn: () => getCourse({ data: code })
	});
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const book = useQuery({
		queryKey: ["gradebook", code],
		queryFn: () => getCourseGradebook({ data: code })
	});
	const [draft, setDraft] = (0, import_react.useState)({});
	const [editing, setEditing] = (0, import_react.useState)(false);
	const save = useMutation({
		mutationFn: (row) => saveRosterGrade({ data: {
			...row,
			course_code: code
		} }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["gradebook", code] })
	});
	if (!courseQ.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: courseQ.isPending ? t("loading") : t("noResults")
	});
	const c = asCourse(courseQ.data);
	const inst = (people.data ?? []).map(asPerson).find((p) => p.id === c.instructor_id);
	const member = boot.data?.member;
	const canEdit = member && isStaff(member.role) && book.data?.allowed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: c.code,
			title: loc(locale, c.name_ar, c.name_en),
			lead: `${yearLabel(t, c.year_level)} · ${c.semester === 1 ? t("semester1") : t("semester2")}`,
			actions: isStaff(member?.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				onClick: () => setEditing(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), t("edit")]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: loc(locale, c.desc_ar, c.desc_en)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 grid grid-cols-3 gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle",
							children: t("theory")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: c.hours_theory
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle",
							children: t("lab")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: c.hours_lab
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-subtle",
							children: t("credits")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono tabular-nums",
							children: c.credits
						})] })
					]
				}),
				c.prereq ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm",
					children: [
						t("prereq"),
						":",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/courses/$code",
							params: { code: c.prereq },
							className: "font-mono text-accent underline-offset-4 hover:underline",
							children: c.prereq
						})
					]
				}) : null
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t("instructor") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
				inst ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/people/$id",
					params: { id: inst.id },
					className: "text-sm font-medium text-accent underline-offset-4 hover:underline",
					children: loc(locale, inst.name_ar, inst.name_en)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "—"
				}),
				inst?.office ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: inst.office
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/years/$year",
					params: { year: String(c.year_level) },
					className: "mt-4 block text-xs text-accent underline-offset-4 hover:underline",
					children: yearLabel(t, c.year_level)
				})
			] })] })]
		}),
		canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-semibold",
				children: t("gradebook")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-[var(--radius-lg)] border border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-xs text-subtle",
						children: [
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-2" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (book.data?.entries ?? []).map((e) => {
						const d = draft[e.person_id] ?? {
							cw: e.coursework?.toString() ?? "",
							mid: e.midterm?.toString() ?? "",
							fin: e.final?.toString() ?? ""
						};
						const parse = (s) => s === "" ? null : Number(s);
						const preview = composeTotal(parse(d.cw), parse(d.mid), parse(d.fin));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-line",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/people/$id",
										params: { id: e.person_id },
										className: "hover:text-accent",
										children: loc(locale, e.name_ar, e.name_en)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-[10px] text-subtle",
										children: e.student_no
									})]
								}),
								[
									"cw",
									"mid",
									"fin"
								].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "h-9 w-20 font-mono",
										inputMode: "numeric",
										value: d[k],
										onChange: (ev) => setDraft((prev) => ({
											...prev,
											[e.person_id]: {
												...d,
												[k]: ev.target.value
											}
										}))
									})
								}, k)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeBadge, { total: preview ?? e.total })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										disabled: save.isPending,
										onClick: () => save.mutate({
											person_id: e.person_id,
											coursework: parse(d.cw),
											midterm: parse(d.mid),
											final: parse(d.fin)
										}),
										children: t("save")
									})
								})
							]
						}, e.person_id);
					}) })]
				})
			})]
		}) : member && member.role === "student" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm text-muted",
			children: t("onlyFaculty")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseFormSheet, {
			open: editing,
			onOpenChange: setEditing,
			course: c
		})
	] });
}
//#endregion
export { CoursePage as component };
