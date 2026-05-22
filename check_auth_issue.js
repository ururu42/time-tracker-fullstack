const http = require("http");

console.log("Отправляем тестовый запрос на авторизацию...");

const postData = JSON.stringify({
  login: "test",
  password: "test123",
});

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/api/auth/login",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  console.log(`Статус ответа: ${res.statusCode}`);
  res.on("data", (chunk) => {
    console.log(`Тело ответа: ${chunk}`);
  });
  res.on("end", () => {
    console.log("Запрос завершен");
    process.exit(0);
  });
});

req.on("error", (e) => {
  console.error(`Проблема с запросом: ${e.message}`);
  process.exit(1);
});

req.write(postData);
req.end();

// Установим таймаут на 15 секунд
setTimeout(() => {
  console.log("Таймаут запроса - сервер не отвечает");
  process.exit(1);
}, 15000);
