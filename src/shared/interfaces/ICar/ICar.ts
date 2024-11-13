export interface ICar {
    carId: number,
    carName: string,
    brand: ICarBrand,
    color: string,
    image: string
}

export interface ICarBrand {
    carModelId: number,
    brand: string,
    model: string
}