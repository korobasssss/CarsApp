import { IUser } from "@/shared/interfaces"
import { User } from "../ui/User"
import { FC, useState } from "react"
import { Popup } from "ui-kit-cars/main"
import { UserPopupEditFormModel } from "@/widgets/UserPopupEditForm"

interface IUserModel {
    user: IUser
}

export const UserModel: FC<IUserModel> = (
    {
        user
    }
) => {
    const [isEditOpen, setIsEditOpen] = useState(false)

    return (
        <>
            <User 
                user={user}
                setIsEditOpen={setIsEditOpen}
            />
            <Popup
                title={`Редактировать пользователя ${user.surname} ${user.name[0]}. ${user.patronymic[0]}.`}
                isModalOpen={isEditOpen}
                handleClose={setIsEditOpen}
                isForceRender
            >
                {isEditOpen && (
                    <UserPopupEditFormModel 
                        user={user}
                        handleClose={setIsEditOpen}
                        key={Date.now()}
                    />
                )}
            </Popup>
        </>
    )
}