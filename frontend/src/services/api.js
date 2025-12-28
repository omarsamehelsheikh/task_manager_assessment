import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    logout: () => localStorage.removeItem('token'),
};

export const taskService = {
    // Old: getAll: () => api.get('/tasks'),
// New:
getAll: (page = 1) => api.get(`/tasks?page=${page}`),
    create: (data) => api.post('/tasks', data),
    updateStatus: (id, status) => api.put(`/tasks/${id}`, { status }),
    delete: (id) => api.delete(`/tasks/${id}`),
};

export default api;