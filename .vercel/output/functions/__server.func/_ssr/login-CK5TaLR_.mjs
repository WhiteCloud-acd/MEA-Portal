import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-DAQpoMaa.mjs";
import { l as useI18n } from "./router-CWYVQirn.mjs";
import { r as signIn } from "./client-B40BzJxt.mjs";
import { i as SignInGate, n as Mark, t as Button } from "./gates-Bn40wfF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CK5TaLR_.js
var import_jsx_runtime = require_jsx_runtime();
function ProviderButtons() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-full flex-col gap-2",
		children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: p.idp === "google" ? "default" : "outline",
			className: "h-11 w-full",
			onClick: () => signIn(p.providerId, { callbackURL: "/" }),
			children: p.idp === "google" ? t("continueGoogle") : t("continueX")
		}, p.providerId))
	});
}
function Login() {
	const { t, toggle } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-dvh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-fg lattice-dark lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: t("app")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium uppercase tracking-[0.18em] text-sidebar-muted",
							children: [
								t("faculty"),
								" · ",
								t("university")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 text-4xl font-semibold leading-tight",
							children: t("program")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-sidebar-muted",
							children: t("internal")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-10 grid grid-cols-3 gap-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sidebar-muted",
									children: "4"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-xs text-sidebar-muted",
									children: t("year")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sidebar-muted",
									children: t("partner")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-xs text-sidebar-muted",
									children: t("ncd")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sidebar-muted",
									children: t("baramkeh")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-xs text-sidebar-muted",
									children: "2022—"
								})] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-sidebar-muted",
					children: t("closedNote")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col bg-bg px-6 py-8 md:px-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-center justify-between lg:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						children: t("app")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: toggle,
					children: t("language")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-sm flex-1 flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
						children: t("academicYear")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-2xl font-semibold",
						children: t("signIn")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: t("signInHint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 min-h-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderButtons, {}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" })
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { Login as component };
