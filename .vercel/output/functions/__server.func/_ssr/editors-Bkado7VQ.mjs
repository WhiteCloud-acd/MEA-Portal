import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { c as emptyCourse, i as SheetContent, l as emptyPerson, o as asCourse, r as Sheet, s as asPerson } from "./shell-DXc7oAuR.mjs";
import { d as listCourses, m as listPeople, n as deletePerson, t as deleteCourse, v as saveCourse, y as savePerson } from "./api-mZgPxTX8.mjs";
import { n as Label, t as Input } from "./label-CoFsrUaQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CHBzI2le.mjs";
import { t as Textarea } from "./textarea-fJz_hvQB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/editors-Bkado7VQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function invalidateAll(qc) {
	qc.invalidateQueries({ queryKey: ["people"] });
	qc.invalidateQueries({ queryKey: ["person"] });
	qc.invalidateQueries({ queryKey: ["courses"] });
	qc.invalidateQueries({ queryKey: ["course"] });
	qc.invalidateQueries({ queryKey: ["bootstrap"] });
	qc.invalidateQueries({ queryKey: ["gradebook"] });
}
function PersonFormSheet({ open, onOpenChange, person, kind }) {
	const { t, locale } = useI18n();
	const qc = useQueryClient();
	const creating = !person?.id;
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople(),
		enabled: open
	});
	const courses = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses(),
		enabled: open
	});
	const [form, setForm] = (0, import_react.useState)(emptyPerson(kind));
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setForm(person ?? emptyPerson(kind));
	}, [
		open,
		person,
		kind
	]);
	const save = useMutation({
		mutationFn: () => savePerson({ data: {
			id: creating ? void 0 : form.id,
			kind,
			name_ar: form.name_ar,
			name_en: form.name_en,
			year_level: form.year_level,
			student_no: form.student_no,
			cohort: form.cohort,
			title_ar: form.title_ar,
			title_en: form.title_en,
			office: form.office,
			email: form.email,
			bio_ar: form.bio_ar,
			bio_en: form.bio_en,
			research_ar: form.research_ar,
			research_en: form.research_en,
			course_codes: form.course_codes,
			advisor_id: form.advisor_id
		} }),
		onSuccess: () => {
			invalidateAll(qc);
			onOpenChange(false);
		}
	});
	const remove = useMutation({
		mutationFn: () => deletePerson({ data: form.id }),
		onSuccess: () => {
			invalidateAll(qc);
			onOpenChange(false);
		}
	});
	const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty" && p.id !== form.id);
	const catalog = (courses.data ?? []).map(asCourse);
	const selectedCodes = new Set(form.course_codes.split(",").map((s) => s.trim()).filter(Boolean));
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const title = creating ? t("newRecord") : t("edit");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "end",
			tone: "panel",
			title,
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-line px-5 py-4 pe-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
							children: kind === "student" ? t("roleStudent") : t("roleFaculty")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-semibold",
							children: creating ? kind === "student" ? t("addStudent") : t("addFaculty") : loc(locale, form.name_ar, form.name_en) || t("edit")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("yourNameAr")} *`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.name_ar,
										onChange: (e) => set("name_ar", e.target.value),
										dir: "rtl"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("yourNameEn")} *`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.name_en,
										onChange: (e) => set("name_en", e.target.value),
										dir: "ltr"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("email"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.email ?? "",
									onChange: (e) => set("email", e.target.value),
									dir: "ltr"
								})
							}),
							kind === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("pickYear"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: String(form.year_level ?? 1),
											onValueChange: (v) => set("year_level", Number(v)),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
												1,
												2,
												3,
												4,
												5
											].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: String(y),
												children: yearLabel(t, y)
											}, y)) })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("studentNo"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.student_no ?? "",
											onChange: (e) => set("student_no", e.target.value),
											dir: "ltr"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("cohort"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.cohort ?? "",
										onChange: (e) => set("cohort", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("pickAdvisor"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: form.advisor_id ?? "none",
										onValueChange: (v) => set("advisor_id", v === "none" ? null : v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "none",
											children: t("none")
										}), faculty.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: p.id,
											children: loc(locale, p.name_ar, p.name_en)
										}, p.id))] })]
									})
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: `${t("title")} (AR)`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.title_ar ?? "",
											onChange: (e) => set("title_ar", e.target.value),
											dir: "rtl"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: `${t("title")} (EN)`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.title_en ?? "",
											onChange: (e) => set("title_en", e.target.value),
											dir: "ltr"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("office"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.office ?? "",
										onChange: (e) => set("office", e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("coursesTaught"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex max-h-40 flex-col gap-1 overflow-y-auto rounded-[var(--radius-sm)] border border-line bg-raised p-2",
										children: catalog.map((c) => {
											const on = selectedCodes.has(c.code);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "flex min-h-9 items-center gap-2 text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "checkbox",
														checked: on,
														onChange: () => {
															const next = new Set(selectedCodes);
															if (on) next.delete(c.code);
															else next.add(c.code);
															set("course_codes", [...next].join(","));
														}
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[11px] text-subtle",
														children: c.code
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate",
														children: loc(locale, c.name_ar, c.name_en)
													})
												]
											}, c.code);
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: `${t("research")} (AR)`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 3,
											value: form.research_ar,
											onChange: (e) => set("research_ar", e.target.value),
											dir: "rtl"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: `${t("research")} (EN)`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 3,
											value: form.research_en,
											onChange: (e) => set("research_en", e.target.value),
											dir: "ltr"
										})
									})]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("bio")} (AR)`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 4,
										value: form.bio_ar,
										onChange: (e) => set("bio_ar", e.target.value),
										dir: "rtl"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("bio")} (EN)`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 4,
										value: form.bio_en,
										onChange: (e) => set("bio_en", e.target.value),
										dir: "ltr"
									})
								})]
							}),
							save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-bad",
								children: t("saveFailed")
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 border-t border-line px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "min-w-28",
							disabled: save.isPending || !form.name_ar.trim() || !form.name_en.trim(),
							onClick: () => save.mutate(),
							children: save.isPending ? t("joining") : creating ? t("create") : t("save")
						}), !creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							disabled: remove.isPending,
							onClick: () => {
								if (window.confirm(t("confirmDelete"))) remove.mutate();
							},
							children: t("delete")
						}) : null]
					})
				]
			})
		})
	});
}
function CourseFormSheet({ open, onOpenChange, course }) {
	const { t, locale } = useI18n();
	const qc = useQueryClient();
	const creating = !course?.code;
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople(),
		enabled: open
	});
	const courses = useQuery({
		queryKey: ["courses"],
		queryFn: () => listCourses(),
		enabled: open
	});
	const [form, setForm] = (0, import_react.useState)(emptyCourse());
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setForm(course ?? emptyCourse());
	}, [open, course]);
	const save = useMutation({
		mutationFn: () => saveCourse({ data: {
			mode: creating ? "create" : "update",
			code: form.code,
			name_ar: form.name_ar,
			name_en: form.name_en,
			year_level: form.year_level,
			semester: form.semester,
			hours_theory: form.hours_theory,
			hours_lab: form.hours_lab,
			credits: form.credits,
			desc_ar: form.desc_ar,
			desc_en: form.desc_en,
			instructor_id: form.instructor_id,
			prereq: form.prereq
		} }),
		onSuccess: () => {
			invalidateAll(qc);
			onOpenChange(false);
		}
	});
	const remove = useMutation({
		mutationFn: () => deleteCourse({ data: form.code }),
		onSuccess: () => {
			invalidateAll(qc);
			onOpenChange(false);
		}
	});
	const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty");
	const others = (courses.data ?? []).map(asCourse).filter((c) => c.code !== form.code);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const title = creating ? t("addCourse") : t("edit");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "end",
			tone: "panel",
			title,
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-line px-5 py-4 pe-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
							children: t("course")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-lg font-semibold",
							children: creating ? t("addCourse") : loc(locale, form.name_ar, form.name_en) || t("edit")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								label: `${t("courseCode")} *`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.code,
									onChange: (e) => set("code", e.target.value.toUpperCase()),
									dir: "ltr",
									disabled: !creating,
									className: "font-mono"
								}), !creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-subtle",
									children: t("codeLocked")
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("name")} (AR) *`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.name_ar,
										onChange: (e) => set("name_ar", e.target.value),
										dir: "rtl"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("name")} (EN) *`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.name_en,
										onChange: (e) => set("name_en", e.target.value),
										dir: "ltr"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("year"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: String(form.year_level),
										onValueChange: (v) => set("year_level", Number(v)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											1,
											2,
											3,
											4
										].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: String(y),
											children: yearLabel(t, y)
										}, y)) })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("semester"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: String(form.semester),
										onValueChange: (v) => set("semester", Number(v)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "1",
											children: t("semester1")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "2",
											children: t("semester2")
										})] })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("hoursTheory"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											value: form.hours_theory,
											onChange: (e) => set("hours_theory", Number(e.target.value) || 0)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("hoursLab"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											value: form.hours_lab,
											onChange: (e) => set("hours_lab", Number(e.target.value) || 0)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: t("credits"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											value: form.credits,
											onChange: (e) => set("credits", Number(e.target.value) || 0)
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("pickInstructor"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.instructor_id ?? "none",
									onValueChange: (v) => set("instructor_id", v === "none" ? null : v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: t("none")
									}), faculty.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: p.id,
										children: loc(locale, p.name_ar, p.name_en)
									}, p.id))] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("prereq"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.prereq ?? "none",
									onValueChange: (v) => set("prereq", v === "none" ? null : v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: t("none")
									}), others.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: c.code,
										children: [
											c.code,
											" · ",
											loc(locale, c.name_ar, c.name_en)
										]
									}, c.code))] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("bio")} (AR)`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 5,
										value: form.desc_ar,
										onChange: (e) => set("desc_ar", e.target.value),
										dir: "rtl"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${t("bio")} (EN)`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										rows: 5,
										value: form.desc_en,
										onChange: (e) => set("desc_en", e.target.value),
										dir: "ltr"
									})
								})]
							}),
							save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-bad",
								children: t("saveFailed")
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 border-t border-line px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "min-w-28",
							disabled: save.isPending || !form.code.trim() || !form.name_ar.trim() || !form.name_en.trim(),
							onClick: () => save.mutate(),
							children: save.isPending ? t("joining") : creating ? t("create") : t("save")
						}), !creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							disabled: remove.isPending,
							onClick: () => {
								if (window.confirm(t("confirmDelete"))) remove.mutate();
							},
							children: t("delete")
						}) : null]
					})
				]
			})
		})
	});
}
//#endregion
export { PersonFormSheet as n, CourseFormSheet as t };
