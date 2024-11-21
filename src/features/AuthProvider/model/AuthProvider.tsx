import { authUserStore } from "@/app/store/mobxStore"
import { CPaths } from "@/shared/constants"
import { EPaths, ERole } from "@/shared/enums"
import { observer } from "mobx-react-lite"
import { FC, ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface IAuthProvider {
    children: ReactNode
}

export const AuthProvider: FC<IAuthProvider> = observer(({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!authUserStore.isAuth()) {
            navigate(EPaths.SIGN_IN);
        } else if (!CPaths.find((path) => path.url === pathname)?.availableRoles.includes(authUserStore.authUserData.role as ERole)) {
            navigate(EPaths.FORBIDDER);
        }
    }, [authUserStore, pathname, navigate]);

    return <>{children}</>;
});