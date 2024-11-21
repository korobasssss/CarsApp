import { ICar } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { FC, useMemo, useState } from 'react'
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

        { isAdmin && (
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