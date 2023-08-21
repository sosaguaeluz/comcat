import axios from 'axios';
import { logout } from './logout';

const instance = axios.create({
    baseURL: process.env.API_URL || "https://app.sosaguaeluz.org"
})

instance.interceptors.request.use(function (config) {
    const token = window.localStorage.getItem('token');

    config.headers = config.headers ?? {};

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

instance.interceptors.response.use(function (value) {
    return value;
}, async (error) => {
    if (error?.response?.status === 401) {
        logout();
    }
    throw error;
})

export const ibge = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});
  

export const api = instance;