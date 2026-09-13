export type GradeBand = "fail" | "pass" | "good" | "vgood" | "excellent" | "enrolled";

export function bandFor(total: number | null | undefined): GradeBand {
  if (total == null) return "enrolled";
  if (total < 60) return "fail";
  if (total < 70) return "pass";
  if (total < 80) return "good";
  if (total < 90) return "vgood";
  return "excellent";
}

export function bandKey(b: GradeBand): string {
  return b;
}

export function weightedMean(rows: { total: number | null; credits: number }[]) {
  let w = 0;
  let s = 0;
  for (const r of rows) {
    if (r.total == null) continue;
    s += r.total * r.credits;
    w += r.credits;
  }
  if (w === 0) return null;
  return Math.round((s / w) * 10) / 10;
}

/** Deterministic sample mark for seeded transcripts (60–94). */
export function sampleMark(seed: string, courseCode: string, kind: "cw" | "mid" | "fin") {
  let h = 0;
  const s = `${seed}:${courseCode}:${kind}`;
  for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
  const span = kind === "fin" ? 28 : 22;
  const base = kind === "fin" ? 64 : 68;
  return Math.min(96, base + (h % span));
}

export function composeTotal(cw: number | null, mid: number | null, fin: number | null) {
  if (cw == null && mid == null && fin == null) return null;
  const a = cw ?? 0;
  const b = mid ?? 0;
  const c = fin ?? 0;
  // 30% coursework, 20% midterm, 50% final — internal MEA rule
  const t = a * 0.3 + b * 0.2 + c * 0.5;
  return Math.round(t * 10) / 10;
}
