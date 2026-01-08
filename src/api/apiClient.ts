import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

const BASE_URL = "http://localhost:8000/api";

// Create axios instance
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Important for cookies if you're using them
});

// Request interceptor - Attach access token to every request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const { accessToken } = useAuthStore.getState();

        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            console.log(`🔐 Request to ${config.url} with token:`, accessToken.substring(0, 20) + "...");
        } else {
            console.warn(`⚠️ Request to ${config.url} WITHOUT token`);
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle token refresh on 401
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const { setAccessToken, clearAuth } = useAuthStore.getState();

            try {
                // Call refresh token endpoint
                // The refresh token is stored in an HTTP-only cookie and will be sent automatically
                // because we have withCredentials: true
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {}, // Empty body - refresh token comes from cookie
                    { withCredentials: true }
                );

                console.log("Refresh token response:", response.data);
                const newAccessToken = response.data.data?.accessToken || response.data.accessToken;

                if (!newAccessToken) {
                    console.error("No access token in refresh response:", response.data);
                    throw new Error("No access token received from refresh endpoint");
                }

                // Update the access token in store
                setAccessToken(newAccessToken);

                // Update the authorization header
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                // Process queued requests
                processQueue(null, newAccessToken);

                // Retry the original request
                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh failed (either refresh token expired or invalid)
                // Clear auth state and redirect to login
                processQueue(refreshError as AxiosError, null);
                clearAuth();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
