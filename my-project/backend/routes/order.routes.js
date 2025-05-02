const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatusById,
  updateOrderById,
  deleteOrderById
} = require("../controller/order.controller");

const router = express.Router();

router.post("/add", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/updateStatus/:orderId",updateOrderStatusById)
router.put("/update/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
