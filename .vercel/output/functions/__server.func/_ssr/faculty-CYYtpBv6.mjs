import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Plus } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as useI18n } from "./router-CWYVQirn.mjs";
import { t as Button } from "./gates-Bn40wfF3.mjs";
import { n as PageHeader, s as asPerson, u as isStaff } from "./shell-DXc7oAuR.mjs";
import { m as listPeople, r as getBootstrap } from "./api-mZgPxTX8.mjs";
import { n as PersonFormSheet } from "./editors-Bkado7VQ.mjs";
import { t as PersonCard } from "./person-card-CRsMXcl1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faculty-CYYtpBv6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FacultyPage() {
	const { t } = useI18n();
	const [creating, setCreating] = (0, import_react.useState)(false);
	const people = useQuery({
		queryKey: ["people"],
		queryFn: () => listPeople()
	});
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap()
	});
	const faculty = (people.data ?? []).map(asPerson).filter((p) => p.kind === "faculty");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: t("faculty"),
			title: t("navFaculty"),
			lead: t("youDecide"),
			actions: isStaff(boot.data?.member?.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setCreating(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), t("addFaculty")]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: faculty.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, { person: p }, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonFormSheet, {
			open: creating,
			onOpenChange: setCreating,
			person: null,
			kind: "faculty"
		})
	] });
}
//#endregion
export { FacultyPage as component };
