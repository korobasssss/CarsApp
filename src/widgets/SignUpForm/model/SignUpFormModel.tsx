import { authUserStore } from "@/app/store/mobxStore"
import { fetchPostSignUp } from "@/shared/api"
import { EPaths } from "@/shared/enums"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SignUpFormComponent } from "../ui/SignUpFormComponent"

export const SignUpFormModel = observer(() => {
    const navigate = useNavigate()
    const [errorCommon, setErrorCommon] = useState('')

    const handleSubmit = async (email: string, password: string, name: string, surname: string, patronymic: string, birthDate: string) => {
        try {
            await fetchPostSignUp({ 
                email, 
                password,
                name,
                surname,
                patronymic,
                birthDate
            });
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