import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DUf3598q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-mZgPxTX8.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getBootstrap = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1d6bb4f0e270a32a5bf9e3bb6caa9c0ee9a8ec0309c035580a78d8c74458f71c"));
var joinProgram = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("81dd077c141908153116d8beabd58c1b739472c7648eb370c4ab96c0f8dbc539"));
var updateMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("9c767d008994798728ef6261f3f76afcc37fde265c5f73d0e3bf08ff1b3ad9d9"));
var listPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e04887ccc5438d23cd3a1bebdbe2755c58e889c75fe8e31aed85fb5d6629d39d"));
var getPerson = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("083378eb15931a98eb8bbd5e2bd2faa7edc71cd9701bb3c5698c559db16d3513"));
var listCourses = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("806b752cfe4a7813a53df611da060569ef2ac3469aa5a15cd42174e21ceb0e22"));
var getCourse = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((code) => code).handler(createSsrRpc("2408b455cc7745dc85f8c883676461999259c081f69b28692ac3518e08c8e230"));
var listNotices = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("37337718e29b1e76dacf8ba8c36c22efd78054cafef7c70382ebcd4ca97469e6"));
var getNotice = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("227ea4ab2142e77d28eef4ac64562b1f4bb8b98a2bef35ea83138fa6676eaef7"));
var listProjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("54ae0f05410d3e449666ecf4c985566b52af1466f7d6bf45c6f60360f4572bcb"));
var getProject = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("9b1fcefdaee36b1a32aaca760141d14d4cba9b5fe54a13a007d29171aff14d60"));
var listEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("53d71327ed4af0eefd07e4173302406be4cc5d4e907cd5e0c6df27a0dde5e0b7"));
var listRegulations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("667b3a2f16a227359c76c260167ed8cb8cf937cc713d08086d23378d4e2500a4"));
var listResources = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bb5b7c7aab5fca7a9ee4990043a791bcf1bbeee30da3179e9fd6b742ebb23cb1"));
var getMyGrades = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2c5ecce0e9bb46d39924caf27c6c740b148e50a0ac4d84ba02681cc73dff35a8"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((year) => year).handler(createSsrRpc("5a6dbb35361de2f2b89847aa13c649f548575f08702e02aa89a5a2b114f2dac8"));
var getCourseGradebook = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((code) => code).handler(createSsrRpc("4cd82b38bd78ffaddc78bcfaf18e3264f9440de2e1f2545fd422dbeec4e9759c"));
var saveRosterGrade = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("0fbc920743ebd44524b6d4bea9bbef1ff2d223b57048509f476c5d954d3fece8"));
var savePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("519db343833c831b2afb83ea25cad5f54dd66ea3b341e3a8589267a6aa3a4557"));
var deletePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("9e3aacf53aaafaacdb6586e2cacbd1bac26143801b41ad895a1d1b7fb8412036"));
var saveCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("dfc4de1c47cd4f028739604752cb53c3bde5cb6478f6803099474528baf890f8"));
var deleteCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((code) => code).handler(createSsrRpc("b65940efba966cf127f0c51ddfdb43a6611f691db2db24b78373dd2887c8b4a1"));
//#endregion
export { listResources as _, getCourseGradebook as a, saveRosterGrade as b, getPerson as c, listCourses as d, listEvents as f, listRegulations as g, listProjects as h, getCourse as i, getProject as l, listPeople as m, deletePerson as n, getMyGrades as o, listNotices as p, getBootstrap as r, getNotice as s, deleteCourse as t, joinProgram as u, saveCourse as v, updateMember as x, savePerson as y };
