const mysql = require('mysql');

const dbConfig = {
  host: 'sql8.freesqldatabase.com',
  user: 'sql8717785',
  password: 'NFViUDgfbh',
  database: 'sql8717785',
  port: 3306,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
    } else {
      console.log('Connected to the database as id', connection.threadId);
    }
  });

  connection.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err;
    }
  });

  // Keep the connection alive by sending a query every 30 seconds
  setInterval(() => {
    connection.query('SELECT 1', (err) => {
      if (err) {
        console.error('Error keeping the connection alive:', err);
      }
    });
  }, 60000 * 5);
}

handleDisconnect();

module.exports = connection;
