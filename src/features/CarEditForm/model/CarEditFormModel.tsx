import { ICar } from "@/shared/interfaces"
import { CarPopupFormComponent } from "../../../entities/CarPopup"
import { FC, useState } from "react"

interface ICarEditFormModel {
    car: ICar
}

export const CarEditFormModel: FC<ICarEditFormModel> = (
    {
        car
    }
) => {
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = (brandId: number, color?: string, image?: File) => {
        console.log(brandId, color, image)
    }

    const handleDelete = () => {

    }

    return (
        <CarPopupFormComponent
            brandId={car.brand.carModelId}
            color={car.color}
            image={car.image}
            submit={handleSubmit}
            buttonSubmitTitle="Создать"
            handleDelete={handleDelete}
            errorCommon={errorCommon}
        />
    )    
}