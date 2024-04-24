import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:8888/api/app', // Replace with your actual backend server URL
    headers: {
        'Content-Type': 'application/json'
    }
});
