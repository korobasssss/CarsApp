import axios from "axios";

export const instance = axios.create({
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