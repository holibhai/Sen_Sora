const { connection } = require("../db/ConnectMysql");


const generateShippingId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};


// Create a new shipping record
exports.createShipping = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      city,
      mobileNumber,
      address1,
      address2,
      deliveryDate,
      orderNotes,
      userId,
      orderId,
      orderStatus = "Not Accepted" // Default value if not provided
    } = req.body;

    const shippingId = generateShippingId();

    const query = `
      INSERT INTO shipping 
      (shippingId, firstName, lastName, city, mobileNumber, address1, address2, deliveryDate, orderNotes, userId, orderId, orderStatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      shippingId,
      firstName,
      lastName,
      city,
      mobileNumber,
      address1,
      address2,
      deliveryDate,
      orderNotes,
      userId,
      orderId,
      orderStatus
    ];

    connection.query(query, values, (err, result) => {
      if (err) return res.status(400).json({ message: err.message });

      connection.query("SELECT * FROM shipping WHERE shippingId = ?", [shippingId], (error, data) => {
        if (error) return res.status(500).json({ message: error.message });
        res.status(201).json(data[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shipping records
exports.getAllShipping = async (req, res) => {
  try {
    const query = "SELECT * FROM shipping";
    connection.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const query = "SELECT * FROM shipping WHERE orderId = ?";
    connection.query(query, [orderId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "Shipping details not found for the given orderId" });
      }

      res.json(results[0]); // Return first match, assuming one-to-one
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single shipping record by ID
exports.getShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    connection.query("SELECT * FROM shipping WHERE shippingId = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Shipping record not found" });
      res.json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a shipping record by ID
exports.updateShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      city,
      mobileNumber,
      address1,
      address2,
      orderNotes,
      userId,
      orderId
    } = req.body;

    const updateFields = [];
    const values = [];

    if (firstName !== undefined) {
      updateFields.push("firstName = ?");
      values.push(firstName);
    }
    if (lastName !== undefined) {
      updateFields.push("lastName = ?");
      values.push(lastName);
    }
    if (city !== undefined) {
      updateFields.push("city = ?");
      values.push(city);
    }
    if (mobileNumber !== undefined) {
      updateFields.push("mobileNumber = ?");
      values.push(mobileNumber);
    }
    if (address1 !== undefined) {
      updateFields.push("address1 = ?");
      values.push(address1);
    }
    if (address2 !== undefined) {
      updateFields.push("address2 = ?");
      values.push(address2);
    }
    if (orderNotes !== undefined) {
      updateFields.push("orderNotes = ?");
      values.push(orderNotes);
    }
    if (userId !== undefined) {
      updateFields.push("userId = ?");
      values.push(userId);
    }
    if (orderId !== undefined) {
      updateFields.push("orderId = ?");
      values.push(orderId);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    values.push(id); // for WHERE clause

    const query = `UPDATE shipping SET ${updateFields.join(", ")} WHERE shippingId = ?`;

    connection.query(query, values, (err, result) => {
      if (err) return res.status(400).json({ message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Shipping record not found" });

      connection.query("SELECT * FROM shipping WHERE shippingId = ?", [id], (e, updated) => {
        if (e) return res.status(500).json({ message: e.message });
        res.json(updated[0]);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDeliveryDate = (req, res) => {
  const { orderId } = req.params;
  const { deliveryDate } = req.body;

  if (!deliveryDate) {
    return res.status(400).json({ error: 'Delivery date is required' });
  }

  const query = `
    UPDATE shipping
    SET deliveryDate = ?
    WHERE orderId = ?
  `;

  connection.query(query, [deliveryDate, orderId], (err, result) => {
    if (err) {
      console.error('Error updating delivery date:', err);
      return res.status(500).json({ error: 'Failed to update delivery date' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No shipping record found for the given orderId' });
    }

    res.json({ message: 'Delivery date updated successfully' });
  });
};

exports.updateDeliveryStatus = (req, res) => {
  const { shippingId } = req.params;
  const { orderStatus } = req.body;

  const query = 'UPDATE shipping SET orderStatus = ? WHERE shippingId = ?';
  connection.query(query, [orderStatus, shippingId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Delivery status updated successfully' });
  });
};

// Delete a shipping record by ID
exports.deleteShippingById = async (req, res) => {
  try {
    const { id } = req.params;

    connection.query("SELECT * FROM shipping WHERE shippingId = ?", [id], (checkErr, found) => {
      if (checkErr) return res.status(500).json({ message: checkErr.message });
      if (found.length === 0) return res.status(404).json({ message: "Shipping record not found" });

      connection.query("DELETE FROM shipping WHERE shippingId = ?", [id], (deleteErr, result) => {
        if (deleteErr) return res.status(500).json({ message: deleteErr.message });

        res.json({
          message: "Shipping record deleted successfully",
          deletedShipping: found[0]
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
