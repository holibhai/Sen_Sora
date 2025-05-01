const { connection } = require("../db/ConnectMysql");

// Function to create the 'deliveryCost' table
const createDeliveryCostTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS deliveryCost (
      id INT AUTO_INCREMENT PRIMARY KEY,
      city VARCHAR(255) NOT NULL UNIQUE,
      cost DECIMAL(10, 2) NOT NULL
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating deliveryCost table:", err);
    } else {
      console.log("DeliveryCost table created or already exists.");
    }
  });
};

module.exports = {
  createDeliveryCostTable,
};
