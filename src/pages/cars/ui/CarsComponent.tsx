import { ICar } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { FC, useState } from 'react'
import { CarModel } from '@/features/Car/model/CarModel'
import { Button, Popup } from 'ui-kit-cars/main'
import { CarCreateForm } from '@/features/CarCreateForm'

interface ICarsComponent {
  cars: ICar[]
}


export const CarsComponent: FC<ICarsComponent> = (
  {
    cars
  }
) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

    return (
        <section className={styles.SCarsWrapper}>
          <Button 
            theme='primary'
            onClick={() => setIsCreateOpen(true)}
            classNames={styles.SButton}
          >
            Создать тачку
          </Button>
          <ul className={styles.SCars}>
            {cars.map(car => {
                  return (
                      <CarModel car={car}/>
                  )
              })}
          </ul>
          <Popup
                title={`Создать тачку`}
                isModalOpen={isCreateOpen}
                handleClose={setIsCreateOpen}
            >
                {isCreateOpen && (
                    <CarCreateForm key={Date.now()} />
                )}
            </Popup>
        </section>
    )   
}