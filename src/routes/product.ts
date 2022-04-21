export {};
const express = require("express");
const upload = require("../middleware/imageUpload");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
} = require("../controllers/product");

router
  .route("/")
  // .post(upload.array("product-files", 12), createProduct)
  .post(createProduct)
  .get(getAllProducts);

router
  .route("/:id")
  .get(getProduct)
  .delete(authenticateUser, deleteProduct)
  .put(updateProduct);

module.exports = router;
