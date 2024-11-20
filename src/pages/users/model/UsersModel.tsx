import { MainLayout } from "@/entities/MainLayout"
import { UsersComponent } from "../ui/UsersComponent"
import { notification } from 'antd';
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { fetchGetUsers } from "@/shared/api"
import { usersStore } from "@/app/store/mobxStore";


export const UsersModel = observer(() => {

    useEffect(() => {
        const fetchData = async () => {
            try {
              await fetchGetUsers();
            } catch (error) {
              notification.open({
                message: 'Ошибка получения данных пользователей'
              });
            }
          };
          if (usersStore.isError || usersStore.isLoading) return
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