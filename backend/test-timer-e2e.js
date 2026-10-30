/* E2E-тест API таймер-сессий поверх in-memory MongoDB.
 * Запуск: node test-timer-e2e.js  (нужен установленный mongodb-memory-server)
 */
const assert = require("assert");

(async () => {
	const { MongoMemoryServer } = require("mongodb-memory-server");

	const mongod = await MongoMemoryServer.create();
	process.env.DB_CONNECTION_STRING = mongod.getUri();
	process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

	// app.js сам поднимает сервер при require
	require("./app.js");

	await new Promise((r) => setTimeout(r, 1500));

	const BASE = "http://localhost:3001/api";
	let cookie = "";

	const req = async (path, { method = "GET", body } = {}) => {
		const res = await fetch(`${BASE}${path}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				...(cookie ? { Cookie: cookie } : {}),
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		const text = await res.text();
		let json = null;
		try {
			json = JSON.parse(text);
		} catch {
			/* ignore */
		}
		const setCookie = res.headers.get("set-cookie");
		if (setCookie) cookie = setCookie.split(";")[0];
		return { status: res.status, json, text };
	};

	// 1. Регистрация
	let r = await req("/auth/register", {
		method: "POST",
		body: { login: "timer-e2e-test", password: "password123" },
	});
	assert.equal(r.status, 201, `register: ${r.text}`);
	assert.ok(cookie, "cookie token не получен после register");
	console.log("1. Регистрация + cookie: OK");

	// 2. Проект
	r = await req("/project", { method: "POST", body: { title: "E2E Project" } });
	assert.equal(r.status, 201, `create project: ${r.text}`);
	const projectId = r.json.data.id;
	console.log("2. Создание проекта: OK");

	// 3. Задачи
	r = await req("/tasks", {
		method: "POST",
		body: { title: "Task A", description: "", projectId },
	});
	assert.equal(r.status, 201, `create task A: ${r.text}`);
	const taskA = r.json.data.id;

	r = await req("/tasks", {
		method: "POST",
		body: { title: "Task B", description: "", projectId },
	});
	assert.equal(r.status, 201, `create task B: ${r.text}`);
	const taskB = r.json.data.id;
	console.log("3. Создание задач: OK");

	// 4. Старт таймера
	r = await req("/timer/start", {
		method: "POST",
		body: { taskId: taskA, comment: "start comment" },
	});
	assert.equal(r.status, 201, `start: ${r.text}`);
	const session = r.json.data.session;
	assert.equal(session.taskId, taskA);
	assert.equal(session.comment, "start comment");
	assert.ok(session.startTime, "нет startTime");
	assert.ok(session.taskTitle === "Task A", `taskTitle: ${session.taskTitle}`);
	assert.ok(session.projectTitle === "E2E Project", `projectTitle: ${session.projectTitle}`);
	assert.ok(r.json.data.serverTime, "нет serverTime");
	const startTime1 = new Date(session.startTime).getTime();
	console.log("4. Старт таймера: OK");

	// 5. Повторный старт по той же задаче — идемпотентно, комментарий обновляется
	r = await req("/timer/start", {
		method: "POST",
		body: { taskId: taskA, comment: "updated comment" },
	});
	assert.equal(r.status, 200, `start again: ${r.text}`);
	assert.equal(r.json.data.session.comment, "updated comment");
	console.log("5. Идемпотентный старт (та же задача): OK");

	// 6. Старт по другой задаче — 409
	r = await req("/timer/start", { method: "POST", body: { taskId: taskB } });
	assert.equal(r.status, 409, `start other task: ожидался 409, получен ${r.status}`);
	console.log("6. 409 при втором таймере: OK");

	// 7. Текущая сессия
	r = await req("/timer/current");
	assert.equal(r.status, 200, `current: ${r.text}`);
	assert.equal(r.json.data.session.taskId, taskA);
	console.log("7. GET /timer/current: OK");

	// 8. Обновление комментария
	r = await req("/timer/current", { method: "PATCH", body: { comment: "patched" } });
	assert.equal(r.status, 200, `patch: ${r.text}`);
	assert.equal(r.json.data.session.comment, "patched");
	console.log("8. PATCH комментария: OK");

	// 9. Ожидаем ~2.5с и финишируем
	await new Promise((res) => setTimeout(res, 2500));
	r = await req("/timer/finish", { method: "POST", body: { comment: "final comment" } });
	assert.equal(r.status, 200, `finish: ${r.text}`);
	const entry = r.json.data;
	assert.equal(entry.taskId, taskA);
	assert.equal(entry.comment, "final comment");
	assert.ok(entry.startTime && entry.endTime);
	assert.equal(new Date(entry.startTime).getTime(), startTime1, "startTime записи != startTime сессии");
	assert.ok(
		entry.duration >= 2400 && entry.duration <= 15000,
		`duration ${entry.duration} вне [2400, 15000]`,
	);
	console.log(`9. Finish + TimeEntry: OK (duration = ${entry.duration} ms)`);

	// 10. Повторный finish — 404 (нет двойной записи)
	r = await req("/timer/finish", { method: "POST" });
	assert.equal(r.status, 404, `второй finish: ожидался 404, получен ${r.status}`);
	console.log("10. Защита от двойного finish: OK");

	// 11. Запись видна в GET /time
	r = await req("/time");
	assert.equal(r.status, 200, `time list: ${r.text}`);
	const times = r.json.data || [];
	assert.ok(times.some((t) => t.taskId === taskA), "запись не найдена в /time");
	console.log("11. Запись в GET /time: OK");

	// 12. Новый таймер + отмена
	r = await req("/timer/start", { method: "POST", body: { taskId: taskB } });
	assert.equal(r.status, 201, `start B: ${r.text}`);
	r = await req("/timer/current", { method: "DELETE" });
	assert.equal(r.status, 200, `cancel: ${r.text}`);
	assert.equal(r.json.cancelled, true);
	r = await req("/timer/current");
	assert.equal(r.json.data.session, null);
	console.log("12. Отмена таймера: OK");

	// 13. Без токена — 401
	cookie = "";
	r = await req("/timer/current");
	assert.equal(r.status, 401, `unauth: ожидался 401, получен ${r.status}`);
	console.log("13. 401 без токена: OK");

	console.log("\nВСЕ E2E-ТЕСТЫ ПРОЙДЕНЫ");
	process.exit(0);
})().catch((e) => {
	console.error("E2E FAILED:", e.message);
	process.exit(1);
});