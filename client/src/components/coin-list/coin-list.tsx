import { CoinInfo } from '../../types'
import { Coin } from './coin'

import styles from './coin-list.module.scss'

type CoinListProps = {
    items: CoinInfo[]
}

export const CoinList = ({ items }: CoinListProps) => {
    return (
        <ul data-testid="coin-list" className={styles.coinList}>
            {items.map((item) => (
                <Coin key={item.id} item={item} />
            ))}
        </ul>
    )
}
