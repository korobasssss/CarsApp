import { Header } from "@/entities/Header"
import { ScrollWrapper } from "@/entities/ScrollWrapper"
import { CPaths } from "@/shared/constants"
import { FC, ReactNode } from "react"
import styles from './styles.module.scss'

interface IMainLayout {
    children: ReactNode
}

export const MainLayout: FC<IMainLayout> = (
    {
        children
    }
) => {
    return (
        <ScrollWrapper>
            <main className={styles.SMainLayout}>
            <Header
                paths={CPaths}
            />
                <section className={styles.SChildren}>
                    {children}
                </section>
            </main>
        </ScrollWrapper>
    )
}