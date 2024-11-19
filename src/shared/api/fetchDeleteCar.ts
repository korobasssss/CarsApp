import { authUserStore, carStore } from "@/app/store/mobxStore";
import { instance } from "./base";


const axiosDeleteCar = async (id: number): Promise<void> => {
    const response = await instance.delete<void>(`Cars/${id}`, {
        headers: {
          Authorization: `Bearer ${authUserStore.getAuthUserData.accessToken}`,
        },
      })
    return response.data;
}

export const fetchDeleteCar = async (id: number) => {
    carStore.setPending()
    try {
        carStore.setLoading()
        await axiosDeleteCar(id)
        carStore.setReady()
    } catch (error: unknown) {
        carStore.setError();
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}