const { connection } = require("../db/ConnectMysql");

// Create Order Items table
const createOrderItemsTable = `
  CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Failed to create order_items table:', err);
    } else {
      console.log('✅ order_items table created or already exists.');
    }
  });
};

module.exports = {
  createOrderItemsTable,
};
