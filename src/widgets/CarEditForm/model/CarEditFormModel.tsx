import { ICar } from "@/shared/interfaces"
import { CarPopupFormComponent } from "../../../features/CarPopup"
import { FC, SetStateAction, useState } from "react"
import { fetchDeleteCar, fetchGetCars, fetchPutCar } from "@/shared/api"

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
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = async (brandId: number, color?: string, image?: File) => {
        if (brandId) {
            try {
                await fetchPutCar({
                    model: brandId,
                    color,
                    image
                }, car.carId)
                handleClose(false)
                await fetchGetCars()
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorCommon(error.message)
                } else {
                    setErrorCommon(error as string)
                }
            }
        } else {
            setErrorCommon('Выберите модель тачки ')
        }
    }

    const handleDelete = async () => {
        try {
            await fetchDeleteCar(car.carId)
            handleClose(false)
            await fetchGetCars()
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
            brandId={car.brand.carModelId}
            color={car.color}
            image={car.image}
            submit={handleSubmit}
            buttonSubmitTitle="Сохранить"
            handleDelete={handleDelete}
            errorCommon={errorCommon}
        />
    )    
}