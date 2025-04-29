const { connection } = require("../db/ConnectMysql");

// Create Order Items table
const createOrderTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL UNIQUE,
  total DECIMAL(10, 2) NOT NULL,
  userId INT NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  price DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
`;

connection.query(createOrderTable, (err, result) => {
  if (err) {
    console.error('Failed to create order_items table:', err);
  } else {
    console.log('Order_items table created or already exists.');
  }
  // Always close the connection
  connection.end();
});

module.exports = {
  createOrderTable,
};
