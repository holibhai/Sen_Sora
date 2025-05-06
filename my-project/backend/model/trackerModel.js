const { connection } = require("../db/ConnectMysql");

// Function to create the 'trackers' table
const createTrackerTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS trackers (
      trackerId CHAR(36) PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating trackers table:", err);
    } else {
      console.log("trackers table created or already exists.");
    }
  });
};

module.exports = {
  createTrackerTable,
};
