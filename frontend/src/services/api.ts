import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:8000", // If error occurs use 127.0.0.1:8000
    withCredentials: true,
})