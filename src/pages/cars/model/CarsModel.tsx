import { MainLayout } from "@/entities/MainLayout"
import { CarsComponent } from "../ui/CarsComponent"
import { useEffect } from "react"
import { fetchCarCategories, fetchGetCars } from "@/shared/api"
import { notification } from 'antd';
import { carStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite";
import { CPageSize } from "@/shared/constants";

export const CarsModel = observer(() => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchGetCars(carStore.currentPage, CPageSize);
      } catch (error) {
        notification.open({
          message: 'Ошибка получения данных тачек'
        });
      }
    };
    if (carStore.isError || carStore.isLoading || carStore.cars && carStore.currentPage === 1) return
    fetchData();
  }, [carStore.currentPage]);

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