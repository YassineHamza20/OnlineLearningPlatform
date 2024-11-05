// const mysql = require('mysql');

// const dbConfig = {
//   host: '9antra.tn',
//   user: 'kantralang',
//   password: 'kantralangp@ssword',
//   database: 'kantralang',
//   port: 3306
// };

// let connection;

// function handleDisconnect() {
//   connection = mysql.createConnection(dbConfig);

//   connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       setTimeout(handleDisconnect, 20 00); // Reconnect after 2 seconds
//     } else {
//       console.log('Connected to the database as id', connection.threadId);
//     }
//   });

//   connection.on('error', (err) => {
//     console.error('Database error:', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       handleDisconnect(); // Reconnect if connection is lost
//     } else {
//       throw err;
//     }
//   });

//   // Keep the connection alive by sending a query every 10 minutes
//   setInterval(() => {
//     connection.query('SELECT 1', (err) => {
//       if (err) {
//         console.error('Error keeping the connection alive:', err);
//       }
//     });
//   }, 60000 * 10); // 10 minutes
// }

// handleDisconnect();

// module.exports = connection;

const mysql = require('mysql');

const dbConfig = {
  host: '9antra.tn',
  user: 'kantralang',
  password: 'kantralangp@ssword',
  database: 'kantralang',
  port: 3306
};

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust based on your needs
  ...dbConfig
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection from pool:', err);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);

  // Use the connection for queries
  // Remember to release the connection back to the pool when done
  connection.release();
});

module.exports = pool;





















// const { createClient } = require('@supabase/supabase-js');

// // Supabase project URL and API key
// const SUPABASE_URL = 'https://uaqclothykwxjbnhsumc.supabase.co';
// const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcWNsb3RoeWt3eGpibmhzdW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMTcwNzYsImV4cCI6MjAzNjc5MzA3Nn0.vvy8x0aJiNRSIfLhh0B8t_WXk1m-i0sMOqJiMxfeAkI';

// // Create a single supabase client for interacting with your database
// const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// // const fetchLearners = async () => {
// //     let { data, error } = await supabase
// //         .from('learner')
// //         .select('*');

// //     if (error) {
// //         console.error('Error fetching data:', error);
// //         return;
// //     }

// //     console.log('Data received from Supabase:', data);
// // };

// // fetchLearners();

// module.exports = supabase;
