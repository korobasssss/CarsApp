import { ScrollWrapper } from "@/entities/ScrollWrapper"
import { CPaths } from "@/shared/constants"
import { FC, ReactNode } from "react"
import styles from './styles.module.scss'
import { HeaderModel } from "@/entities/Header"
import { observer } from "mobx-react-lite"
import { authUserStore, carStore, usersStore } from "@/app/store/mobxStore"
import { Loader } from "ui-kit-cars/main"

interface IMainLayout {
    children: ReactNode
}

export const MainLayout: FC<IMainLayout> = observer((
    {
        children
    }
) => {
    return (
        <ScrollWrapper>
            <main className={styles.SMainLayout}>
            <HeaderModel
                paths={CPaths}
            />
                <section className={styles.SChildren}>
                    {children}
                </section>
            </main>
            {(authUserStore.isLoading || usersStore.isLoading || carStore.isLoading) && (
                <Loader/>
            )}
        </ScrollWrapper>
    )
})