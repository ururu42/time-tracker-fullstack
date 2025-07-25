const mongoose = require("mongoose");
const validator = require("validator");
const roles = require("../constants/roles");

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    name: { type: String, default: "", trim: true },
    avatar: {
      type: String,
      default: "",
      validator: function (v) {
        return !v || validator.isURL(v);
        // ✅ если пусто → true, если есть значение → проверяем как URL
      },
    },
    role: {
      type: Number,
      default: roles.USER,
      enum: [roles.ADMIN, roles.USER],
    },
    settings: {
      timezone: {
        type: String,
        default: "Europe/Chisinau",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
