import { authUserStore } from "@/app/store/mobxStore"
import { EPaths } from "@/shared/enums"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignUpFormComponent } from "../ui/SignUpFormComponent"
import { ISignUpForm } from "@/shared/interfaces"

export const SignUpFormModel = observer(() => {
    const navigate = useNavigate()
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = async (values: ISignUpForm) => {
        try {
            await authUserStore.signUp(values);
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
        <SignUpFormComponent
            submit={handleSubmit}
            buttonSubmitTitle="Зарегистрироваться"
            errorCommon={errorCommon}
        />
    )    
})