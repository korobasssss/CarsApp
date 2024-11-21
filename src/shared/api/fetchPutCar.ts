import { instanceFile } from "./base";
import { ICarForm } from "../interfaces";

export const axiosPutCar = async (newCar: ICarForm, id: number): Promise<number> => {
    const response = await instanceFile.put<number>(`Cars/${id}?CarModelId=${newCar.model}${newCar.color ? `&Color=${newCar.color}` : ''}`, {
        Image : newCar.image
    })
    return response.data;
}