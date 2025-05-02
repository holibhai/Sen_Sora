const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
} = require("../controller/order.controller");

const router = express.Router();

router.post("/add", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
