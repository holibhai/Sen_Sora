const { connection } = require("../db/ConnectMysql");

// Create Products table
const createProductsTable = () => {
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('cake', 'gift') NOT NULL,
    category VARCHAR(255),
    flavor VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    imageUrl VARCHAR(255),
    stock INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;



connection.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Failed to create products table:', err);
  } else {
    console.log('Products table created or already exists.');
  }
});
}

module.exports = {
  createProductsTable,
};