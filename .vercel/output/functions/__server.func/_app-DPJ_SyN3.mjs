import { d as useRouterState, m as Outlet, y as Navigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { r as RedirectToSignIn, s as useCurrentUserState } from "./_ssr/gates-Bn40wfF3.mjs";
import { a as ShellSkeleton, t as AppShell } from "./_ssr/shell-DXc7oAuR.mjs";
import { r as getBootstrap } from "./_ssr/api-mZgPxTX8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-DPJ_SyN3.js
var import_jsx_runtime = require_jsx_runtime();
function AppLayout() {
	const { user, isPending } = useCurrentUserState();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const boot = useQuery({
		queryKey: ["bootstrap"],
		queryFn: () => getBootstrap(),
		enabled: Boolean(user)
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (boot.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellSkeleton, {});
	const member = boot.data?.member ?? null;
	if (!member && pathname !== "/join") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/join" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		member,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { AppLayout as component };
