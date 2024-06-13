const mysql = require('mysql');

// Create a pool
const connection = mysql.createPool({
    connectionLimit: 10,  // Maximum number of connections to create at once
    host: 'sql8.freesqldatabase.com',
    user: 'sql8713364',
    password: '9EDLUi6WXJ',
    database: 'sql8713364',
    port: 3306
});

// Get a promise wrapped instance of the pool
const promisePool = connection.promise();

// Handle connection errors
connection.on('connection', (connection) => {
    console.log('Connected to the database with threadId:', connection.threadId);

    connection.on('error', (err) => {
        console.error('MySQL connection error:', err.code);  // e.g., 'PROTOCOL_CONNECTION_LOST'
    });

    connection.on('close', (err) => {
        console.error('MySQL connection closed:', err);
    });
});

pool.on('acquire', (connection) => {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = promisePool;
