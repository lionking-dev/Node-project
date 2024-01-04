const express = require("express");
const { tokenVerification } = require("../middleware");
const user = require("./user");
const profile = require("./profile");
const profiles = require("./profiles");
const router = express.Router();

// AUTH Routes * /*
router.use("/user", user);
router.use("/profile", profile);
router.use("/profiles", profiles);

module.exports = router;
