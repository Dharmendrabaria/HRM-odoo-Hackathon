import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Reverting to direct URL for stability
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
