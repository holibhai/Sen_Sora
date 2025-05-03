const { connection } = require("../db/ConnectMysql");

// Function to create the order_items table
const createOrderItemsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      orderId INT NOT NULL,
      productId INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      price DECIMAL(10, 2) NOT NULL,
      userId INT NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("❌ Failed to create order_items table:", err.message);
    } else {
      console.log("✅ order_items table created or already exists.");
    }
  });
};

module.exports = {
  createOrderItemsTable,
};
