import { authUserStore } from "@/app/store/mobxStore"
import { EPaths } from "@/shared/enums"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignInFormComponent } from "../ui/SignInFormComponent"
import { ISignInForm } from "@/shared/interfaces"

export const SignInFormModel = observer(() => {
    const navigate = useNavigate()

    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = async (values: ISignInForm) => {
        try {
            await authUserStore.signIn(values);
            if (authUserStore.isReady) {
                navigate(EPaths.MAIN)
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorCommon(error.message);
            } else {
                setErrorCommon('Произошла неизвестная ошибка');
            }
        }
    }

    return (
        <SignInFormComponent
            submit={handleSubmit}
            buttonSubmitTitle="Войти"
            errorCommon={errorCommon}
        />
    )    
})