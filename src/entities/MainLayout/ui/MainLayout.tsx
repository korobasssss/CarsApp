import { ScrollWrapper } from "@/entities/ScrollWrapper"
import { CPaths } from "@/shared/constants"
import { FC, ReactNode } from "react"
import styles from './styles.module.scss'
import { HeaderModel } from "@/entities/Header"

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
            <HeaderModel
                paths={CPaths}
            />
                <section className={styles.SChildren}>
                    {children}
                </section>
            </main>
        </ScrollWrapper>
    )
}