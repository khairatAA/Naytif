// contains the baseURL of the backend

import axios from "axios"
import React from 'react';

const baseURL = process.env.NODE_ENV === "production" ? "https://atcocoder.pythonanywhere.com" : "http://127.0.0.1:5000";

const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.request.use(config => {
    const user_token = localStorage.getItem('user_token');
    if (user_token) {
        config.headers.Authorization = `Bearer ${user_token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
