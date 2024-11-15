import { createBrowserRouter } from "react-router-dom";
import { MainModel } from "@/pages/main";
import { EPaths } from "@/shared/enums";
import { CarsModel } from "@/pages/cars";
import { UsersModel } from "@/pages/users";
import { SignInModel } from "@/pages/signin";
import { SignUpModel } from "@/pages/signup";

export const routes = createBrowserRouter([
    {
        path: EPaths.MAIN,
        element: <MainModel/>
    },
    {
        path: EPaths.CARS,
        element: <CarsModel/>
    },
    {
        path: EPaths.USERS,
        element: <UsersModel/>
    },
    {
        path: EPaths.SIGN_IN,
        element: <SignInModel/>
    },
    {
        path: EPaths.SIGN_UP,
        element: <SignUpModel/>
    }
])