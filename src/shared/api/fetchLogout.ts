import { authUserStore } from "@/app/store/mobxStore"
import { instance } from "./base"

const axiosPostLogout = async (): Promise<void> => {
    const response = await instance.post<void>('Identity/logout')
    return response.data;
}

export const fetchLogout = async () => {
    authUserStore.setPending()
    
    try {
        authUserStore.setLoading()
        await axiosPostLogout()
        authUserStore.setReady()
    } catch (error: unknown) {
        authUserStore.setError()
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}