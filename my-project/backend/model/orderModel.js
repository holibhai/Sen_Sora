const { connection } = require("../db/ConnectMysql");

// Function to create the 'orders' table
const createOrdersTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      orderId VARCHAR(8) NOT NULL UNIQUE,
      userId VARCHAR(255) NOT NULL,
      totalProducts INT NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'Pending',
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (orderId),
      FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating orders table:", err);
    } else {
      console.log("Orders table created or already exists.");
    }
  });
};

module.exports = {
  createOrdersTable,
};
