import { CarPopupFormComponent } from "@/features/CarPopup"
import { useState } from "react"

export const CarCreateForm = () => {
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = (brandId: number, color?: string, image?: File) => {
        console.log(brandId, color, image)
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