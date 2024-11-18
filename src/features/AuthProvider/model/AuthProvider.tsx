import { authUserStore } from "@/app/store/mobxStore"
import { EPaths } from "@/shared/enums"
import { observer } from "mobx-react-lite"
import { FC, ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface IAuthProvider {
    children: ReactNode
}

export const AuthProvider: FC<IAuthProvider> = observer((
    {
        children
    }
) => {
    const navigate = useNavigate()
    const pathname = useLocation().pathname

    if (authUserStore.isAuth) {
        if (pathname === EPaths.USERS) {
            if (authUserStore.isAdmin) {
                return children
            } else {
                navigate(EPaths.FORBIDDER)
            }
        } else {
            return children
        }
    } else {
        navigate(EPaths.SIGN_IN)
    }
})