// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://654bf75e5b38a59f28eff89c.mockapi.io/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
