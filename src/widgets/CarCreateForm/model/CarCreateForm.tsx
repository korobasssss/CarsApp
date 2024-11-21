import { carStore } from "@/app/store/mobxStore"
import { CarPopupFormComponent } from "@/features/CarPopup"
import { ICarForm } from "@/shared/interfaces"
import { observer } from "mobx-react-lite"
import { FC, SetStateAction, useState } from "react"

interface ICarCreateForm {
    handleClose: React.Dispatch<SetStateAction<boolean>>
}

export const CarCreateForm: FC<ICarCreateForm> = observer((
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
                await carStore.createCar(values)
                setIsLoading(false)
                handleClose(false)
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
})