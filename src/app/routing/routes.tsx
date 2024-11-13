import { createBrowserRouter } from "react-router-dom";
import { MainModel } from "@/pages/main";
import { EPaths } from "@/shared/enums";
import { CarsModel } from "@/pages/cars";
import { UsersModel } from "@/pages/users";

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
    }
])