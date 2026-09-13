import type { CalEvent, Notice, Project, Regulation, Resource } from "./types";

export const NOTICES: Notice[] = [
  {
    id: "n-1",
    title_ar: "افتتاح العام الدراسي 2026–2027",
    title_en: "Opening of academic year 2026–2027",
    body_ar:
      "تبدأ المحاضرات يوم الأحد 14 أيلول 2026 وفق جداول الدفعات. اجتماع السنة الأولى مع منسّق البرنامج الساعة 10:00 في قاعة 3. تُسلَّم جداول المختبر من مكتب 214.",
    body_en:
      "Lectures begin Sunday 14 September 2026. Year I meets the coordinator at 10:00 in Hall 3. Lab timetables are collected from office 214.",
    category: "academic",
    year_level: null,
    pinned: true,
    published_at: "2026-09-08",
  },
  {
    id: "n-2",
    title_ar: "تسجيل مشاريع التخرج — السنة الرابعة",
    title_en: "Graduation-project registration — Year IV",
    body_ar:
      "آخر موعد لتسجيل عنوان المشروع واسم المشرف: 28 أيلول 2026. النموذج في المصادر، ويُسلَّم ورقياً وإلكترونياً. اللجنة العلمية تجتمع في 5 تشرين الأول لاعتماد العناوين.",
    body_en:
      "Deadline to register a title and supervisor: 28 September 2026. Form in Resources; submit on paper and by email. The scientific committee meets on 5 October to approve titles.",
    category: "academic",
    year_level: 4,
    pinned: true,
    published_at: "2026-09-06",
  },
  {
    id: "n-3",
    title_ar: "مناقشة الدفعة الأولى — تموز 2026",
    title_en: "First-cohort defences — July 2026",
    body_ar:
      "ناقشت الدفعة الأولى تسعة مشاريع أمام اللجنة بحضور رئيس هيئة التميز والإبداع ورئيس هيئة التخطيط والإحصاء. ركّزت الأعمال على مؤشرات الكلّي، سياسات التنمية، وسيناريوهات مستقبلية للاقتصاد السوري. نُشرت الملخصات في صفحة المشاريع.",
    body_en:
      "The first cohort defended nine projects before the committee, with the heads of the Excellence Authority and the Planning Authority present. Work covered macro indicators, development policy, and scenarios for the Syrian economy. Abstracts are on the Projects page.",
    category: "event",
    year_level: 5,
    pinned: false,
    published_at: "2026-07-03",
  },
  {
    id: "n-4",
    title_ar: "مختبر Python — السنة الأولى",
    title_en: "Python lab — Year I",
    body_ar:
      "يُفتتح مختبر الحوسبة (مختبر 3) أيام الأحد والثلاثاء 12:00–14:00. إحضار جهاز شخصي اختياري. البيئة المعتمدة: Python 3.12 وpandas وmatplotlib.",
    body_en:
      "Computing lab (Lab 3) opens Sunday and Tuesday 12:00–14:00. A personal laptop is optional. Stack: Python 3.12, pandas, matplotlib.",
    category: "academic",
    year_level: 1,
    pinned: false,
    published_at: "2026-09-10",
  },
  {
    id: "n-5",
    title_ar: "ضوابط الحضور هذا الفصل",
    title_en: "Attendance rules this term",
    body_ar:
      "يُحرَم من الامتحان النهائي من تجاوز غيابه 20٪ من ساعات المقرر دون عذر مقبول لدى المنسّق. تُرفع الأعذار الطبية خلال أسبوع من الغياب. التفاصيل في الأنظمة — الفصل 2.",
    body_en:
      "A student missing more than 20% of a course without an excuse accepted by the coordinator is barred from the final. Medical excuses within a week of absence. See Regulations, chapter 2.",
    category: "admin",
    year_level: null,
    pinned: false,
    published_at: "2026-09-09",
  },
  {
    id: "n-6",
    title_ar: "ورشة السلاسل الزمنية — السنة الثالثة",
    title_en: "Time-series workshop — Year III",
    body_ar:
      "ورشة تطبيقية يوم الخميس 18 أيلول مع د. لينا بركات: اختبارات الاستقرار وتقدير VAR على بيانات شهرية سورية. التسجيل في مكتب 119.",
    body_en:
      "Applied workshop Thursday 18 September with Dr. Lina Barakat: stationarity tests and a VAR on monthly Syrian data. Sign up at office 119.",
    category: "event",
    year_level: 3,
    pinned: false,
    published_at: "2026-09-07",
  },
  {
    id: "n-7",
    title_ar: "نتائج الدورة التكميلية",
    title_en: "Resit results",
    body_ar:
      "أُعلنت نتائج الدورة التكميلية لمواد السنتين الثانية والثالثة. الاعتراض خلال ثلاثة أيام عمل من مكتب المنسّق.",
    body_en:
      "Resit results for Years II and III are posted. Appeals within three working days via the coordinator’s office.",
    category: "exam",
    year_level: null,
    pinned: false,
    published_at: "2026-08-26",
  },
  {
    id: "n-8",
    title_ar: "ساعات مكتبية — الفصل الأول",
    title_en: "Office hours — semester 1",
    body_ar:
      "تُنشر ساعات الأساتذة على صفحاتهم في الدليل. منسّق البرنامج: الأحد والأربعاء 11:00–13:00 — مكتب 214.",
    body_en:
      "Faculty hours are on their directory pages. Coordinator: Sunday and Wednesday 11:00–13:00, office 214.",
    category: "admin",
    year_level: null,
    pinned: false,
    published_at: "2026-09-05",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "p-inf",
    title_ar: "نموذج قياسي لمحددات التضخم في سورية 2000–2025",
    title_en: "An econometric model of inflation in Syria, 2000–2025",
    abstract_ar: "يقدّر علاقة الطلب النقدي والعرض والصرف بمعدّل التضخم عبر VAR، ويختبر استقرار المعاملات قبل 2011 وبعده.",
    abstract_en: "Estimates a VAR linking money, supply and the exchange rate to inflation, testing parameter stability before and after 2011.",
    year_level: 5, kind: "graduation", student_ids: "s-alma", supervisor_id: "f-harfoush", status: "defended", year_label: "2026",
  },
  {
    id: "p-rec",
    title_ar: "سيناريوهات إعادة الإعمار والنمو: محاكاة ديناميكية",
    title_en: "Reconstruction and growth: a dynamic simulation",
    abstract_ar: "ثلاثة مسارات للاستثمار العام والخاص حتى 2035، مع قيد طاقة وعمالة، وقياس أثرها في الناتج والتشغيل.",
    abstract_en: "Three paths for public and private investment to 2035, with energy and labour constraints, and effects on output and jobs.",
    year_level: 5, kind: "graduation", student_ids: "s-tamer", supervisor_id: "f-abdelnour", status: "defended", year_label: "2026",
  },
  {
    id: "p-inv",
    title_ar: "كفاءة الإنفاق الاستثماري العام",
    title_en: "Efficiency of public investment spending",
    abstract_ar: "مؤشر كفاءة مبسّط على بيانات الموازنة، وربطه بمخرجات قطاعية في التعليم والنقل.",
    abstract_en: "A simple efficiency index on budget data, linked to education and transport outcomes.",
    year_level: 5, kind: "graduation", student_ids: "s-lina", supervisor_id: "f-shaheen", status: "defended", year_label: "2026",
  },
  {
    id: "p-io",
    title_ar: "نموذج مدخلات-مخرجات للقطاع الصناعي",
    title_en: "An input–output model of manufacturing",
    abstract_ar: "مصفوفة مبسّطة لأبرز الفروع الصناعية وقياس أثر صدمة طلب خارجي.",
    abstract_en: "A compact matrix of major manufacturing branches and the effect of an external demand shock.",
    year_level: 5, kind: "graduation", student_ids: "s-rami", supervisor_id: "f-ismail", status: "defended", year_label: "2026",
  },
  {
    id: "p-sub",
    title_ar: "سياسات الدعم وأثرها في الأسعار",
    title_en: "Subsidy policy and price effects",
    abstract_ar: "تقدير مرونات الطلب على المشتقات وإعادة توجيه الدعم نحو التحويلات.",
    abstract_en: "Demand elasticities for fuels and a shift from price subsidies toward transfers.",
    year_level: 5, kind: "graduation", student_ids: "s-nidaa", supervisor_id: "f-abdelnour", status: "defended", year_label: "2026",
  },
  {
    id: "p-lab",
    title_ar: "سوق العمل والأجور الحقيقية",
    title_en: "The labour market and real wages",
    abstract_ar: "نموذج مبسّط لتحدد الأجر مع بطالة طويلة، واختبار سياسات التشغيل.",
    abstract_en: "A small wage-setting model with long-term unemployment, and a test of employment programmes.",
    year_level: 5, kind: "graduation", student_ids: "s-samer", supervisor_id: "f-harfoush", status: "defended", year_label: "2026",
  },
  {
    id: "p-mac",
    title_ar: "تحليل مؤشرات الاقتصاد الكلّي 2000–2024",
    title_en: "Macroeconomic indicators, 2000–2024",
    abstract_ar: "قراءة متسقة للناتج والأسعار والمالية الخارجية، وبناء لوحة إنذار مبكر.",
    abstract_en: "A consistent reading of output, prices and the external account, plus an early-warning dashboard.",
    year_level: 5, kind: "graduation", student_ids: "s-hind", supervisor_id: "f-barakat", status: "defended", year_label: "2026",
  },
  {
    id: "p-en",
    title_ar: "سيناريوهات الطاقة والنمو",
    title_en: "Energy and growth scenarios",
    abstract_ar: "ربط استهلاك الطاقة بالناتج واختبار مسار كفاءة حتى 2030.",
    abstract_en: "Links energy use to output and tests an efficiency path to 2030.",
    year_level: 5, kind: "graduation", student_ids: "s-jad", supervisor_id: "f-atri", status: "defended", year_label: "2026",
  },
  {
    id: "p-fx",
    title_ar: "السياسة النقدية وسعر الصرف",
    title_en: "Monetary policy and the exchange rate",
    abstract_ar: "نموذج VAR لانتقال الفائدة والعرض النقدي إلى سعر الصرف الموازي.",
    abstract_en: "A VAR of how rates and money pass through to the parallel exchange rate.",
    year_level: 5, kind: "graduation", student_ids: "s-maya", supervisor_id: "f-abdelnour", status: "defended", year_label: "2026",
  },
  {
    id: "p-y4-banks",
    title_ar: "نموذج لوحي لأداء المصارف الخاصة",
    title_en: "A panel model of private-bank performance",
    abstract_ar: "مقترح السنة الرابعة: محددات الربحية والكفاية على بيانات مصارف مدرجة.",
    abstract_en: "Year-IV proposal: profitability and capital adequacy on listed-bank data.",
    year_level: 4, kind: "graduation", student_ids: "s-y4-1", supervisor_id: "f-harfoush", status: "ongoing", year_label: "2027",
  },
  {
    id: "p-y4-debt",
    title_ar: "ديناميك الدين العام في اقتصاد متعافٍ",
    title_en: "Public-debt dynamics in a recovering economy",
    abstract_ar: "محاكاة استدامة الدين تحت ثلاثة مسارات نمو وفائدة.",
    abstract_en: "A debt-sustainability simulation under three growth and interest paths.",
    year_level: 4, kind: "graduation", student_ids: "s-y4-2", supervisor_id: "f-abdelnour", status: "ongoing", year_label: "2027",
  },
  {
    id: "p-y3-var",
    title_ar: "تمرين VAR على التضخم الشهري",
    title_en: "A VAR exercise on monthly inflation",
    abstract_ar: "مشروع مقرر القياس 2: تقدير نموذج صغير ومناقشة فروض الاستقرار.",
    abstract_en: "Econometrics II project: a small VAR and a discussion of stationarity.",
    year_level: 3, kind: "course", student_ids: "s-y3-1,s-y3-2", supervisor_id: "f-barakat", status: "ongoing", year_label: "2026",
  },
  {
    id: "p-y4-ml",
    title_ar: "تنبؤ مؤشرات قصيرة بتقنيات تعلّم آلي",
    title_en: "Short-horizon indicator forecasts with ML",
    abstract_ar: "مقارنة انحدار تقليدي بغابة عشوائية على مجموعة مؤشرات شهرية.",
    abstract_en: "Compares classical regression with a random forest on monthly indicators.",
    year_level: 4, kind: "research", student_ids: "s-y4-5", supervisor_id: "f-kadmani", status: "proposed", year_label: "2027",
  },
];

export const EVENTS: CalEvent[] = [
  { id: "e-start", title_ar: "بدء التدريس", title_en: "Teaching begins", starts_on: "2026-09-14", ends_on: null, kind: "teaching", year_level: null },
  { id: "e-py", title_ar: "افتتاح مختبر Python", title_en: "Python lab opens", starts_on: "2026-09-14", ends_on: null, kind: "event", year_level: 1 },
  { id: "e-ws", title_ar: "ورشة السلاسل الزمنية", title_en: "Time-series workshop", starts_on: "2026-09-18", ends_on: null, kind: "event", year_level: 3 },
  { id: "e-proj", title_ar: "آخر موعد لتسجيل مشروع التخرج", title_en: "Graduation-project registration deadline", starts_on: "2026-09-28", ends_on: null, kind: "deadline", year_level: 4 },
  { id: "e-oct", title_ar: "عيد حرب تشرين", title_en: "October Liberation Day", starts_on: "2026-10-06", ends_on: null, kind: "holiday", year_level: null },
  { id: "e-titles", title_ar: "اعتماد عناوين المشاريع", title_en: "Project titles approved", starts_on: "2026-10-05", ends_on: null, kind: "event", year_level: 4 },
  { id: "e-mid", title_ar: "اختبارات منتصف الفصل", title_en: "Midterm examinations", starts_on: "2026-12-13", ends_on: "2026-12-24", kind: "exam", year_level: null },
  { id: "e-ny", title_ar: "عطلة رأس السنة", title_en: "New Year holiday", starts_on: "2027-01-01", ends_on: "2027-01-02", kind: "holiday", year_level: null },
  { id: "e-fin1", title_ar: "امتحانات الفصل الأول", title_en: "Semester 1 examinations", starts_on: "2027-01-17", ends_on: "2027-01-29", kind: "exam", year_level: null },
  { id: "e-win", title_ar: "عطلة بين الفصلين", title_en: "Inter-semester break", starts_on: "2027-01-30", ends_on: "2027-02-12", kind: "holiday", year_level: null },
  { id: "e-s2", title_ar: "بدء الفصل الثاني", title_en: "Semester 2 begins", starts_on: "2027-02-14", ends_on: null, kind: "teaching", year_level: null },
  { id: "e-evac", title_ar: "عيد الجلاء", title_en: "Evacuation Day", starts_on: "2027-04-17", ends_on: null, kind: "holiday", year_level: null },
  { id: "e-lab", title_ar: "عيد العمال", title_en: "Labour Day", starts_on: "2027-05-01", ends_on: null, kind: "holiday", year_level: null },
  { id: "e-fin2", title_ar: "امتحانات الفصل الثاني", title_en: "Semester 2 examinations", starts_on: "2027-06-06", ends_on: "2027-06-24", kind: "exam", year_level: null },
  { id: "e-def", title_ar: "مناقشات مشاريع السنة الرابعة", title_en: "Year-IV project defences", starts_on: "2027-06-28", ends_on: "2027-07-02", kind: "event", year_level: 4 },
];

export const REGULATIONS: Regulation[] = [
  {
    id: "r1",
    chapter: 1,
    title_ar: "القبول والانتماء",
    title_en: "Admission",
    body_ar:
      "البرنامج مخصّص لخريجي المركز الوطني للمتميزين وفق مفاضلة هيئة التميز والإبداع وكلية الاقتصاد. الدراسة أربع سنوات في مجمّع البرامكة. لا يُقبل التحويل من اختصاصات أخرى إلا بقرار اللجنة العلمية وبما لا يخلّ بتسلسل الرياضيات والقياس. الانتماء إلى البوابة الداخلية إلزامي لتلقّي التعاميم وكشوف العلامات.",
    body_en:
      "The programme is for graduates of the National Centre for the Distinguished, placed by the Excellence Authority and the Faculty of Economics. Study lasts four years at Baramkeh. Transfer from other majors requires the scientific committee and must preserve the maths–econometrics sequence. Portal membership is required for notices and transcripts.",
  },
  {
    id: "r2",
    chapter: 2,
    title_ar: "الحضور والأعذار",
    title_en: "Attendance",
    body_ar:
      "الحضور إلزامي في المحاضرات والمختبر. يُحرَم من الامتحان النهائي من تجاوز غيابه عشرين في المئة من ساعات المقرر دون عذر يقبله منسّق البرنامج. الأعذار الطبية تُرفع خلال سبعة أيام. المختبرات لا تُعوَّض إلا في نافذة يعلنها مدرّس المقرر.",
    body_en:
      "Attendance is required at lectures and labs. Missing more than twenty percent of a course without an excuse accepted by the coordinator bars the student from the final. Medical excuses within seven days. Labs are only made up in a window set by the instructor.",
  },
  {
    id: "r3",
    chapter: 3,
    title_ar: "التقييم والعلامات",
    title_en: "Assessment",
    body_ar:
      "علامة المقرر من مئة: ثلاثون لأعمال السنة، عشرون لمنتصف الفصل، خمسون للنهائي. النجاح ستون. التقدير: مقبول 60–69، جيد 70–79، جيد جداً 80–89، ممتاز 90–100. المعدل العام متوسط مرجّح بالوحدات. الاعتراض على العلامة خلال ثلاثة أيام عمل من إعلانها.",
    body_en:
      "Each course is marked out of 100: 30 coursework, 20 midterm, 50 final. Pass is 60. Bands: pass 60–69, good 70–79, very good 80–89, excellent 90–100. The average is credit-weighted. Mark appeals within three working days of publication.",
  },
  {
    id: "r4",
    chapter: 4,
    title_ar: "الانتقال والإعادة",
    title_en: "Progression",
    body_ar:
      "يُرفع الطالب إلى السنة الأعلى إذا نجح في جميع المقررات أو رسب في مقررين كحد أقصى على أن يستدركهما. الرسوب في ثلاثة مقررات أو أكثر يبقي الطالب في سنته. لا يُناقش مشروع التخرج قبل إنجاز متطلبات السنوات الثلاث الأولى.",
    body_en:
      "A student advances with all courses passed, or with at most two failed courses to be retrieved. Three or more failures keep the student in year. The graduation project is not defended before years I–III are complete.",
  },
  {
    id: "r5",
    chapter: 5,
    title_ar: "مشروع التخرج",
    title_en: "Graduation project",
    body_ar:
      "مشروع فردي تطبيقي يشرف عليه عضو هيئة، يُسجَّل في الفصل الأول من السنة الرابعة ويُناقش علناً في نهاية الفصل الثاني. يشترط أن يستخدم أداة نمذجة أو قياسية وأن يقدّم مذكرة سياسات لا تتجاوز ثماني صفحات إلى جانب المتن. الشفرة والبيانات تُسلَّم للجنة وتكون قابلة لإعادة التشغيل. المشروع نواة دراسة، لا متطلب شكلي.",
    body_en:
      "An individual applied project, supervised by faculty, registered in year-IV semester 1 and defended publicly at the end of semester 2. It must use a modelling or econometric tool and include a policy note of at most eight pages. Code and data are submitted and must run. The project is a study, not a formality.",
  },
  {
    id: "r6",
    chapter: 6,
    title_ar: "النزاهة الأكاديمية",
    title_en: "Integrity",
    body_ar:
      "يُعدّ الغش في الامتحان أو سرقة عمل نمذجي أو استعانة غير مصرّح بها بنماذج جاهزة دون إسناد مخالفة جسيمة: صفر في المقرر وإحالة إلى اللجنة العلمية. استخدام أدوات توليد النصوص مسموح في الصياغة اللغوية فقط، ويُذكر في الملحق؛ لا يجوز توليدها للتقدير أو النتائج.",
    body_en:
      "Cheating, stealing a modelling exercise, or uncredited use of a ready-made model is a serious offence: zero in the course and referral to the committee. Generative text tools may be used for language only, disclosed in an appendix; they may not produce estimates or results.",
  },
  {
    id: "r7",
    chapter: 7,
    title_ar: "الترتيب والتميز",
    title_en: "Ranking",
    body_ar:
      "يُحتسب ترتيب الدفعة على المعدل التراكمي في نهاية السنة الرابعة. يُمنح تقدير الامتياز لمن لا يقل معدله عن 90 ولم يرسب في أي مقرر. تُرشَّح المشاريع المتميّزة لهيئة التخطيط والإحصاء وهيئة التميز والإبداع.",
    body_en:
      "Cohort rank is the cumulative average at the end of year IV. Distinction requires an average of at least 90 and no failed course. Outstanding projects are forwarded to the Planning Authority and the Excellence Authority.",
  },
  {
    id: "r8",
    chapter: 8,
    title_ar: "استخدام البوابة",
    title_en: "Use of the portal",
    body_ar:
      "البوابة داخلية. العلامات وكشوف الطلاب والتعاميم لا تُنسخ إلى خارج البرنامج. كل عضو مسؤول عن سرية جلسته. إدخال العلامات حق للهيئة التدريسية والمنسّق. يُبلَّغ عن أي تسريب لمكتب المنسّق.",
    body_en:
      "The portal is internal. Marks, rolls and notices are not copied outside the programme. Each member is responsible for their session. Mark entry is reserved to faculty and the coordinator. Leaks are reported to the coordinator.",
  },
];

export const RESOURCES: Resource[] = [
  { id: "res-py", title_ar: "بيئة Python المعتمدة", title_en: "Adopted Python stack", kind: "software", url: "https://www.python.org/", note_ar: "3.12 + pandas + numpy + matplotlib + statsmodels. تُثبَّت في مختبر 3 وعلى الأجهزة الشخصية.", note_en: "3.12 + pandas + numpy + matplotlib + statsmodels. Installed in Lab 3 and on personal machines.", year_level: 1 },
  { id: "res-r", title_ar: "R وRStudio", title_en: "R and RStudio", kind: "software", url: "https://cran.r-project.org/", note_ar: "للقياس من السنة الثانية. الحزم: tidyverse, lmtest, forecast, plm.", note_en: "For econometrics from year II. Packages: tidyverse, lmtest, forecast, plm.", year_level: 2 },
  { id: "res-data", title_ar: "سلسلة مؤشرات سورية الداخلية", title_en: "Internal Syrian indicator series", kind: "data", url: null, note_ar: "ملف مشترك يُحدَّث فصلياً من مصادر رسمية مجمّعة للتدريب. لا يُعاد نشره.", note_en: "A shared file updated each term from official sources for training. Not for republication.", year_level: null },
  { id: "res-wb", title_ar: "مؤشرات التنمية", title_en: "World Development Indicators", kind: "data", url: "https://databank.worldbank.org/", note_ar: "للمقارنات الدولية في مقررات التنمية والعلاقات.", note_en: "For international comparisons in development and international courses.", year_level: 3 },
  { id: "res-woold", title_ar: "Wooldridge — Introductory Econometrics", title_en: "Wooldridge — Introductory Econometrics", kind: "reading", url: null, note_ar: "المرجع الأساس لمقررات القياس. النسخ في مكتبة الكلية ومختبر 3.", note_en: "Core text for the econometrics sequence. Copies in the faculty library and Lab 3.", year_level: 2 },
  { id: "res-blan", title_ar: "Blanchard — Macroeconomics", title_en: "Blanchard — Macroeconomics", kind: "reading", url: null, note_ar: "مرجع التحليل الكلّي والنمذجة في السنتين الثانية والثالثة.", note_en: "Reference for macro analysis and modelling in years II and III.", year_level: 2 },
  { id: "res-chiang", title_ar: "Chiang — Fundamental Methods of Mathematical Economics", title_en: "Chiang — Mathematical Economics", kind: "reading", url: null, note_ar: "الرياضيات الاقتصادية من السنة الأولى إلى الثالثة.", note_en: "Mathematical economics from year I to III.", year_level: 1 },
  { id: "res-lab", title_ar: "مختبر 3 — الحوسبة", title_en: "Lab 3 — computing", kind: "lab", url: null, note_ar: "الطابق الأرضي. الأحد والثلاثاء 12–14 للسنة الأولى، الأربعاء 14–16 للسنوات الأعلى.", note_en: "Ground floor. Sunday and Tuesday 12–14 for year I; Wednesday 14–16 for later years.", year_level: null },
  { id: "res-form", title_ar: "نموذج تسجيل مشروع التخرج", title_en: "Graduation-project registration form", kind: "reading", url: null, note_ar: "يُملأ بالاتفاق مع المشرف ويُسلَّم لمكتب 214 قبل 28 أيلول.", note_en: "Completed with the supervisor and submitted to office 214 before 28 September.", year_level: 4 },
];

export const GOALS = [
  { ar: "إتقان سلسلة الرياضيات → الإحصاء → القياس → المحاكاة دون فجوات.", en: "A continuous maths → statistics → econometrics → simulation sequence, with no gaps." },
  { ar: "كل خريج يسلّم مشروعاً قابلاً لإعادة التشغيل ومذكرة سياسات قصيرة.", en: "Every graduate delivers a reproducible project and a short policy note." },
  { ar: "الارتباط المنتظم بهيئة التخطيط والإحصاء وهيئة التميز والإبداع.", en: "A standing link with the Planning Authority and the Excellence Authority." },
  { ar: "بناء سلسلة بيانات سورية داخلية للتدريب، منضبطة وموثّقة.", en: "An internal, documented Syrian training dataset." },
  { ar: "نشر ثقافة النموذج: الفروض أولاً، ثم التقدير، ثم التحفظ.", en: "A modelling culture: assumptions first, then estimates, then caveats." },
];
