import { MainLayout } from "@/entities/MainLayout"
import { CarsComponent } from "../ui/CarsComponent"
import { useEffect } from "react"
import { fetchCarCategories, fetchGetCars } from "@/shared/api"
import { notification } from 'antd';
import { carStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite";

export const CarsModel = observer(() => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGetCars();
      } catch (error) {
        notification.open({
          message: 'Ошибка получения данных тачек'
        });
      }
    };
    if (carStore.cars || carStore.isError || carStore.isLoading) return
    fetchData();
  }, [carStore.cars]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCarCategories();
      } catch (error) {
        notification.open({
          message: 'Ошибка получения данных категорий тачек'
        });
      }
    };
    if (carStore.carCategories || carStore.isError || carStore.isLoading) return 
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