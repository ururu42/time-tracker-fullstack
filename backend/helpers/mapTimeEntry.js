const mongoose = require("mongoose");

module.exports = function mapTimeEntry(timeEntry) {
  return {
    id: timeEntry._id.toString(),
    owner: timeEntry.owner.toString(),
    taskId: timeEntry.taskId?._id?.toString(),
    taskTitle: timeEntry.taskId?.title || "Название задачи",
    projectId: timeEntry.taskId?.projectId?._id?.toString(),
    projectTitle: timeEntry.taskId?.projectId?.title || "Проект",
    startTime: timeEntry.startTime,
    endTime: timeEntry.endTime,
    duration: timeEntry.duration,
    comment: timeEntry.comment,
    createdAt: timeEntry.createdAt,
    updatedAt: timeEntry.updatedAt,
  };
};
