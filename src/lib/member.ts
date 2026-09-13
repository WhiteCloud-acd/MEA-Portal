export type LooseRow = Record<string, string | number | boolean | null | undefined>;

export type Member = {
  user_id: string;
  role: string;
  name_ar: string;
  name_en: string;
  year_level: number | null;
  person_id: string | null;
  student_no: string | null;
  title_ar: string | null;
  title_en: string | null;
  office: string | null;
  bio_ar: string | null;
  bio_en: string | null;
};

export type PersonRec = {
  id: string;
  kind: string;
  name_ar: string;
  name_en: string;
  year_level: number | null;
  student_no: string | null;
  cohort: string | null;
  title_ar: string | null;
  title_en: string | null;
  office: string | null;
  email: string | null;
  bio_ar: string;
  bio_en: string;
  research_ar: string;
  research_en: string;
  course_codes: string;
  advisor_id: string | null;
};

export type CourseRec = {
  code: string;
  name_ar: string;
  name_en: string;
  year_level: number;
  semester: number;
  hours_theory: number;
  hours_lab: number;
  credits: number;
  desc_ar: string;
  desc_en: string;
  instructor_id: string | null;
  prereq: string | null;
};

export function asPerson(row: LooseRow): PersonRec {
  return {
    id: String(row.id),
    kind: String(row.kind),
    name_ar: String(row.name_ar ?? ""),
    name_en: String(row.name_en ?? ""),
    year_level: row.year_level == null ? null : Number(row.year_level),
    student_no: row.student_no == null ? null : String(row.student_no),
    cohort: row.cohort == null ? null : String(row.cohort),
    title_ar: row.title_ar == null ? null : String(row.title_ar),
    title_en: row.title_en == null ? null : String(row.title_en),
    office: row.office == null ? null : String(row.office),
    email: row.email == null ? null : String(row.email),
    bio_ar: String(row.bio_ar ?? ""),
    bio_en: String(row.bio_en ?? ""),
    research_ar: String(row.research_ar ?? ""),
    research_en: String(row.research_en ?? ""),
    course_codes: String(row.course_codes ?? ""),
    advisor_id: row.advisor_id == null ? null : String(row.advisor_id),
  };
}

export function asCourse(row: LooseRow): CourseRec {
  return {
    code: String(row.code),
    name_ar: String(row.name_ar ?? ""),
    name_en: String(row.name_en ?? ""),
    year_level: Number(row.year_level),
    semester: Number(row.semester),
    hours_theory: Number(row.hours_theory),
    hours_lab: Number(row.hours_lab),
    credits: Number(row.credits),
    desc_ar: String(row.desc_ar ?? ""),
    desc_en: String(row.desc_en ?? ""),
    instructor_id: row.instructor_id == null ? null : String(row.instructor_id),
    prereq: row.prereq == null ? null : String(row.prereq),
  };
}

export function yearFromParam(year: string): number {
  if (year === "alumni") return 5;
  const n = Number(year);
  return Number.isFinite(n) ? n : 1;
}

export function isStaff(role?: string | null) {
  return role === "faculty" || role === "coordinator";
}

export function emptyPerson(kind: "student" | "faculty"): PersonRec {
  return {
    id: "",
    kind,
    name_ar: "",
    name_en: "",
    year_level: kind === "student" ? 1 : null,
    student_no: null,
    cohort: null,
    title_ar: null,
    title_en: null,
    office: null,
    email: null,
    bio_ar: "",
    bio_en: "",
    research_ar: "",
    research_en: "",
    course_codes: "",
    advisor_id: null,
  };
}

export function emptyCourse(): CourseRec {
  return {
    code: "",
    name_ar: "",
    name_en: "",
    year_level: 1,
    semester: 1,
    hours_theory: 2,
    hours_lab: 2,
    credits: 4,
    desc_ar: "",
    desc_en: "",
    instructor_id: null,
    prereq: null,
  };
}
