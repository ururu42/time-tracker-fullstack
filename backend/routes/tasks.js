const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();
router.use(authenticated);

router.get("/", async (req, res) => {
  try {
    const { projectId, search = "", limit = 10, page = 1 } = req.query;

    const result = await getTasks(
      req.user.id,
      projectId,
      search,
      parseInt(limit),
      parseInt(page),
    );

    res.json({
      data: result.items,
      lastPage: result.lastPage,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await getTaskById(req.user.id, req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ data: task });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = await createTask(req.user.id, req.body);
    res.status(201).json({ data: task });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await updateTask(req.user.id, req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ data: updated });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteTask(req.user.id, req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
