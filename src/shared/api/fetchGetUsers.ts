import { usersStore } from "@/app/store/mobxStore";
import { IUser } from "../interfaces";
import { instanceToken } from "./base";


const axiosGetUsers = async (): Promise<IUser[]> => {
    const response = await instanceToken.get<IUser[]>('Users')
    return response.data;
}

export const fetchGetUsers = async () => {
    usersStore.setPending()
    try {
        usersStore.setLoading()
        const result = await axiosGetUsers()
        if (result) {
            usersStore.setUsers(result)
            usersStore.setReady()
        }
    } catch (error: unknown) {
        usersStore.setError();
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}