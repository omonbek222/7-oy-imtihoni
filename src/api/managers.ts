// src/api.ts
import axios from 'axios';

// Proxy ishlatiladi, shuning uchun 'https://admin-crm.onrender.com' emas, faqat '/api'
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
