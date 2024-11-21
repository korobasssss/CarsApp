import { instanceToken } from "./base";
import { IUserFormData } from "../interfaces";

export const axiosPutUser = async (newData: IUserFormData, id: string): Promise<void> => {
    const response = await instanceToken.put<void>(`Users/${id}`, newData)
    return response.data;
}