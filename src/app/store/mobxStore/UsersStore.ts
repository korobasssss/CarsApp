import { IUser, IUserFormData } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, makeObservable, observable } from "mobx";
import { ISelectOptions } from "ui-kit-cars/main";
import { formattedToApiDate } from "@/shared/utils";
import { ERole } from "@/shared/enums";

class UsersStore extends BaseStore {
    users: IUser[] | null = null
    userRoles: ISelectOptions<ERole, string>[] = [
        {
            value: ERole.Manager,
            label: ERole.Manager
        },
        {
            value: ERole.SuperUser,
            label: ERole.SuperUser
        },
        {
            value: ERole.User,
            label: ERole.User
        },
    ]

    constructor() {
        super()
        makeObservable(this, {
            users: observable,
            userRoles: observable,
            setUsers: action,
            setUser: action,
            setUserRole: action
        })
    }

    setUsers(data: IUser[] | null) {
        this.users = data
    }

    setUser(data: IUserFormData, id: string) {
        if (!this.users) return;

        this.users = this.users.map(user => {
            if (user.id === id) {
                return { 
                    ...data, 
                    birthDate: formattedToApiDate(data.birthDate), 
                    email: user.email, 
                    role: user.role, 
                    id 
                }
            }
            return user
        })
    }

    setUserRole(id: string, role: ERole) {
        if (!this.users) return;

        this.users = this.users.map(user => {
            if (user.id === id) {
                return { 
                    ...user, 
                    role 
                }
            }
            return user
        })
    }
}

export const usersStore = new UsersStore()