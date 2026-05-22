const express = require("express");
const { register, login } = require("../controllers/user");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(201)
      .send({
        error: null,
        user,
      });
  } catch (e) {
    res.status(400).send({ error: e.message || "Unknown error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .send({ error: null, user });
    console.log("Ответ отправлен клиенту");
  } catch (e) {
    console.error("Ошибка при логине:", e.message);
    res.status(400).send({ error: e.message || "Unknown error" });
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    })
    .send({});
});

module.exports = router;
