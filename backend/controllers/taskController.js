const Task = require("../models/Task");
const mapTask = require("../helpers/mapTask");

async function getTasks(userId, projectId, search, limit, page) {
  const filter = { owner: userId };

  if (projectId) filter.projectId = projectId;
  if (search) filter.title = { $regex: search, $options: "i" };

  const [tasks, count] = await Promise.all([
    Task.find(filter)
      .populate("projectId", "title description")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Task.countDocuments(filter),
  ]);

  return {
    items: tasks.map(mapTask),
    lastPage: Math.ceil(count / limit),
  };
}

async function getTaskById(userId, taskId) {
  const task = await Task.findOne({ _id: taskId, owner: userId }).populate(
    "projectId",
    "title description",
  );

  return task ? mapTask(task) : null;
}

async function createTask(userId, body) {
  const task = await Task.create({ ...body, owner: userId });
  return mapTask(task);
}

async function updateTask(userId, taskId, body) {
  const updated = await Task.findOneAndUpdate(
    { _id: taskId, owner: userId },
    body,
    { new: true, runValidators: true },
  );

  return updated ? mapTask(updated) : null;
}

async function deleteTask(userId, taskId) {
  const result = await Task.deleteOne({ _id: taskId, owner: userId });
  return result.deletedCount > 0;
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
