import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-boGw2iwM.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "·";
	if (parts.length === 1) return parts[0].slice(0, 2);
	return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`;
}
function num(v) {
	if (v == null || v === "") return null;
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : null;
}
//#endregion
export { initials as n, num as r, cn as t };
