import { ICar, ICarBrand, ICarForm } from "@/shared/interfaces";
import { BaseStore } from "../base";
import { action, makeObservable, observable, runInAction } from "mobx";
import { CPageSize } from "@/shared/constants";
import { axiosDeleteCar, axiosGetCarCategories, axiosGetCars, axiosPostCar, axiosPutCar } from "@/shared/api";
import axios from "axios";

class CarStore extends BaseStore {

    cars: ICar[] | null = null
    carCategories: ICarBrand[] | null = null

    currentPage: number = 1
    totalPages: number | null = null
    

    constructor() {
        super()
        makeObservable(this, {
            cars: observable,
            carCategories: observable,
            currentPage: observable,
            totalPages: observable,
            setCars: action, 
            clearCars: action, 
            setCurrentPage: action, 
            createCar: action,
            editCar: action,
            deleteCar: action, 
            setPages: action,
            setCarCategories: action,
        })
    }

    async setCars() {
        this.setPending();

        try {
            this.setLoading();

            const result = await axiosGetCars(this.currentPage, CPageSize);
            const { TotalPages } = JSON.parse(result.headers.pagination);
            
            this.setPages(TotalPages);
            this.setReady();

            if (!result.data) {
                this.clearCars();
                return;
            }

            runInAction(() => {
                if (this.currentPage === 1) {
                    this.cars = result.data;
                } else {
                    this.cars = this.cars ? [...this.cars, ...result.data] : result.data;
                }
            })

        } catch (error) {
            this.setError();
            throw new Error("Произошла ошибка, попробуйте еще раз");
        }
    }

    clearCars() {
        this.cars = [];
    }

    async setCarCategories() {
        try {
            const result = await axiosGetCarCategories()
    
            runInAction(() => {
                this.carCategories = result
            });
        } catch (error: unknown) {
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }

    async createCar(newCar: ICarForm) {
        try {
            await axiosPostCar(newCar)

            this.setCurrentPage(1)
            this.setCars()
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                switch (error.status) {
                    case 400: {
                        throw new Error(error.message)
                    }
                }
            } else {
                throw new Error(`Произошла ошибка, попробуйте еще раз`)
            }
        }
    }

    async editCar(newCar: ICarForm, id: number) {
        try {
            await axiosPutCar(newCar, id)

            this.setCurrentPage(1)
            this.setCars()
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

    async deleteCar(id: number) {
        try {
            await axiosDeleteCar(id)

            runInAction(() => {
                if (this.cars) {
                    this.cars = this.cars.filter(car => car.carId !== id)
                }
            });
            
            
        } catch (error: unknown) {
            throw new Error(`Произошла ошибка, попробуйте еще раз`)
        }
    }

    setPages(total: number) {
        this.totalPages = total
    }

    setCurrentPage(page?: number) {
        if (!page) {
            if (this.currentPage && this.totalPages && (this.currentPage < this.totalPages) && this.cars && this.cars.length > 0) {
                this.currentPage++
            }
        } else {
            this.currentPage = page
            this.clearCars()
        }
    }
}

export const carStore = new CarStore()