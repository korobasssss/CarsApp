import { usersStore } from "@/app/store/mobxStore";
import { instanceToken } from "./base";
import { IUserFormData } from "../interfaces";
import axios from "axios";

const axiosPutUser = async (newData: IUserFormData, id: string): Promise<number> => {
    const response = await instanceToken.put<number>(`Users/${id}`, newData)
    return response.data;
}

export const fetchPutUser = async (newData: IUserFormData, id: string) => {
    usersStore.setPending()
    try {
        usersStore.setLoading()
        const result = await axiosPutUser(newData, id)
        if (result) {
            usersStore.setReady()
        }
    } catch (error: unknown) {
        usersStore.setError();
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