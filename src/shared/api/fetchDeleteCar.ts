import { instanceToken } from "./base";

export const axiosDeleteCar = async (id: number): Promise<void> => {
    const response = await instanceToken.delete<void>(`Cars/${id}`)
    return response.data;
}