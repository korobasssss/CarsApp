import { authUserStore } from "@/app/store/mobxStore"
import { IAuthUserData, ISignInForm } from "../interfaces"
import { ELocalStorageItems } from "../enums"
import { instance } from "./base"
import axios from "axios";

interface IResponse {
    accessToken: string;
    userInfo: IAuthUserData;
}

const axiosPostSignIn = async (data: ISignInForm): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/login', data);
    return response.data;
}

export const fetchPostSignIn = async (data: ISignInForm) => {
    authUserStore.setPending();
    authUserStore.setLoading();

    try {
        const response = await axiosPostSignIn(data);
        if (
            response && 
            typeof response.accessToken === 'string' &&
            typeof response.userInfo === 'object' && 
            response.userInfo &&
            typeof response.userInfo.role === 'string'
        ) {
            authUserStore.setReady();
            
            localStorage.setItem(ELocalStorageItems.accessToken, response.accessToken);
            localStorage.setItem(ELocalStorageItems.role, response.userInfo.role);
        } else {
            throw new Error('Неверный формат ответа');
        }
    } catch (error) {
        authUserStore.setError();
        if (axios.isAxiosError(error)) {
            switch (error.status) {
                case 401: {
                    throw new Error(`Неверный логин или пароль`)
                }
            }
        } else {
            throw new Error(`Произошла ошибка, попробуйте еще раз`, )
        }
    }
}