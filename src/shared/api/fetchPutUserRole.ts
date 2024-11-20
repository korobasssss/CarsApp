import { usersStore } from "@/app/store/mobxStore";
import { instanceToken } from "./base";
import axios from "axios";
import { ERole } from "../enums";

const axiosPutUserRole = async (id: string, role: ERole): Promise<void> => {
    const response = await instanceToken.patch<void>(`Users/${id}/role`, role)
    return response.data;
}

export const fetchPutUserRole = async (id: string, role: ERole) => {
    usersStore.setPending()
    try {
        usersStore.setLoading()
        await axiosPutUserRole(id, role)
        
        usersStore.setReady()
    } catch (error: unknown) {
        usersStore.setError()
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