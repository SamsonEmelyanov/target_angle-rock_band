import axios from 'axios';

export const commonServiceAPI = axios.create({
    baseURL: 'http://localhost:8080'
})


