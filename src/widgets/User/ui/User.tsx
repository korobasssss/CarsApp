import { EditIcon, UserImg } from "@/shared/assets"
import { IUser } from "@/shared/interfaces"
import { FC, SetStateAction, useMemo } from "react"
import styles from './styles.module.scss'
import { ButtonIcon } from "ui-kit-cars/main"
import { formattedDate } from "../utils"

interface IUserFC {
    user: IUser
    setIsEditOpen: React.Dispatch<SetStateAction<boolean>>
}

export const User: FC<IUserFC> = (
    {
        user,
        setIsEditOpen
    }
) => {

    const {id, name, surname, patronymic, birthDate} = user

    const formattedBirth = useMemo(() => {
        return formattedDate(birthDate)
    }, [birthDate])

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
                    {formattedBirth}
                </span>
            </div>
            <ButtonIcon
                alt="edit button"
                onClick={() => setIsEditOpen(true)}
            >
                <EditIcon/>
            </ButtonIcon>
        </div>
    )
}