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
    const {surname, name, patronymic} = user

    return (
        <>
            <User 
                user={user}
                setIsEditOpen={setIsEditOpen}
            />
            <Popup
                title={`Редактировать пользователя ${surname} ${name[0]}. ${patronymic[0]}.`}
                isModalOpen={isEditOpen}
                handleClose={setIsEditOpen}
            >
                <UserPopupEditFormModel 
                    user={user}
                    handleClose={setIsEditOpen}
                    key={Date.now()}
                />
            </Popup>
        </>
    )
}