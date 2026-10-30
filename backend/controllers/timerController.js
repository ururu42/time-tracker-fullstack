const ActiveTimer = require("../models/ActiveTimer");
const Task = require("../models/Task");
const TimeEntry = require("../models/TimeEntry");
const mapTimeEntry = require("../helpers/mapTimeEntry");

function httpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function mapActiveTimer(session) {
  return {
    taskId: session.taskId?._id?.toString(),
    taskTitle: session.taskId?.title || "",
    projectId: session.taskId?.projectId?._id?.toString(),
    projectTitle: session.taskId?.projectId?.title || "",
    comment: session.comment || "",
    startTime: session.startTime,
  };
}

async function populateActiveTimer(session) {
  if (!session) return null;

  const populated = await ActiveTimer.findById(session._id).populate({
    path: "taskId",
    select: "title projectId description",
    populate: {
      path: "projectId",
      select: "title",
    },
  });

  return mapActiveTimer(populated);
}

async function startTimerSession(userId, body) {
  const taskId = body?.taskId;
  const comment = typeof body?.comment === "string" ? body.comment : "";

  if (!taskId) {
    throw httpError("taskId is required", 400);
  }

  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) {
    throw httpError("Task not found", 404);
  }

  const existing = await ActiveTimer.findOne({ owner: userId });
  if (existing) {
    if (existing.taskId.toString() !== task._id.toString()) {
      throw httpError("Timer is already running", 409);
    }

    // Таймер уже идёт по той же задаче — просто обновляем комментарий
    if (comment) {
      existing.comment = comment;
      await existing.save();
    }
    return { session: await populateActiveTimer(existing), created: false };
  }

  const session = await ActiveTimer.create({
    owner: userId,
    taskId,
    comment,
  });

  return { session: await populateActiveTimer(session), created: true };
}

async function getCurrentTimerSession(userId) {
  return populateActiveTimer(await ActiveTimer.findOne({ owner: userId }));
}

async function finishTimerSession(userId, body) {
  const session = await ActiveTimer.findOneAndDelete({ owner: userId });
  if (!session) {
    throw httpError("No active timer session", 404);
  }

  if (typeof body?.comment === "string" && body.comment) {
    session.comment = body.comment;
  }

  const startTime = new Date(session.startTime);
  const endTime = new Date();
  const duration = Math.max(0, endTime.getTime() - startTime.getTime());

  const timeEntry = await TimeEntry.create({
    owner: userId,
    taskId: session.taskId,
    startTime,
    endTime,
    duration,
    comment: session.comment || "",
  });

  const populatedEntry = await TimeEntry.findById(timeEntry._id).populate({
    path: "taskId",
    select: "title projectId",
    populate: {
      path: "projectId",
      select: "title",
    },
  });

  return mapTimeEntry(populatedEntry);
}

async function cancelTimerSession(userId) {
  const session = await ActiveTimer.findOneAndDelete({ owner: userId });
  return { cancelled: Boolean(session) };
}

async function updateTimerSessionComment(userId, body) {
  const comment = typeof body?.comment === "string" ? body.comment : "";

  const session = await ActiveTimer.findOneAndUpdate(
    { owner: userId },
    { comment },
    { new: true }
  );

  if (!session) {
    throw httpError("No active timer session", 404);
  }

  return mapActiveTimer(session);
}

module.exports = {
  startTimerSession,
  getCurrentTimerSession,
  finishTimerSession,
  cancelTimerSession,
  updateTimerSessionComment,
};