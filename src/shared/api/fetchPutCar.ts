import { authUserStore, carStore } from "@/app/store/mobxStore";
import { instanceFile } from "./base";
import { ICarForm } from "../interfaces";
import axios from "axios";

const axiosPutCar = async (newCar: ICarForm, id: number): Promise<number> => {
    const response = await instanceFile.put<number>(`Cars/${id}?CarModelId=${newCar.model}${newCar.color ? `&Color=${newCar.color}` : ''}`, {
        Image : newCar.image
    }, {
        headers: {
          Authorization: `Bearer ${authUserStore.getAuthUserData.accessToken}`,
        },
      })
    return response.data;
}

export const fetchPutCar = async (newCar: ICarForm, id: number) => {
    carStore.setPending()
    try {
        carStore.setLoading()
        const result = await axiosPutCar(newCar, id)
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