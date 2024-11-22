import { IUser } from "@/shared/interfaces"
import { FC } from "react"
import styles from './styles.module.scss'
import { UserModel } from "@/widgets/User/model/UserModel"
import { LoaderSpin, Message } from "ui-kit-cars/main"
import { usersStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite"

interface IUsersComponent {
    users: IUser[] | null
}

export const UsersComponent: FC<IUsersComponent> = observer((
    {
        users
    }
) => {
    return (
        <section className={styles.SUsersWrapper}>
            {!users && usersStore.isReady && <Message type='base' message='Нет данных'/>}
            {usersStore.isLoading && (
                <div className={styles.SSPinner}>
                    <LoaderSpin size='s'/>
                </div>
            )}
            <ul className={styles.SUsers}>
                {users && users.map(user => {
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
})