import { IUser } from "@/shared/interfaces"
import { FC, useMemo, useState } from "react"
import { Button } from "ui-kit-cars/main"
import styles from './styles.module.scss'
import cx from 'classnames'
import { UserPopupFormData } from "@/features/UserPopupFormData"
import { UserPopupFormRole } from "@/features/UserPopupFormRole"

interface IUserPopupEditFormModel {
    user: IUser
}

export const UserPopupEditFormModel: FC<IUserPopupEditFormModel> = (
    {
        user
    }
) => {
    const [isRoleEdit, setIsRoleEdit] = useState(false)

    const [errorData, setErrorData] = useState('')
    const [errorRole, setErrorRole] = useState('')

    const stylesButtonNavData = useMemo(() => {
        return cx(
            {
                [styles[`SNav_selected`]]: !isRoleEdit
            }
        )
    }, [isRoleEdit])

    const stylesButtonNavRole = useMemo(() => {
        return cx(
            {
                [styles[`SNav_selected`]]: isRoleEdit
            }
        )
    }, [isRoleEdit])

    const handleSubmitData = () => {

    }

    const handleSubmitRole = () => {

    }

    return (
        <div className={styles.SEditWrapper}>
            <nav className={cx(
                styles.SNav,
                
            )}>
                <Button
                    theme='none'
                    onClick={() => setIsRoleEdit(false)}
                    classNames={stylesButtonNavData}
                >
                    Данные
                </Button>
                <Button
                    theme='none'
                    onClick={() => setIsRoleEdit(true)}
                    classNames={stylesButtonNavRole}
                >
                    Роль
                </Button>
            </nav>
            {!isRoleEdit && (
                <UserPopupFormData
                    name={user.name}
                    surname={user.surname}
                    patronymic={user.patronymic}
                    birthDate={user.birthDate}
                    submit={handleSubmitData}
                    buttonSubmitTitle='Сохранить'
                    errorCommon={errorData}
                />
            )}
            {isRoleEdit && (
                <UserPopupFormRole
                    role={user.role}
                    submit={handleSubmitRole}
                    buttonSubmitTitle='Сохранить'
                    errorCommon={errorRole}
                />
            )}
        </div>
    )
}