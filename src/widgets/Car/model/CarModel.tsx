import { ICar } from "@/shared/interfaces"
import { FC, useState } from "react"
import { Car } from "../ui/Car"
import { Popup } from "ui-kit-cars/main"
import { CarPopupInformationModel } from "@/features/CarPopupInformation"
import { CarEditFormModel } from "@/widgets/CarEditForm"

interface ICarModel {
    car: ICar
}

export const CarModel: FC<ICarModel> = (
    {
        car
    }
) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    return (
        <>
            <Car 
                car={car}
                setIsInfoOpen={setIsInfoOpen}
                setIsEditOpen={setIsEditOpen}
            />
            <Popup
                title="Информация"
                isModalOpen={isInfoOpen}
                handleClose={setIsInfoOpen}
            >
                <CarPopupInformationModel car={car}/>
            </Popup>
            <Popup
                title={`Редактировать тачку ${car.brand.brand} ${car.brand.model}`}
                isModalOpen={isEditOpen}
                handleClose={setIsEditOpen}
                isForceRender
            >
                {isEditOpen && (
                    <CarEditFormModel 
                        car={car}
                        handleClose={setIsEditOpen}
                    />
                )}
            </Popup>
        </>
    )
}