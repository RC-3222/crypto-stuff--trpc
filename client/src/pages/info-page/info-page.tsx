import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoinInfo, HistoryItem } from '../../types'
import { useState } from 'react'
import { HistoryChart } from '../../components/history-chart'
import { Button } from '../../components/common/button'
import { AddCoinMenu } from '../../components/menus/add-coin-menu'

import styles from './info-page.module.scss'
import { Loader } from '../../components/common/loader'
import { coinNameStr } from '../../utils'

import { trpcReact } from '../../trpc'

export const InfoPage = () => {
    const params = useParams()

    const [mainInfo, setMainInfo] = useState<CoinInfo | null>(null)
    const [historyInfo, setHistoryInfo] = useState<HistoryItem[]>([])

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const trpcContext = trpcReact.useContext()

    const getData = useCallback(async (coinId: string) => {
        try {
            const [{ data: CoinInfo }, { data: coinHistory }] = await Promise.all([
                trpcContext.crypto.getCoinInfo.fetch(coinId),
                trpcContext.crypto.getCoinHistory.fetch(coinId)
            ])
            return [CoinInfo, coinHistory] as [CoinInfo | null, HistoryItem[]]
        } catch (err) {
            console.error(err)
            return [null, new Array<HistoryItem>()] as [CoinInfo | null, HistoryItem[]]
        }
    }, [trpcContext])

    const loadInfo = async () => {
        setIsLoading(true)
        const coinId = params.coinId as string
        const [coinInfo, coinHistory] = await getData(coinId)
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
                    <h2 className={styles.title}>
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
                    <Button onClick={() => setIsMenuVisible(true)}>
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
