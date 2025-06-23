import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

let requestCount = 0;

// Request interceptor: attach JWT and track loading if needed
API.interceptors.request.use((config) => {
  requestCount++;
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  requestCount--;
  return Promise.reject(error);
});

// Response interceptor: handle errors globally
API.interceptors.response.use((response) => {
  requestCount--;
  return response;
}, (error) => {
  requestCount--;
  const msg = error.response?.data || error.message;
  toast.error(msg);
  return Promise.reject(error);
});

export default API;