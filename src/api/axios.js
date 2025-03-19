import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api'

const api = axios.create({
    baseURL:apiUrl,
    headers:{
        'Accept': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
} ,
    (error) => {
    return Promise.reject(error);
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;