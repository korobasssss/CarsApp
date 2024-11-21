import { instanceToken } from "./base";
import axios from "axios";
import { ERole } from "../enums";
import { usersStore } from "@/app/store/mobxStore";

const axiosPutUserRole = async (id: string, role: ERole): Promise<void> => {
    const response = await instanceToken.patch<void>(`Users/${id}/role`, role)
    return response.data;
}

export const fetchPutUserRole = async (id: string, role: ERole) => {
    try {
        await axiosPutUserRole(id, role)

        usersStore.setUserRole(id, role)
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