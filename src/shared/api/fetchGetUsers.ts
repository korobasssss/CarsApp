import { IUser } from "../interfaces";
import { instanceToken } from "./base";

export const axiosGetUsers = async (): Promise<IUser[]> => {
    const response = await instanceToken.get<IUser[]>('Users')
    return response.data;
}