const Project = require("../models/Projects");

async function getProjects(userId, search = "", limit = 5, page = 1) {
  const searchCondition = { owner: userId };

  if (search) {
    searchCondition.title = { $regex: search, $options: "i" };
  }

  const [projects, count] = await Promise.all([
    Project.find(searchCondition)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({
        createdAt: -1,
      }),
    Project.countDocuments(searchCondition),
  ]);
  return { projects, lastPage: Math.ceil(count / limit) };
}

async function getProjectById(userId, projectId) {
  const project = await Project.findOne({ _id: projectId, owner: userId });

  return project;
}

async function createProject(userId, body) {
  const allowedFields = ["title", "description", "isArchived"];
  const projectData = {
    owner: userId,
  };
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      projectData[key] = body[key];
    }
  }

  const newProject = await Project.create(projectData);

  return newProject;
}

async function updateProject(userId, projectId, body) {
  const allowedFields = ["title", "description", "isArchived"];
  const updateData = {};
  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      updateData[key] = body[key];
    }
  }

  const updatedProject = await Project.findOneAndUpdate(
    { _id: projectId, owner: userId },
    updateData,
    { new: true, runValidators: true }
  );

  return updatedProject;
}

async function deleteProject(userId, projectId) {
  const deletedProject = await Project.deleteOne({
    _id: projectId,
    owner: userId,
  });

  return deletedProject;
}

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
