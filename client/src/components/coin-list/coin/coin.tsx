import { Link } from 'react-router-dom'
import { CoinInfo } from '../../../types'

import styles from './coin.module.scss'
import { Button } from '../../common/button'
import { AddCoinMenu } from '../../menus/add-coin-menu'
import { useMemo, useState } from 'react'
import { getCoinNameStr, getValueStr } from '../../../utils'

type CoinProps = {
    item: CoinInfo
}

export const Coin = ({ item }: CoinProps) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const nameStr = useMemo(
        () => getCoinNameStr(item.name, item.symbol),
        [item.name, item.symbol]
    )
    const valStr = useMemo(() => getValueStr(+item.priceUsd), [item.priceUsd])
    const supplyStr = useMemo(
        () => item.supply.replace(/\.?0+$/g, ''),
        [item.supply]
    )

    return (
        <li data-testid="coin-item" className={styles.coinItem}>
            <Link data-testid='coin-info-link' to={`/coins/${item.id}`}>
                <span>{nameStr}</span>
                {' - '}
                <span>{`${valStr} USD`}</span>
                {' - '}
                <span>{`${supplyStr} available for trading`}</span>
            </Link>
            <Button dataTestid="add-btn" onClick={() => setIsMenuVisible(true)}>
                +
            </Button>
            {isMenuVisible && (
                <AddCoinMenu
                    coinToAdd={item}
                    onHide={() => setIsMenuVisible(false)}
                />
            )}
        </li>
    )
}
