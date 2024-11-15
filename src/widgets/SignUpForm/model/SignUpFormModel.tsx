import { SignUpFormComponent } from "@/features/SignUpFormComponent"
import { useState } from "react"

export const SignUpFormModel = () => {
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = (email: string, password: string) => {
        console.log(email, password)
    }

    return (
        <SignUpFormComponent
            submit={handleSubmit}
            buttonSubmitTitle="Зарегистрироваться"
            errorCommon={errorCommon}
        />
    )    
}