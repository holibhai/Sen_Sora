const { connection } = require("../db/ConnectMysql");

// Function to create the 'shipping' table
const createShippingTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS shipping (
      shippingId VARCHAR(8) NOT NULL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      mobileNumber VARCHAR(20) NOT NULL,
      address1 TEXT NOT NULL,
      address2 TEXT,
      orderNotes TEXT,
      deliveryDate DATETIME DEFAULT NULL, -- Optional delivery date
      userId VARCHAR(255) NOT NULL,
      orderId VARCHAR(255) NOT NULL,
      orderStatus VARCHAR(50) NOT NULL DEFAULT 'Not Accepted'
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating shipping table:", err);
    } else {
      console.log("Shipping table created or already exists.");
    }
  });
};

module.exports = {
  createShippingTable,
};
