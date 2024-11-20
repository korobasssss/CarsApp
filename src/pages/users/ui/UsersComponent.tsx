import { IUser } from "@/shared/interfaces"
import { FC } from "react"
import styles from './styles.module.scss'
import { UserModel } from "@/widgets/User/model/UserModel"
import { Message } from "ui-kit-cars/main"

interface IUsersComponent {
    users: IUser[] | null
}

export const UsersComponent: FC<IUsersComponent> = (
    {
        users
    }
) => {
    if (!users) return <Message type='base' message='Нет данных'/>

    return (
        <section className={styles.SUsersWrapper}>
            <ul className={styles.SUsers}>
                {users.map(user => {
                    return (
                        <UserModel 
                            user={user}
                            key={user.id}
                        />
                    )
                })}
            </ul>
        </section>
    )
}