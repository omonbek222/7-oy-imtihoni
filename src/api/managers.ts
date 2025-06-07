
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://admin-crm.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
