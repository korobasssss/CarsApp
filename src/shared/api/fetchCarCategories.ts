import { carStore } from "@/app/store/mobxStore";
import { ICarBrand } from "../interfaces";
import { instanceToken } from "./base";

const axiosGetCarCategories = async (): Promise<ICarBrand[]> => {
    const response = await instanceToken.get<ICarBrand[]>('Cars/brandModels')
    return response.data;
}

export const fetchCarCategories = async () => {
    carStore.setPending()
    try {
        carStore.setLoading()
        const result = await axiosGetCarCategories()

        carStore.setCarCategories(result)
        carStore.setReady()
    } catch (error: unknown) {
        carStore.setError();
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}