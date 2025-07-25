const express = require("express");
const authenticated = require("../middlewares/authenticated");
const { getUserById, updateUserById } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

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

router.put("/me", async (req, res) => {
  try {
    const updatedUser = await updateUserById(req.user._id, {
      name: req.body.name,
      avatar: req.body.avatar,
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
    res.status(500).send({ error: "Server error" });
  }
});

module.exports = router;
