import { createBrowserRouter } from "react-router-dom";
import { MainModel } from "@/pages/main";
import { EPaths } from "@/shared/enums";
import { CarsModel } from "@/pages/cars";

export const routes = createBrowserRouter([
    {
        path: EPaths.MAIN,
        element: <MainModel/>
    },
    {
        path: EPaths.CARS,
        element: <CarsModel/>
    }
])