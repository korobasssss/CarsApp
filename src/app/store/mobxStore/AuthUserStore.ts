import { IAuthUserData } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { computed, makeObservable, observable } from "mobx";

class AuthUserStore extends BaseStore {
    authUserData: IAuthUserData | null = null

    constructor() {
        super()
        makeObservable(this, {
            authUserData: observable,
            getAuthUserData: computed
        })
    }

    public get getAuthUserData() {
        return this.authUserData
    }

    setAuthUserData(data: IAuthUserData | null) {
        this.authUserData = data
    }
}

export const authUserStore = new AuthUserStore()