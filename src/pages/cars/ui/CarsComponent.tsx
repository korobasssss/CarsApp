import { ICar } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { FC, useState } from 'react'
import { CarModel } from '@/widgets/Car'
import { Button, LoaderSpin, Message, Popup } from 'ui-kit-cars/main'
import { CarCreateForm } from '@/widgets/CarCreateForm'
import { observer } from 'mobx-react-lite'
import { authUserStore, carStore } from '@/app/store/mobxStore'
import { ERequestStatus } from '@/shared/enums'

interface ICarsComponent {
  cars: ICar[] | null
}


export const CarsComponent: FC<ICarsComponent> = observer((
  {
    cars
  }
) => {

  const [isCreateOpen, setIsCreateOpen] = useState(false)

    if (!cars) return <Message type='base' message='Нет данных'/>

    return (
        <section className={styles.SCarsWrapper}>
          {authUserStore.isAdmin && (
            <Button 
              theme='primary'
              onClick={() => setIsCreateOpen(true)}
              classNames={styles.SButton}
            >
              Создать тачку
            </Button>
          )}
          <ul className={styles.SCars}>
            {cars.map(car => {
                  return (
                      <CarModel 
                        key={car.carId}
                        car={car}
                      />
                  )
              })}
          </ul>
          {carStore.carsStatus === ERequestStatus.Loading && (
            <div className={styles.SLoader}>
              <LoaderSpin/>
            </div>
          )}
          <Popup
              title={`Создать тачку`}
              isModalOpen={isCreateOpen}
              handleClose={setIsCreateOpen}
              isForceRender
          >
              {isCreateOpen && (
                  <CarCreateForm 
                    handleClose={setIsCreateOpen}
                  />
              )}
          </Popup>
        </section>
    )   
})