import { n as composeTotal, r as sampleMark } from "./grades-DE5L2NBr.mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-JXWGbUom.mjs";
import { r as num } from "./utils-boGw2iwM.mjs";
import { t as authMiddleware } from "./middleware-DUf3598q.mjs";
import { t as COHORTS } from "./types-XAPqpnyM.mjs";
import { a as REGULATIONS, i as PROJECTS, o as RESOURCES, r as NOTICES, t as EVENTS } from "./content-DqdwPZEu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CJ0XkbJd.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function F(id, name_ar, name_en, title_ar, title_en, office, research_ar, research_en, bio_ar, bio_en, course_codes) {
	return {
		id,
		kind: "faculty",
		name_ar,
		name_en,
		year_level: null,
		student_no: null,
		cohort: null,
		title_ar,
		title_en,
		office,
		email: `${id.replace("f-", "")}@eco.damascusuniversity.edu.sy`,
		bio_ar,
		bio_en,
		research_ar,
		research_en,
		course_codes,
		advisor_id: null
	};
}
function S(id, name_ar, name_en, year, no, cohort, advisor_id, bio_ar, bio_en) {
	return {
		id,
		kind: "student",
		name_ar,
		name_en,
		year_level: year,
		student_no: no,
		cohort,
		title_ar: null,
		title_en: null,
		office: null,
		email: `${no.toLowerCase()}@stud.damascusuniversity.edu.sy`,
		bio_ar,
		bio_en,
		research_ar: "",
		research_en: "",
		course_codes: "",
		advisor_id
	};
}
var FACULTY = [
	F("f-harfoush", "د. سليم حرفوش", "Dr. Salim Harfoush", "منسّق البرنامج — اقتصاد قياسي", "Programme coordinator — Econometrics", "مكتب 214", "القياس الاقتصادي التطبيقي، سياسات الاقتصاد الكلّي، تقييم الأثر.", "Applied econometrics, macro policy, impact evaluation.", "يشرف على البرنامج منذ إحداثه. كوّن مسار القياس في الكلية ويركّز على ربط أدوات التقدير بمسائل السياسة السورية.", "Has coordinated the programme since it opened. Built the econometrics track and ties estimation tools to Syrian policy questions.", "MEA241,MEA301,MEA401"),
	F("f-abdelnour", "د. رنا عبد النور", "Dr. Rana Abdelnour", "أستاذ مساعد — اقتصاد كلّي ونمذجة", "Assistant professor — Macroeconomics & modelling", "مكتب 221", "نماذج DSGE المبسّطة، الدورات، سيناريوهات إعادة الإعمار.", "Small DSGE models, cycles, reconstruction scenarios.", "تدرّس التحليل الكلّي والنمذجة الديناميكية، وتشرف على مشاريع السيناريوهات للاقتصاد السوري.", "Teaches intermediate macro and dynamic modelling; supervises scenario projects on the Syrian economy.", "MEA102,MEA202,MEA342,MEA412"),
	F("f-khoury", "د. فادي خوري", "Dr. Fadi Khoury", "مدرّس — رياضيات اقتصادية", "Lecturer — Mathematical economics", "مكتب 118", "التحسين الديناميكي، التوازن العام، الجبر الخطي للتطبيقات.", "Dynamic optimisation, general equilibrium, linear algebra for applications.", "يبني الأساس الرياضي للدفعة من السنة الأولى حتى الاقتصاد الرياضي في السنة الثالثة.", "Builds the mathematical spine of the cohort, from year one through mathematical economics in year three.", "MEA111,MEA112,MEA211,MEA212,MEA311"),
	F("f-barakat", "د. لينا بركات", "Dr. Lina Barakat", "مدرّسة — إحصاء تطبيقي", "Lecturer — Applied statistics", "مكتب 119", "الاستدلال، العينات، السلاسل الزمنية التمهيدية.", "Inference, sampling, introductory time series.", "مسؤولة مختبر الإحصاء، وتدرّب الطلاب على التصميم قبل الانتقال إلى القياس.", "Runs the statistics lab and trains students in design before they move to econometrics.", "MEA121,MEA122,MEA221,MEA302"),
	F("f-shaheen", "د. ماهر شاهين", "Dr. Maher Shaheen", "أستاذ مساعد — مالية عامة وسياسات", "Assistant professor — Public finance & policy", "مكتب 230", "الإنفاق العام، الضرائب، تقييم السياسات.", "Public expenditure, taxation, policy evaluation.", "يربط المالية العامة بأدوات القياس ويشرف على مذكرات السياسات في السنة الرابعة.", "Connects public finance to measurement tools and supervises year-four policy notes.", "MEA222,MEA421,MEA422"),
	F("f-ismail", "د. جمانة إسماعيل", "Dr. Jumana Ismail", "مدرّسة — تنمية وتخطيط", "Lecturer — Development & planning", "مكتب 232", "نماذج النمو، الحسابات القومية، تخطيط القطاعات.", "Growth models, national accounts, sector planning.", "تعمل مع هيئة التخطيط والإحصاء على تطبيقات الحسابات ومشاريع التنمية للطلاب.", "Works with the Planning Authority on national-accounts applications and student development projects.", "MEA321,MEA322,MEA332"),
	F("f-kadmani", "د. نبيل قضماني", "Dr. Nabil Kadmani", "مدرّس — برمجة وتحليل بيانات", "Lecturer — Computing & data analysis", "مختبر 3", "Python و R للتحليل الاقتصادي، البيانات اللوحية، التعلّم الآلي التمهيدي.", "Python and R for economics, panel data, introductory machine learning.", "يشرف على مختبر الحوسبة ويضمن أن كل نموذج في البرنامج قابل لإعادة التشغيل.", "Runs the computing lab and insists that every model in the programme is reproducible.", "MEA141,MEA142,MEA242,MEA402"),
	F("f-atri", "د. هالة عطري", "Dr. Hala Atri", "مدرّسة — اقتصاد مفتوح", "Lecturer — Open-economy economics", "مكتب 208", "التجارة، سعر الصرف، التكتلات، الطاقة.", "Trade, exchange rates, blocs, energy.", "تدرّس العلاقات الدولية واقتصاد الطاقة، وتركّز على انفتاح الاقتصاد السوري.", "Teaches international economics and energy, with a focus on the openness of the Syrian economy.", "MEA331,MEA341,MEA431"),
	F("f-deeb", "أ.د. وائل ديب", "Prof. Wael Deeb", "رئيس اللجنة العلمية", "Chair of the scientific committee", "مكتب العمادة 12", "الاقتصاد الرياضي، تاريخ الفكر، منهجية البحث.", "Mathematical economics, history of thought, research methods.", "يرأس اللجنة العلمية للبرنامج ويدرّس منهجية البحث ومشروع التخرج.", "Chairs the programme’s scientific committee and teaches research methods and the graduation project.", "MEA101,MEA432,MEA491,MEA492")
];
var A = "f-harfoush";
var B = "f-abdelnour";
var C$1 = "f-barakat";
var D = "f-ismail";
var STUDENTS = [
	S("s-alma", "ألما حرفوش", "Alma Harfoush", 5, "MEA2201", "2022–2026", A, "اهتمت بمحددات التضخم ونماذج VAR.", "Worked on inflation determinants and VAR models."),
	S("s-tamer", "تامر حلبي", "Tamer Halabi", 5, "MEA2202", "2022–2026", B, "بنى سيناريوهات إعادة إعمار مبسّطة.", "Built simplified reconstruction scenarios."),
	S("s-lina", "لينا قضماني", "Lina Kadmani", 5, "MEA2203", "2022–2026", A, "قيّمت كفاءة الإنفاق الاستثماري العام.", "Evaluated the efficiency of public investment."),
	S("s-rami", "رامي خوري", "Rami Khoury", 5, "MEA2204", "2022–2026", D, "نموذج مدخلات-مخرجات للصناعة التحويلية.", "An input–output model of manufacturing."),
	S("s-nidaa", "نداء إسماعيل", "Nidaa Ismail", 5, "MEA2205", "2022–2026", B, "دراسة سياسات الدعم وأثرها في الأسعار.", "Studied subsidy policy and price effects."),
	S("s-samer", "سامر ديب", "Samer Deeb", 5, "MEA2206", "2022–2026", A, "نمذجة سوق العمل والأجور الحقيقية.", "Modelled the labour market and real wages."),
	S("s-hind", "هند بركات", "Hind Barakat", 5, "MEA2207", "2022–2026", C$1, "تحليل مؤشرات الاقتصاد الكلّي 2000–2024.", "Macro indicator analysis, 2000–2024."),
	S("s-jad", "جاد عطري", "Jad Atri", 5, "MEA2208", "2022–2026", D, "سيناريوهات الطاقة والنمو.", "Energy and growth scenarios."),
	S("s-maya", "مايا شاهين", "Maya Shaheen", 5, "MEA2209", "2022–2026", B, "قياس أثر السياسة النقدية في سعر الصرف.", "Measured monetary-policy effects on the exchange rate."),
	S("s-y4-1", "كريم نصور", "Karim Nassour", 4, "MEA2301", "2023–2027", A, "يعمل على نموذج لَوحي للبنوك الخاصة.", "Building a panel model of private banks."),
	S("s-y4-2", "تالا فرحات", "Tala Farhat", 4, "MEA2302", "2023–2027", B, "تهتم بديناميك الدين العام.", "Working on public-debt dynamics."),
	S("s-y4-3", "ميسرة خوري", "Maysara Khoury", 4, "MEA2303", "2023–2027", D, "تدرس سلاسل الإمداد الزراعية.", "Studying agricultural supply chains."),
	S("s-y4-4", "جود حلبي", "Joud Halabi", 4, "MEA2304", "2023–2027", C$1, "تحليل البطالة الإقليمية.", "Regional unemployment analysis."),
	S("s-y4-5", "ساني قضماني", "Sani Kadmani", 4, "MEA2305", "2023–2027", A, "تعلّم آلي تمهيدي للتنبؤ بالمؤشرات.", "Introductory ML for indicator forecasts."),
	S("s-y4-6", "هدى بركات", "Huda Barakat", 4, "MEA2306", "2023–2027", B, "نمذجة الاستهلاك العائلي.", "Household consumption modelling."),
	S("s-y4-7", "نزار ديب", "Nizar Deeb", 4, "MEA2307", "2023–2027", A, "تقييم برامج التشغيل.", "Evaluating employment programmes."),
	S("s-y4-8", "لمى عطري", "Lama Atri", 4, "MEA2308", "2023–2027", D, "اقتصاد الطاقة المتجددة.", "Renewable-energy economics."),
	S("s-y3-1", "لين نصور", "Lynn Nassour", 3, "MEA2401", "2024–2028", C$1, "تهتم بالسلاسل الزمنية للتضخم.", "Interested in inflation time series."),
	S("s-y3-2", "باسل حرفوش", "Basel Harfoush", 3, "MEA2402", "2024–2028", A, "يبني أدوات انحدار في R.", "Building regression tooling in R."),
	S("s-y3-3", "سلام خوري", "Salam Khoury", 3, "MEA2403", "2024–2028", B, "تقرأ نماذج النمو المبسّطة.", "Reading small growth models."),
	S("s-y3-4", "عُلا إسماعيل", "Ola Ismail", 3, "MEA2404", "2024–2028", D, "حسابات قومية تطبيقية.", "Applied national accounts."),
	S("s-y3-5", "فراس حلبي", "Firas Halabi", 3, "MEA2405", "2024–2028", A, "بيانات لوحية للمصارف.", "Banking panel data."),
	S("s-y3-6", "رهام ديب", "Reham Deeb", 3, "MEA2406", "2024–2028", C$1, "عينات وتصميم استبيان.", "Sampling and survey design."),
	S("s-y3-7", "وسيم قضماني", "Wasim Kadmani", 3, "MEA2407", "2024–2028", B, "اقتصاد مفتوح تمهيدي.", "Introductory open-economy work."),
	S("s-y3-8", "دانا شاهين", "Dana Shaheen", 3, "MEA2408", "2024–2028", D, "دراسات جدوى قطاع الخدمات.", "Feasibility work on services."),
	S("s-y2-1", "يوسف بركات", "Youssef Barakat", 2, "MEA2501", "2025–2029", C$1, "يتقدّم في الإحصاء الاستدلالي.", "Advancing in inferential statistics."),
	S("s-y2-2", "نور فرحات", "Nour Farhat", 2, "MEA2502", "2025–2029", A, "تهتم بالتحليل الجزئي.", "Drawn to microeconomic analysis."),
	S("s-y2-3", "إياد نصور", "Iyad Nassour", 2, "MEA2503", "2025–2029", B, "يتدرّب على R.", "Training in R."),
	S("s-y2-4", "سيلفا خوري", "Silva Khoury", 2, "MEA2504", "2025–2029", D, "مالية عامة تمهيدية.", "Introductory public finance."),
	S("s-y2-5", "غيث حلبي", "Ghaith Halabi", 2, "MEA2505", "2025–2029", A, "جبر خطي وتطبيقاته.", "Linear algebra and applications."),
	S("s-y2-6", "مجد إسماعيل", "Majd Ismail", 2, "MEA2506", "2025–2029", C$1, "مختبر الإحصاء.", "Statistics lab."),
	S("s-y2-7", "راما ديب", "Rama Deeb", 2, "MEA2507", "2025–2029", B, "تحليل كلّي تمهيدي.", "Introductory macro analysis."),
	S("s-y2-8", "ليث عطري", "Laith Atri", 2, "MEA2508", "2025–2029", D, "نقود ومصارف.", "Money and banking."),
	S("s-y1-1", "سارة حرفوش", "Sara Harfoush", 1, "MEA2601", "2026–2030", A, "دفعة هذا العام — مدخل إلى النمذجة.", "This year’s intake — introduction to modelling."),
	S("s-y1-2", "عمر قضماني", "Omar Kadmani", 1, "MEA2602", "2026–2030", C$1, "خلفية رياضية من المركز الوطني للمتميزين.", "Mathematical background from the NCD."),
	S("s-y1-3", "ميساء حلبي", "Maysa Halabi", 1, "MEA2603", "2026–2030", B, "اهتمام مبكر بالبيانات.", "Early interest in data."),
	S("s-y1-4", "حسام خوري", "Hussam Khoury", 1, "MEA2604", "2026–2030", D, "يتعلّم Python في المختبر.", "Learning Python in the lab."),
	S("s-y1-5", "جنى نصور", "Jana Nassour", 1, "MEA2605", "2026–2030", C$1, "إحصاء وصفي وتطبيقات.", "Descriptive statistics and applications."),
	S("s-y1-6", "طلال بركات", "Talal Barakat", 1, "MEA2606", "2026–2030", A, "مبادئ الاقتصاد والمحاسبة.", "Principles of economics and accounting."),
	S("s-y1-7", "رنيم إسماعيل", "Raneem Ismail", 1, "MEA2607", "2026–2030", B, "لغة أجنبية اقتصادية.", "Economic English."),
	S("s-y1-8", "زياد شاهين", "Ziad Shaheen", 1, "MEA2608", "2026–2030", D, "مدخل إلى النمذجة في الفصل الثاني.", "Introduction to modelling in semester two."),
	S("s-y1-9", "لارا ديب", "Lara Deeb", 1, "MEA2609", "2026–2030", C$1, "تاسعة طلاب السنة الأولى هذا العام.", "Ninth student in this year’s first year.")
];
var PEOPLE = [...FACULTY, ...STUDENTS];
function C(code, name_ar, name_en, year, sem, th, lab, instructor_id, desc_ar, desc_en, prereq = null) {
	return {
		code,
		name_ar,
		name_en,
		year_level: year,
		semester: sem,
		hours_theory: th,
		hours_lab: lab,
		credits: th + lab,
		desc_ar,
		desc_en,
		instructor_id,
		prereq
	};
}
var COURSES = [
	C("MEA101", "مدخل إلى علم الاقتصاد", "Introduction to economics", 1, 1, 4, 0, "f-deeb", "المشكلة الاقتصادية، الندرة، أنظمة الإنتاج، السوق مقابل التخطيط، وحدود النموذج كأداة للفهم.", "The economic problem, scarcity, production systems, market versus planning, and the model as a tool of thought."),
	C("MEA111", "رياضيات اقتصادية 1", "Mathematical economics I", 1, 1, 2, 2, "f-khoury", "الدوال، المشتقات، الأمثلة المقيّدة، مرونات، ومقدمة للمصفوفات كما يحتاجها الاقتصادي.", "Functions, derivatives, constrained optimisation, elasticities, and matrices as an economist uses them."),
	C("MEA121", "إحصاء وصفي", "Descriptive statistics", 1, 1, 2, 2, "f-barakat", "توزيعات، مقاييس نزعة وتشتت، الارتباط، والعرض البياني للبيانات الاقتصادية.", "Distributions, location and spread, correlation, and graphical display of economic data."),
	C("MEA131", "مبادئ المحاسبة", "Principles of accounting", 1, 1, 2, 2, "f-shaheen", "القيد المزدوج، القوائم المالية، وقراءة أرقام المنشأة قبل الانتقال إلى الحسابات القومية.", "Double entry, financial statements, and reading a firm before moving to national accounts."),
	C("MEA141", "برمجة للتحليل الاقتصادي 1", "Computing for economics I", 1, 1, 1, 3, "f-kadmani", "Python: بنى البيانات، التحكم، الدوال، وقراءة ملفات CSV للمؤشرات الاقتصادية.", "Python: data structures, control flow, functions, and reading CSV indicator files."),
	C("MEA191", "لغة أجنبية اقتصادية 1", "Economic English I", 1, 1, 4, 0, "f-atri", "قراءة نصوص اقتصادية قصيرة وكتابة فقرة تحليلية بالإنكليزية.", "Reading short economic texts and writing an analytical paragraph in English."),
	C("MEA102", "مبادئ الاقتصاد الكلّي", "Principles of macroeconomics", 1, 2, 4, 0, "f-abdelnour", "الدخل القومي، الاستهلاك والاستثمار، النقود، والتضخم والبطالة في إطار مبسّط.", "National income, consumption and investment, money, inflation and unemployment in a simple frame.", "MEA101"),
	C("MEA112", "رياضيات اقتصادية 2", "Mathematical economics II", 1, 2, 2, 2, "f-khoury", "تكامل، معادلات فرقية تمهيدية، ومتتاليات كما تظهر في نماذج النمو.", "Integrals, introductory difference equations, and sequences as they appear in growth models.", "MEA111"),
	C("MEA122", "نظرية الاحتمالات", "Probability", 1, 2, 2, 2, "f-barakat", "المتغيرات العشوائية، التوزيعات الشائعة في الاقتصاد، والتوقع المشروط.", "Random variables, distributions common in economics, and conditional expectation.", "MEA121"),
	C("MEA132", "مدخل إلى النمذجة الاقتصادية", "Introduction to economic modelling", 1, 2, 2, 2, "f-harfoush", "ما النموذج، فروضه، حدوده، وتمرين أول على بناء علاقة قابلة للقياس.", "What a model is, its assumptions and limits, and a first exercise in a measurable relationship.", "MEA101"),
	C("MEA142", "تطبيقات حاسوبية", "Applied computing", 1, 2, 1, 3, "f-kadmani", "تنظيف البيانات، الرسم، وتصدير جداول قابلة لإعادة التشغيل.", "Cleaning data, plotting, and exporting reproducible tables.", "MEA141"),
	C("MEA192", "لغة أجنبية اقتصادية 2", "Economic English II", 1, 2, 4, 0, "f-atri", "تلخيص ورقة قصيرة وعرض شفهي لمؤشر اقتصادي.", "Summarising a short paper and presenting an economic indicator.", "MEA191"),
	C("MEA201", "تحليل اقتصادي جزئي", "Microeconomic analysis", 2, 1, 2, 2, "f-deeb", "تفضيلات، طلب، إنتاج وتكلفة، وتوازن المنشأة في أسواق مختلفة.", "Preferences, demand, production and cost, and firm equilibrium across market structures.", "MEA101"),
	C("MEA211", "جبر خطي للاقتصاديين", "Linear algebra for economists", 2, 1, 2, 2, "f-khoury", "فضاءات، قيم ذاتية، أنظمة معادلات، ومدخلات-مخرجات.", "Vector spaces, eigenvalues, linear systems, and input–output.", "MEA112"),
	C("MEA221", "إحصاء استدلالي", "Statistical inference", 2, 1, 2, 2, "f-barakat", "تقدير، اختبار فرضيات، فترات ثقة، ومقدمة للانحدار كأداة وصف.", "Estimation, hypothesis tests, confidence intervals, and regression as description.", "MEA122"),
	C("MEA231", "نقود ومصارف", "Money and banking", 2, 1, 2, 2, "f-shaheen", "عرض النقود، الجهاز المصرفي، وأدوات السياسة النقدية.", "Money supply, the banking system, and monetary-policy instruments.", "MEA102"),
	C("MEA241", "اقتصاد قياسي تمهيدي", "Introductory econometrics", 2, 1, 2, 2, "f-harfoush", "الانحدار البسيط، فروض غاوس-ماركوف، والقراءة النقدية لمخرجات التقدير.", "Simple regression, Gauss–Markov assumptions, and a critical reading of output.", "MEA221"),
	C("MEA291", "لغة أجنبية اقتصادية 3", "Economic English III", 2, 1, 4, 0, "f-atri", "كتابة مذكرة سياسة من صفحة واحدة.", "Writing a one-page policy note.", "MEA192"),
	C("MEA202", "تحليل اقتصادي كلّي", "Macroeconomic analysis", 2, 2, 2, 2, "f-abdelnour", "IS-LM في اقتصاد مفتوح مبسّط، العرض الكلّي، ومنحنى فيليبس.", "IS–LM in a small open economy, aggregate supply, and the Phillips curve.", "MEA102"),
	C("MEA212", "معادلات تفاضلية وديناميك", "Differential equations & dynamics", 2, 2, 2, 2, "f-khoury", "الاستقرار، مخططات الطور، ونماذج نمو مستمر مبسّطة.", "Stability, phase diagrams, and simple continuous-time growth.", "MEA211"),
	C("MEA222", "مالية عامة", "Public finance", 2, 2, 2, 2, "f-shaheen", "النفقات، الضرائب، العجز، والكفاءة مقابل العدالة.", "Expenditure, tax, deficit, and efficiency versus equity.", "MEA201"),
	C("MEA232", "قانون وتشريع اقتصادي", "Economic law", 2, 2, 4, 0, "f-deeb", "إطار العقود والشركات والتشريع المالي بقدر ما يحتاجه النموذج والجدوى.", "Contracts, companies and fiscal legislation as far as modelling and feasibility require.", "MEA101"),
	C("MEA242", "برمجة إحصائية", "Statistical programming", 2, 2, 1, 3, "f-kadmani", "R: إطارات البيانات، الانحدار، وإعادة التشغيل من ملف واحد.", "R: data frames, regression, and a one-file reproducible script.", "MEA141"),
	C("MEA292", "لغة أجنبية اقتصادية 4", "Economic English IV", 2, 2, 4, 0, "f-atri", "قراءة ورقة قياسية قصيرة وعرض فروضها.", "Reading a short empirical paper and presenting its assumptions.", "MEA291"),
	C("MEA301", "اقتصاد قياسي 1 — الانحدار", "Econometrics I — regression", 3, 1, 2, 2, "f-harfoush", "المتعدد، المتغيرات الوهمية، التشخيص، والارتباط الذاتي المبدئي.", "Multiple regression, dummies, diagnostics, and a first look at serial correlation.", "MEA241"),
	C("MEA311", "الاقتصاد الرياضي", "Mathematical economics", 3, 1, 2, 2, "f-khoury", "توازن عام مبسّط، أمثلة ديناميكية، ونظرية المباريات التمهيدية.", "Small general equilibrium, dynamic examples, and introductory game theory.", "MEA211"),
	C("MEA321", "الحسابات القومية", "National accounts", 3, 1, 2, 2, "f-ismail", "نظام الحسابات، الناتج، الدخل، ومصفوفة المحاسبة الاجتماعية تمهيدياً.", "The accounts system, output and income, and a first social accounting matrix.", "MEA202"),
	C("MEA331", "علاقات اقتصادية دولية", "International economics", 3, 1, 2, 2, "f-atri", "التجارة، ميزان المدفوعات، وسعر الصرف في اقتصاد صغير.", "Trade, the balance of payments, and the exchange rate in a small economy.", "MEA202"),
	C("MEA341", "قضايا اقتصادية معاصرة", "Contemporary economic issues", 3, 1, 4, 0, "f-atri", "ملفات سورية وإقليمية تُقرأ بأدوات البرنامج: تضخم، طاقة، إعادة إعمار.", "Syrian and regional files read with programme tools: inflation, energy, reconstruction.", "MEA202"),
	C("MEA302", "اقتصاد قياسي 2 — السلاسل", "Econometrics II — time series", 3, 2, 2, 2, "f-barakat", "الاستقرار، التكامل المشترك، VAR، والتنبؤ قصير الأجل.", "Stationarity, cointegration, VAR, and short-horizon forecasts.", "MEA301"),
	C("MEA312", "بحوث العمليات", "Operations research", 3, 2, 2, 2, "f-khoury", "البرمجة الخطية، النقل، والقرار متعدد المعايير في مسائل تخطيط.", "Linear programming, transport, and multi-criteria decisions in planning problems.", "MEA211"),
	C("MEA322", "التنمية والتخطيط", "Development and planning", 3, 2, 4, 0, "f-ismail", "نماذج النمو، فجوات التمويل، وتخطيط القطاعات في اقتصاد متعافٍ.", "Growth models, financing gaps, and sector planning in a recovering economy.", "MEA321"),
	C("MEA332", "دراسات الجدوى", "Feasibility studies", 3, 2, 2, 2, "f-ismail", "التدفقات، الخصم، الحساسية، والمخاطر في مشروع عام أو خاص.", "Cash flows, discounting, sensitivity and risk in a public or private project.", "MEA222"),
	C("MEA342", "نمذجة الاقتصاد الكلّي", "Macroeconomic modelling", 3, 2, 2, 2, "f-abdelnour", "نموذج كلّي صغير قابل للمعايرة، صدمات، ومسارات بديلة.", "A small calibratable macro model, shocks, and alternative paths.", "MEA202"),
	C("MEA401", "اقتصاد قياسي متقدم", "Advanced econometrics", 4, 1, 2, 2, "f-harfoush", "اللوحي، الآني، والمتغيرات الأداتية، مع تطبيق سوري واحد على الأقل.", "Panels, simultaneous equations and instruments, with at least one Syrian application.", "MEA302"),
	C("MEA411", "محاكاة ونماذج ديناميكية", "Simulation & dynamic models", 4, 1, 2, 2, "f-abdelnour", "محاكاة مونت كارلو، نماذج المخزون والتدفق، واختبار السياسات.", "Monte Carlo, stock–flow models, and policy experiments.", "MEA342"),
	C("MEA421", "تحليل السياسات العامة", "Public policy analysis", 4, 1, 2, 2, "f-shaheen", "دورة السياسة، تقييم الأثر، وكتابة التوصية المدعومة بنموذج.", "The policy cycle, impact evaluation, and a model-backed recommendation.", "MEA222"),
	C("MEA431", "اقتصاد الطاقة والموارد", "Energy and resource economics", 4, 1, 2, 2, "f-atri", "الطلب على الطاقة، التسعير، والانتقال في اقتصاد منتج للنفط.", "Energy demand, pricing, and transition in an oil-producing economy.", "MEA331"),
	C("MEA491", "مشروع التخرج 1", "Graduation project I", 4, 1, 1, 3, "f-deeb", "اقتراح البحث، المراجعة، وبيانات قابلة للتكرار. يُناقش المقترح أمام اللجنة.", "Proposal, literature, and replicable data. The proposal is defended before the committee.", "MEA301"),
	C("MEA402", "بيانات ضخمة وتعلّم آلي", "Economic data & machine learning", 4, 2, 2, 2, "f-kadmani", "تجميع، تنظيم، نماذج تنبؤ تمهيدية، وحدود التعلّم الآلي أمام النموذج الهيكلي.", "Ingest, tidy, introductory prediction models, and the limits of ML versus a structural model.", "MEA242"),
	C("MEA412", "سيناريوهات الاقتصاد السوري", "Scenarios for the Syrian economy", 4, 2, 2, 2, "f-abdelnour", "بناء ثلاثة مسارات على الأقل (أساس، إصلاح، صدمة) مع افتراضات معلنة.", "At least three paths (baseline, reform, shock) with stated assumptions.", "MEA342"),
	C("MEA422", "صناعة القرار الاقتصادي", "Economic decision-making", 4, 2, 2, 2, "f-shaheen", "من النموذج إلى المذكرة: جمهور القرار، التحفظ، وما لا يقوله الرقم.", "From model to note: the decision audience, caveats, and what a number does not say.", "MEA421"),
	C("MEA432", "منهجية البحث العلمي", "Research methods", 4, 2, 2, 2, "f-deeb", "سؤال البحث، التصميم، الأخلاقيات، والتوثيق في الاقتصاد التطبيقي.", "Research question, design, ethics, and documentation in applied economics.", "MEA301"),
	C("MEA492", "مشروع التخرج 2", "Graduation project II", 4, 2, 1, 3, "f-deeb", "التقدير، الكتابة، والمناقشة العلنية. المشروع ليس متطلباً شكلياً بل نواة دراسة قابلة للتوظيف.", "Estimation, writing, and a public defence. The project is a usable study, not a formality.", "MEA491")
];
var seedLock = null;
async function insertMany(sql, table, columns, rows) {
	if (rows.length === 0) return;
	const chunk = 60;
	for (let i = 0; i < rows.length; i += chunk) {
		const part = rows.slice(i, i + chunk);
		const values = [];
		const placeholders = part.map((row, ri) => {
			const cells = row.map((_, ci) => `$${ri * columns.length + ci + 1}`);
			values.push(...row);
			return `(${cells.join(",")})`;
		});
		await sql.query(`insert into ${table} (${columns.join(",")}) values ${placeholders.join(",")} on conflict do nothing`, values);
	}
}
async function ensureSeeded(sql) {
	if (!seedLock) seedLock = (async () => {
		if (((await sql`select count(*)::int as c from courses`)[0]?.c ?? 0) > 0) return;
		await insertMany(sql, "people", [
			"id",
			"kind",
			"name_ar",
			"name_en",
			"year_level",
			"student_no",
			"cohort",
			"title_ar",
			"title_en",
			"office",
			"email",
			"bio_ar",
			"bio_en",
			"research_ar",
			"research_en",
			"course_codes",
			"advisor_id"
		], PEOPLE.map((p) => [
			p.id,
			p.kind,
			p.name_ar,
			p.name_en,
			p.year_level,
			p.student_no,
			p.cohort,
			p.title_ar,
			p.title_en,
			p.office,
			p.email,
			p.bio_ar,
			p.bio_en,
			p.research_ar,
			p.research_en,
			p.course_codes,
			p.advisor_id
		]));
		await insertMany(sql, "courses", [
			"code",
			"name_ar",
			"name_en",
			"year_level",
			"semester",
			"hours_theory",
			"hours_lab",
			"credits",
			"desc_ar",
			"desc_en",
			"instructor_id",
			"prereq"
		], COURSES.map((c) => [
			c.code,
			c.name_ar,
			c.name_en,
			c.year_level,
			c.semester,
			c.hours_theory,
			c.hours_lab,
			c.credits,
			c.desc_ar,
			c.desc_en,
			c.instructor_id,
			c.prereq
		]));
		await insertMany(sql, "announcements", [
			"id",
			"title_ar",
			"title_en",
			"body_ar",
			"body_en",
			"category",
			"year_level",
			"pinned",
			"published_at"
		], NOTICES.map((n) => [
			n.id,
			n.title_ar,
			n.title_en,
			n.body_ar,
			n.body_en,
			n.category,
			n.year_level,
			n.pinned,
			n.published_at
		]));
		await insertMany(sql, "projects", [
			"id",
			"title_ar",
			"title_en",
			"abstract_ar",
			"abstract_en",
			"year_level",
			"kind",
			"student_ids",
			"supervisor_id",
			"status",
			"year_label"
		], PROJECTS.map((p) => [
			p.id,
			p.title_ar,
			p.title_en,
			p.abstract_ar,
			p.abstract_en,
			p.year_level,
			p.kind,
			p.student_ids,
			p.supervisor_id,
			p.status,
			p.year_label
		]));
		await insertMany(sql, "calendar_events", [
			"id",
			"title_ar",
			"title_en",
			"starts_on",
			"ends_on",
			"kind",
			"year_level"
		], EVENTS.map((e) => [
			e.id,
			e.title_ar,
			e.title_en,
			e.starts_on,
			e.ends_on,
			e.kind,
			e.year_level
		]));
		await insertMany(sql, "regulations", [
			"id",
			"chapter",
			"title_ar",
			"title_en",
			"body_ar",
			"body_en"
		], REGULATIONS.map((r) => [
			r.id,
			r.chapter,
			r.title_ar,
			r.title_en,
			r.body_ar,
			r.body_en
		]));
		await insertMany(sql, "resources", [
			"id",
			"title_ar",
			"title_en",
			"kind",
			"url",
			"note_ar",
			"note_en",
			"year_level"
		], RESOURCES.map((r) => [
			r.id,
			r.title_ar,
			r.title_en,
			r.kind,
			r.url,
			r.note_ar,
			r.note_en,
			r.year_level
		]));
		const gradeRows = [];
		for (const s of STUDENTS) {
			const year = s.year_level ?? 1;
			for (const c of COURSES) {
				if (c.year_level >= year) continue;
				const cw = sampleMark(s.id, c.code, "cw");
				const mid = sampleMark(s.id, c.code, "mid");
				const fin = sampleMark(s.id, c.code, "fin");
				gradeRows.push([
					s.id,
					c.code,
					cw,
					mid,
					fin,
					composeTotal(cw, mid, fin)
				]);
			}
		}
		await insertMany(sql, "roster_grades", [
			"person_id",
			"course_code",
			"coursework",
			"midterm",
			"final",
			"total"
		], gradeRows);
	})().catch((err) => {
		seedLock = null;
		throw err;
	});
	await seedLock;
}
async function memberOf(sql, userId) {
	return (await sql`select * from members where user_id = ${userId} limit 1`)[0] ?? null;
}
function asJsonRow(row) {
	const out = {};
	for (const [k, v] of Object.entries(row)) if (v == null) out[k] = null;
	else if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") out[k] = v;
	else if (v instanceof Date) out[k] = v.toISOString().slice(0, 10);
	else out[k] = String(v);
	return out;
}
function mapGrade(row) {
	return {
		course_code: row.course_code,
		coursework: num(row.coursework),
		midterm: num(row.midterm),
		final: num(row.final),
		total: num(row.total)
	};
}
var getBootstrap_createServerFn_handler = createServerRpc({
	id: "1d6bb4f0e270a32a5bf9e3bb6caa9c0ee9a8ec0309c035580a78d8c74458f71c",
	name: "getBootstrap",
	filename: "src/lib/server/api.ts"
}, (opts) => getBootstrap.__executeServer(opts));
var getBootstrap = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getBootstrap_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const member = await memberOf(sql, context.userId);
	const faculty = await sql`select id from people where kind = 'faculty'`;
	const studentCount = await sql`select count(*)::int as c from people where kind = 'student'`;
	const courseCount = await sql`select count(*)::int as c from courses`;
	const projectCount = await sql`select count(*)::int as c from projects`;
	return {
		member,
		stats: {
			students: studentCount[0]?.c ?? 0,
			faculty: faculty.length,
			courses: courseCount[0]?.c ?? 0,
			projects: projectCount[0]?.c ?? 0
		}
	};
});
var joinProgram_createServerFn_handler = createServerRpc({
	id: "81dd077c141908153116d8beabd58c1b739472c7648eb370c4ab96c0f8dbc539",
	name: "joinProgram",
	filename: "src/lib/server/api.ts"
}, (opts) => joinProgram.__executeServer(opts));
var joinProgram = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(joinProgram_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const nameAr = data.name_ar.trim() || "عضو";
	const nameEn = data.name_en.trim() || "Member";
	const year = data.role === "student" ? data.year_level ?? 1 : null;
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
		if (((await sql`select count(*)::int as c from user_grades where user_id = ${context.userId}`)[0]?.c ?? 0) === 0) {
			const dbCourses = await sql`select code, year_level from courses`;
			const gradeRows = [];
			for (const c of dbCourses) {
				if (c.year_level >= year) continue;
				const cw = sampleMark(context.userId, c.code, "cw");
				const mid = sampleMark(context.userId, c.code, "mid");
				const fin = sampleMark(context.userId, c.code, "fin");
				gradeRows.push([
					context.userId,
					c.code,
					cw,
					mid,
					fin,
					composeTotal(cw, mid, fin)
				]);
			}
			await insertMany(sql, "user_grades", [
				"user_id",
				"course_code",
				"coursework",
				"midterm",
				"final",
				"total"
			], gradeRows);
		}
	}
	return { ok: true };
});
var updateMember_createServerFn_handler = createServerRpc({
	id: "9c767d008994798728ef6261f3f76afcc37fde265c5f73d0e3bf08ff1b3ad9d9",
	name: "updateMember",
	filename: "src/lib/server/api.ts"
}, (opts) => updateMember.__executeServer(opts));
var updateMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateMember_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
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
	return { ok: true };
});
var listPeople_createServerFn_handler = createServerRpc({
	id: "e04887ccc5438d23cd3a1bebdbe2755c58e889c75fe8e31aed85fb5d6629d39d",
	name: "listPeople",
	filename: "src/lib/server/api.ts"
}, (opts) => listPeople.__executeServer(opts));
var listPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPeople_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from people order by kind, year_level nulls first, name_en`).map(asJsonRow);
});
var getPerson_createServerFn_handler = createServerRpc({
	id: "083378eb15931a98eb8bbd5e2bd2faa7edc71cd9701bb3c5698c559db16d3513",
	name: "getPerson",
	filename: "src/lib/server/api.ts"
}, (opts) => getPerson.__executeServer(opts));
var getPerson = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getPerson_createServerFn_handler, async ({ data: id }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const rows = await sql`select * from people where id = ${id} limit 1`;
	return rows[0] ? asJsonRow(rows[0]) : null;
});
var listCourses_createServerFn_handler = createServerRpc({
	id: "806b752cfe4a7813a53df611da060569ef2ac3469aa5a15cd42174e21ceb0e22",
	name: "listCourses",
	filename: "src/lib/server/api.ts"
}, (opts) => listCourses.__executeServer(opts));
var listCourses = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listCourses_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from courses order by year_level, semester, code`).map(asJsonRow);
});
var getCourse_createServerFn_handler = createServerRpc({
	id: "2408b455cc7745dc85f8c883676461999259c081f69b28692ac3518e08c8e230",
	name: "getCourse",
	filename: "src/lib/server/api.ts"
}, (opts) => getCourse.__executeServer(opts));
var getCourse = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((code) => code).handler(getCourse_createServerFn_handler, async ({ data: code }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const rows = await sql`select * from courses where code = ${code} limit 1`;
	return rows[0] ? asJsonRow(rows[0]) : null;
});
var listNotices_createServerFn_handler = createServerRpc({
	id: "37337718e29b1e76dacf8ba8c36c22efd78054cafef7c70382ebcd4ca97469e6",
	name: "listNotices",
	filename: "src/lib/server/api.ts"
}, (opts) => listNotices.__executeServer(opts));
var listNotices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listNotices_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from announcements order by pinned desc, published_at desc`).map(asJsonRow);
});
var getNotice_createServerFn_handler = createServerRpc({
	id: "227ea4ab2142e77d28eef4ac64562b1f4bb8b98a2bef35ea83138fa6676eaef7",
	name: "getNotice",
	filename: "src/lib/server/api.ts"
}, (opts) => getNotice.__executeServer(opts));
var getNotice = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getNotice_createServerFn_handler, async ({ data: id }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const rows = await sql`select * from announcements where id = ${id} limit 1`;
	return rows[0] ? asJsonRow(rows[0]) : null;
});
var listProjects_createServerFn_handler = createServerRpc({
	id: "54ae0f05410d3e449666ecf4c985566b52af1466f7d6bf45c6f60360f4572bcb",
	name: "listProjects",
	filename: "src/lib/server/api.ts"
}, (opts) => listProjects.__executeServer(opts));
var listProjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listProjects_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from projects order by year_label desc, id`).map(asJsonRow);
});
var getProject_createServerFn_handler = createServerRpc({
	id: "9b1fcefdaee36b1a32aaca760141d14d4cba9b5fe54a13a007d29171aff14d60",
	name: "getProject",
	filename: "src/lib/server/api.ts"
}, (opts) => getProject.__executeServer(opts));
var getProject = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(getProject_createServerFn_handler, async ({ data: id }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const rows = await sql`select * from projects where id = ${id} limit 1`;
	return rows[0] ? asJsonRow(rows[0]) : null;
});
var listEvents_createServerFn_handler = createServerRpc({
	id: "53d71327ed4af0eefd07e4173302406be4cc5d4e907cd5e0c6df27a0dde5e0b7",
	name: "listEvents",
	filename: "src/lib/server/api.ts"
}, (opts) => listEvents.__executeServer(opts));
var listEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEvents_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from calendar_events order by starts_on`).map(asJsonRow);
});
var listRegulations_createServerFn_handler = createServerRpc({
	id: "667b3a2f16a227359c76c260167ed8cb8cf937cc713d08086d23378d4e2500a4",
	name: "listRegulations",
	filename: "src/lib/server/api.ts"
}, (opts) => listRegulations.__executeServer(opts));
var listRegulations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listRegulations_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from regulations order by chapter`).map(asJsonRow);
});
var listResources_createServerFn_handler = createServerRpc({
	id: "bb5b7c7aab5fca7a9ee4990043a791bcf1bbeee30da3179e9fd6b742ebb23cb1",
	name: "listResources",
	filename: "src/lib/server/api.ts"
}, (opts) => listResources.__executeServer(opts));
var listResources = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listResources_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeeded(sql);
	return (await sql`select * from resources order by kind, title_en`).map(asJsonRow);
});
var getMyGrades_createServerFn_handler = createServerRpc({
	id: "2c5ecce0e9bb46d39924caf27c6c740b148e50a0ac4d84ba02681cc73dff35a8",
	name: "getMyGrades",
	filename: "src/lib/server/api.ts"
}, (opts) => getMyGrades.__executeServer(opts));
var getMyGrades = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyGrades_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const member = await memberOf(sql, context.userId);
	if (!member) return {
		member: null,
		grades: [],
		roster: []
	};
	const grades = (await sql`select course_code, coursework, midterm, final, total from user_grades where user_id = ${context.userId}`).map(mapGrade);
	let roster = [];
	if (member.person_id) roster = (await sql`select course_code, coursework, midterm, final, total from roster_grades where person_id = ${member.person_id}`).map(mapGrade);
	return {
		member,
		grades,
		roster
	};
});
var getYearGrades_createServerFn_handler = createServerRpc({
	id: "5a6dbb35361de2f2b89847aa13c649f548575f08702e02aa89a5a2b114f2dac8",
	name: "getYearGrades",
	filename: "src/lib/server/api.ts"
}, (opts) => getYearGrades.__executeServer(opts));
var getYearGrades = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((year) => year).handler(getYearGrades_createServerFn_handler, async ({ context, data: year }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const member = await memberOf(sql, context.userId);
	if (!member || member.role !== "faculty" && member.role !== "coordinator") return {
		allowed: false,
		rows: []
	};
	return {
		allowed: true,
		rows: (await sql`
      select g.person_id, g.course_code, g.total
      from roster_grades g
      join people p on p.id = g.person_id
      where p.year_level = ${year}
    `).map((r) => ({
			person_id: r.person_id,
			course_code: r.course_code,
			total: num(r.total)
		}))
	};
});
var getCourseGradebook_createServerFn_handler = createServerRpc({
	id: "4cd82b38bd78ffaddc78bcfaf18e3264f9440de2e1f2545fd422dbeec4e9759c",
	name: "getCourseGradebook",
	filename: "src/lib/server/api.ts"
}, (opts) => getCourseGradebook.__executeServer(opts));
var getCourseGradebook = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((code) => code).handler(getCourseGradebook_createServerFn_handler, async ({ context, data: code }) => {
	const sql = await getSql();
	await ensureSeeded(sql);
	const member = await memberOf(sql, context.userId);
	if (!member || member.role !== "faculty" && member.role !== "coordinator") return {
		allowed: false,
		entries: []
	};
	const year = (await sql`select year_level from courses where code = ${code}`)[0]?.year_level;
	if (year == null) return {
		allowed: true,
		entries: []
	};
	const people = await sql`
      select id, name_ar, name_en, student_no from people where kind = 'student' and year_level = ${year} order by name_en
    `;
	const grades = await sql`select person_id, coursework, midterm, final, total from roster_grades where course_code = ${code}`;
	const byId = new Map(grades.map((g) => [g.person_id, g]));
	return {
		allowed: true,
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
				total: num(g?.total)
			};
		})
	};
});
var saveRosterGrade_createServerFn_handler = createServerRpc({
	id: "0fbc920743ebd44524b6d4bea9bbef1ff2d223b57048509f476c5d954d3fece8",
	name: "saveRosterGrade",
	filename: "src/lib/server/api.ts"
}, (opts) => saveRosterGrade.__executeServer(opts));
var saveRosterGrade = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveRosterGrade_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const member = await memberOf(sql, context.userId);
	if (!member || member.role !== "faculty" && member.role !== "coordinator") throw new Error("Forbidden");
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
	return {
		ok: true,
		total
	};
});
function assertStaff(role) {
	if (role !== "faculty" && role !== "coordinator") throw new Error("Forbidden");
}
function blankToNull(v) {
	const s = (v ?? "").trim();
	return s.length ? s : null;
}
function newPersonId() {
	return `p-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
var savePerson_createServerFn_handler = createServerRpc({
	id: "519db343833c831b2afb83ea25cad5f54dd66ea3b341e3a8589267a6aa3a4557",
	name: "savePerson",
	filename: "src/lib/server/api.ts"
}, (opts) => savePerson.__executeServer(opts));
var savePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(savePerson_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	assertStaff((await memberOf(sql, context.userId))?.role);
	const nameAr = data.name_ar.trim();
	const nameEn = data.name_en.trim();
	if (!nameAr || !nameEn) throw new Error("Name required");
	const id = data.id?.trim() || newPersonId();
	const year = data.kind === "student" ? data.year_level ?? 1 : null;
	const cohort = data.kind === "student" ? blankToNull(data.cohort) ?? (year && COHORTS[year] ? COHORTS[year].years : null) : null;
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
	return {
		ok: true,
		id
	};
});
var deletePerson_createServerFn_handler = createServerRpc({
	id: "9e3aacf53aaafaacdb6586e2cacbd1bac26143801b41ad895a1d1b7fb8412036",
	name: "deletePerson",
	filename: "src/lib/server/api.ts"
}, (opts) => deletePerson.__executeServer(opts));
var deletePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deletePerson_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await getSql();
	assertStaff((await memberOf(sql, context.userId))?.role);
	await sql`delete from roster_grades where person_id = ${id}`;
	await sql`update people set advisor_id = null where advisor_id = ${id}`;
	await sql`update courses set instructor_id = null where instructor_id = ${id}`;
	await sql`update members set person_id = null where person_id = ${id}`;
	await sql`delete from people where id = ${id}`;
	return { ok: true };
});
var saveCourse_createServerFn_handler = createServerRpc({
	id: "dfc4de1c47cd4f028739604752cb53c3bde5cb6478f6803099474528baf890f8",
	name: "saveCourse",
	filename: "src/lib/server/api.ts"
}, (opts) => saveCourse.__executeServer(opts));
var saveCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveCourse_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	assertStaff((await memberOf(sql, context.userId))?.role);
	const code = data.code.trim().toUpperCase().replace(/\s+/g, "-");
	const nameAr = data.name_ar.trim();
	const nameEn = data.name_en.trim();
	if (!code || !nameAr || !nameEn) throw new Error("Required");
	const year = Math.min(4, Math.max(1, Number(data.year_level) || 1));
	const semester = data.semester === 2 ? 2 : 1;
	const instructor = blankToNull(data.instructor_id);
	const prereq = blankToNull(data.prereq);
	if (data.mode === "create") {
		if ((await sql`select code from courses where code = ${code} limit 1`)[0]) throw new Error("Code exists");
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
	} else await sql`
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
	return {
		ok: true,
		code
	};
});
var deleteCourse_createServerFn_handler = createServerRpc({
	id: "b65940efba966cf127f0c51ddfdb43a6611f691db2db24b78373dd2887c8b4a1",
	name: "deleteCourse",
	filename: "src/lib/server/api.ts"
}, (opts) => deleteCourse.__executeServer(opts));
var deleteCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((code) => code).handler(deleteCourse_createServerFn_handler, async ({ context, data: code }) => {
	const sql = await getSql();
	assertStaff((await memberOf(sql, context.userId))?.role);
	await sql`delete from roster_grades where course_code = ${code}`;
	await sql`delete from user_grades where course_code = ${code}`;
	await sql`delete from courses where code = ${code}`;
	return { ok: true };
});
//#endregion
export { deleteCourse_createServerFn_handler, deletePerson_createServerFn_handler, getBootstrap_createServerFn_handler, getCourseGradebook_createServerFn_handler, getCourse_createServerFn_handler, getMyGrades_createServerFn_handler, getNotice_createServerFn_handler, getPerson_createServerFn_handler, getProject_createServerFn_handler, getYearGrades_createServerFn_handler, joinProgram_createServerFn_handler, listCourses_createServerFn_handler, listEvents_createServerFn_handler, listNotices_createServerFn_handler, listPeople_createServerFn_handler, listProjects_createServerFn_handler, listRegulations_createServerFn_handler, listResources_createServerFn_handler, saveCourse_createServerFn_handler, savePerson_createServerFn_handler, saveRosterGrade_createServerFn_handler, updateMember_createServerFn_handler };
