import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { fetchLogout, fetchPostRefreshToken } from "../";
import { ELocalStorageItems } from "@/shared/enums";

export const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const instanceToken = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const instanceFile = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
        'Content-Type': 'multipart/form-data; boundary=8-wghwgrw',
    }
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
                    const response = await fetchPostRefreshToken();
                    localStorage.setItem(ELocalStorageItems.accessToken, response.accessToken);
                    localStorage.setItem(ELocalStorageItems.role, response.userInfo.role);
    
                    // authUserStore.setAuthUserData({
                    //     accessToken: response.accessToken,
                    //     role: response.userInfo.role
                    // })
                    return axios(originalRequest);
                } catch (err) {
                    await fetchLogout()
                    return Promise.reject(err);
                }
            }
            await fetchLogout()
            return Promise.reject(error);
        }
    );
};

interceptors(instanceToken);
interceptors(instanceFile);