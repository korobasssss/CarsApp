import { usersStore } from "@/app/store/mobxStore";
import { instanceToken } from "./base";
import { IUserFormData } from "../interfaces";
import axios from "axios";

const axiosPutUser = async (newData: IUserFormData, id: string): Promise<void> => {
    const response = await instanceToken.put<void>(`Users/${id}`, newData)
    return response.data;
}

export const fetchPutUser = async (newData: IUserFormData, id: string) => {
    try {
        await axiosPutUser(newData, id)
        
        usersStore.setUser(newData, id)
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            switch (error.status) {
                case 400: {
                    throw new Error(error.response?.data.title)
                }
            }
        } else {
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }
}