import { useContext, useEffect, useMemo, useState } from 'react'

import { CoinInfo, PortfolioItem } from '../../../types'

import { Button } from '../../common/button'
import { ViewPorfolioMenu } from '../../menus/view-portfolio-menu'

import { PortfolioContext } from '../../../context'

import styles from './header.module.scss'
import { getCoinNameStr, getPriceDiffData, getValueStr } from '../../../utils'
import { useDataGetters } from './hooks'

export const Header = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isLoadingTopData, setIsLoadingTopData] = useState(true)
    const [topCoinData, setTopCoinData] = useState<CoinInfo[]>([])

    const context = useContext(PortfolioContext)

    const getPrice = (portfolio: PortfolioItem[]) =>
        portfolio.reduce(
            (acc, currItem) => acc + currItem.amount * currItem.priceUsd,
            0
        )

    const [prevPrice, setPrevPrice] = useState(0)
    const [currPrice, setCurrPrice] = useState(0)

    useEffect(() => {
        setPrevPrice(getPrice(context.prevState))
    }, [context.prevState])

    useEffect(() => {
        setCurrPrice(getPrice(context.currState))
    }, [context.currState])

    const priceStyle = useMemo(
        () =>
            currPrice > prevPrice
                ? styles['portfolioBlock__priceDiff_pos']
                : styles['portfolioBlock__priceDiff_neg'],
        [currPrice, prevPrice]
    )
    const priceStr = useMemo(() => {
        const {priceDiff, priceDiffPercent} = getPriceDiffData(currPrice, prevPrice)
        if (!priceDiff) return ''

        return ` ${currPrice > prevPrice ? '+' : '-'} ${Math.abs(priceDiff).toFixed(2)} (${priceDiffPercent.toFixed(2)} %)`
    }, [currPrice, prevPrice])

    const { getTopCoinData } = useDataGetters()

    const loadData = async () => {
        setIsLoadingTopData(true)
        try {
            const data = await getTopCoinData()
            setTopCoinData(data)
        } catch (err) {
            console.error(err)
        }
        setIsLoadingTopData(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <header className={styles.header}>
            <div className={styles.topCoinBlock}>
                <span>TOP-3 Popular Coins</span>
                {isLoadingTopData && <span>Loading data...</span>}
                {!isLoadingTopData && !!topCoinData.length && (
                    <ul className={styles.topCoinContainer}>
                        {topCoinData.map((item) => (
                            <li
                                data-testid="top-coin"
                                className={styles.topCoin}
                                key={item.id}
                            >
                                <span>
                                    {getCoinNameStr(item.name, item.symbol)}
                                </span>
                                {' - '}
                                <span>{getValueStr(+item.priceUsd)} USD</span>
                            </li>
                        ))}
                    </ul>
                )}
                {!isLoadingTopData && !topCoinData.length && (
                    <span>No data</span>
                )}
            </div>
            <div className={styles.portfolioBlock}>
                <div className={styles.portfolioBlock__labels}>
                    <span>Portfolio Info</span>
                    {context.isUpdating ? (
                        <span>Updating...</span>
                    ) : (
                        <span>
                            <span data-testid="curr-price">
                                {currPrice.toFixed(2)} USD
                            </span>
                            {priceStr && (
                                <span
                                    data-testid="curr-diff"
                                    className={priceStyle}
                                >
                                    {priceStr}
                                </span>
                            )}
                        </span>
                    )}
                </div>
                <div className={styles.portfolioBlock__controls}>
                    <Button
                        dataTestid="more-info-btn"
                        onClick={() => setIsMenuVisible(true)}
                    >
                        More Info
                    </Button>
                    <Button
                        dataTestid="refresh-diff-btn"
                        onClick={() => context.refreshPriceDiff()}
                    >
                        Refresh
                    </Button>
                </div>
            </div>
            {isMenuVisible && (
                <ViewPorfolioMenu onHide={() => setIsMenuVisible(false)} />
            )}
        </header>
    )
}
