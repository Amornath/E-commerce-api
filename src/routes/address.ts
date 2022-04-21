export {};
const express = require("express");

const authenticateUser = require("../middleware/authentication");
const router = express.Router();
const {
  createAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
  getAddress,
} = require("../controllers/address");

router.route("/").post(createAddress).get(getAllAddress);

router.route("/:id").get(getAddress).delete(deleteAddress).put(updateAddress);

module.exports = router;
