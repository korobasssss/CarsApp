import { ICar } from "@/shared/interfaces"
import { FC, useMemo } from "react"
import styles from './styles.module.scss'
import { NoCar } from "@/shared/assets"

interface ICarPopupInformationComponent {
    car: ICar
}

export const CarPopupInformationComponent: FC<ICarPopupInformationComponent> = (
    {
        car
    }
) => {
    const {image, brand, color} = car

    const carData = useMemo(() => {
        return [
            {
                title: 'Бренд',
                data: brand.brand
            },
            {
                title: 'Модель',
                data: brand.model
            },
            {
                title: 'Цвет',
                data: color
            }
        ]
    }, [car])

    return (
        <div className={styles.SCarPopup}>
            <img 
                src={image || NoCar}
                className={styles.SCarPopupImage}
            />
            <div className={styles.SCarData}>
                {carData.map((oneCarData, index) => {
                    return (
                        <div 
                            key={index}
                            className={styles.SCarOneData}
                        >
                            <span className={styles.SDataTitle}>
                                {oneCarData.title}:
                            </span>
                            <span className={styles.SData}>
                                {oneCarData.data}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}