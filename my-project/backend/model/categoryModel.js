const { connection } = require("../db/ConnectMysql");

const createCategoriesTable = () => {
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
      categoryId VARCHAR(255) NOT NULL UNIQUE,
      type VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      PRIMARY KEY (categoryId)
    );
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating categories table:", err);
    } else {
      console.log("Categories table created or already exists.");
    }
  
  });
};

// const getCategories = (callback) => {
//   const query = `
//     SELECT type, category 
//     FROM categories 
//     ORDER BY type, category;
//   `;
//   connection.query(query, callback);
// };

module.exports = {
  createCategoriesTable
};


  