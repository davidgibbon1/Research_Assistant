import axios from 'axios';

// Determine if we're running in Electron
const isElectron = window.navigator.userAgent.toLowerCase().indexOf('electron') > -1;

// Set the base URL for API requests
const API_BASE_URL = isElectron 
  ? 'http://localhost:5000/api'
  : process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to handle authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export common API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const papersAPI = {
  getAllPapers: () => api.get('/papers'),
  getPaperById: (id) => api.get(`/papers/${id}`),
  uploadPaper: (formData) => api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  searchPapers: (query) => api.get('/search', { params: { q: query } }),
};

export const citationsAPI = {
  getCitations: (paperId) => api.get(`/citations/${paperId}`),
  generateCitation: (paperId, style) => api.post('/citations/generate', { paperId, style }),
};

export const chatAPI = {
  sendMessage: (message, history = []) => api.post('/chat', { message, history }),
  getChatHistory: () => api.get('/chat/history'),
};

export default api; 