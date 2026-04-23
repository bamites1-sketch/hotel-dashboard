import axios from 'axios';
import { sleep } from './utils';
import { mockUsers, revenueData } from './mockData';

// Axios instance — swap baseURL for real API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.example.com',
  timeout: 10000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Mock API functions (replace with real calls)
export const authApi = {
  login: async (email: string, _password: string) => {
    await sleep(800);
    return { token: 'mock-jwt-token', user: { id: '1', name: 'Alex Morgan', email, role: 'admin', plan: 'pro', avatar: 'https://i.pravatar.cc/80?img=8', createdAt: '2024-01-15' } };
  },
  register: async (name: string, email: string, _password: string) => {
    await sleep(1000);
    return { token: 'mock-jwt-token', user: { id: '2', name, email, role: 'user', plan: 'free', createdAt: new Date().toISOString() } };
  },
};

export const dashboardApi = {
  getStats: async () => {
    await sleep(600);
    return [
      { label: 'Total Revenue', value: '$1.24M', change: 12.5, icon: 'DollarSign' },
      { label: 'Active Users', value: '52,400', change: 8.2, icon: 'Users' },
      { label: 'Conversion Rate', value: '3.84%', change: -1.1, icon: 'TrendingUp' },
      { label: 'Avg. Session', value: '4m 32s', change: 5.7, icon: 'Clock' },
    ];
  },
  getRevenue: async () => { await sleep(400); return revenueData; },
  getUsers: async () => { await sleep(500); return mockUsers; },
};

export default api;
