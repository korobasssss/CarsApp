import { createBrowserRouter } from "react-router-dom";
import { MainModel } from "@/pages/main";
import { EPaths } from "@/shared/enums";
import { CarsModel } from "@/pages/cars";
import { UsersModel } from "@/pages/users";
import { SignInModel } from "@/pages/signin";
import { SignUpModel } from "@/pages/signup";
import { AuthProvider } from "@/features/AuthProvider";
import { Forbidden } from "@/pages/forbidden";
import { Error } from "@/entities/Error";

export const routes = createBrowserRouter([
    {
        path: EPaths.MAIN,
        element: <MainModel/>
    },
    {
        path: EPaths.CARS,
        element: (
            <AuthProvider>
                <CarsModel/>
            </AuthProvider>
        )
    },
    {
        path: EPaths.USERS,
        element: (
            <AuthProvider>
                <UsersModel/>
            </AuthProvider>
        )
    },
    {
        path: EPaths.SIGN_IN,
        element: <SignInModel/>
    },
    {
        path: EPaths.SIGN_UP,
        element: <SignUpModel/>
    },
    {
        path: EPaths.FORBIDDER,
        element: <Forbidden/>
    },
    {
        path: EPaths.ERROR,
        element: <Error />
    }
])