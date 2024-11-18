import { IAuthUserData } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";
import { ELocalStorageItems, ERole } from "@/shared/enums";

class AuthUserStore extends BaseStore {
    authUserData: IAuthUserData = {
        accessToken: '',
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
        this.authUserData.accessToken = localStorage.getItem('accessToken')
        this.authUserData.role = localStorage.getItem('role') as ERole
        return this.authUserData
    }

    public setAuthUserData(data: IAuthUserData) {
        if (data.accessToken && data.role) {
            localStorage.setItem(ELocalStorageItems.accessToken, data.accessToken);
            localStorage.setItem(ELocalStorageItems.role, data.role);
            this.authUserData.accessToken = data.accessToken
            this.authUserData.role = data.role
        }
    }

    public get isAuth() {
        this.getAuthUserData
        return this.authUserData.accessToken && this.authUserData.role
    }

    public setLogout() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('role')
        this.authUserData.accessToken = null
        this.authUserData.role = null
    }

    public get isAdmin() {
        this.getAuthUserData
        return this.authUserData.role !== ERole.User
    }
}

export const authUserStore = new AuthUserStore()