import { authUserStore, usersStore } from "@/app/store/mobxStore";
import { IUser } from "../interfaces";
import { instance } from "./base";


const axiosGetUsers = async (): Promise<IUser[]> => {
    const response = await instance.get<IUser[]>('Users', {
        headers: {
          Authorization: `Bearer ${authUserStore.getAuthUserData.accessToken}`,
        },
      })
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