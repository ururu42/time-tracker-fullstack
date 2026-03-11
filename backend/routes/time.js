const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  getTimeEntries,
  getTimeEntryById,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
} = require("../controllers/timeController");

const router = express.Router();
router.use(authenticated);

router.get("/", async (req, res) => {
  try {
    const times = await getTimeEntries(req.user.id);
    res.status(200).send({ data: times });
  } catch (e) {
    res.status(404).send({ error: e.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTime = await createTimeEntry(req.user.id, req.body);
    res.status(201).send({ data: newTime });
  } catch (e) {
    res.status(404).send({ error: e.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const time = await getTimeEntryById(req.user.id, req.params.id);
    if (!time) {
      res.status(404).send({ error: "Time entry not found" });
      return;
    }
    res.status(200).send({ data: time });
  } catch (e) {
    res.status(404).send({ error: e.message || "Server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updated = await updateTimeEntry(
      req.user.id,
      req.params.id,
      req.body,
    );
    if (!updated) {
      res.status(404).send({ error: "Time entry not updated" });
      return;
    }
    res.status(200).send({ data: updated });
  } catch (e) {
    res.status(404).send({ error: e.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteTimeEntry(req.user.id, req.params.id);
    if (!deleted) {
      res.status(404).send({ error: "Time entry not deleted" });
      return;
    }
    res.status(200).send({ message: "TimeEntry deleted" });
  } catch (e) {
    res.status(404).send({ error: e.message || "Server error" });
  }
});

module.exports = router;
