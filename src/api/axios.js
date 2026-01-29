import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || '';
// Handle cases where the URL might be a comma-separated list
const baseURL = rawBaseURL.split(',')[0].trim() || 'http://localhost:8000';

const api = axios.create({
  baseURL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
