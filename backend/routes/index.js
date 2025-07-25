const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth"));
router.use("/project", require("./projects"));
router.use("/time", require("./time"));
router.use("/user", require("./user"));

module.exports = router;
