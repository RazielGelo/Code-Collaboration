import axios from 'axios';

export const instance = axios.create(
    {
        baseURL: '/api',
        // sets the network timeout
        timeout: 1000
    }
);