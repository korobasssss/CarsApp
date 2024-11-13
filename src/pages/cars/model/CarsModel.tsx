import { MainLayout } from "@/entities/MainLayout"
import { CarsComponent } from "../ui/CarsComponent"
import {TempIcon} from '@/shared/assets'
import { ICar } from "@/shared/interfaces"

const cars: ICar[] = [
    {
        carId: 0,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },
    {
        carId: 1,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },    
    {
        carId: 2,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },    
    {
        carId: 3,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },    
    {
        carId: 4,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },    
    {
        carId: 5,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },    
    {
        carId: 6,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },   
    {
        carId: 7,
        carName: 'Какоето имя',
        brand: {
          carModelId: 0,
          brand: "Какойто бренд",
          model: "Какаято модель"
        },
        color: "Какойто цвет",
        image: TempIcon
    },
]

export const CarsModel = () => {
    return (
        <MainLayout>
            <CarsComponent
                cars={cars}
            />
        </MainLayout>
    )
}