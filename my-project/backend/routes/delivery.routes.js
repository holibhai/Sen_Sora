const express = require("express");
const {
  createShipping,
  getAllShipping,
  getOrderById,
  getShippingById,
  updateShippingById,
  deleteShippingById
} = require("../controller/delivery.controller");

const router = express.Router();

// Create new shipping entry
router.post("/add", createShipping);

// Get all shipping entries
router.get("/", getAllShipping);

router.get("/getByOrderId/:orderId",getOrderById);

// Get a shipping entry by ID
router.get("/:id", getShippingById);

// Update a shipping entry by ID
router.put("/:id", updateShippingById);

// Delete a shipping entry by ID
router.delete("/:id", deleteShippingById);

module.exports = router;
