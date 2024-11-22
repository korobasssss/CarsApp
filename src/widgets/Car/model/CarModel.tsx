import { ICar } from "@/shared/interfaces"
import { FC, SetStateAction, useState } from "react"
import { Car } from "../ui/Car"
import { Popup } from "ui-kit-cars/main"
import { CarPopupInformationModel } from "@/features/CarPopupInformation"

interface ICarModel {
    car: ICar
    isAdmin: boolean
    setIsEditOpen: React.Dispatch<SetStateAction<boolean>>
    setCurrentCar: React.Dispatch<SetStateAction<ICar | null>>
}

export const CarModel: FC<ICarModel> = (
    {
        car,
        isAdmin,
        setIsEditOpen,
        setCurrentCar
    }
) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    const setOpenEditor = () => {
        setCurrentCar(car)
        setIsEditOpen(true)
    }

    return (
        <>
            <Car 
                car={car}
                setIsInfoOpen={setIsInfoOpen}
                setIsEditOpen={setOpenEditor}
                isAdmin={isAdmin}
            />
            <Popup
                title="Информация"
                isModalOpen={isInfoOpen}
                handleClose={setIsInfoOpen}
                destroyOnClose
            >
                <CarPopupInformationModel car={car}/>
            </Popup>
        </>
    )
}