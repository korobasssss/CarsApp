import { User } from "@/entities/User"
import { IUser } from "@/shared/interfaces"
import { FC } from "react"
import styles from './styles.module.scss'

interface IUsersComponent {
    users: IUser[]
}

export const UsersComponent: FC<IUsersComponent> = (
    {
        users
    }
) => {
    return (
        <section className={styles.SUsersWrapper}>
          <ul className={styles.SUsers}>
            {users.map(user => {
                  return (
                      <User user={user}/>
                  )
              })}
          </ul>
        </section>
    )
}