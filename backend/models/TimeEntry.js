const mongoose = require("mongoose");

const TimeEntrySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number }, // in milliseconds
    comment: { type: String, default: "" },
  },
  { timestamps: true }
);

const TimeEntry = mongoose.model("TimeEntry", TimeEntrySchema);

module.exports = TimeEntry;
