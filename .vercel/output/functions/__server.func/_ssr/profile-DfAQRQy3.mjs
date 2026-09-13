import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { l as useI18n, u as yearLabel } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader } from "./shell-DXc7oAuR.mjs";
import { r as getBootstrap, x as updateMember } from "./api-mZgPxTX8.mjs";
import { n as CardContent, t as Card } from "./card-BXJOuR0G.mjs";
import { n as Label, t as Input } from "./label-CoFsrUaQ.mjs";
import { t as Textarea } from "./textarea-fJz_hvQB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DfAQRQy3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { t } = useI18n();
	const qc = useQueryClient();
	const m = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	}).data?.member;
	const [nameAr, setNameAr] = (0, import_react.useState)("");
	const [nameEn, setNameEn] = (0, import_react.useState)("");
	const [bioAr, setBioAr] = (0, import_react.useState)("");
	const [bioEn, setBioEn] = (0, import_react.useState)("");
	const [titleAr, setTitleAr] = (0, import_react.useState)("");
	const [titleEn, setTitleEn] = (0, import_react.useState)("");
	const [office, setOffice] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!m) return;
		setNameAr(m.name_ar);
		setNameEn(m.name_en);
		setBioAr(m.bio_ar ?? "");
		setBioEn(m.bio_en ?? "");
		setTitleAr(m.title_ar ?? "");
		setTitleEn(m.title_en ?? "");
		setOffice(m.office ?? "");
	}, [m]);
	const mut = useMutation({
		mutationFn: () => updateMember({ data: {
			name_ar: nameAr,
			name_en: nameEn,
			bio_ar: bioAr,
			bio_en: bioEn,
			title_ar: titleAr,
			title_en: titleEn,
			office
		} }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["bootstrap"] })
	});
	if (!m) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: t("loading")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: t("navProfile"),
		lead: t("profileHint")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					t("role"),
					":",
					" ",
					t(m.role === "faculty" ? "roleFaculty" : m.role === "coordinator" ? "roleCoordinator" : "roleStudent"),
					m.year_level ? ` · ${yearLabel(t, m.year_level)}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("yourNameAr") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: nameAr,
						onChange: (e) => setNameAr(e.target.value),
						dir: "rtl"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("yourNameEn") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: nameEn,
						onChange: (e) => setNameEn(e.target.value),
						dir: "ltr"
					})]
				})]
			}),
			m.role !== "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [t("title"), " (AR)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: titleAr,
							onChange: (e) => setTitleAr(e.target.value),
							dir: "rtl"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [t("title"), " (EN)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: titleEn,
							onChange: (e) => setTitleEn(e.target.value),
							dir: "ltr"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("office") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: office,
							onChange: (e) => setOffice(e.target.value)
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [t("bio"), " (AR)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: bioAr,
						onChange: (e) => setBioAr(e.target.value),
						dir: "rtl",
						rows: 4
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [t("bio"), " (EN)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: bioEn,
						onChange: (e) => setBioEn(e.target.value),
						dir: "ltr",
						rows: 4
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "sm:w-40",
				disabled: mut.isPending,
				onClick: () => mut.mutate(),
				children: mut.isSuccess ? t("saved") : t("updateProfile")
			})
		]
	}) })] });
}
//#endregion
export { ProfilePage as component };
