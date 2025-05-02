const { connection } = require("../db/ConnectMysql");
const { v4: uuidv4 } = require("uuid");

// Helper function to generate 8-digit orderId
const generateOrderId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, totalProducts, total, status, date } = req.body;
    const orderId = generateOrderId();

    const query = `
      INSERT INTO orders (orderId, userId, totalProducts, total, status, date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [orderId, userId, totalProducts, total, status, date];

    connection.query(query, values, (err, result) => {
      if (err) return res.status(400).json({ message: err.message });

      connection.query('SELECT * FROM orders WHERE orderId = ?', [orderId], (error, data) => {
        if (error) return res.status(500).json({ message: error.message });
        res.status(201).json(data[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const query = 'SELECT * FROM orders';
    connection.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    connection.query('SELECT * FROM orders WHERE orderId = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Order not found" });
      res.json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatusById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const query = `UPDATE orders SET status = ? WHERE orderId = ?`;

    connection.query(query, [status, orderId], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found." });
      }

      // Return the updated order
      connection.query("SELECT * FROM orders WHERE orderId = ?", [orderId], (e, updated) => {
        if (e) return res.status(500).json({ message: e.message });
        res.json(updated[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, totalProducts, total, status, date } = req.body;

    const updateFields = [];
    const values = [];

    if (userId !== undefined) {
      updateFields.push("userId = ?");
      values.push(userId);
    }
    if (totalProducts !== undefined) {
      updateFields.push("totalProducts = ?");
      values.push(totalProducts);
    }
    if (total !== undefined) {
      updateFields.push("total = ?");
      values.push(total);
    }
    if (status !== undefined) {
      updateFields.push("status = ?");
      values.push(status);
    }
    if (date !== undefined) {
      updateFields.push("date = ?");
      values.push(date);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    values.push(id); // for WHERE clause

    const query = `UPDATE orders SET ${updateFields.join(", ")} WHERE orderId = ?`;

    connection.query(query, values, (err, result) => {
      if (err) return res.status(400).json({ message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });

      connection.query("SELECT * FROM orders WHERE orderId = ?", [id], (e, updated) => {
        if (e) return res.status(500).json({ message: e.message });
        res.json(updated[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    connection.query('SELECT * FROM orders WHERE orderId = ?', [id], (checkErr, found) => {
      if (checkErr) return res.status(500).json({ message: checkErr.message });
      if (found.length === 0) return res.status(404).json({ message: "Order not found" });

      connection.query('DELETE FROM orders WHERE orderId = ?', [id], (deleteErr, result) => {
        if (deleteErr) return res.status(500).json({ message: deleteErr.message });

        res.json({
          message: "Order deleted successfully",
          deletedOrder: found[0]
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
