import { FC, ReactNode } from "react"
import { ScrollWrapper } from "../ui/ScrollWrapper"
import { carStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite"
import { useLocation } from "react-router-dom"
import { EPaths } from "@/shared/enums"

interface IScrollWrapperModel {
    children: ReactNode
}

export const ScrollWrapperModel: FC<IScrollWrapperModel> = observer((
    {
        children
    }
) => {
    const { pathname } = useLocation()

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
        if (bottom && pathname === EPaths.CARS) {
            carStore.setCurrentPage()
        }
    };

    return (
        <ScrollWrapper onScroll={onScroll}>
            {children}
        </ScrollWrapper>
    )
})