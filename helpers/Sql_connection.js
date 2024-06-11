// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',  // localhost is typically sufficient
//     user: 'root',  // Your MySQL username
//     //password: 'root', 
//     database: 'pfe',  // Your database name
//     port: 3306  // Default MySQL port, change if your XAMPP uses different
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting: ' + err.stack);
//         return;
//     }
//     console.log('Connected as id ' + connection.threadId);
// });

// // Example query
// // connection.query('SELECT * FROM learner', (err, rows, fields) => {
// //     if (err) throw err;

// //     console.log('Data received from Db:');
// //     console.log(rows);
// // });

// module.exports = connection;












const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql8.freesqldatabase.com', // Your database host
  user: 'sql8713364',  // Your database username
  password: '9EDLUi6WXJ',  // Your database password
  database: 'sql8713364',  // Your database name
  port: 3306 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:');
    console.error('Error code:', err.code);
    console.error('Error errno:', err.errno);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);
});

module.exports = connection;
