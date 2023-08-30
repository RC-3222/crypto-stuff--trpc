import { PropsWithChildren } from "react"

import styles from './heading.module.scss'

type HeadingProps = {
    variant?: 'h2' | 'h3' | 'h4',
    dataTestId?: string
} & PropsWithChildren

export const Heading = ({variant = 'h2', children, dataTestId}:HeadingProps) => {
    switch (variant) {
        default:
        case 'h2': {
            return <h2 data-testid={dataTestId} className={styles.h2}>{children}</h2>
        }
        case 'h3': {
            return <h3 data-testid={dataTestId} className={styles.h3}>{children}</h3>
        }
        case 'h4': {
            return <h4 data-testid={dataTestId} className={styles.h4}>{children}</h4>
        }
    }
}