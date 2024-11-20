import { MainLayout } from "@/entities/MainLayout"
import { CarsComponent } from "../ui/CarsComponent"
import { useEffect } from "react"
import { fetchCarCategories, fetchGetCars } from "@/shared/api"
import { carStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite";
import { CPageSize } from "@/shared/constants";
import { Notification } from "ui-kit-cars/main";

export const CarsModel = observer(() => {

  useEffect(() => {
    carStore.setCurrentPage(1)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGetCars(carStore.currentPage, CPageSize);
      } catch (error) {
        Notification({
          message: 'Ошибка получения данных тачек',
          description: 'Произошла ошибка при выходе из аккаунта'
        })
      }
    };
    
    if (carStore.isLoading) return
    fetchData();
  }, [carStore.currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCarCategories();
      } catch (error) {
        Notification({
          message: 'Ошибка получения данных категорий тачек',
          description: 'Произошла ошибка при выходе из аккаунта'
        })
      }
    };
    
    if (carStore.carCategories || carStore.isLoading) return 
    fetchData();
  }, [carStore.carCategories, carStore.cars]);

  return (
    <MainLayout>
        <CarsComponent
            cars={carStore.cars}
        />
    </MainLayout>
  )
})