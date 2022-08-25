import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.112:3333',
    // baseURL: 'https://api.moncashback.com.br',
});

export { api };
