// services/api.js
import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "https://sat7.faulio.com/api/v1/",
});

// Interceptor for adding the authentication token to the headers
api.interceptors.request.use((config) => {
  let authToken = '' as any; 
  if (process.client) {
    authToken = localStorage.getItem("authToken") 
  }
  
  if (authToken) {
    // config.headers.Authorization = `Bearer ${authToken}`;
    config.headers.Authorization = `${authToken}`;
  }
  return config;
});

// Interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle Axios errors here
    const router = useRouter();
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error(
        "Response Error:",
        error.response.status,
        error.response.data
      );
      if (error.response.status == 401) {
        router.push('/signin')
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Error:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
