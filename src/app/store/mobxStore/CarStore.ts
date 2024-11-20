import { ICar, ICarBrand } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, makeObservable, observable } from "mobx";
import { ERequestStatus } from "@/shared/enums";

class CarStore extends BaseStore {
    carsStatus: ERequestStatus = ERequestStatus.Ready

    cars: ICar[] | null = null
    carCategories: ICarBrand[] | null = null

    currentPage: number = 1
    totalPages: number | null = null
    

    constructor() {
        super()
        makeObservable(this, {
            cars: observable,
            carCategories: observable,
            carsStatus: observable,
            currentPage: observable,
            totalPages: observable,
            setCars: action, 
            setCurrentPage: action, 
            setPages: action,
            setCarCategories: action,
        })
    }

    setCars(data: ICar[] | null) {
        if (!data) {
            this.clearCars()
            return
        } 
        
        if (this.cars) {
            this.cars = [...this.cars, ...data];
        } else {
            this.cars = data;
        }
    }

    clearCars() {
        this.cars = [];
    }

    setCarCategories(data: ICarBrand[] | null) {
        this.carCategories = data
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

    setStatus(status: ERequestStatus) {
        this.carsStatus = status
    }
}

export const carStore = new CarStore()