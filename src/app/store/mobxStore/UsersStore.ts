import { IUser, IUserFormData } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";
import { ISelectOptions } from "ui-kit-cars/main";
import { formattedToApiDate } from "@/shared/utils";

class UsersStore extends BaseStore {
    users: IUser[] | null = null

    userRoles: ISelectOptions<string, string>[] = [
        {
            value: 'Manager',
            label: 'Manager'
        },
        {
            value: 'SuperUser',
            label: 'SuperUser'
        },
        {
            value: 'User',
            label: 'User'
        },
    ]

    constructor() {
        super()
        makeObservable(this, {
            users: observable,
            userRoles: observable,
            getCars: computed,
            getUserRoles: computed,
            setUsers: action,
            setUser: action
        })
    }

    public get getCars() {
        return this.users
    }

    public get getUserRoles() {
        return this.userRoles
    }

    setUsers(data: IUser[] | null) {
        this.users = data
    }

    setUser(data: IUserFormData, id: string) {
        if (!this.users) return;
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users = [
                ...this.users.slice(0, index),
                { ...data, 
                    birthDate: formattedToApiDate(data.birthDate), 
                    email: this.users[index].email, 
                    role: this.users[index].role, 
                    id },
                ...this.users.slice(index + 1)
            ];
        }
    }
}

export const usersStore = new UsersStore()