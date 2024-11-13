import { ICar } from "@/shared/interfaces"
import { FC } from "react"
import styles from './styles.module.scss'

interface ICarFC {
    car: ICar
}

export const Car: FC<ICarFC> = (
    {
    car
    }
) => {
    const {carId, carName, image} = car

    return (
        <div 
            key={carId}
            className={styles.SCar}
        >
            <img 
                src={image} 
                alt='car image'
                className={styles.SCarImage}
            />
            <span className={styles.SCarName}>
                {carName}
            </span>
        </div>
    )
}