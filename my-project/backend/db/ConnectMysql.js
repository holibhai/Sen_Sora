const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DKptWaIs21@TH',
  database: 'sensora'
});

const connectToMySql = () => {
  connection.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err.stack);
    } else {
      console.log('Connected to MySQL as ID', connection.threadId);
    }
  });
};

module.exports = {
    connectToMySql,
    connection, // so other files can use it to query the DB
  };