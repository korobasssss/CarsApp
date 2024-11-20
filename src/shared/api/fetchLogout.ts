import { authUserStore, carStore, usersStore } from "@/app/store/mobxStore"
import { instanceToken } from "./base"

const axiosPostLogout = async (): Promise<void> => {
    const response = await instanceToken.post<void>('Identity/logout')
    return response.data;
}

export const fetchLogout = async () => {
    authUserStore.setPending()
    
    try {
        authUserStore.setLoading()
        await axiosPostLogout()

        authUserStore.setLogout()
        carStore.setReady()
        usersStore.setReady()

        carStore.setCars(null)
        usersStore.setUsers(null)

        authUserStore.setReady()
    } catch (error: unknown) {
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}