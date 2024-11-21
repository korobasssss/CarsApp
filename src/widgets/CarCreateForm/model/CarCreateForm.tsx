import { CarPopupFormComponent } from "@/features/CarPopup"
import { fetchGetCars, fetchPostCar } from "@/shared/api"
import { CPageSize } from "@/shared/constants"
import { ICarForm } from "@/shared/interfaces"
import { FC, SetStateAction, useState } from "react"

interface ICarCreateForm {
    handleClose: React.Dispatch<SetStateAction<boolean>>
}

export const CarCreateForm: FC<ICarCreateForm> = (
    {
        handleClose
    }
) => {
    const [errorCommon, setErrorCommon] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (values: ICarForm) => {
        if (values.model && values.image) {
            try {
                setIsLoading(true)
                await fetchPostCar(values)
                setIsLoading(false)
                handleClose(false)
                await fetchGetCars(1, CPageSize)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorCommon(error.message)
                } else {
                    setErrorCommon(error as string)
                }
            }
        } else {
            setErrorCommon('Заполните все поля')
        }
    }

    return (
        <CarPopupFormComponent
            brandId={undefined}
            color={''}
            image={null}
            submit={handleSubmit}
            buttonSubmitTitle="Создать"
            errorCommon={errorCommon}
            isLoading={isLoading}
        />
    )    
}