import axios from 'axios';

const instance = axios.create({
    baseURL: "https://app.sosaguaeluz.org"
})

instance.interceptors.request.use(function (config: any) {
    const token = window.localStorage.getItem('token');

    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    return config;
})

export const ibge = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});
  

export const api = instance;