import { authUserStore, carStore } from "@/app/store/mobxStore";
import { ICarBrand } from "../interfaces";
import { instance } from "./base";

const axiosGetCarCategories = async (): Promise<ICarBrand[]> => {
    const response = await instance.get<ICarBrand[]>('Cars/brandModels', {
        headers: {
          Authorization: `Bearer ${authUserStore.getAuthUserData.accessToken}`,
        },
      })
    return response.data;
}

export const fetchCarCategories = async () => {
    carStore.setPending()
    try {
        carStore.setLoading()
        const result = await axiosGetCarCategories()
        if (result) {
            carStore.setCarCategories(result)
            carStore.setReady()
        }
    } catch (error: unknown) {
        carStore.setError();
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}