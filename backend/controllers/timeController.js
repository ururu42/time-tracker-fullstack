const TimeEntry = require("../models/TimeEntry");
const mapTimeEntry = require("../helpers/mapTimeEntry");

async function getTimeEntries(userId) {
  const allTimeEntries = await TimeEntry.find({ owner: userId })
    .populate({
      path: "taskId",
      select: "title projectId",
      populate: {
        path: "projectId",
        select: "title",
      },
    })
    .sort({ startTime: -1 });

  return allTimeEntries.map(mapTimeEntry);
}
async function getTimeEntryById(userId, entryId) {
  const timeEntry = await TimeEntry.findOne({ _id: entryId, owner: userId });

  return timeEntry ? mapTimeEntry(timeEntry) : null;
}

async function createTimeEntry(userId, body) {
  const allowedFields = [
    "taskId",
    "startTime",
    "endTime",
    "duration",
    "comment",
  ];

  const newData = {
    owner: userId,
    comment: "",
  };

  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      newData[key] = body[key];
    }
  }

  if (newData.duration === undefined) {
    if (newData.startTime && newData.endTime) {
      newData.duration = Math.round(
        (new Date(newData.endTime) - new Date(newData.startTime)) / 60000,
      );
    } else {
      newData.duration = 0;
    }
  }

  const createdNewTimeEntry = await TimeEntry.create(newData);

  const populatedEntry = await TimeEntry.findById(
    createdNewTimeEntry._id,
  ).populate({
    path: "taskId",
    select: "title projectId",
    populate: {
      path: "projectId",
      select: "title",
    },
  });

  return mapTimeEntry(populatedEntry);
}

async function updateTimeEntry(userId, entryId, body) {
  const allowedFields = [
    "taskId",
    "startTime",
    "endTime",
    "duration",
    "comment",
  ];
  const updateData = {};

  for (const key of allowedFields) {
    if (body[key] !== undefined) {
      updateData[key] = body[key];
    }
  }

  const updatedTimeEntry = await TimeEntry.findOneAndUpdate(
    { _id: entryId, owner: userId },
    updateData,
    { runValidators: true, new: true },
  );

  return updatedTimeEntry ? mapTimeEntry(updatedTimeEntry) : null;
}

async function deleteTimeEntry(userId, entryId) {
  const result = await TimeEntry.deleteOne({
    _id: entryId,
    owner: userId,
  });

  return result.deletedCount > 0;
}

module.exports = {
  getTimeEntries,
  getTimeEntryById,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
};
