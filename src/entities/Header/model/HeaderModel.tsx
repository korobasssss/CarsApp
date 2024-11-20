import { IPaths } from "@/shared/interfaces"
import { Header } from "../ui/Header"
import { FC } from "react"
import { fetchLogout } from "@/shared/api"
import { observer } from "mobx-react-lite"
import { authUserStore } from "@/app/store/mobxStore"
import { useNavigate } from "react-router-dom"
import { EPaths } from "@/shared/enums"
import { Notification } from "ui-kit-cars/main"

interface IHeaderModel {
    paths: IPaths[]
}

export const HeaderModel: FC<IHeaderModel> = observer((
    {
        paths
    }
) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await fetchLogout()

            if (authUserStore.isReady) {
                navigate(EPaths.MAIN)
            }
        } catch (error: unknown) {
            Notification({
                message: 'Ошибка выхода из аккаунта',
                description: 'Произошла ошибка при выходе из аккаунта'
            })
        }
    }

    return (
        <Header
            paths={paths}
            handleLogout={handleLogout}
        />
    )
})