import { ICar } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";

class CarStore extends BaseStore {
    cars: ICar[] | null = null

    constructor() {
        super()
        makeObservable(this, {
            cars: observable,
            setCars: action, 
            getCars: computed
        })
    }

    public get getCars() {
        return this.cars
    }

    setCars(data: ICar[] | null) {
        this.cars = data
    }
}

export const carStore = new CarStore()