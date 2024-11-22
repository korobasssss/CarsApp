import { ICar } from "../interfaces";
import { instanceToken } from "./base";
import { AxiosResponse } from "axios";


export const axiosGetCars = async (pageNumber: number, pageSize: number): Promise<AxiosResponse<ICar[]>> => {
    const response = await instanceToken.get<ICar[]>(`Cars?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    return response;
}