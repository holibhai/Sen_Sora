const express = require("express");
const {
  createDeliveryCost,
  getAllDeliveryCosts,
  getDeliveryCostByCity,
  updateDeliveryCostByCity,
  deleteDeliveryCostByCity,
} = require("../controller/deliveryCost.controller");

const router = express.Router();

// Route to create a new delivery cost
router.post("/add", createDeliveryCost);

// Route to get all delivery costs
router.get("/getAll", getAllDeliveryCosts);

// Route to get delivery cost by city
router.get("/:city", getDeliveryCostByCity);

// Route to update delivery cost by city
router.put("/:city", updateDeliveryCostByCity);

// Route to delete delivery cost by city
router.delete("/:city", deleteDeliveryCostByCity);

module.exports = router;
