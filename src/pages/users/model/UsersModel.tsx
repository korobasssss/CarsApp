import { MainLayout } from "@/entities/MainLayout"
import { UsersComponent } from "../ui/UsersComponent"
import { IUser } from "@/shared/interfaces"

const users: IUser[] = [
    {
        id: '0',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
    {
        id: '1',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
    {
        id: '2',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
    {
        id: '3',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
    {
        id: '4',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
    {
        id: '5',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
    {
        id: '6',
        name: 'Танчик',
        surname: 'Тачковый',
        patronymic: 'Танчиковист',
        email: 'tanchik@gmaim.com',
        birthDate: '13.02.2004',
        role: 'user'
    },
]


export const UsersModel = () => {
    return (
        <MainLayout>
            <UsersComponent
                users={users}
            />
        </MainLayout>
    )
}