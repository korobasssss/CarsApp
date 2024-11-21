import { ICar } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { FC, useMemo, useState } from 'react'
import { CarModel } from '@/widgets/Car'
import { Button, LoaderSpin, Message, Popup } from 'ui-kit-cars/main'
import { CarCreateForm } from '@/widgets/CarCreateForm'
import { observer } from 'mobx-react-lite'
import { authUserStore, carStore } from '@/app/store/mobxStore'
import { ERequestStatus } from '@/shared/enums'
import { CarEditFormModel } from '@/widgets/CarEditForm'

interface ICarsComponent {
  cars: ICar[] | null
}


export const CarsComponent: FC<ICarsComponent> = observer((
  {
    cars
  }
) => {

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentCar, setCurrentCar] = useState<ICar | null>(null)

  const isAdmin = useMemo(() => {
    return authUserStore.isAdmin();
  }, [authUserStore]);

  return (
      <section className={styles.SCarsWrapper}>
        {carStore.isLoading && (
          <div className={styles.SSPinner}>
            <LoaderSpin size='s'/>
          </div>
        )}
        {!cars && !carStore.isLoading && <Message type='base' message='Нет данных'/>}

        { isAdmin && carStore.isReady && (
          <Button 
            theme='primary'
            onClick={() => setIsCreateOpen(true)}
            classNames={styles.SButton}
          >
            Создать тачку
          </Button>
        )}
        <ul className={styles.SCars}>
          {cars && cars.map(car => {
                return (
                    <CarModel 
                      key={car.carId}
                      car={car}
                      isAdmin={isAdmin}
                      setIsEditOpen={setIsEditOpen}
                      setCurrentCar={setCurrentCar}
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
            destroyOnClose
        >
            {isCreateOpen && (
                <CarCreateForm 
                  handleClose={setIsCreateOpen}
                />
            )}
        </Popup>
        <Popup
            title={`Редактировать тачку ${currentCar?.brand.brand} ${currentCar?.brand.model}`}
            isModalOpen={isEditOpen}
            handleClose={setIsEditOpen}
            destroyOnClose
        >
            {isEditOpen && currentCar && (
                <CarEditFormModel 
                    car={currentCar}
                    handleClose={setIsEditOpen}
                />
            )}
        </Popup>
      </section>
  )   
})