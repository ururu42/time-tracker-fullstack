const Project = require("../models/Projects");
const Task = require("../models/Task");
const mapProject = require("../helpers/mapProject");

async function getProjects(userId, search = "", limit = 10, page = 1) {
  const filter = { owner: userId };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const [projects, count] = await Promise.all([
    Project.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Project.countDocuments(filter),
  ]);

  return {
    items: projects.map(mapProject),
    lastPage: Math.ceil(count / limit),
  };
}

async function getProjectById(userId, projectId) {
  const project = await Project.findOne({ _id: projectId, owner: userId });
  return project ? mapProject(project) : null;
}

async function createProject(userId, body) {
  const project = await Project.create({
    owner: userId,
    title: body.title,
    description: body.description,
    isArchived: body.isArchived,
  });

  return mapProject(project);
}

async function updateProject(userId, projectId, body) {
  const updated = await Project.findOneAndUpdate(
    { _id: projectId, owner: userId },
    body,
    { new: true, runValidators: true },
  );

  return updated ? mapProject(updated) : null;
}

async function deleteProject(userId, projectId) {
  await Task.deleteMany({ projectId, owner: userId });

  const result = await Project.deleteOne({
    _id: projectId,
    owner: userId,
  });

  return result.deletedCount > 0;
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
