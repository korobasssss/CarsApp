import { carStore } from "@/app/store/mobxStore";
import { ICar } from "../interfaces";
import { instanceToken } from "./base";
import { AxiosResponse } from "axios";
import { ERequestStatus } from "../enums";


const axiosGetCars = async (pageNumber: number, pageSize: number): Promise<AxiosResponse<ICar[]>> => {
    const response = await instanceToken.get<ICar[]>(`Cars?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    return response;
}

export const fetchGetCars = async (pageNumber: number | null, pageSize: number) => {
    if (pageNumber && pageNumber > 1) {
        carStore.setStatus(ERequestStatus.Pending)
    } else {
        carStore.setPending()
    }
    try {
        if (pageNumber && pageNumber > 1) {
            carStore.setStatus(ERequestStatus.Loading)
        } else {
            carStore.setLoading()
        }
        
        const result = await axiosGetCars(pageNumber || 1, pageSize)
        
        if (pageNumber === 1 || !pageNumber) {
            carStore.setCars(null)
            carStore.setCurrentPage(1)
        }
        const {TotalPages} = JSON.parse(result.headers.pagination)
        carStore.setPages(TotalPages)
        carStore.setCars(result.data)

        if (pageNumber && pageNumber > 1) {
            carStore.setStatus(ERequestStatus.Ready)
        } else {
            carStore.setReady()
        }
    } catch (error: unknown) {
        carStore.setError()
        throw new Error(`Произошла ошибка, попробуйте еще раз`)
    }
}