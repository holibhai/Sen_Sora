const { connection } = require("../db/ConnectMysql");

// Function to create the 'users' table
const createUsersTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) NOT NULL UNIQUE,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      phone VARCHAR(255),
      PRIMARY KEY (userId)
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created or already exists.");
    }
    connection.end(); // Close the connection after the query
  });
};

module.exports = {
  createUsersTable,
};
