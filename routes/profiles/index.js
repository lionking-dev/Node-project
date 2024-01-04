const express = require("express");
const router = express.Router();
const userPagination = require("./pagination");



// ROUTES * /api/profiles/
router.get("/", userPagination);

module.exports = router;