export {};
const express = require("express");

const authenticateUser = require("../middleware/authentication");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  getCategory,
} = require("../controllers/category");

router.route("/").post(createCategory).get(getAllCategory);

router
  .route("/:id")
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

module.exports = router;
