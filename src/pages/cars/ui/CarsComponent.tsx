import { Car } from '@/entities/Car'
import { ICar } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { FC } from 'react'

interface ICarsComponent {
  cars: ICar[]
}


export const CarsComponent: FC<ICarsComponent> = (
  {
    cars
  }
) => {
    return (
        <section className={styles.SCarsWrapper}>
          <ul className={styles.SCars}>
            {cars.map(car => {
                  return (
                      <Car car={car}/>
                  )
              })}
          </ul>
        </section>
    )   
}