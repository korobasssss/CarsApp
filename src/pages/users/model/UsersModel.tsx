import { MainLayout } from "@/entities/MainLayout"
import { UsersComponent } from "../ui/UsersComponent"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { usersStore } from "@/app/store/mobxStore";
import { Notification } from "ui-kit-cars/main";


export const UsersModel = observer(() => {
    useEffect(() => {
        const fetchData = async () => {
            try {
              await usersStore.setUsers();
            } catch (error) {
              Notification({
                message: 'Ошибка получения данных пользователей'
              })
            }
          };
          if (usersStore.isLoading) return
          fetchData();
    }, [])

    return (
        <MainLayout>
            <UsersComponent
                users={usersStore.users}
            />
        </MainLayout>
    )
})