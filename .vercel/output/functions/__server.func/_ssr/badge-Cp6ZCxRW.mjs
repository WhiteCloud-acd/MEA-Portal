import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-boGw2iwM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Cp6ZCxRW.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-accent-soft text-accent",
		muted: "bg-secondary text-muted",
		outline: "border border-line text-muted",
		good: "bg-accent-soft text-good",
		warn: "bg-warn-soft text-warn",
		bad: "bg-bad-soft text-bad",
		info: "bg-info-soft text-info",
		sidebar: "bg-sidebar-hover text-sidebar-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
