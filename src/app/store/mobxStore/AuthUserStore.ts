import { BaseStore } from "../base";
import { action, makeObservable, observable } from "mobx";
import { ELocalStorageItems, ERole } from "@/shared/enums";
import { CAdminRoles } from "@/shared/constants";
import { axiosPostLogout, axiosPostSignIn, axiosPostSignUp } from "@/shared/api";
import { carStore } from "./CarStore";
import { usersStore } from "./UsersStore";
import { Notification } from "ui-kit-cars/main";
import { ISignInForm, ISignUpForm } from "@/shared/interfaces";
import axios from "axios";

class AuthUserStore extends BaseStore {
    authUserData: {role: ERole | null} = {
        role: null
    }

    constructor() {
        super()
        makeObservable(this, {
            authUserData: observable,
            getAuthUserData: action,
            isAuth: action,
            isAdmin: action,
            setLogout: action,
            setAuthUserData: action,
            signIn: action,
            signUp: action,
            clearAuth: action,
        })
    }

    public getAuthUserData() {
        this.authUserData.role = localStorage.getItem('role') as ERole
        return this.authUserData
    }

    public isAuth() {
        this.getAuthUserData();
        if (!this.authUserData.role) return false

        return Boolean(localStorage.getItem(ELocalStorageItems.accessToken)) &&
               Boolean(this.authUserData) &&
               Boolean(this.authUserData.role) && 
               Object.values(ERole).includes(this.authUserData.role);
    }

    public isAdmin() {
        this.getAuthUserData()

        return this.isAuth() && (CAdminRoles.includes(this.authUserData.role as ERole))
    }

    public setAuthUserData(accessToken: string | null, role: ERole | null) {
        if (!accessToken || !role) return
        
        localStorage.setItem(ELocalStorageItems.accessToken, accessToken)
        localStorage.setItem(ELocalStorageItems.role, role)

        this.authUserData.role = role
    }

    async signIn(data: ISignInForm) {
        this.setPending();

        try {
            this.setLoading()
            const response = await axiosPostSignIn(data);
            
            this.setAuthUserData(response.accessToken, response.userInfo.role);
            this.setReady()
        } catch (error: unknown) {
            this.setError()
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data[0])
            } else {
                throw new Error(`Произошла ошибка, попробуйте еще раз`)
            }
        }
    }

    async signUp(data: ISignUpForm) {
        this.setPending();

        try {
            this.setLoading();
            const response = await axiosPostSignUp(data);
            
            this.setAuthUserData(response.accessToken, response.userInfo.role);
            this.setReady();
        } catch (error: unknown) {
            this.setError()
            if (axios.isAxiosError(error)) {
                if (Array.isArray(error.response?.data)) {
                    throw new Error(error.response?.data[0])
                } else {
                    throw new Error(error.response?.data.title)
                }
                
            } else {
                throw new Error(`Произошла ошибка, попробуйте еще раз`)
            }
        }
    }

    async setLogout() {
        this.setPending()
        
        try {
            this.setLoading()
            await axiosPostLogout()

            carStore.setReady()
            usersStore.setReady()

            carStore.clearCars()
            usersStore.clearUsers()
            this.clearAuth()

            this.setReady()

            Notification({
                message: 'Вы вышли из аккаунта'
            })
        } catch (error: unknown) {
            this.setError()
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    } 

    clearAuth() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('role')
        this.authUserData.role = null
    }
}

export const authUserStore = new AuthUserStore()