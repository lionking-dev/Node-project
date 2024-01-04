const express = require("express");
const multer = require('multer');
const router = express.Router();
const editUser = require("./edit");
const getProfile = require("./get-profile");
// const checkPassword = require("./check-password");
// const { tokenVerification } = require("../../middleware");


const upload = multer({ dest: './public/data/avatar' })

// ROUTES * /api/profile/
router.put("/:id", upload.single('avatar'), editUser);
router.get("/:id", getProfile);

module.exports = router;