import { MainLayout } from "@/entities/MainLayout"
import { useNavigate } from "react-router-dom"
import styles from './styles.module.scss'
import { Button } from "ui-kit-cars/main"
import { EPaths } from "@/shared/enums"

export const Forbidden = () => {
    const navigate = useNavigate()

    return (
        <MainLayout>
            <div
                className={styles.SForbidden}
            >
                <h1
                    className={styles.STitle}
                >
                    Доступ запрещен :(
                </h1>
                <p
                    className={styles.SMessage}
                >
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