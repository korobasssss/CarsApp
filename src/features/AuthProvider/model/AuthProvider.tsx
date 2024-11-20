import { authUserStore } from "@/app/store/mobxStore"
import { EPaths } from "@/shared/enums"
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
        if (!authUserStore.isAuth) {
            navigate(EPaths.SIGN_IN);
        } else if (pathname === EPaths.USERS && !authUserStore.isAdmin) {
            navigate(EPaths.FORBIDDER);
        }
    }, [authUserStore.isAuth, authUserStore.isAdmin, pathname, navigate]);

    return authUserStore.isAuth ? children : null;
});