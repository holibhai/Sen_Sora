const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatusById,
  updateOrderById,
  deleteOrderById
} = require("../controller/order.controller");

const router = express.Router();

router.post("/add", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
  router.get("/getByUserId/:userId",
  getOrdersByUserId,

  );

router.put("/updateStatus/:orderId",updateOrderStatusById)
router.put("/update/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
