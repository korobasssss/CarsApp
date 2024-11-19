import { CarPopupFormComponent } from "@/features/CarPopup"
import { fetchGetCars, fetchPostCar } from "@/shared/api"
import { CPageSize } from "@/shared/constants"
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

    const handleSubmit = async (brandId: number, color?: string, image?: File) => {
        if (brandId && image) {
            try {
                await fetchPostCar({
                    model: brandId,
                    color: color,
                    image: image,
                })
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
        />
    )    
}