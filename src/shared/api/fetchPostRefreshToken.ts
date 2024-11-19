import { ERole } from "../enums";
import { instanceToken } from "./base";

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

export const fetchPostRefreshToken = async (): Promise<IResponse> => {
    const response = await instanceToken.post<IResponse>('Identity/token/refreshing');
    return response.data;
}