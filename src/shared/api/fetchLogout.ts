import { instanceToken } from "./base"

export const axiosPostLogout = async (): Promise<void> => {
    const response = await instanceToken.post<void>('Identity/logout')
    return response.data;
}