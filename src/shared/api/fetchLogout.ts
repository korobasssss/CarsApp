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

        authUserStore.setReady()
    } catch (error: unknown) {
        authUserStore.setError()
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}