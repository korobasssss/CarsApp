import { authUserStore, carStore } from "@/app/store/mobxStore";
import { ICar } from "../interfaces";
import { instance } from "./base";


const axiosGetCars = async (): Promise<ICar[]> => {
    const response = await instance.get<ICar[]>('Cars', {
        headers: {
          Authorization: `Bearer ${authUserStore.getAuthUserData.accessToken}`,
        },
      })
    return response.data;
}

export const fetchGetCars = async () => {
    carStore.setPending()
    try {
        carStore.setLoading()
        const result = await axiosGetCars()
        if (result) {
            carStore.setCars(result)
            carStore.setReady()
        }
    } catch (error: unknown) {
        carStore.setError();
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}