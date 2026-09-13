//#region node_modules/.nitro/vite/services/ssr/assets/grades-DE5L2NBr.js
function bandFor(total) {
	if (total == null) return "enrolled";
	if (total < 60) return "fail";
	if (total < 70) return "pass";
	if (total < 80) return "good";
	if (total < 90) return "vgood";
	return "excellent";
}
function weightedMean(rows) {
	let w = 0;
	let s = 0;
	for (const r of rows) {
		if (r.total == null) continue;
		s += r.total * r.credits;
		w += r.credits;
	}
	if (w === 0) return null;
	return Math.round(s / w * 10) / 10;
}
/** Deterministic sample mark for seeded transcripts (60–94). */
function sampleMark(seed, courseCode, kind) {
	let h = 0;
	const s = `${seed}:${courseCode}:${kind}`;
	for (let i = 0; i < s.length; i++) h = h * 33 + s.charCodeAt(i) >>> 0;
	return Math.min(96, (kind === "fin" ? 64 : 68) + h % (kind === "fin" ? 28 : 22));
}
function composeTotal(cw, mid, fin) {
	if (cw == null && mid == null && fin == null) return null;
	const a = cw ?? 0;
	const b = mid ?? 0;
	const c = fin ?? 0;
	const t = a * .3 + b * .2 + c * .5;
	return Math.round(t * 10) / 10;
}
//#endregion
export { weightedMean as i, composeTotal as n, sampleMark as r, bandFor as t };
