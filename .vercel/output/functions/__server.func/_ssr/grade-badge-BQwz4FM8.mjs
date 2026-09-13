import { t as bandFor } from "./grades-DE5L2NBr.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as useI18n } from "./router-CWYVQirn.mjs";
import { t as Badge } from "./badge-Cp6ZCxRW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grade-badge-BQwz4FM8.js
var import_jsx_runtime = require_jsx_runtime();
var variant = {
	fail: "bad",
	pass: "muted",
	good: "info",
	vgood: "good",
	excellent: "default"
};
function GradeBadge({ total }) {
	const { t } = useI18n();
	const b = bandFor(total);
	if (b === "enrolled") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		children: t("enrolled")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: variant[b],
		children: total != null ? `${total} · ${t(b)}` : t(b)
	});
}
//#endregion
export { GradeBadge as t };
