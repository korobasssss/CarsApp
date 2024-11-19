import { FC, ReactNode } from "react"
import { ScrollWrapper } from "../ui/ScrollWrapper"
import { carStore } from "@/app/store/mobxStore"
import { observer } from "mobx-react-lite"

interface IScrollWrapperModel {
    children: ReactNode
}

export const ScrollWrapperModel: FC<IScrollWrapperModel> = observer((
    {
        children
    }
) => {

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
        if (bottom) {
            carStore.setCurrentPage()
        }
    };

    return (
        <ScrollWrapper onScroll={onScroll}>
            {children}
        </ScrollWrapper>
    )
})