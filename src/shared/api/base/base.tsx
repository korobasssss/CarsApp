import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { fetchLogout, fetchPostRefreshToken } from "../";
import { ELocalStorageItems } from "@/shared/enums";

export const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const instanceToken = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const instanceFile = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'multipart/form-data; boundary=8-wghwgrw'
    },
    withCredentials: true
});

const interceptors = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem(ELocalStorageItems.accessToken);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
    
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const token = localStorage.getItem(ELocalStorageItems.accessToken)

                    if (token) {
                        const response = await fetchPostRefreshToken(token);

                        localStorage.setItem(ELocalStorageItems.accessToken, response.accessToken);
                        localStorage.setItem(ELocalStorageItems.role, response.userInfo.role);

                        originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`;
                    } else {
                        await fetchLogout()
                    }
                    return axios(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
};

interceptors(instanceToken);
interceptors(instanceFile);