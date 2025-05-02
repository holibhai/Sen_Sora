const { connection } = require("../db/ConnectMysql");

// Create a new order item
exports.createOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity, price, userId } = req.body;

    // MySQL query to insert a new order item
    const query = `
      INSERT INTO order_items (orderId, productId, quantity, price, userId) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [orderId, productId, quantity, price, userId];

    connection.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      // Return the created order item
      connection.query("SELECT * FROM order_items WHERE id = ?", [result.insertId], (error, data) => {
        if (error) return res.status(500).json({ message: error.message });
        res.status(201).json(data[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all order items
exports.getAllOrderItems = (req, res) => {
  try {
    // MySQL query to get all order items
    connection.query("SELECT * FROM order_items", (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order items by orderId

exports.getOrderItemsByOrderId = (req, res) => {
  try {
    const { orderId } = req.params;

    const query = `
      SELECT 
        oi.*, 
        p.name AS productName, 
        p.description, 
        p.price AS productPrice, 
        p.imageUrl, 
        p.type, 
        p.category, 
        p.flavor 
      FROM 
        order_items oi
      JOIN 
        products p ON oi.productId = p.id
      WHERE 
        oi.orderId = ?
    `;

    connection.query(query, [orderId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "Order items not found" });
      }

      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update order item by ID
exports.updateOrderItemById = (req, res) => {
  try {
    const { id } = req.params;
    const { orderId, productId, quantity, price, userId } = req.body;

    // MySQL query to update an order item
    const query = `
      UPDATE order_items 
      SET orderId = ?, productId = ?, quantity = ?, price = ?, userId = ?
      WHERE id = ?
    `;
    const values = [orderId, productId, quantity, price, userId, id];

    connection.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order item not found" });
      }

      // Return the updated order item
      connection.query("SELECT * FROM order_items WHERE id = ?", [id], (error, data) => {
        if (error) return res.status(500).json({ message: error.message });
        res.json(data[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order item by ID
exports.deleteOrderItemById = (req, res) => {
  try {
    const { id } = req.params;

    // MySQL query to delete an order item by ID
    connection.query("DELETE FROM order_items WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order item not found" });
      }

      res.json({ message: "Order item deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
