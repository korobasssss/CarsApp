import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";
import { ELocalStorageItems, ERole } from "@/shared/enums";

class AuthUserStore extends BaseStore {
    authUserData: {role: string| null} = {
        role: null
    }

    constructor() {
        super()
        makeObservable(this, {
            authUserData: observable,
            getAuthUserData: computed,
            isAuth: computed,
            setLogout: action,
            isAdmin: computed
        })
    }

    public get getAuthUserData() {
        this.authUserData.role = localStorage.getItem('role') as ERole
        return this.authUserData
    }

    public setAuthUserData(role: string | null) {
        this.authUserData.role = role
    }

    public get isAuth() {
        this.getAuthUserData
        return localStorage.getItem(ELocalStorageItems.accessToken) !== undefined && this.authUserData.role !== null
    }

    public setLogout() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('role')
        this.authUserData.role = null
    }

    public get isAdmin() {
        this.getAuthUserData
        return this.isAuth && (this.authUserData.role !== ERole.User)
    }
}

export const authUserStore = new AuthUserStore()