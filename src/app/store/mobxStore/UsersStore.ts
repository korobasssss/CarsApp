import { IUser } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";

class UsersStore extends BaseStore {
    users: IUser[] | null = null

    constructor() {
        super()
        makeObservable(this, {
            users: observable,
            getCars: computed,
            setUsers: action
        })
    }

    public get getCars() {
        return this.users
    }

    setUsers(data: IUser[] | null) {
        this.users = data
    }
}

export const usersStore = new UsersStore()