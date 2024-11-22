import { MainLayout } from "@/entities/MainLayout"
import { CarsComponent } from "../ui/CarsComponent"
import { useEffect } from "react"
import { carStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite";
import { Notification } from "ui-kit-cars/main";

export const CarsModel = observer(() => {

  useEffect(() => {
    carStore.setCurrentPage(1)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await carStore.setCars()
      } catch (error) {
        Notification({
          message: 'Ошибка получения данных тачек'
        })
      }
    };
    
    if (carStore.isLoading) return
    fetchData();
  }, [carStore.currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await carStore.setCarCategories();
      } catch (error) {
        Notification({
          message: 'Ошибка получения данных категорий тачек'
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