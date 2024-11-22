export interface ICar {
    carId: number,
    brand: ICarBrand,
    color: string,
    image: string | null
}

export interface ICarBrand {
    carModelId: number,
    brand: string,
    model: string
}