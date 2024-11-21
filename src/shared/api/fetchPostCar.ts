import { instanceFile } from "./base";
import { ICarForm } from "../interfaces";

export const axiosPostCar = async (newCar: ICarForm): Promise<number> => {
    const response = await instanceFile.post<number>(`Cars?CarModelId=${newCar.model}${newCar.color ? `&Color=${newCar.color}` : ''}`, {
        Image : newCar.image
    })
    return response.data;
}