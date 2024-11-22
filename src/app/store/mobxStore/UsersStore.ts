import { IUser, IUserFormData } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ISelectOptions } from "ui-kit-cars/main";
import { formattedToApiDate } from "@/shared/utils";
import { ERole } from "@/shared/enums";
import { axiosGetUsers, axiosPutUser, axiosPutUserRole } from "@/shared/api";
import axios from "axios";

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
            clearUsers: action,
            setUser: action,
            setUserRole: action
        })
    }

    public async setUsers() {
        this.setPending()
        try {
            this.setLoading()
            const result = await axiosGetUsers()
            runInAction(() => {
                this.users = result
            });
            this.setReady()
        } catch (error: unknown) {
            this.setError()
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }

    public clearUsers() {
        this.users = []
    }

    public async setUser(newData: IUserFormData, id: string) {
        try {
            await axiosPutUser(newData, id)
            
            runInAction(() => {
                if (!this.users) return;
                this.users = this.users.map(user => {
                    if (user.id === id) {
                        return { 
                            ...newData, 
                            birthDate: formattedToApiDate(newData.birthDate), 
                            email: user.email, 
                            role: user.role, 
                            id 
                        }
                    }
                    return user
                })
            });
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                switch (error.status) {
                    case 400: {
                        throw new Error(error.response?.data.title)
                    }
                }
            } else {
                throw new Error(`Произошла ошибка, попробуйте еще раз`)
            }
        }
    }

    public async setUserRole(id: string, role: ERole) {
        try {
            await axiosPutUserRole(id, role)

            runInAction(() => {
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
            });
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                switch (error.status) {
                    case 400: {
                        throw new Error(error.response?.data.title)
                    }
                }
            } else {
                throw new Error(`Произошла ошибка, попробуйте еще раз`)
            }
        }
    }
}

export const usersStore = new UsersStore()