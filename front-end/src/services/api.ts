import axios, {
    AxiosError,
    type AxiosRequestConfig,
} from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

type RetryRequestConfig = AxiosRequestConfig & {
    _retry?: boolean;
};

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;

        const isUnauthorized = error.response?.status === 401;

        const isRefreshRequest = originalRequest.url?.includes("/users/refresh/");
        const isLoginRequest = originalRequest.url?.includes("/users/login/");
        const isRegisterRequest = originalRequest.url?.includes("/users/register/");

        if (
            isUnauthorized &&
            !originalRequest._retry &&
            !isRefreshRequest &&
            !isLoginRequest &&
            !isRegisterRequest
        ) {
            originalRequest._retry = true;

            try {
                await api.post("/users/refresh/");

                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);