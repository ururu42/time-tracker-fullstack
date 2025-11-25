const express = require("express");
const authenticated = require("../middlewares/authenticated");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();
router.use(authenticated);

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await getProjects(req.user._id, search, limit, page);
    res.send(result);
  } catch (e) {
    res.status(500).send({ error: e.message || "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProject = await createProject(req.user._id, req.body);
    res.status(201).send({ data: newProject });
  } catch (e) {
    res.status(500).send({ error: e.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await getProjectById(req.user._id, req.params.id);
    if (!project) {
      res.status(404).send({ error: "Project not found" });
      return;
    }
    res.send({ data: project });
  } catch (e) {
    res.status(500).send({ error: e.message || "Server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedProject = await updateProject(
      req.user._id,
      req.params.id,
      req.body
    );
    if (!updatedProject) {
      res.status(404).send({ error: "Project not found" });
      return;
    }
    res.send({ data: updatedProject });
  } catch (e) {
    res.status(500).send({ error: e.message || "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteProject(req.user._id, req.params.id);
    if (!deleted) {
      res.status(404).send({ error: "Project not found or not deleted" });
      return;
    }

    res.send({ message: "Project deleted" });
  } catch (e) {
    res.status(500).send({ error: e.message || "Server error" });
  }
});

module.exports = router;
