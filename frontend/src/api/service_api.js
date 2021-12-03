import axios from 'axios';


export const authServiceAPI = axios.create({
    baseURL: 'http://localhost:8080'
})

export const commonServiceAPI = axios.create({
    baseURL: 'http://localhost:8080'
})

export const searchSuggestionServiceAPI = axios.create({
    baseURL: 'http://localhost:8080'
})
