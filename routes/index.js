const express = require("express");
const { tokenVerification } = require("../middleware");
const auth = require("./auth");
const user = require("./user-type");
const contact = require("./contact");
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/auth", auth);
router.use("/user", user);
router.use("/contact", contact);

module.exports = router;
