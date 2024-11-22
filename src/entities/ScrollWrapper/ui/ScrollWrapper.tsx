import { FC, ReactNode } from "react";
import styles from './styles.module.scss'
import cx from 'classnames'
import { IClassNames } from "@/shared/interfaces";

interface IScrollWrapper
extends IClassNames {
    children: ReactNode;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void
}

export const ScrollWrapper: FC<IScrollWrapper> = (
    {
        classnames,
        children,
        onScroll
    }
) => {

    return (
        <div 
            className={cx(
                styles.scroll_wrapper,
                classnames
            )}
            onScroll={onScroll}
        >
            {children}
        </div>
    )
}