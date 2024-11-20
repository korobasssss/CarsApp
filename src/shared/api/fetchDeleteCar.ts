import { carStore } from "@/app/store/mobxStore";
import { instanceToken } from "./base";


const axiosDeleteCar = async (id: number): Promise<void> => {
    const response = await instanceToken.delete<void>(`Cars/${id}`)
    return response.data;
}

export const fetchDeleteCar = async (id: number) => {
    carStore.setPending()
    try {
        carStore.setLoading()
        await axiosDeleteCar(id)
        
        carStore.setReady()
    } catch (error: unknown) {
        carStore.setError()
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}