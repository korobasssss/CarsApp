import { instanceToken } from "./base";


const axiosDeleteCar = async (id: number): Promise<void> => {
    const response = await instanceToken.delete<void>(`Cars/${id}`)
    return response.data;
}

export const fetchDeleteCar = async (id: number) => {
    try {
        await axiosDeleteCar(id)
        
    } catch (error: unknown) {
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}