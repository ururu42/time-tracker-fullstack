const mongoose = require('mongoose');

module.exports = function mapTimeEntry(timeEntry) {
	return {
		id: timeEntry._id.toString(),
		owner: timeEntry.owner.toString(),
		taskId: timeEntry.taskId.toString(),
		startTime: timeEntry.startTime,
		endTime: timeEntry.endTime,
		duration: timeEntry.duration,
		comment: timeEntry.comment,
		createdAt: timeEntry.createdAt,
		updatedAt: timeEntry.updatedAt,
	};
};