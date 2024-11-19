import { IUser } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";
import { ISelectOptions } from "ui-kit-cars/main";

class UsersStore extends BaseStore {
    users: IUser[] | null = null

    userRoles: ISelectOptions<string, string>[] = [
        {
            value: 'Manager',
            label: 'Manager'
        },
        {
            value: 'Admin',
            label: 'Admin'
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
            setUsers: action
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
}

export const usersStore = new UsersStore()