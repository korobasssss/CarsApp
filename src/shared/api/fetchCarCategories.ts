import { carStore } from "@/app/store/mobxStore";
import { ICarBrand } from "../interfaces";
import { instanceToken } from "./base";

const axiosGetCarCategories = async (): Promise<ICarBrand[]> => {
    const response = await instanceToken.get<ICarBrand[]>('Cars/brandModels')
    return response.data;
}

export const fetchCarCategories = async () => {
    try {
        const result = await axiosGetCarCategories()

        carStore.setCarCategories(result)
    } catch (error: unknown) {
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}