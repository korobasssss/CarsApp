import { IUser } from "@/shared/interfaces"
import { FC, SetStateAction, useMemo, useState } from "react"
import { Button } from "ui-kit-cars/main"
import styles from './styles.module.scss'
import cx from 'classnames'
import { UserPopupFormData } from "@/features/UserPopupFormData"
import { UserPopupFormRole } from "@/features/UserPopupFormRole"
import { observer } from "mobx-react-lite"
import { fetchGetUsers, fetchPutUser, fetchPutUserRole } from "@/shared/api"

interface IUserPopupEditFormModel {
    user: IUser
    handleClose: React.Dispatch<SetStateAction<boolean>>
}

export const UserPopupEditFormModel: FC<IUserPopupEditFormModel> = observer((
    {
        user,
        handleClose
    }
) => {
    const [isRoleEdit, setIsRoleEdit] = useState(false)

    const [errorData, setErrorData] = useState('')
    const [errorRole, setErrorRole] = useState('')

    const handleSubmitData = async (name: string, surname: string, patronymic: string, birthDate: string) => {
        try {
            await fetchPutUser({
                name,
                surname,
                patronymic,
                birthDate
            }, user.id)
            handleClose(false)
            await fetchGetUsers()
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorData(error.message)
            } else {
                setErrorData(error as string)
            }
        }
    }

    const handleSubmitRole = async (role: string) => {
        try {
            await fetchPutUserRole(user.id, role)
            handleClose(false)
            await fetchGetUsers()
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorRole(error.message)
            } else {
                setErrorRole(error as string)
            }
        }
    }

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
})