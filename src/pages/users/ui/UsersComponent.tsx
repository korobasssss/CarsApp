import { IUser } from "@/shared/interfaces"
import { FC } from "react"
import styles from './styles.module.scss'
import { UserModel } from "@/widgets/User/model/UserModel"

interface IUsersComponent {
    users: IUser[] | null
}

export const UsersComponent: FC<IUsersComponent> = (
    {
        users
    }
) => {
    if (!users) return null

    return (
        <section className={styles.SUsersWrapper}>
          <ul className={styles.SUsers}>
            {users.map(user => {
                  return (
                      <UserModel user={user}/>
                  )
              })}
          </ul>
        </section>
    )
}