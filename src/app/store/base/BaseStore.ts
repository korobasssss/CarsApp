import { ERequestStatus } from "@/shared/enums"
import { action, computed, makeObservable, observable } from "mobx"

export class BaseStore {
    status : ERequestStatus = ERequestStatus.Pending

    constructor() {
        makeObservable(this, {
            status: observable,
            setPending: action,
            setLoading: action,
            setReady: action,
            isPending: computed,
            isLoading: computed,
            isReady: computed,
        })
    }

    setPending() {
        this.status = ERequestStatus.Pending
    }

    setLoading() {
        this.status = ERequestStatus.Loading
    }

    setReady() {
        this.status = ERequestStatus.Ready
    }

    public get isPending() {
        return this.status === ERequestStatus.Pending
    }

    public get isLoading() {
        return this.status === ERequestStatus.Loading
    }

    public get isReady() {
        return this.status === ERequestStatus.Ready
    }
}