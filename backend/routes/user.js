const express = require("express");
const authenticated = require("../middlewares/authenticated");
const { getUserById, updateUserById } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.use(authenticated);

router.get("/me", async (req, res) => {
  try {
    const user = await getUserById(req.user._id);
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send({ data: mapUser(user) });
  } catch (e) {
    res.status(500).send({ error: "Server error" });
  }
});

router.put("/me", upload.single("avatar"), async (req, res) => {
  try {
    // Обработка загруженного файла
    const avatarPath = req.file ? req.file.path : undefined;

    const updatedUser = await updateUserById(req.user._id, {
      name: req.body.name,
      login: req.body.login,
      avatar: avatarPath, // Используем путь к загруженному файлу, а не req.body.avatar
    });
    if (!updatedUser) {
      res.status(404).send({ error: "User not updated" });
      return;
    }

    res.status(200).send({
      message: "User updated successfully",
      data: mapUser(updatedUser),
    });
  } catch (e) {
    console.error("Ошибка при обновлении пользователя:", e);
    res.status(500).send({ error: e.message || "Server error" });
  }
});

module.exports = router;
