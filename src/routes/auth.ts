export {};
const express = require("express");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();
const { register, login, signOut } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
router.put("/logout", authenticateUser, signOut);

module.exports = router;
