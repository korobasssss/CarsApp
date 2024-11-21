import { IPaths } from "@/shared/interfaces"
import { Header } from "../ui/Header"
import { FC } from "react"
import { fetchLogout } from "@/shared/api"
import { observer } from "mobx-react-lite"
import { Notification } from "ui-kit-cars/main"
import { useNavigate } from "react-router-dom"
import { EPaths } from "@/shared/enums"

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
            navigate(EPaths.MAIN)
        } catch (error: unknown) {
            Notification({
                message: 'Ошибка выхода из аккаунта'
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