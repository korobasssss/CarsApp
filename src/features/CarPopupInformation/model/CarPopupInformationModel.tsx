import { ICar } from "@/shared/interfaces"
import { CarPopupInformationComponent } from "../ui/CarPopupInformationComponent"
import { FC } from "react"

interface ICarPopupInformationModel {
    car: ICar
}

export const CarPopupInformationModel: FC<ICarPopupInformationModel> = (
    {
        car
    }
) => {
    return (
        <CarPopupInformationComponent car={car}/>
    )
}