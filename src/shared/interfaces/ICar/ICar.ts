export interface ICar {
    carId: number,
    brand: ICarBrand,
    color: string,
    image: string
}

export interface ICarBrand {
    carModelId: number,
    brand: string,
    model: string
}