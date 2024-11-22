import { ISignUpForm } from "../interfaces"
import { ERole } from "../enums"
import { instance } from "./base"

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

export const axiosPostSignUp = async (data: ISignUpForm): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/signup', data);
    return response.data;
}