import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoinInfo, HistoryItem } from '../../types'
import { useState } from 'react'
import { HistoryChart } from '../../components/history-chart'
import { Button } from '../../components/common/button'
import { AddCoinMenu } from '../../components/menus/add-coin-menu'

import styles from './info-page.module.scss'
import { Loader } from '../../components/common/loader'
import { coinNameStr } from '../../utils'

import { useDataGetters } from './hooks'

export const InfoPage = () => {
    const params = useParams()

    const [mainInfo, setMainInfo] = useState<CoinInfo | null>(null)
    const [historyInfo, setHistoryInfo] = useState<HistoryItem[]>([])

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const { getFullCoinData } = useDataGetters()

    const loadInfo = async () => {
        setIsLoading(true)
        const coinId = params.coinId as string
        const [coinInfo, coinHistory] = await getFullCoinData(coinId)
        setMainInfo(coinInfo)
        setHistoryInfo(coinHistory)
        setIsLoading(false)
    }

    useEffect(() => {
        loadInfo()
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && mainInfo && (
                <>
                    <h2 data-testid="coin-title" className={styles.title}>
                        {coinNameStr(mainInfo.name, mainInfo.symbol)}
                    </h2>
                    <h3
                        className={styles.price}
                    >{`Current price (USD): ${mainInfo.priceUsd}`}</h3>
                    {!!mainInfo.vwap24Hr && (
                        <h4
                            className={styles.avgPrice}
                        >{`Average price in the last 24 hours (USD): ${mainInfo.vwap24Hr}`}</h4>
                    )}
                    <h4
                        className={styles.supply}
                    >{`Available for trading: ${mainInfo.supply}`}</h4>
                    <Button
                        dataTestid="add-btn"
                        onClick={() => setIsMenuVisible(true)}
                    >
                        Add To Portfolio
                    </Button>
                    <h3
                        className={styles.historyTitle}
                    >{`Price history (USD)`}</h3>
                    {!!historyInfo.length && (
                        <HistoryChart data={historyInfo} />
                    )}
                    {isMenuVisible && (
                        <AddCoinMenu
                            coinToAdd={mainInfo}
                            onHide={() => setIsMenuVisible(false)}
                        ></AddCoinMenu>
                    )}
                </>
            )}
            {!isLoading && !mainInfo && (
                <div className={styles.noCoinInfo}>
                    <h3>Couldn't get any info about the selected coin</h3>
                </div>
            )}
        </>
    )
}
