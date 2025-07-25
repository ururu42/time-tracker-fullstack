const express = require("express");
const { register, login } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

const router = express.Router({ mergeParams: true });

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .send({ 
        error: null, 
        user: mapUser(user) 
      });
  } catch (e) {
    res.status(400).send({ error: e.message || "Unknown error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.status(400).send({ error: e.message || "Unknown error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: 0 }).send({});
});

module.exports = router;
