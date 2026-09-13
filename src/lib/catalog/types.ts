export type Person = {
  id: string;
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
};

export type Course = {
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
  instructor_id: string;
  prereq: string | null;
};

export type Notice = {
  id: string;
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
  category: "academic" | "exam" | "admin" | "event";
  year_level: number | null;
  pinned: boolean;
  published_at: string;
};

export type Project = {
  id: string;
  title_ar: string;
  title_en: string;
  abstract_ar: string;
  abstract_en: string;
  year_level: number;
  kind: "graduation" | "course" | "research";
  student_ids: string;
  supervisor_id: string;
  status: "defended" | "ongoing" | "proposed";
  year_label: string;
};

export type CalEvent = {
  id: string;
  title_ar: string;
  title_en: string;
  starts_on: string;
  ends_on: string | null;
  kind: "exam" | "holiday" | "deadline" | "event" | "teaching";
  year_level: number | null;
};

export type Regulation = {
  id: string;
  chapter: number;
  title_ar: string;
  title_en: string;
  body_ar: string;
  body_en: string;
};

export type Resource = {
  id: string;
  title_ar: string;
  title_en: string;
  kind: "software" | "data" | "reading" | "lab";
  url: string | null;
  note_ar: string;
  note_en: string;
  year_level: number | null;
};

export const COHORTS: Record<number, { years: string; entered: string }> = {
  5: { years: "2022–2026", entered: "2022" },
  4: { years: "2023–2027", entered: "2023" },
  3: { years: "2024–2028", entered: "2024" },
  2: { years: "2025–2029", entered: "2025" },
  1: { years: "2026–2030", entered: "2026" },
};

export const PROGRAM = {
  opened: "2022",
  duration: 4,
  campus_ar: "مجمّع البرامكة، كلية الاقتصاد — جامعة دمشق",
  campus_en: "Baramkeh campus, Faculty of Economics — Damascus University",
  about_ar:
    "برنامج النمذجة والتحليل الاقتصادي اختصاص نوعي داخل كلية الاقتصاد بجامعة دمشق، أُحدث لخريجي المركز الوطني للمتميزين بدعم هيئة التميز والإبداع. مدّته أربع سنوات، وهو الأول من نوعه في سورية. يُعدّ كوادر قادرة على بناء نماذج رياضية وقياسية تُستخدم في صناعة القرار ورسم السياسات وتعزيز مسارات التنمية، عبر ربط النظرية الاقتصادية بالواقع وقياسها بأدوات حديثة.",
  about_en:
    "Modelling and Economic Analysis is a selective four-year programme in the Faculty of Economics at Damascus University, created for graduates of the National Centre for the Distinguished and supported by the Authority for Excellence and Creativity. The first of its kind in Syria, it trains economists who can build mathematical and econometric models for policy, decision-making and development — linking theory to the Syrian economy with modern quantitative tools.",
  mission_ar:
    "تكوين اقتصادي كمّي رصين: خريج يقرأ البيانات، يبني النموذج، يختبر الفرضية، ويكتب مذكرة سياسة يمكن لصانع القرار أن يستخدمها.",
  mission_en:
    "A rigorous quantitative economist: one who reads data, builds the model, tests the hypothesis, and writes a policy note a decision-maker can use.",
  vision_ar:
    "أن يصبح البرنامج المرجع الوطني في النمذجة الاقتصادية التطبيقية، وجسراً بين الجامعة وهيئات التخطيط والإحصاء والمالية.",
  vision_en:
    "To be the national reference in applied economic modelling, and a bridge between the university and the planning, statistics and finance authorities.",
};
