const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',  // localhost is typically sufficient
    user: 'root',  // Your MySQL username
    //password: 'root', 
    database: 'pfe',  // Your database name
    port: 3306  // Default MySQL port, change if your XAMPP uses different
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

// Example query
// connection.query('SELECT * FROM learner', (err, rows, fields) => {
//     if (err) throw err;

//     console.log('Data received from Db:');
//     console.log(rows);
// });

module.exports = connection;
