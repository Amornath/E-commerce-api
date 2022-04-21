export {};
const express = require("express");

const authenticateUser = require("../middleware/authentication");
const router = express.Router();
const {
  createReview,
  deleteReview,
  getAllReview,

  getReview,
} = require("../controllers/review");

router.route("/").post(createReview).get(getAllReview);

router.route("/:id").get(getReview).delete(deleteReview);

module.exports = router;
