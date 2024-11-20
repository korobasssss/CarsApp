import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";
import { ELocalStorageItems, ERole } from "@/shared/enums";

class AuthUserStore extends BaseStore {
    authUserData: {role: string | null} = {
        role: null
    }

    constructor() {
        super()
        makeObservable(this, {
            authUserData: observable,
            getAuthUserData: computed,
            isAuth: computed,
            isAdmin: computed,
            setLogout: action,
            setAuthUserData: action,
        })
    }

    public get getAuthUserData() {
        this.authUserData.role = localStorage.getItem('role') as ERole
        return this.authUserData
    }

    public get isAuth() {
        this.getAuthUserData
        return localStorage.getItem(ELocalStorageItems.accessToken) !== undefined && this.authUserData.role !== null
    }

    public get isAdmin() {
        this.getAuthUserData
        return this.isAuth && (this.authUserData.role !== ERole.User && this.authUserData.role !== ERole.Manager)
    }

    public setAuthUserData(accessToken: string | null, role: string | null) {
        if (!accessToken || !role) return
        
        localStorage.setItem(ELocalStorageItems.accessToken, accessToken)
        localStorage.setItem(ELocalStorageItems.role, role)

        this.authUserData.role = role
    }

    public setLogout() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('role')
        this.authUserData.role = null
    } 
}

export const authUserStore = new AuthUserStore()