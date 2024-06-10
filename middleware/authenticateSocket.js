const jwt = require('jsonwebtoken')

// Middleware to authenticate socket connections
const authenticateSocket = (socket, next) => {
    console.log("socket: ", socket.handshake.auth);
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify the token
      // Set the decoded user information on the socket object for further use if needed
      socket.user = decoded;
      next();
    } catch (error) {
      return next(new Error('Authentication error: Invalid token'));
    }
  };

module.exports = authenticateSocket