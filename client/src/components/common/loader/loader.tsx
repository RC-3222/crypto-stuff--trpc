import styles from './loader.module.scss'

type LoaderProps = {
    hasAnimatedColor?:boolean
}

export const Loader = ({hasAnimatedColor = false}:LoaderProps) => (
    <div data-testid="loader" className={`${styles.spinner} ${hasAnimatedColor ? styles.animatedColor : styles.notAnimatedColor}`}></div>
)
