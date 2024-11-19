import { ICar, ICarBrand } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";

class CarStore extends BaseStore {
    cars: ICar[] | null = null
    carCategories: ICarBrand[] | null = null

    constructor() {
        super()
        makeObservable(this, {
            cars: observable,
            carCategories: observable,
            setCars: action, 
            setCar: action,
            getCars: computed,
            setCarCategories: action,

        })
    }

    public get getCars() {
        return this.cars
    }

    setCars(data: ICar[] | null) {
        this.cars = data
    }

    setCar(data: ICar) {
        if (this.cars) {
            this.cars.push(data)
        }
    }

    public get getCarCategories() {
        return this.carCategories
    }

    setCarCategories(data: ICarBrand[] | null) {
        this.carCategories = data
    }
}

export const carStore = new CarStore()