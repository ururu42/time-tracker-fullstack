const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  startTimerSession,
  getCurrentTimerSession,
  finishTimerSession,
  cancelTimerSession,
  updateTimerSessionComment,
} = require("../controllers/timerController");

const router = express.Router();
router.use(authenticated);

const withServerTime = (session) => ({
  session,
  serverTime: new Date().toISOString(),
});

router.post("/start", async (req, res) => {
  try {
    const { session, created } = await startTimerSession(req.user.id, req.body);
    res.status(created ? 201 : 200).send({ data: withServerTime(session) });
  } catch (e) {
    res.status(e.status || 500).send({ error: e.message || "Server error" });
  }
});

router.get("/current", async (req, res) => {
  try {
    const session = await getCurrentTimerSession(req.user.id);
    res.status(200).send({ data: withServerTime(session) });
  } catch (e) {
    res.status(e.status || 500).send({ error: e.message || "Server error" });
  }
});

router.post("/finish", async (req, res) => {
  try {
    const entry = await finishTimerSession(req.user.id, req.body);
    res.status(200).send({ data: entry });
  } catch (e) {
    res.status(e.status || 500).send({ error: e.message || "Server error" });
  }
});

router.patch("/current", async (req, res) => {
  try {
    const session = await updateTimerSessionComment(req.user.id, req.body);
    res.status(200).send({ data: withServerTime(session) });
  } catch (e) {
    res.status(e.status || 500).send({ error: e.message || "Server error" });
  }
});

router.delete("/current", async (req, res) => {
  try {
    const result = await cancelTimerSession(req.user.id);
    res.status(200).send({ message: "Timer stopped", ...result });
  } catch (e) {
    res.status(e.status || 500).send({ error: e.message || "Server error" });
  }
});

module.exports = router;