const express = require("express");
const authenticated = require("../middlewares/authenticated");
const { getUserById, updateUserById } = require("../controllers/user");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.use(authenticated);

router.get("/me", async (req, res) => {
  try {
    const user = await getUserById(req.user._id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ data: user });
  } catch (e) {
    res.status(500).send({ error: "Server error" });
  }
});

router.put("/me", upload.single("avatar"), async (req, res) => {
  try {
    const currentUser = await getUserById(req.user.id);

    let avatarPath = currentUser?.avatar;

    if (req.file) {
      avatarPath = req.file.path;
    }

    if (req.body.removeAvatar === "true") {
      avatarPath = null;

        if (currentUser?.avatar) {
          const fullPath = path.join(__dirname, "..", currentUser.avatar);

          fs.unlink(fullPath, (err) => {
            if (err) {
            }
          });
        }
    }

    const updatedUser = await updateUserById(req.user.id, {
      name: req.body.name,
      login: req.body.login,
      avatar: avatarPath,
    });

    if (!updatedUser) {
      return res.status(404).send({ error: "User not updated" });
    }

    res.status(200).send({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    console.error("Ошибка при обновлении пользователя:", e);
    res.status(500).send({ error: e.message || "Server error" });
  }
});

module.exports = router;
