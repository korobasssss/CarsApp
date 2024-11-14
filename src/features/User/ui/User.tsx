import { EditIcon, UserImg } from "@/shared/assets"
import { IUser } from "@/shared/interfaces"
import { FC } from "react"
import styles from './styles.module.scss'
import { ButtonIcon } from "ui-kit-cars/main"

interface IUserFC {
    user: IUser
}

export const User: FC<IUserFC> = (
    {
        user
    }
) => {
    const {id, name, surname, patronymic, birthDate} = user

    return (
        <div
            key={id}
            className={styles.SUser}
        >
            <img 
                src={UserImg}
                className={styles.SUserImg}
            />
            <div className={styles.SUserData}>
                <span className={styles.SUserName}>
                    {`${surname} ${name} ${patronymic}`}
                </span>
                <span className={styles.SUserDate}>
                    {birthDate}
                </span>
            </div>
            <ButtonIcon alt="edit button"> {/* todo только админу видно*/}
                <EditIcon/>
            </ButtonIcon>
        </div>
    )
}