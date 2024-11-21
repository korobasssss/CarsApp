import { ICar } from "@/shared/interfaces"
import { FC, SetStateAction } from "react"
import styles from './styles.module.scss'
import { ButtonIcon } from "ui-kit-cars/main"
import { EditIcon, NoCar } from "@/shared/assets"

interface ICarFC {
    car: ICar
    setIsInfoOpen: React.Dispatch<SetStateAction<boolean>>
    setIsEditOpen: () => void
    isAdmin: boolean
}

export const Car: FC<ICarFC> = (
    {
        car,
        setIsInfoOpen,
        setIsEditOpen,
        isAdmin
    }
) => {

    return (
        <div 
            key={car.carId}
            className={styles.SCar}
        >
            <img 
                src={car.image || NoCar} 
                alt='car image'
                className={styles.SCarImage}
                onClick={() => setIsInfoOpen(true)}
            />
            <div className={styles.SCarData}>
                <span className={styles.SCarName}>
                    {car.brand.brand} {car.brand.model}
                </span>
                {isAdmin && (
                    <ButtonIcon
                        alt="edit"
                        classNames={styles.SEdit}
                        onClick={setIsEditOpen}
                    >
                        <EditIcon/>
                    </ButtonIcon>
                )}
            </div>
        </div>
    )
}