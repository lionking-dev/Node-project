const express = require("express");
const router = express.Router();
const addContact = require("./addContact");

// ROUTES * /api/add-contact/
router.post("/add-contact", addContact);

module.exports = router;
