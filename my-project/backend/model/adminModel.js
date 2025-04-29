const { connection } = require("../db/ConnectMysql");

// Function to create the 'admins' table
const createAdminsTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating admins table:", err);
    } else {
      console.log("Admins table created or already exists.");
    }
    connection.end(); // Always close the connection after the query
  });
};

module.exports = {
  createAdminsTable,
};
