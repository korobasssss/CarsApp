import { ICarBrand } from "../interfaces";
import { instanceToken } from "./base";

export const axiosGetCarCategories = async (): Promise<ICarBrand[]> => {
    const response = await instanceToken.get<ICarBrand[]>('Cars/brandModels')
    return response.data;
}