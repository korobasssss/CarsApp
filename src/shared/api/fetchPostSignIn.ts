import { ISignInForm } from "../interfaces"
import { ERole } from "../enums"
import { instance } from "./base"

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

export const axiosPostSignIn = async (data: ISignInForm): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/login', data);
    return response.data;
}