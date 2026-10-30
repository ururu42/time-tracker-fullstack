const mongoose = require("mongoose");

const ActiveTimerSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    comment: { type: String, default: "" },
    startTime: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    expiresAt: {
      // Автоочистка забытых сессий (например, если браузер был убит без beforeunload)
      type: Date,
      default: () => new Date(Date.now() + 120 * 60 * 60 * 1000), // 120 часов
      expireAfterSeconds: 0,
    },
  },
  { timestamps: true }
);

const ActiveTimer = mongoose.model("ActiveTimer", ActiveTimerSchema);

module.exports = ActiveTimer;