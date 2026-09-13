import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as loc, l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { o as useCurrentUser, t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, s as asPerson } from "./shell-DXc7oAuR.mjs";
import { m as listPeople, r as getBootstrap, u as joinProgram } from "./api-mZgPxTX8.mjs";
import { n as CardContent, t as Card } from "./card-BXJOuR0G.mjs";
import { n as Label, t as Input } from "./label-CoFsrUaQ.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CHBzI2le.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/join-CX3_Kuy4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JoinPage() {
	const { t, locale } = useI18n();
	const user = useCurrentUser();
	const nav = useNavigate();
	const qc = useQueryClient();
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const display = user?.displayName ?? "";
	const [role, setRole] = (0, import_react.useState)("student");
	const [year, setYear] = (0, import_react.useState)("1");
	const [nameAr, setNameAr] = (0, import_react.useState)(display);
	const [nameEn, setNameEn] = (0, import_react.useState)(display);
	const [personId, setPersonId] = (0, import_react.useState)("none");
	const roster = (0, import_react.useMemo)(() => {
		const rows = (people.data ?? []).map(asPerson);
		if (role === "student") {
			const y = Number(year);
			return rows.filter((p) => p.kind === "student" && p.year_level === y);
		}
		if (role === "faculty" || role === "coordinator") return rows.filter((p) => p.kind === "faculty");
		return [];
	}, [
		people.data,
		role,
		year
	]);
	const mut = useMutation({
		mutationFn: () => joinProgram({ data: {
			role,
			name_ar: nameAr,
			name_en: nameEn,
			year_level: role === "student" ? Number(year) : null,
			person_id: personId === "none" ? null : personId
		} }),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: ["bootstrap"] });
			nav({ to: "/" });
		}
	});
	if (boot.data?.member) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: t("app"),
		title: t("joinTitle"),
		lead: t("joinLead")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("role") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-2 sm:grid-cols-3",
					children: [
						"student",
						"faculty",
						"coordinator"
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRole(r),
						className: `h-11 rounded-[var(--radius-md)] border text-sm font-medium ${role === r ? "border-accent bg-accent-soft text-accent" : "border-line bg-raised text-ink"}`,
						children: t(r === "student" ? "roleStudent" : r === "faculty" ? "roleFaculty" : "roleCoordinator")
					}, r))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nar",
						children: t("yourNameAr")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nar",
						value: nameAr,
						onChange: (e) => setNameAr(e.target.value),
						dir: "rtl"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nen",
						children: t("yourNameEn")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nen",
						value: nameEn,
						onChange: (e) => setNameEn(e.target.value),
						dir: "ltr"
					})]
				})]
			}),
			role === "student" || role === "faculty" || role === "coordinator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [role === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("pickYear") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: year,
						onValueChange: setYear,
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
					})]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: role === "student" ? t("linkedRoster") : t("linkedFaculty") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: personId,
						onValueChange: setPersonId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "none",
							children: t("none")
						}), roster.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: p.id,
							children: [loc(locale, p.name_ar, p.name_en), p.student_no ? ` · ${p.student_no}` : ""]
						}, p.id))] })]
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "h-11 sm:w-56",
				disabled: mut.isPending || !nameAr.trim(),
				onClick: () => mut.mutate(),
				children: mut.isPending ? t("joining") : t("joinCta")
			})
		]
	}) })] });
}
//#endregion
export { JoinPage as component };
