const { connection } = require("../db/ConnectMysql");

// Create a new delivery cost
const createDeliveryCost = (req, res) => {
  const { city, cost } = req.body;
  if (!city || cost == null) {
    return res.status(400).json({ message: "City and cost are required." });
  }

  const query = "INSERT INTO deliveryCost (city, cost) VALUES (?, ?)";

  connection.query(query, [city, cost], (err, result) => {
    if (err) {
      console.error("Error inserting delivery cost:", err);
      return res.status(500).json({ message: "Failed to add delivery cost." });
    }
    res.status(201).json({ message: "Delivery cost added successfully.", data: { city, cost } });
  });
};

// Get all delivery costs
const getAllDeliveryCosts = (req, res) => {
  const query = "SELECT * FROM deliveryCost";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching delivery costs:", err);
      return res.status(500).json({ message: "Failed to fetch delivery costs." });
    }
    res.status(200).json(results);
  });
};

// Get delivery cost by city
const getDeliveryCostByCity = (req, res) => {
  const { city } = req.params;
  const query = "SELECT * FROM deliveryCost WHERE city = ?";

  connection.query(query, [city], (err, results) => {
    if (err) {
      console.error("Error fetching delivery cost by city:", err);
      return res.status(500).json({ message: "Failed to fetch delivery cost." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Delivery cost not found for this city." });
    }

    res.status(200).json(results[0]);
  });
};

// Update delivery cost by city
const updateDeliveryCostByCity = (req, res) => {
  const { city } = req.params;
  const { cost } = req.body;

  const query = "UPDATE deliveryCost SET cost = ? WHERE city = ?";

  connection.query(query, [cost, city], (err, result) => {
    if (err) {
      console.error("Error updating delivery cost:", err);
      return res.status(500).json({ message: "Failed to update delivery cost." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "City not found." });
    }

    res.status(200).json({ message: "Delivery cost updated successfully." });
  });
};

// Delete delivery cost by city
const deleteDeliveryCostByCity = (req, res) => {
  const { city } = req.params;
  const query = "DELETE FROM deliveryCost WHERE city = ?";

  connection.query(query, [city], (err, result) => {
    if (err) {
      console.error("Error deleting delivery cost:", err);
      return res.status(500).json({ message: "Failed to delete delivery cost." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "City not found." });
    }

    res.status(200).json({ message: "Delivery cost deleted successfully." });
  });
};

module.exports = {
  createDeliveryCost,
  getAllDeliveryCosts,
  getDeliveryCostByCity,
  updateDeliveryCostByCity,
  deleteDeliveryCostByCity,
};
