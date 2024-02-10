// contains the baseURL of the backend

import axios from "axios"

const api = axios.create({
    baseURL: `http://127.0.0.1:5000`
})

api.interceptors.request.use(config => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
