import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export default api; 