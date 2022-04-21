export {};
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { googleSignup } = require("../controllers/auth");

router.post("/google", auth, googleSignup);

module.exports = router;
