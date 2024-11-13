import { FC, ReactNode } from "react";
import styles from './styles.module.scss'
import cx from 'classnames'
import { IClassNames } from "@/shared/interfaces";

interface IScrollWrapper
extends IClassNames {
    children: ReactNode;
}

export const ScrollWrapper: FC<IScrollWrapper> = (
    {
        classnames,
        children
    }
) => {

    return (
        <div className={cx(
            styles.scroll_wrapper,
            classnames
        )}>
            {children}
        </div>
    )
}