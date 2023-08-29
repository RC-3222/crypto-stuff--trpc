import { MouseEventHandler, PropsWithChildren } from 'react'

import styles from './button.module.scss'

type ButtonProps = PropsWithChildren & {
    onClick?: MouseEventHandler
    type?: 'button' | 'submit' | 'reset'
    variant?: 'green' | 'red'
    dataTestid?: string
}

export const Button = ({
    onClick,
    children,
    variant = 'green',
    type,
    dataTestid,
}: ButtonProps) => {
    return (
        <button
            data-testid={dataTestid}
            type={type}
            className={`${styles.btn} ${styles[variant]}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
