import { authUserStore } from "@/app/store/mobxStore"
import { ISignUpForm } from "../interfaces"
import { ERole } from "../enums"
import { instance } from "./base"
import axios from "axios";

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

const axiosPostSignUp = async (data: ISignUpForm): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/signup', data);
    return response.data;
}

export const fetchPostSignUp = async (data: ISignUpForm) => {
    authUserStore.setPending();

    try {
        authUserStore.setLoading();
        const response = await axiosPostSignUp(data);
        if (
            response && 
            typeof response.accessToken === 'string' &&
            typeof response.userInfo === 'object' && 
            response.userInfo &&
            typeof response.userInfo.role === 'string'
        ) {
            authUserStore.setReady();
            authUserStore.setAuthUserData(response.userInfo.role);
            
            
        } else {
            throw new Error('Неверный формат ответа');
        }
    } catch (error: unknown) {
        authUserStore.setError();
        if (axios.isAxiosError(error)) {
            if (Array.isArray(error.response?.data)) {
                throw new Error(error.response?.data[0])
            } else {
                throw new Error(error.response?.data.title)
            }
            
        } else {
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }
}