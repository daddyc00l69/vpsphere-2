import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base URL configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.devtushar.uk';

// Create the core axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // We execute this primarily in browsers, so we check for window
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('vpsphere_token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Extract CSRF token from cookies
            const getCsrf = () => {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.startsWith('csrf_token=')) {
                        return cookie.substring('csrf_token='.length, cookie.length);
                    }
                }
                return '';
            };

            let csrfToken = getCsrf();

            // If missing and it's a mutative method, fetch it from /health first
            const method = config.method?.toLowerCase();
            if (!csrfToken && method && ['post', 'put', 'patch', 'delete'].includes(method)) {
                try {
                    await axios.get(`${API_BASE_URL}/health`, { withCredentials: true });
                    csrfToken = getCsrf();
                } catch (e) {
                    console.error('Failed to pre-fetch CSRF token', e);
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

// Response Interceptor: Global error unwrapping (handle 401s, 403s, etc seamlessly)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('vpsphere_token');
                // We'll rely on our React context to push navigation based on the token disappearance,
                // or trigger a global custom event
                window.dispatchEvent(new CustomEvent('vpsphere_unauthorized'));
            }
        }

        // Normalize errors so UI components don't have to parse deep axios structures
        const customError = new Error(
            error.response?.data?.error || error.response?.data?.message || error.message || 'An unknown network error occurred'
        );
        (customError as any).status = error.response?.status;

        return Promise.reject(customError);
    }
);

export default apiClient;
