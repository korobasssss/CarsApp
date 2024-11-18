import { authUserStore } from "@/app/store/mobxStore"
import { SignInFormComponent } from "@/features/SignInFormComponent"
import { fetchPostSignIn } from "@/shared/api"
import { EPaths } from "@/shared/enums"
import { observer } from "mobx-react-lite"
import { SetStateAction } from "react"
import { useNavigate } from "react-router-dom"

export const SignInFormModel = observer(() => {
    const navigate = useNavigate()

    const handleSubmit = async (email: string, password: string, setErrorCommon: React.Dispatch<SetStateAction<string>>) => {
        try {
            await fetchPostSignIn({ email, password });
            if (authUserStore.isReady) {
                navigate(EPaths.MAIN)
            }
        } catch (error) {
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
        />
    )    
})