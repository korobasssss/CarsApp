import { IUser, IUserFormData } from "@/shared/interfaces"
import { FC, SetStateAction, useMemo, useState } from "react"
import { Button } from "ui-kit-cars/main"
import styles from './styles.module.scss'
import cx from 'classnames'
import { UserPopupFormData } from "@/features/UserPopupFormData"
import { UserPopupFormRole } from "@/features/UserPopupFormRole"
import { observer } from "mobx-react-lite"
import { ERole } from "@/shared/enums"
import { usersStore } from "@/app/store/mobxStore"

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

    const [isDataLoading, setIsDataLoading] = useState(false)
    const [isRoleLoading, setIsRoleLoading] = useState(false)

    const handleSubmitData = async (values: IUserFormData) => {
        try {
            setIsDataLoading(true)
            await usersStore.setUser(values, user.id)
            setIsDataLoading(false)
            handleClose(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorData(error.message)
            } else {
                setErrorData(error as string)
            }
        }
    }

    const handleSubmitRole = async (role: ERole) => {
        try {
            setIsRoleLoading(true)
            await usersStore.setUserRole(user.id, role)
            setIsRoleLoading(false)
            handleClose(false)
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
            <nav className={styles.SNav}>
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
                    isLoading={isDataLoading}
                />
            )}
            {isRoleEdit && (
                <UserPopupFormRole
                    role={user.role}
                    submit={handleSubmitRole}
                    buttonSubmitTitle='Сохранить'
                    errorCommon={errorRole}
                    isLoading={isRoleLoading}
                />
            )}
        </div>
    )
})