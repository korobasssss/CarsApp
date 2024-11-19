import { ICar, ICarBrand } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, computed, makeObservable, observable } from "mobx";
import { ERequestStatus } from "@/shared/enums";

class CarStore extends BaseStore {
    carsStatus: ERequestStatus = ERequestStatus.Ready
    cars: ICar[] | null = null
    currentPage: number = 1
    totalPages: number | null = null
    carCategories: ICarBrand[] | null = null

    constructor() {
        super()
        makeObservable(this, {
            cars: observable,
            carsStatus: observable,
            currentPage: observable,
            totalPages: observable,
            carCategories: observable,
            setCars: action, 
            setCurrentPage: action, 
            setPages: action, 
            setCar: action,
            getCars: computed,
            setCarCategories: action,
        })
    }

    public get getCars() {
        return this.cars
    }

    setCars(data: ICar[] | null) {
        if (data === null) {
            this.cars = [];
        } else {
            if (this.cars) {
                this.cars = [...this.cars, ...data];
            } else {
                this.cars = data;
            }
        }
    }

    setPages(total: number) {
        this.totalPages = total
    }

    setCurrentPage(page?: number) {
        if (!page) {
            if (this.currentPage && this.totalPages && (this.currentPage < this.totalPages)) {
                this.currentPage++
            }
        } else {
            this.currentPage = page
        }
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

    setStatus(status: ERequestStatus) {
        this.carsStatus = status
    }
}

export const carStore = new CarStore()