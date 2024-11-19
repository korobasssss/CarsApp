import { ICar } from "@/shared/interfaces"
import { FC, SetStateAction } from "react"
import styles from './styles.module.scss'
import { ButtonIcon } from "ui-kit-cars/main"
import { EditIcon, NoCar } from "@/shared/assets"
import { authUserStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite"

interface ICarFC {
    car: ICar
    setIsInfoOpen: React.Dispatch<SetStateAction<boolean>>
    setIsEditOpen: React.Dispatch<SetStateAction<boolean>>
}

export const Car: FC<ICarFC> = observer((
    {
        car,
        setIsInfoOpen,
        setIsEditOpen
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
                {authUserStore.isAdmin && (
                    <ButtonIcon
                        alt="edit"
                        classNames={styles.SEdit}
                        onClick={() => setIsEditOpen(true)}
                    >
                        <EditIcon/>
                    </ButtonIcon>
                )}
            </div>
        </div>
    )
})