import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'


// Function to refresh the access token
async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('refreshtoken');
    console.log("refreshToken", refreshToken);
    if (!refreshToken) throw new Error('Refresh token not found');
    
    // Call your backend to refresh the token
    const refreshedTokenResponse = await axios.post(
      'http://localhost:5000/api/refreshToken',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );
    
    const newAccessToken = refreshedTokenResponse.data.accessToken;
    
    // Update the access token in local storage
    localStorage.setItem('accesstoken', newAccessToken);
    console.log("new Access Token generated from socketinterceptor");
    
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}
const socket = io('http://localhost:5000', {
  auth: {
    token: localStorage.getItem('accesstoken')
  }
});

// Intercept socket connection and authenticate
socket.on('connection', async () => {
  console.log("in connection");
  const accessToken = localStorage.getItem('accesstoken');
  if (accessToken) {
    // Check if the access token is expired or not
    const decoded = jwtDecode(accessToken);

    if (decoded.exp < Date.now() / 1000) {
      try {
        const newAccessToken = await refreshToken();

        // Authenticate socket connection with new access token
        socket.handshake.auth = { token: newAccessToken };
        socket.connect();
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle error or clear tokens as needed
      }
    } else {
      // Authenticate socket connection with existing access token
      socket.handshake.auth = { token: accessToken };
      socket.connect();
    }
  }
});

export default socket;
