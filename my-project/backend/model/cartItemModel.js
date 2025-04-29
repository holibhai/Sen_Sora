const { connection } = require("../db/ConnectMysql");

// Create Cart Items table
const createCartItemsTable = `
  CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
  );
`;

connection.query(createCartItemsTable, (err, result) => {
  if (err) {
    console.error('Failed to create cart_items table:', err);
  } else {
    console.log('Cart_items table created or already exists.');
  }

});


module.exports = {
  createCartItemsTable,
};
