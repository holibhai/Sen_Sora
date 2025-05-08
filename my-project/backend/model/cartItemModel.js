const { connection } = require("../db/ConnectMysql");

const createCartItemsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cart_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255) NOT NULL,
      productId INT NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
      FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
      FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE 
    );
  `;                             
  
  connection.query(createTableQuery, (err, result) => {
    if (err) { 
      console.error("❌ Failed to create cart_items table:", err.message);
    } else {
      console.log("✅ cart_items table created or already exists.");
    }
  });
};
                                                                                                                       
module.exports = {
  createCartItemsTable                                                                                     
};                                                   

