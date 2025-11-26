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








// helpers/Sql_connection.js
const mysql = require('mysql');

const dbConfig = {
  host: '7oxpc7.h.filess.io',
  user: 'learning_recenttin',
  password: '2db45f888a04963ff3d2acfeee5d351bebad7f24',
  database: 'learning_recenttin',
  port: 61002
};

// Create pool with minimal connections for free hosting
const pool = mysql.createPool({
  connectionLimit: 2, // Very small for free hosting
  ...dbConfig,
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 10000,
  charset: 'utf8mb4'
});

// Test connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Initial database connection failed:', err.code);
    console.log('⚠️  Server will start but database operations may fail');
    return;
  }
  
  console.log('✅ Database connected successfully');
  connection.release(); // Release immediately after test
});

// Handle pool errors gracefully
pool.on('error', (err) => {
  console.error('🔄 Pool error:', err.code);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed.');
  } else if (err.code === 'ER_CON_COUNT_ERROR') {
    console.log('Database has too many connections.');
  } else if (err.code === 'ECONNREFUSED') {
    console.log('Database connection was refused.');
  }
});

// Handle connection acquisition
pool.on('acquire', (connection) => {
  console.log('🔗 Connection %d acquired', connection.threadId);
});

// Handle connection release
pool.on('release', (connection) => {
  console.log('🔓 Connection %d released', connection.threadId);
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
