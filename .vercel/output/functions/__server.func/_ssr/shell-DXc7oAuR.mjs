import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Menu, d as LayoutDashboard, f as GraduationCap, h as ClipboardList, i as ScrollText, l as Megaphone, m as Compass, n as Users, p as FolderKanban, s as PenLine, t as X, u as Library, v as CalendarDays, y as BookOpen } from "../_libs/lucide-react.mjs";
import { l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as cn } from "./utils-boGw2iwM.mjs";
import { a as UserButton, n as Mark, t as Button } from "./gates-Bn40wfF3.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DXc7oAuR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "start", tone = "nav", title = "Menu", ...props }) {
	const panel = tone === "panel";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 z-50 flex flex-col shadow-xl", panel ? "w-[min(28rem,100vw)] bg-surface text-ink" : "w-[min(20rem,90vw)] bg-sidebar text-sidebar-fg", side === "start" ? "start-0" : "end-0", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "sr-only",
				children: title
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: cn("absolute top-3 end-3 grid size-10 place-items-center rounded-[var(--radius-sm)]", panel ? "text-muted hover:bg-accent-soft hover:text-ink" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})
		]
	})] });
}
function Skeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-[var(--radius-sm)] bg-line/70", className) });
}
function asPerson(row) {
	return {
		id: String(row.id),
		kind: String(row.kind),
		name_ar: String(row.name_ar ?? ""),
		name_en: String(row.name_en ?? ""),
		year_level: row.year_level == null ? null : Number(row.year_level),
		student_no: row.student_no == null ? null : String(row.student_no),
		cohort: row.cohort == null ? null : String(row.cohort),
		title_ar: row.title_ar == null ? null : String(row.title_ar),
		title_en: row.title_en == null ? null : String(row.title_en),
		office: row.office == null ? null : String(row.office),
		email: row.email == null ? null : String(row.email),
		bio_ar: String(row.bio_ar ?? ""),
		bio_en: String(row.bio_en ?? ""),
		research_ar: String(row.research_ar ?? ""),
		research_en: String(row.research_en ?? ""),
		course_codes: String(row.course_codes ?? ""),
		advisor_id: row.advisor_id == null ? null : String(row.advisor_id)
	};
}
function asCourse(row) {
	return {
		code: String(row.code),
		name_ar: String(row.name_ar ?? ""),
		name_en: String(row.name_en ?? ""),
		year_level: Number(row.year_level),
		semester: Number(row.semester),
		hours_theory: Number(row.hours_theory),
		hours_lab: Number(row.hours_lab),
		credits: Number(row.credits),
		desc_ar: String(row.desc_ar ?? ""),
		desc_en: String(row.desc_en ?? ""),
		instructor_id: row.instructor_id == null ? null : String(row.instructor_id),
		prereq: row.prereq == null ? null : String(row.prereq)
	};
}
function yearFromParam(year) {
	if (year === "alumni") return 5;
	const n = Number(year);
	return Number.isFinite(n) ? n : 1;
}
function isStaff(role) {
	return role === "faculty" || role === "coordinator";
}
function emptyPerson(kind) {
	return {
		id: "",
		kind,
		name_ar: "",
		name_en: "",
		year_level: kind === "student" ? 1 : null,
		student_no: null,
		cohort: null,
		title_ar: null,
		title_en: null,
		office: null,
		email: null,
		bio_ar: "",
		bio_en: "",
		research_ar: "",
		research_en: "",
		course_codes: "",
		advisor_id: null
	};
}
function emptyCourse() {
	return {
		code: "",
		name_ar: "",
		name_en: "",
		year_level: 1,
		semester: 1,
		hours_theory: 2,
		hours_lab: 2,
		credits: 4,
		desc_ar: "",
		desc_en: "",
		instructor_id: null,
		prereq: null
	};
}
function navItems(member) {
	const yearTo = member?.role === "student" && member.year_level ? member.year_level === 5 ? "/years/alumni" : `/years/${member.year_level}` : "/years/1";
	const groups = [
		{
			labelKey: "sectionStudy",
			items: [
				{
					to: "/",
					key: "navHome",
					icon: LayoutDashboard
				},
				{
					to: yearTo,
					key: "navYear",
					icon: GraduationCap,
					match: "/years"
				},
				{
					to: "/curriculum",
					key: "navCurriculum",
					icon: BookOpen
				},
				{
					to: "/grades",
					key: "navGrades",
					icon: ClipboardList
				},
				{
					to: "/calendar",
					key: "navCalendar",
					icon: CalendarDays
				}
			]
		},
		{
			labelKey: "sectionCommunity",
			items: [
				{
					to: "/people",
					key: "navStudents",
					icon: Users
				},
				{
					to: "/faculty",
					key: "navFaculty",
					icon: Users
				},
				{
					to: "/projects",
					key: "navProjects",
					icon: FolderKanban
				}
			]
		},
		{
			labelKey: "sectionProgram",
			items: [
				{
					to: "/notices",
					key: "navNotices",
					icon: Megaphone
				},
				{
					to: "/charter",
					key: "navCharter",
					icon: ScrollText
				},
				{
					to: "/mission",
					key: "navMission",
					icon: Compass
				},
				{
					to: "/resources",
					key: "navResources",
					icon: Library
				}
			]
		}
	];
	if (isStaff(member?.role)) groups.push({
		labelKey: "sectionAdmin",
		items: [{
			to: "/registry",
			key: "navRegistry",
			icon: PenLine
		}]
	});
	return groups;
}
function isActive(pathname, item) {
	if (item.match) return pathname.startsWith(item.match);
	if (item.to === "/") return pathname === "/";
	return pathname === item.to || pathname.startsWith(`${item.to}/`);
}
function NavLinks({ member, onNavigate }) {
	const { t } = useI18n();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-5 px-3 pb-8",
		children: navItems(member).map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-sidebar-muted",
			children: t(group.labelKey)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5",
			children: group.items.map((item) => {
				const Icon = item.icon;
				const active = isActive(pathname, item);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					onClick: onNavigate,
					className: cn("flex h-10 items-center gap-3 rounded-[var(--radius-sm)] px-3 text-sm transition-colors", active ? "bg-sidebar-hover text-sidebar-fg" : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-4 shrink-0",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(item.key) })]
				}, item.key);
			})
		})] }, group.labelKey))
	});
}
function BrandBlock() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-3 px-5 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-semibold text-sidebar-fg",
				children: t("app")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-[11px] text-sidebar-muted",
				children: t("program")
			})]
		})]
	});
}
function SidebarBody({ member, onNavigate }) {
	const { t, locale } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandBlock, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "px-5 pb-4 text-[11px] leading-relaxed text-sidebar-muted",
			children: [
				t("faculty"),
				" · ",
				t("university")
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
				member,
				onNavigate
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-sidebar-line p-4",
			children: [member ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/profile",
				onClick: onNavigate,
				className: "mb-3 block rounded-[var(--radius-sm)] px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-sidebar-fg",
					children: locale === "ar" ? member.name_ar : member.name_en
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-[11px] text-sidebar-muted",
					children: [t(member.role === "faculty" ? "roleFaculty" : member.role === "coordinator" ? "roleCoordinator" : "roleStudent"), member.role === "student" && member.year_level ? ` · ${yearLabel(t, member.year_level)}` : null]
				})]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sidebar-fg [&_button]:text-sidebar-muted [&_span]:text-sidebar-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			})]
		})
	] });
}
function AppShell({ member, children }) {
	const { t, toggle } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-sidebar lattice-dark md:flex",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, { member })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-line bg-bg/90 px-3 backdrop-blur md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "md:hidden",
									"aria-label": "Menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
								side: "start",
								className: "p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full flex-col",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBody, {
										member,
										onNavigate: () => setOpen(false)
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted",
								children: t("academicYear")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: toggle,
							className: "shrink-0",
							children: t("language")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-8 md:py-8",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "border-t border-line px-4 py-4 text-center text-[11px] text-subtle md:px-8",
					children: [
						t("closedNote"),
						" · ",
						t("baramkeh")
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "sticky bottom-0 z-30 grid grid-cols-4 border-t border-line bg-surface md:hidden",
					children: [
						{
							to: "/",
							icon: LayoutDashboard,
							key: "navHome"
						},
						{
							to: member?.role === "student" && member.year_level ? member.year_level === 5 ? "/years/alumni" : `/years/${member.year_level}` : "/years/1",
							icon: GraduationCap,
							key: "navYear"
						},
						{
							to: "/grades",
							icon: ClipboardList,
							key: "navGrades"
						},
						{
							to: "/notices",
							icon: Megaphone,
							key: "navNotices"
						}
					].map((item) => {
						const Icon = item.icon;
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to.replace(/\/\d+$/, "")) || pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-[10px]", active ? "text-accent" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: 1.75
							}), t(item.key)]
						}, item.key);
					})
				})
			]
		})]
	});
}
function PageHeader({ kicker, title, lead, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: kicker
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight text-ink md:text-3xl",
					children: title
				}),
				lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
					children: lead
				}) : null
			]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
function ShellSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden w-64 bg-sidebar md:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-4 h-8 w-48" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-3 h-24 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 w-full" })
			]
		})]
	});
}
//#endregion
export { ShellSkeleton as a, emptyCourse as c, yearFromParam as d, SheetContent as i, emptyPerson as l, PageHeader as n, asCourse as o, Sheet as r, asPerson as s, AppShell as t, isStaff as u };
