import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


const axiosInstance = axios.create({
  baseURL: 'https://onlinelearningplatform-d9w2.onrender.com',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accesstoken');

    if (accessToken) {
      // Check if the access token is expired or not
      const decoded = jwtDecode(accessToken)

      if (decoded.exp < Date.now() / 1000) {
        try {
          // Call your backend to refresh the token
          const refreshedTokenResponse = await axios.post(
            'https://onlinelearningplatform-d9w2.onrender.com/api/refreshToken',
            {},
            { 
              headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshtoken')}`
            } 
          }
          );

          const newAccessToken = refreshedTokenResponse.data.accessToken;

          // Update the access token in local storage
          console.log("new Acces Token Generated");
          localStorage.setItem('accesstoken', newAccessToken);

          // Assign the new access token to the request header
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch (error) {
          // Handle error in refreshing token
          console.error('Error refreshing token:', error);
          // clear tokens
          localStorage.clear();
        }
      } else {
        // Assign the access token to the request header
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
