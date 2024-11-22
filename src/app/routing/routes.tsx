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
        element: <MainModel/>,
        errorElement: <Error />
    },
    {
        path: EPaths.CARS,
        element: (
            <AuthProvider>
                <CarsModel/>
            </AuthProvider>
        ),
        errorElement: <Error />
    },
    {
        path: EPaths.USERS,
        element: (
            <AuthProvider>
                <UsersModel/>
            </AuthProvider>
        ),
        errorElement: <Error />
    },
    {
        path: EPaths.SIGN_IN,
        element: <SignInModel/>,
        errorElement: <Error />
    },
    {
        path: EPaths.SIGN_UP,
        element: <SignUpModel/>,
        errorElement: <Error />
    },
    {
        path: EPaths.FORBIDDER,
        element: <Forbidden/>,
        errorElement: <Error />
    }
])