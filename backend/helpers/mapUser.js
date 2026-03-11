const mongoose = require("mongoose");
const roles = require("../constants/roles");

module.exports = function mapUser(user) {
  return {
    id: user._id,
    login: user.login,
    name: user.name,
    avatar: user.avatar,
    role: user.role,
    settings: user.settings,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    // Определяем строковое представление роли
    roleName: user.role === roles.ADMIN ? "admin" : "user",
  };
};
