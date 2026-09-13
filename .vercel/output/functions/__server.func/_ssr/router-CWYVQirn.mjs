import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createRootRoute, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-DAQpoMaa.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CWYVQirn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var STORAGE_KEY = "mea.locale";
var dictionaries = {
	ar: {
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
		linkedFaculty: "الربط بسجل الهيئة"
	},
	en: {
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
		linkedFaculty: "Link to faculty record"
	}
};
var I18nContext = (0, import_react.createContext)(null);
function readLocale() {
	if (typeof window === "undefined") return "ar";
	try {
		const v = window.localStorage.getItem(STORAGE_KEY);
		if (v === "en" || v === "ar") return v;
	} catch {}
	return "ar";
}
function I18nProvider({ children }) {
	const [locale, setLocaleState] = (0, import_react.useState)(readLocale);
	const setLocale = (0, import_react.useCallback)((l) => {
		setLocaleState(l);
		try {
			window.localStorage.setItem(STORAGE_KEY, l);
		} catch {}
		if (typeof document !== "undefined") {
			document.documentElement.lang = l;
			document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
		}
	}, []);
	const toggle = (0, import_react.useCallback)(() => {
		setLocale(locale === "ar" ? "en" : "ar");
	}, [locale, setLocale]);
	const value = (0, import_react.useMemo)(() => {
		const dict = dictionaries[locale];
		return {
			locale,
			dir: locale === "ar" ? "rtl" : "ltr",
			t: (key) => dict[key] ?? key,
			toggle,
			setLocale
		};
	}, [
		locale,
		setLocale,
		toggle
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nContext.Provider, {
		value,
		children
	});
}
function useI18n() {
	const ctx = (0, import_react.useContext)(I18nContext);
	if (!ctx) throw new Error("useI18n");
	return ctx;
}
function yearLabel(t, year) {
	if (year === 5 || year === 0) return t("alumni");
	if (year === 1) return t("year1");
	if (year === 2) return t("year2");
	if (year === 3) return t("year3");
	if (year === 4) return t("year4");
	return t("allYears");
}
function loc(locale, arText, enText) {
	const v = locale === "ar" ? arText : enText;
	return v && v.length > 0 ? v : arText || enText || "";
}
function fmtDate(iso, locale) {
	const raw = iso.length <= 10 ? `${iso}T12:00:00` : iso;
	const d = new Date(raw);
	if (Number.isNaN(d.getTime())) return iso;
	return new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(d);
}
var styles_default = "/assets/styles-DK_Fpblj.css";
var APP_NAME = "MEA Portal";
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 2e4,
	refetchOnWindowFocus: false,
	retry: 1
} } });
var Route$22 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#2d7ec4"
			},
			{
				name: "description",
				content: "Internal portal for Modelling and Economic Analysis — Faculty of Economics, Damascus University."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function DirSync() {
	const { locale } = useI18n();
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
	}, [locale]);
	return null;
}
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(I18nProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DirSync, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
				client: queryClient,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$20 = () => import("../_app-DPJ_SyN3.mjs");
var Route$21 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./login-CK5TaLR_.mjs");
var Route$20 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("../_app-CB2atL0M.mjs");
var Route$19 = createFileRoute("/_app/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./calendar-CbJ1hvmy.mjs");
var Route$18 = createFileRoute("/_app/calendar")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./charter-Cc-1Lcsl.mjs");
var Route$17 = createFileRoute("/_app/charter")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./curriculum-CDtNNYNM.mjs");
var Route$16 = createFileRoute("/_app/curriculum")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./faculty-CYYtpBv6.mjs");
var Route$15 = createFileRoute("/_app/faculty")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./grades-B06xgu1n.mjs");
var Route$14 = createFileRoute("/_app/grades")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./join-CX3_Kuy4.mjs");
var Route$13 = createFileRoute("/_app/join")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./mission-DA6kyfQZ.mjs");
var Route$12 = createFileRoute("/_app/mission")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./notices-5Q6_L1PR.mjs");
var Route$11 = createFileRoute("/_app/notices")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./people-B3hKrCQ2.mjs");
var Route$10 = createFileRoute("/_app/people")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./profile-DfAQRQy3.mjs");
var Route$9 = createFileRoute("/_app/profile")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./projects-BmZJefkc.mjs");
var Route$8 = createFileRoute("/_app/projects")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./registry-nadqaeq1.mjs");
var Route$7 = createFileRoute("/_app/registry")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./resources-DERaX3zZ.mjs");
var Route$6 = createFileRoute("/_app/resources")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./courses._code-Cwm1boWo.mjs");
var Route$5 = createFileRoute("/_app/courses/$code")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./notices._id-DaFa6zYe.mjs");
var Route$4 = createFileRoute("/_app/notices/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./people._id-CttLmZuF.mjs");
var Route$3 = createFileRoute("/_app/people/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./projects._id-CN2eN4Jd.mjs");
var Route$2 = createFileRoute("/_app/projects/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./years._year-DuvW2_Yx.mjs");
var Route$1 = createFileRoute("/_app/years/$year")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var AppRoute = Route$21.update({
	id: "/_app",
	getParentRoute: () => Route$22
});
var LoginRoute = Route$20.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$22
});
var AppIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppCalendarRoute = Route$18.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => AppRoute
});
var AppCharterRoute = Route$17.update({
	id: "/charter",
	path: "/charter",
	getParentRoute: () => AppRoute
});
var AppCurriculumRoute = Route$16.update({
	id: "/curriculum",
	path: "/curriculum",
	getParentRoute: () => AppRoute
});
var AppFacultyRoute = Route$15.update({
	id: "/faculty",
	path: "/faculty",
	getParentRoute: () => AppRoute
});
var AppGradesRoute = Route$14.update({
	id: "/grades",
	path: "/grades",
	getParentRoute: () => AppRoute
});
var AppJoinRoute = Route$13.update({
	id: "/join",
	path: "/join",
	getParentRoute: () => AppRoute
});
var AppMissionRoute = Route$12.update({
	id: "/mission",
	path: "/mission",
	getParentRoute: () => AppRoute
});
var AppNoticesRoute = Route$11.update({
	id: "/notices",
	path: "/notices",
	getParentRoute: () => AppRoute
});
var AppPeopleRoute = Route$10.update({
	id: "/people",
	path: "/people",
	getParentRoute: () => AppRoute
});
var AppProfileRoute = Route$9.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppProjectsRoute = Route$8.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => AppRoute
});
var AppRegistryRoute = Route$7.update({
	id: "/registry",
	path: "/registry",
	getParentRoute: () => AppRoute
});
var AppResourcesRoute = Route$6.update({
	id: "/resources",
	path: "/resources",
	getParentRoute: () => AppRoute
});
var AppCoursesCodeRoute = Route$5.update({
	id: "/courses/$code",
	path: "/courses/$code",
	getParentRoute: () => AppRoute
});
var AppNoticesIdRoute = Route$4.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppNoticesRoute
});
var AppPeopleIdRoute = Route$3.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppPeopleRoute
});
var AppProjectsIdRoute = Route$2.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AppProjectsRoute
});
var AppYearsYearRoute = Route$1.update({
	id: "/years/$year",
	path: "/years/$year",
	getParentRoute: () => AppRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$22
});
var AppNoticesRouteChildren = { AppNoticesIdRoute };
var AppNoticesRouteWithChildren = AppNoticesRoute._addFileChildren(AppNoticesRouteChildren);
var AppPeopleRouteChildren = { AppPeopleIdRoute };
var AppPeopleRouteWithChildren = AppPeopleRoute._addFileChildren(AppPeopleRouteChildren);
var AppProjectsRouteChildren = { AppProjectsIdRoute };
var AppRouteChildren = {
	AppCalendarRoute,
	AppCharterRoute,
	AppCurriculumRoute,
	AppFacultyRoute,
	AppGradesRoute,
	AppJoinRoute,
	AppMissionRoute,
	AppNoticesRoute: AppNoticesRouteWithChildren,
	AppPeopleRoute: AppPeopleRouteWithChildren,
	AppProfileRoute,
	AppProjectsRoute: AppProjectsRoute._addFileChildren(AppProjectsRouteChildren),
	AppRegistryRoute,
	AppResourcesRoute,
	AppIndexRoute,
	AppCoursesCodeRoute,
	AppYearsYearRoute
};
var rootRouteChildren = {
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as a, loc as c, Route$3 as i, useI18n as l, Route$1 as n, Route$5 as o, Route$2 as r, fmtDate as s, router_exports as t, yearLabel as u };
