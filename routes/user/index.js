const express = require("express");
const multer = require('multer');
const router = express.Router();
const registerUser = require("./register");
const loginUser = require("./login");


const upload = multer({ dest: './public/data/avatar' })

// ROUTES * /api/user/
router.post("/login", loginUser);
router.post("/register", upload.single('avatar'), registerUser);
// router.post("/", checkPassword);

module.exports = router;