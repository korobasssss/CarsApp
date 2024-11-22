import { MainLayout } from "@/entities/MainLayout"
import { useNavigate } from "react-router-dom"
import styles from './styles.module.scss'
import { Button } from "ui-kit-cars/main"
import { EPaths } from "@/shared/enums"

export const Error = () => {
    const navigate = useNavigate()

    return (
        <MainLayout>
            <div className={styles.SError}>
                <h1 className={styles.STitle}>
                    Произошла ошибка :(
                </h1>
                <p className={styles.SMessage}>
                    Перейдите на 
                    <Button
                        theme='none'
                        onClick={() => navigate(EPaths.MAIN)}
                    >
                        главную
                    </Button>
                </p>
            </div>
        </MainLayout>
    )
}