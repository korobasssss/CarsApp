import { SignInFormComponent } from "@/features/SignInFormComponent"
import { useState } from "react"

export const SignInFormModel = () => {
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = (email: string, password: string) => {
        console.log(email, password)
    }

    return (
        <SignInFormComponent
            submit={handleSubmit}
            buttonSubmitTitle="Войти"
            errorCommon={errorCommon}
        />
    )    
}