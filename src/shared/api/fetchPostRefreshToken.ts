import { ELocalStorageItems, ERole } from "../enums";
import { instance } from "./base";

interface IResponse {
    accessToken: string;
    userInfo: {role: ERole};
}

export const fetchPostRefreshToken = async (): Promise<IResponse> => {
    const response = await instance.post<IResponse>('Identity/token/refreshing', {}, {
        headers: {
            auth: `Bearer ${localStorage.getItem(ELocalStorageItems.accessToken)}`,
        },
    });
    return response.data;
}