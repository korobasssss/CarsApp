import { EPaths } from "@/shared/enums";
import { IPaths } from "@/shared/interfaces";
import { CRoles } from "../CRoles";
import { CAdminRoles } from "../CAdminRoles";

export const CPaths: IPaths[] = [
    {
        url: EPaths.CARS,
        title: 'Тачки',
        availableRoles: CRoles
    },
    {
        url: EPaths.USERS,
        title: 'Пользователи',
        availableRoles: CAdminRoles
    }
]