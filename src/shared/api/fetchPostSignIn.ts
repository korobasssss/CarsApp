import { authUserStore } from "@/app/store/mobxStore"
import { ISignInForm } from "../interfaces"
import { ERole } from "../enums"
import { instance } from "./base"
import axios from "axios";

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

const axiosPostSignIn = async (data: ISignInForm): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/login', data);
    return response.data;
}

export const fetchPostSignIn = async (data: ISignInForm) => {
    authUserStore.setPending();

    try {
        authUserStore.setLoading();
        const response = await axiosPostSignIn(data);
        
        authUserStore.setAuthUserData(response.accessToken, response.userInfo.role);
        authUserStore.setReady();
    } catch (error: unknown) {
        authUserStore.setError()
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data[0])
        } else {
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }
}