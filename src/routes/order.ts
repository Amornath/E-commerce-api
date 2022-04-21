export {};
const express = require("express");

const authenticateUser = require("../middleware/authentication");
const router = express.Router();
const {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
  getOrder,
} = require("../controllers/order");

router.route("/").post(createOrder).get(getAllOrders);

router.route("/:id").get(getOrder).delete(deleteOrder).put(updateOrder);

module.exports = router;
