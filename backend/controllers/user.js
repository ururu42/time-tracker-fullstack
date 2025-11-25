const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

async function register(login, password) {
  if (!login || !password || password.length < 3) {
    throw new Error("Registration error");
  }

  const user = await User.findOne({ login });

  if (user) {
    throw new Error("This login is already in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({ login, password: passwordHash });
  const token = generate({ id: newUser.id });

  return { user: newUser, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generate({ id: user.id });

  return { user, token };
}

async function getUsers() {
  return await User.find().select("-password");
}

async function getUserById(id) {
  return await User.findById(id).select("-password");
}

// async function updateUserById(id, data = {}) {
//   const allowedFields = ["name", "avatar", "login"];
//   const updateData = {};

//   for (const field of allowedFields) {
//     if (data[field] !== undefined) {
//       updateData[field] = data[field];
//     }
//   }

//   if (typeof data.settings === "object" && data.settings !== undefined) {
//     for (const key in data.settings) {
//       updateData[`settings.${key}`] = data.settings[key];
//     }
//   }

//   const updatedUser = await User.findByIdAndUpdate(id, updateData, {
//     new: true,
//     runValidators: true,
//   });

//   return updatedUser;
// }

async function updateUserById(id, data = {}) {
  try {
    console.log("Обновление пользователя с ID:", id);
    console.log("Данные для обновления:", data);

    const allowedFields = ["name", "avatar", "login"];
    const updateData = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        // Проверяем, если обновляется логин, то он должен быть уникальным
        if (field === "login") {
          const existingUser = await User.findOne({
            login: data[field],
            _id: { $ne: id },
          });
          if (existingUser) {
            throw new Error("This login is already in use");
          }
        }
        updateData[field] = data[field];
      }
    }

    if (typeof data.settings === "object" && data.settings !== undefined) {
      for (const key in data.settings) {
        updateData[`settings.${key}`] = data.settings[key];
      }
    }

    console.log("Данные для обновления в базе:", updateData);

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    console.log("Результат обновления:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    throw error;
  }
}

async function deleteUser(id) {
  const deletedUser = await User.deleteOne({ _id: id });

  return deletedUser.deletedCount > 0;
}

async function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.USER, name: "User" },
  ];
}

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
  getRoles,
};
