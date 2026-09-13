import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  COHORTS,
  COURSES,
  EVENTS,
  NOTICES,
  PEOPLE,
  PROJECTS,
  REGULATIONS,
  RESOURCES,
  STUDENTS,
} from "@/lib/catalog";
import { composeTotal, sampleMark } from "@/lib/grades";
import { getSql, type Sql } from "@/lib/db";
import { num } from "@/lib/utils";
import type { LooseRow } from "@/lib/member";

type MemberRow = {
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

type GradeRow = {
  course_code: string;
  coursework: number | null;
  midterm: number | null;
  final: number | null;
  total: number | null;
};

let seedLock: Promise<void> | null = null;

async function insertMany(sql: Sql, table: string, columns: string[], rows: unknown[][]) {
  if (rows.length === 0) return;
  const chunk = 60;
  for (let i = 0; i < rows.length; i += chunk) {
    const part = rows.slice(i, i + chunk);
    const values: unknown[] = [];
    const placeholders = part.map((row, ri) => {
      const cells = row.map((_, ci) => `$${ri * columns.length + ci + 1}`);
      values.push(...row);
      return `(${cells.join(",")})`;
    });
    await sql.query(
      `insert into ${table} (${columns.join(",")}) values ${placeholders.join(",")} on conflict do nothing`,
      values,
    );
  }
}

async function ensureSeeded(sql: Sql) {
  if (!seedLock) {
    seedLock = (async () => {
      const rows = await sql<{ c: number }>`select count(*)::int as c from courses`;
      if ((rows[0]?.c ?? 0) > 0) return;
      await insertMany(
        sql,
        "people",
        [
          "id", "kind", "name_ar", "name_en", "year_level", "student_no", "cohort",
          "title_ar", "title_en", "office", "email", "bio_ar", "bio_en",
          "research_ar", "research_en", "course_codes", "advisor_id",
        ],
        PEOPLE.map((p) => [
          p.id, p.kind, p.name_ar, p.name_en, p.year_level, p.student_no, p.cohort,
          p.title_ar, p.title_en, p.office, p.email, p.bio_ar, p.bio_en,
          p.research_ar, p.research_en, p.course_codes, p.advisor_id,
        ]),
      );
      await insertMany(
        sql,
        "courses",
        [
          "code", "name_ar", "name_en", "year_level", "semester", "hours_theory",
          "hours_lab", "credits", "desc_ar", "desc_en", "instructor_id", "prereq",
        ],
        COURSES.map((c) => [
          c.code, c.name_ar, c.name_en, c.year_level, c.semester, c.hours_theory,
          c.hours_lab, c.credits, c.desc_ar, c.desc_en, c.instructor_id, c.prereq,
        ]),
      );
      await insertMany(
        sql,
        "announcements",
        ["id", "title_ar", "title_en", "body_ar", "body_en", "category", "year_level", "pinned", "published_at"],
        NOTICES.map((n) => [
          n.id, n.title_ar, n.title_en, n.body_ar, n.body_en, n.category, n.year_level, n.pinned, n.published_at,
        ]),
      );
      await insertMany(
        sql,
        "projects",
        [
          "id", "title_ar", "title_en", "abstract_ar", "abstract_en", "year_level",
          "kind", "student_ids", "supervisor_id", "status", "year_label",
        ],
        PROJECTS.map((p) => [
          p.id, p.title_ar, p.title_en, p.abstract_ar, p.abstract_en, p.year_level,
          p.kind, p.student_ids, p.supervisor_id, p.status, p.year_label,
        ]),
      );
      await insertMany(
        sql,
        "calendar_events",
        ["id", "title_ar", "title_en", "starts_on", "ends_on", "kind", "year_level"],
        EVENTS.map((e) => [e.id, e.title_ar, e.title_en, e.starts_on, e.ends_on, e.kind, e.year_level]),
      );
      await insertMany(
        sql,
        "regulations",
        ["id", "chapter", "title_ar", "title_en", "body_ar", "body_en"],
        REGULATIONS.map((r) => [r.id, r.chapter, r.title_ar, r.title_en, r.body_ar, r.body_en]),
      );
      await insertMany(
        sql,
        "resources",
        ["id", "title_ar", "title_en", "kind", "url", "note_ar", "note_en", "year_level"],
        RESOURCES.map((r) => [r.id, r.title_ar, r.title_en, r.kind, r.url, r.note_ar, r.note_en, r.year_level]),
      );
      const gradeRows: unknown[][] = [];
      for (const s of STUDENTS) {
        const year = s.year_level ?? 1;
        for (const c of COURSES) {
          if (c.year_level >= year) continue;
          const cw = sampleMark(s.id, c.code, "cw");
          const mid = sampleMark(s.id, c.code, "mid");
          const fin = sampleMark(s.id, c.code, "fin");
          gradeRows.push([s.id, c.code, cw, mid, fin, composeTotal(cw, mid, fin)]);
        }
      }
      await insertMany(
        sql,
        "roster_grades",
        ["person_id", "course_code", "coursework", "midterm", "final", "total"],
        gradeRows,
      );
    })().catch((err) => {
      seedLock = null;
      throw err;
    });
  }
  await seedLock;
}

async function memberOf(sql: Sql, userId: string) {
  const rows = await sql<MemberRow>`select * from members where user_id = ${userId} limit 1`;
  return rows[0] ?? null;
}

function asJsonRow(row: Record<string, unknown>): LooseRow {
  const out: LooseRow = {};
  for (const [k, v] of Object.entries(row)) {
    if (v == null) out[k] = null;
    else if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[k] = v;
    else if (v instanceof Date) out[k] = v.toISOString().slice(0, 10);
    else out[k] = String(v);
  }
  return out;
}

function mapGrade(row: {
  course_code: string;
  coursework: unknown;
  midterm: unknown;
  final: unknown;
  total: unknown;
}): GradeRow {
  return {
    course_code: row.course_code,
    coursework: num(row.coursework),
    midterm: num(row.midterm),
    final: num(row.final),
    total: num(row.total),
  };
}

export const getBootstrap = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const member = await memberOf(sql, context.userId);
    const faculty = await sql<{ id: string }>`select id from people where kind = 'faculty'`;
    const studentCount = await sql<{ c: number }>`select count(*)::int as c from people where kind = 'student'`;
    const courseCount = await sql<{ c: number }>`select count(*)::int as c from courses`;
    const projectCount = await sql<{ c: number }>`select count(*)::int as c from projects`;
    return {
      member,
      stats: {
        students: studentCount[0]?.c ?? 0,
        faculty: faculty.length,
        courses: courseCount[0]?.c ?? 0,
        projects: projectCount[0]?.c ?? 0,
      },
    };
  });

export const joinProgram = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    role: "student" | "faculty" | "coordinator";
    name_ar: string;
    name_en: string;
    year_level: number | null;
    person_id: string | null;
  }) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const nameAr = data.name_ar.trim() || "عضو";
    const nameEn = data.name_en.trim() || "Member";
    const year = data.role === "student" ? (data.year_level ?? 1) : null;
    await sql`
      insert into members (user_id, role, name_ar, name_en, year_level, person_id)
      values (${context.userId}, ${data.role}, ${nameAr}, ${nameEn}, ${year}, ${data.person_id})
      on conflict (user_id) do update set
        role = excluded.role,
        name_ar = excluded.name_ar,
        name_en = excluded.name_en,
        year_level = excluded.year_level,
        person_id = excluded.person_id
    `;
    if (data.role === "student" && year) {
      const existing = await sql<{ c: number }>`select count(*)::int as c from user_grades where user_id = ${context.userId}`;
      if ((existing[0]?.c ?? 0) === 0) {
        const dbCourses = await sql<{ code: string; year_level: number }>`select code, year_level from courses`;
        const gradeRows: unknown[][] = [];
        for (const c of dbCourses) {
          if (c.year_level >= year) continue;
          const cw = sampleMark(context.userId, c.code, "cw");
          const mid = sampleMark(context.userId, c.code, "mid");
          const fin = sampleMark(context.userId, c.code, "fin");
          gradeRows.push([context.userId, c.code, cw, mid, fin, composeTotal(cw, mid, fin)]);
        }
        await insertMany(
          sql,
          "user_grades",
          ["user_id", "course_code", "coursework", "midterm", "final", "total"],
          gradeRows,
        );
      }
    }
    return { ok: true as const };
  });

export const updateMember = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    name_ar: string;
    name_en: string;
    bio_ar: string;
    bio_en: string;
    title_ar?: string;
    title_en?: string;
    office?: string;
  }) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      update members set
        name_ar = ${data.name_ar.trim()},
        name_en = ${data.name_en.trim()},
        bio_ar = ${data.bio_ar},
        bio_en = ${data.bio_en},
        title_ar = ${data.title_ar ?? null},
        title_en = ${data.title_en ?? null},
        office = ${data.office ?? null}
      where user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export const listPeople = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from people order by kind, year_level nulls first, name_en`;
    return rows.map(asJsonRow);
  });

export const getPerson = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from people where id = ${id} limit 1`;
    return rows[0] ? asJsonRow(rows[0]) : null;
  });

export const listCourses = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from courses order by year_level, semester, code`;
    return rows.map(asJsonRow);
  });

export const getCourse = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((code: string) => code)
  .handler(async ({ data: code }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from courses where code = ${code} limit 1`;
    return rows[0] ? asJsonRow(rows[0]) : null;
  });

export const listNotices = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from announcements order by pinned desc, published_at desc`;
    return rows.map(asJsonRow);
  });

export const getNotice = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from announcements where id = ${id} limit 1`;
    return rows[0] ? asJsonRow(rows[0]) : null;
  });

export const listProjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from projects order by year_label desc, id`;
    return rows.map(asJsonRow);
  });

export const getProject = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from projects where id = ${id} limit 1`;
    return rows[0] ? asJsonRow(rows[0]) : null;
  });

export const listEvents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from calendar_events order by starts_on`;
    return rows.map(asJsonRow);
  });

export const listRegulations = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from regulations order by chapter`;
    return rows.map(asJsonRow);
  });

export const listResources = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const rows = await sql<Record<string, unknown>>`select * from resources order by kind, title_en`;
    return rows.map(asJsonRow);
  });

export const getMyGrades = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const member = await memberOf(sql, context.userId);
    if (!member) return { member: null, grades: [] as GradeRow[], roster: [] as GradeRow[] };
    const grades = (
      await sql<{
        course_code: string;
        coursework: unknown;
        midterm: unknown;
        final: unknown;
        total: unknown;
      }>`select course_code, coursework, midterm, final, total from user_grades where user_id = ${context.userId}`
    ).map(mapGrade);
    let roster: GradeRow[] = [];
    if (member.person_id) {
      roster = (
        await sql<{
          course_code: string;
          coursework: unknown;
          midterm: unknown;
          final: unknown;
          total: unknown;
        }>`select course_code, coursework, midterm, final, total from roster_grades where person_id = ${member.person_id}`
      ).map(mapGrade);
    }
    return { member, grades, roster };
  });

export const getYearGrades = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((year: number) => year)
  .handler(async ({ context, data: year }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const member = await memberOf(sql, context.userId);
    if (!member || (member.role !== "faculty" && member.role !== "coordinator")) {
      return { allowed: false as const, rows: [] as Array<{ person_id: string; course_code: string; total: number | null }> };
    }
    const rows = await sql<{ person_id: string; course_code: string; total: unknown }>`
      select g.person_id, g.course_code, g.total
      from roster_grades g
      join people p on p.id = g.person_id
      where p.year_level = ${year}
    `;
    return {
      allowed: true as const,
      rows: rows.map((r) => ({ person_id: r.person_id, course_code: r.course_code, total: num(r.total) })),
    };
  });

export const getCourseGradebook = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((code: string) => code)
  .handler(async ({ context, data: code }) => {
    const sql = await getSql();
    await ensureSeeded(sql);
    const member = await memberOf(sql, context.userId);
    if (!member || (member.role !== "faculty" && member.role !== "coordinator")) {
      return { allowed: false as const, entries: [] };
    }
    const courseRows = await sql<{ year_level: number }>`select year_level from courses where code = ${code}`;
    const year = courseRows[0]?.year_level;
    if (year == null) return { allowed: true as const, entries: [] };
    const people = await sql<{ id: string; name_ar: string; name_en: string; student_no: string | null }>`
      select id, name_ar, name_en, student_no from people where kind = 'student' and year_level = ${year} order by name_en
    `;
    const grades = await sql<{
      person_id: string;
      coursework: unknown;
      midterm: unknown;
      final: unknown;
      total: unknown;
    }>`select person_id, coursework, midterm, final, total from roster_grades where course_code = ${code}`;
    const byId = new Map(grades.map((g) => [g.person_id, g]));
    return {
      allowed: true as const,
      entries: people.map((p) => {
        const g = byId.get(p.id);
        return {
          person_id: p.id,
          name_ar: p.name_ar,
          name_en: p.name_en,
          student_no: p.student_no,
          coursework: num(g?.coursework),
          midterm: num(g?.midterm),
          final: num(g?.final),
          total: num(g?.total),
        };
      }),
    };
  });

export const saveRosterGrade = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    person_id: string;
    course_code: string;
    coursework: number | null;
    midterm: number | null;
    final: number | null;
  }) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const member = await memberOf(sql, context.userId);
    if (!member || (member.role !== "faculty" && member.role !== "coordinator")) {
      throw new Error("Forbidden");
    }
    const total = composeTotal(data.coursework, data.midterm, data.final);
    await sql`
      insert into roster_grades (person_id, course_code, coursework, midterm, final, total)
      values (${data.person_id}, ${data.course_code}, ${data.coursework}, ${data.midterm}, ${data.final}, ${total})
      on conflict (person_id, course_code) do update set
        coursework = excluded.coursework,
        midterm = excluded.midterm,
        final = excluded.final,
        total = excluded.total
    `;
    return { ok: true as const, total };
  });

function assertStaff(role: string | undefined) {
  if (role !== "faculty" && role !== "coordinator") throw new Error("Forbidden");
}

function blankToNull(v: string | null | undefined) {
  const s = (v ?? "").trim();
  return s.length ? s : null;
}

function newPersonId() {
  return `p-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export const savePerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    id?: string;
    kind: "student" | "faculty";
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
  }) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const member = await memberOf(sql, context.userId);
    assertStaff(member?.role);
    const nameAr = data.name_ar.trim();
    const nameEn = data.name_en.trim();
    if (!nameAr || !nameEn) throw new Error("Name required");
    const id = data.id?.trim() || newPersonId();
    const year = data.kind === "student" ? (data.year_level ?? 1) : null;
    const cohort =
      data.kind === "student"
        ? blankToNull(data.cohort) ?? (year && COHORTS[year] ? COHORTS[year].years : null)
        : null;
    const studentNo = data.kind === "student" ? blankToNull(data.student_no) : null;
    const advisor = data.kind === "student" ? blankToNull(data.advisor_id) : null;
    await sql`
      insert into people (
        id, kind, name_ar, name_en, year_level, student_no, cohort,
        title_ar, title_en, office, email, bio_ar, bio_en,
        research_ar, research_en, course_codes, advisor_id
      )
      values (
        ${id}, ${data.kind}, ${nameAr}, ${nameEn}, ${year}, ${studentNo}, ${cohort},
        ${blankToNull(data.title_ar)}, ${blankToNull(data.title_en)}, ${blankToNull(data.office)},
        ${blankToNull(data.email)}, ${data.bio_ar}, ${data.bio_en},
        ${data.research_ar}, ${data.research_en}, ${data.course_codes ?? ""}, ${advisor}
      )
      on conflict (id) do update set
        kind = excluded.kind,
        name_ar = excluded.name_ar,
        name_en = excluded.name_en,
        year_level = excluded.year_level,
        student_no = excluded.student_no,
        cohort = excluded.cohort,
        title_ar = excluded.title_ar,
        title_en = excluded.title_en,
        office = excluded.office,
        email = excluded.email,
        bio_ar = excluded.bio_ar,
        bio_en = excluded.bio_en,
        research_ar = excluded.research_ar,
        research_en = excluded.research_en,
        course_codes = excluded.course_codes,
        advisor_id = excluded.advisor_id
    `;
    await sql`update members set name_ar = ${nameAr}, name_en = ${nameEn} where person_id = ${id}`;
    return { ok: true as const, id };
  });

export const deletePerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ context, data: id }) => {
    const sql = await getSql();
    const member = await memberOf(sql, context.userId);
    assertStaff(member?.role);
    await sql`delete from roster_grades where person_id = ${id}`;
    await sql`update people set advisor_id = null where advisor_id = ${id}`;
    await sql`update courses set instructor_id = null where instructor_id = ${id}`;
    await sql`update members set person_id = null where person_id = ${id}`;
    await sql`delete from people where id = ${id}`;
    return { ok: true as const };
  });

export const saveCourse = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    mode: "create" | "update";
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
  }) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const member = await memberOf(sql, context.userId);
    assertStaff(member?.role);
    const code = data.code.trim().toUpperCase().replace(/\s+/g, "-");
    const nameAr = data.name_ar.trim();
    const nameEn = data.name_en.trim();
    if (!code || !nameAr || !nameEn) throw new Error("Required");
    const year = Math.min(4, Math.max(1, Number(data.year_level) || 1));
    const semester = data.semester === 2 ? 2 : 1;
    const instructor = blankToNull(data.instructor_id);
    const prereq = blankToNull(data.prereq);
    if (data.mode === "create") {
      const hit = await sql<{ code: string }>`select code from courses where code = ${code} limit 1`;
      if (hit[0]) throw new Error("Code exists");
      await sql`
        insert into courses (
          code, name_ar, name_en, year_level, semester, hours_theory, hours_lab,
          credits, desc_ar, desc_en, instructor_id, prereq
        )
        values (
          ${code}, ${nameAr}, ${nameEn}, ${year}, ${semester}, ${data.hours_theory},
          ${data.hours_lab}, ${data.credits}, ${data.desc_ar}, ${data.desc_en},
          ${instructor}, ${prereq}
        )
      `;
    } else {
      await sql`
        update courses set
          name_ar = ${nameAr},
          name_en = ${nameEn},
          year_level = ${year},
          semester = ${semester},
          hours_theory = ${data.hours_theory},
          hours_lab = ${data.hours_lab},
          credits = ${data.credits},
          desc_ar = ${data.desc_ar},
          desc_en = ${data.desc_en},
          instructor_id = ${instructor},
          prereq = ${prereq}
        where code = ${code}
      `;
    }
    return { ok: true as const, code };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((code: string) => code)
  .handler(async ({ context, data: code }) => {
    const sql = await getSql();
    const member = await memberOf(sql, context.userId);
    assertStaff(member?.role);
    await sql`delete from roster_grades where course_code = ${code}`;
    await sql`delete from user_grades where course_code = ${code}`;
    await sql`delete from courses where code = ${code}`;
    return { ok: true as const };
  });
