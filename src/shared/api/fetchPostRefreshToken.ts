import { ERole } from "../enums";
import { instance } from "./base";

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

export const fetchPostRefreshToken = async (token: string): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/token/refreshing', {}, {
        headers: {
            auth: `Bearer ${token}`,
        },
    });
    return response.data;
}