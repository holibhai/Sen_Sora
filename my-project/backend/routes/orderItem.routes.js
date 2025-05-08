const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemsByOrderId,
  deleteOrderItemById,
} = require("../controller/orderItem.controller");

// Create a new order item
router.post("/add", createOrderItem);

// Get all order items
router.get("/", getAllOrderItems);

// Get order items by orderId
router.get("/order/:orderId", getOrderItemsByOrderId);

// Delete an order item by ID
router.delete("/:id", deleteOrderItemById);

module.exports = router;
