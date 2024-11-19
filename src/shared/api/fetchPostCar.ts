import { authUserStore, carStore } from "@/app/store/mobxStore";
import { instanceFile } from "./base";
import { ICarForm } from "../interfaces";
import axios from "axios";

const axiosPostCar = async (newCar: ICarForm): Promise<number> => {
    const response = await instanceFile.post<number>(`Cars?CarModelId=${newCar.model}&Color=${newCar.color}`, {
        Image : newCar.image
    }, {
        headers: {
          Authorization: `Bearer ${authUserStore.getAuthUserData.accessToken}`,
        },
      })
    return response.data;
}

export const fetchPostCar = async (newCar: ICarForm) => {
    carStore.setPending()
    try {
        carStore.setLoading()
        const result = await axiosPostCar(newCar)
        if (result) {
            carStore.setReady()
        }
    } catch (error: unknown) {
        carStore.setError();
        if (axios.isAxiosError(error)) {
            switch (error.status) {
                case 400: {
                    throw new Error(error.message)
                }
            }
        } else {
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }
}