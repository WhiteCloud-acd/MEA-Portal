import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ar" | "en";

const STORAGE_KEY = "mea.locale";

type Dict = Record<string, string>;

const ar: Dict = {
  app: "بوابة النمذجة",
  program: "النمذجة والتحليل الاقتصادي",
  faculty: "كلية الاقتصاد",
  university: "جامعة دمشق",
  partner: "هيئة التميز والإبداع",
  internal: "بوابة داخلية — لأعضاء البرنامج فقط",
  signIn: "دخول الأعضاء",
  signInHint: "الدخول مقصور على طلاب وأساتذة البرنامج.",
  continueGoogle: "المتابعة عبر Google",
  continueX: "المتابعة عبر X",
  navHome: "اللوحة",
  navYear: "الدفعة",
  navStudents: "الطلاب",
  navFaculty: "الهيئة التدريسية",
  navCurriculum: "الخطة الدراسية",
  navGrades: "العلامات",
  navProjects: "المشاريع",
  navCalendar: "التقويم",
  navNotices: "التعاميم",
  navCharter: "الأنظمة",
  navMission: "الرؤية والخطة",
  navResources: "المصادر",
  navProfile: "ملفي",
  navJoin: "الانضمام",
  sectionStudy: "الدراسة",
  sectionCommunity: "المجتمع",
  sectionProgram: "البرنامج",
  year1: "السنة الأولى",
  year2: "السنة الثانية",
  year3: "السنة الثالثة",
  year4: "السنة الرابعة",
  alumni: "الخريجون",
  cohort: "الدفعة",
  semester1: "الفصل الأول",
  semester2: "الفصل الثاني",
  hours: "ساعات",
  theory: "نظري",
  lab: "عملي",
  instructor: "المدرّس",
  prereq: "متطلب سابق",
  students: "طلاب",
  professors: "أساتذة",
  courses: "مقررات",
  projects: "مشاريع",
  gpa: "المعدل",
  transcript: "كشف العلامات",
  coursework: "أعمال السنة",
  midterm: "منتصف الفصل",
  final: "الامتحان النهائي",
  total: "المجموع",
  grade: "التقدير",
  enrolled: "مسجّل",
  inProgress: "جارٍ",
  complete: "مكتمل",
  fail: "راسب",
  pass: "مقبول",
  good: "جيد",
  vgood: "جيد جداً",
  excellent: "ممتاز",
  pinned: "مثبّت",
  allYears: "كل الدفعات",
  office: "المكتب",
  research: "الاهتمام البحثي",
  bio: "نبذة",
  advisor: "المرشد الأكاديمي",
  supervisor: "المشرف",
  status: "الحالة",
  defended: "نوقش",
  ongoing: "جارٍ",
  proposed: "مقترح",
  graduation: "تخرج",
  course: "مقرر",
  researchKind: "بحث",
  joinTitle: "الانضمام إلى البوابة",
  joinLead: "هذه البوابة مغلقة على أعضاء برنامج النمذجة. حدّد صفتك داخل البرنامج لإكمال الملف.",
  role: "الصفة",
  roleStudent: "طالب",
  roleFaculty: "عضو هيئة تدريسية",
  roleCoordinator: "منسّق البرنامج",
  yourNameAr: "الاسم بالعربية",
  yourNameEn: "الاسم بالإنكليزية",
  pickYear: "السنة الدراسية",
  joinCta: "تأكيد الانضمام",
  joining: "جارٍ الحفظ…",
  welcome: "أهلاً",
  thisWeek: "هذا الأسبوع",
  upcoming: "قادم",
  recentNotices: "آخر التعاميم",
  myYear: "دفعَتي",
  teaching: "التدريس",
  viewAll: "عرض الكل",
  noGrades: "لا علامات مسجّلة بعد لهذا الفصل.",
  save: "حفظ",
  saved: "تم الحفظ",
  language: "English",
  searchPeople: "بحث بالاسم أو الرقم الجامعي",
  noResults: "لا نتائج",
  fromTo: "من — إلى",
  partners: "شركاء البرنامج",
  ncd: "المركز الوطني للمتميزين",
  planning: "هيئة التخطيط والإحصاء",
  academicYear: "العام الدراسي 2026–2027",
  closedNote: "المحتوى أكاديمي داخلي. لا يُشارك خارج البرنامج.",
  profileHint: "يُحدَّث اسمك كما سيظهر في الدليل الداخلي.",
  linkedRoster: "الربط بسجل الدفعة",
  none: "بدون",
  gradebook: "سجل العلامات",
  editGrades: "إدخال علامات",
  onlyFaculty: "إدخال العلامات متاح للهيئة التدريسية ومنسّق البرنامج.",
  dashboardLead: "متابعة الدراسة، الدفعات، والمشاريع من مكان واحد.",
  emptyYear: "لا طلاب في هذه الدفعة بعد.",
  resourcesLead: "أدوات وبرمجيات وقراءات معتمدة داخل البرنامج.",
  charterLead: "الأنظمة الداخلية المعتمدة في البرنامج — المرجع في الحضور، التقييم، والمشروع.",
  missionLead: "لماذا وُجد هذا البرنامج، وإلى أين يسير.",
  firstCohort: "أول دفعة ناقشت مشاريعها في تموز 2026.",
  hoursShort: "س",
  credits: "وحدات",
  code: "الرمز",
  name: "الاسم",
  year: "السنة",
  contact: "التواصل",
  baramkeh: "مجمّع البرامكة — دمشق",
  loading: "جارٍ التحميل…",
  sessionWait: "جاري التحقق من الجلسة",
  openCourse: "فتح المقرر",
  members: "أعضاء البوابة",
  roster: "سجل الدفعة",
  abstract: "الملخص",
  team: "الفريق",
  software: "برمجيات",
  data: "بيانات",
  reading: "قراءات",
  labKind: "مختبر",
  exam: "امتحان",
  holiday: "عطلة",
  deadline: "موعد تسليم",
  event: "فعالية",
  teachingKind: "تدريس",
  academic: "أكاديمي",
  admin: "إداري",
  notice: "تعميم",
  today: "اليوم",
  avg: "متوسط الدفعة",
  rank: "الترتيب",
  of: "من",
  enrolledCourses: "مقررات الفصل",
  completedCredits: "وحدات مكتملة",
  viewCurriculum: "الخطة كاملة",
  viewCharter: "الأنظمة",
  defense: "مناقشة",
  updateProfile: "حفظ الملف",
  studentNo: "الرقم الجامعي",
  title: "اللقب العلمي",
  navRegistry: "السجل",
  sectionAdmin: "الإدارة",
  registryLead: "أنت تقرر الأسماء والتفاصيل. غيّر أي طالب أو أستاذ أو مقرر من هنا — البيانات الأولية مجرد نقطة انطلاق.",
  addStudent: "إضافة طالب",
  addFaculty: "إضافة أستاذ",
  addCourse: "إضافة مقرر",
  edit: "تعديل",
  delete: "حذف",
  confirmDelete: "حذف هذا السجل نهائياً؟ لا يمكن التراجع.",
  email: "البريد",
  hoursTheory: "ساعات نظري",
  hoursLab: "ساعات عملي",
  courseCode: "رمز المقرر",
  codeLocked: "لا يُغيَّر الرمز بعد الإنشاء.",
  create: "إنشاء",
  saveFailed: "تعذّر الحفظ. راجع الحقول المطلوبة.",
  requiredField: "حقل مطلوب",
  pickInstructor: "المدرّس",
  pickAdvisor: "المرشد الأكاديمي",
  coursesTaught: "المقررات التي يدرّسها",
  newRecord: "سجل جديد",
  youDecide: "المحتوى يُحرَّر من السجل — أنت تقرر الأسماء الحقيقية.",
  openRegistry: "فتح السجل",
  semester: "الفصل",
  linkedFaculty: "الربط بسجل الهيئة",
};

const en: Dict = {
  app: "MEA Portal",
  program: "Modelling & Economic Analysis",
  faculty: "Faculty of Economics",
  university: "Damascus University",
  partner: "Authority for Excellence & Creativity",
  internal: "Internal portal — programme members only",
  signIn: "Member sign-in",
  signInHint: "Reserved for students and faculty of the programme.",
  continueGoogle: "Continue with Google",
  continueX: "Continue with X",
  navHome: "Dashboard",
  navYear: "Cohort",
  navStudents: "Students",
  navFaculty: "Faculty",
  navCurriculum: "Curriculum",
  navGrades: "Grades",
  navProjects: "Projects",
  navCalendar: "Calendar",
  navNotices: "Notices",
  navCharter: "Regulations",
  navMission: "Mission & plan",
  navResources: "Resources",
  navProfile: "Profile",
  navJoin: "Join",
  sectionStudy: "Study",
  sectionCommunity: "Community",
  sectionProgram: "Programme",
  year1: "Year I",
  year2: "Year II",
  year3: "Year III",
  year4: "Year IV",
  alumni: "Alumni",
  cohort: "Cohort",
  semester1: "Semester 1",
  semester2: "Semester 2",
  hours: "hours",
  theory: "lecture",
  lab: "lab",
  instructor: "Instructor",
  prereq: "Prerequisite",
  students: "students",
  professors: "faculty",
  courses: "courses",
  projects: "projects",
  gpa: "Average",
  transcript: "Transcript",
  coursework: "Coursework",
  midterm: "Midterm",
  final: "Final",
  total: "Total",
  grade: "Class",
  enrolled: "Enrolled",
  inProgress: "In progress",
  complete: "Complete",
  fail: "Fail",
  pass: "Pass",
  good: "Good",
  vgood: "Very good",
  excellent: "Excellent",
  pinned: "Pinned",
  allYears: "All years",
  office: "Office",
  research: "Research",
  bio: "Profile",
  advisor: "Adviser",
  supervisor: "Supervisor",
  status: "Status",
  defended: "Defended",
  ongoing: "Ongoing",
  proposed: "Proposed",
  graduation: "Graduation",
  course: "Course",
  researchKind: "Research",
  joinTitle: "Join the portal",
  joinLead: "This portal is closed to MEA members. Choose your role in the programme to finish your file.",
  role: "Role",
  roleStudent: "Student",
  roleFaculty: "Faculty",
  roleCoordinator: "Programme coordinator",
  yourNameAr: "Name in Arabic",
  yourNameEn: "Name in English",
  pickYear: "Year of study",
  joinCta: "Confirm membership",
  joining: "Saving…",
  welcome: "Welcome",
  thisWeek: "This week",
  upcoming: "Upcoming",
  recentNotices: "Latest notices",
  myYear: "My cohort",
  teaching: "Teaching",
  viewAll: "View all",
  noGrades: "No marks recorded for this term yet.",
  save: "Save",
  saved: "Saved",
  language: "العربية",
  searchPeople: "Search by name or student number",
  noResults: "No results",
  fromTo: "From — to",
  partners: "Partners",
  ncd: "National Centre for the Distinguished",
  planning: "Planning & Statistics Authority",
  academicYear: "Academic year 2026–2027",
  closedNote: "Internal academic content. Do not share outside the programme.",
  profileHint: "This is how your name appears in the internal directory.",
  linkedRoster: "Link to cohort record",
  none: "None",
  gradebook: "Gradebook",
  editGrades: "Enter marks",
  onlyFaculty: "Mark entry is limited to faculty and the coordinator.",
  dashboardLead: "Study, cohorts and projects in one place.",
  emptyYear: "No students in this cohort yet.",
  resourcesLead: "Software, data and readings adopted by the programme.",
  charterLead: "Internal rules on attendance, assessment and the graduation project.",
  missionLead: "Why this programme exists, and where it is going.",
  firstCohort: "The first cohort defended in July 2026.",
  hoursShort: "h",
  credits: "credits",
  code: "Code",
  name: "Name",
  year: "Year",
  contact: "Contact",
  baramkeh: "Baramkeh campus — Damascus",
  loading: "Loading…",
  sessionWait: "Checking session",
  openCourse: "Open course",
  members: "Portal members",
  roster: "Cohort roll",
  abstract: "Abstract",
  team: "Team",
  software: "Software",
  data: "Data",
  reading: "Readings",
  labKind: "Lab",
  exam: "Exam",
  holiday: "Holiday",
  deadline: "Deadline",
  event: "Event",
  teachingKind: "Teaching",
  academic: "Academic",
  admin: "Admin",
  notice: "Notice",
  today: "Today",
  avg: "Cohort mean",
  rank: "Rank",
  of: "of",
  enrolledCourses: "Term courses",
  completedCredits: "Credits done",
  viewCurriculum: "Full plan",
  viewCharter: "Regulations",
  defense: "Defence",
  updateProfile: "Save profile",
  studentNo: "Student no.",
  title: "Title",
  navRegistry: "Registry",
  sectionAdmin: "Admin",
  registryLead: "You decide the names and details. Edit any student, professor or course here — the starter list is only a draft.",
  addStudent: "Add student",
  addFaculty: "Add professor",
  addCourse: "Add course",
  edit: "Edit",
  delete: "Delete",
  confirmDelete: "Delete this record permanently? This cannot be undone.",
  email: "Email",
  hoursTheory: "Lecture hours",
  hoursLab: "Lab hours",
  courseCode: "Course code",
  codeLocked: "The code cannot be changed after creation.",
  create: "Create",
  saveFailed: "Could not save. Check the required fields.",
  requiredField: "Required",
  pickInstructor: "Instructor",
  pickAdvisor: "Adviser",
  coursesTaught: "Courses taught",
  newRecord: "New record",
  youDecide: "Roster content is edited in the registry — you set the real names.",
  openRegistry: "Open registry",
  semester: "Semester",
  linkedFaculty: "Link to faculty record",
};

const dictionaries: Record<Locale, Dict> = { ar, en };

type Ctx = {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
  toggle: () => void;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<Ctx | null>(null);

function readLocale(): Locale {
  if (typeof window === "undefined") return "ar";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "en" || v === "ar") return v;
  } catch {
    /* ignore */
  }
  return "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
      document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const value = useMemo<Ctx>(() => {
    const dict = dictionaries[locale];
    return {
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: (key) => dict[key] ?? key,
      toggle,
      setLocale,
    };
  }, [locale, setLocale, toggle]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n");
  return ctx;
}

export function yearLabel(t: (k: string) => string, year: number | null | undefined) {
  if (year === 5 || year === 0) return t("alumni");
  if (year === 1) return t("year1");
  if (year === 2) return t("year2");
  if (year === 3) return t("year3");
  if (year === 4) return t("year4");
  return t("allYears");
}

export function loc(locale: Locale, arText: string | null | undefined, enText: string | null | undefined) {
  const v = locale === "ar" ? arText : enText;
  return (v && v.length > 0 ? v : arText || enText || "") as string;
}

export function fmtDate(iso: string, locale: Locale) {
  const raw = iso.length <= 10 ? `${iso}T12:00:00` : iso;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
