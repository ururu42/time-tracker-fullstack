const Project = require("../models/Projects");

async function getProjects(userId) {
  const projects = await Project.find({ owner: userId }).sort({
    createdAt: -1,
  });
  return projects;
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
