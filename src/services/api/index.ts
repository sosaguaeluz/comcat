import axios from 'axios';

let token = localStorage.getItem('token');

export const api = axios.create({
    baseURL: 'https://comcat-backend-kqb8t.ondigitalocean.app/',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const ibge = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});
  