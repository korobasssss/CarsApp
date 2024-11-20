import { ICar, ICarForm } from "@/shared/interfaces"
import { CarPopupFormComponent } from "../../../features/CarPopup"
import { FC, SetStateAction, useState } from "react"
import { fetchDeleteCar, fetchGetCars, fetchPutCar } from "@/shared/api"
import { CPageSize } from "@/shared/constants"

interface ICarEditFormModel {
    car: ICar
    handleClose: React.Dispatch<SetStateAction<boolean>>
}

export const CarEditFormModel: FC<ICarEditFormModel> = (
    {
        car,
        handleClose
    }
) => {
    const {carId, brand, color, image} = car

    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = async (values: ICarForm) => {
        try {
            await fetchPutCar(values, carId)
            handleClose(false)
            await fetchGetCars(1, CPageSize)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorCommon(error.message)
            } else {
                setErrorCommon(error as string)
            }
        }
    }

    const handleDelete = async () => {
        try {
            await fetchDeleteCar(carId)
            handleClose(false)
            await fetchGetCars(1, CPageSize)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorCommon(error.message)
            } else {
                setErrorCommon(error as string)
            }
        }
    }
    return (
        <CarPopupFormComponent
            brandId={brand.carModelId}
            color={color}
            image={image}
            submit={handleSubmit}
            buttonSubmitTitle="Сохранить"
            handleDelete={handleDelete}
            errorCommon={errorCommon}
        />
    )    
}