import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.devtushar.uk',
    withCredentials: true,
});

// Request interceptor for API calls
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            // Extract CSRF token from cookies
            const cookies = document.cookie.split(';');
            let csrfToken = '';
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('csrf_token=')) {
                    csrfToken = cookie.substring('csrf_token='.length, cookie.length);
                    break;
                }
            }
            if (csrfToken && config.headers) {
                config.headers['x-csrf-token'] = csrfToken;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('vpsphere_unauthorized'));
            }
        }
        return Promise.reject(error);
    }
);

export default api;
