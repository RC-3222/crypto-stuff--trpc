import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CoinInfo, HistoryItem } from '../../types'
import { useState } from 'react'
import { HistoryChart } from '../../components/history-chart'
import { Button } from '../../components/common/button'
import { AddCoinMenu } from '../../components/menus/add-coin-menu'
import { Heading } from '../../components/common/heading'

import styles from './info-page.module.scss'
import { Loader } from '../../components/common/loader'
import { getCoinNameStr } from '../../utils'

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
                    <Heading dataTestId="coin-title">{getCoinNameStr(mainInfo.name, mainInfo.symbol)}</Heading>
                    <Heading variant='h3' >{`Current price (USD): ${mainInfo.priceUsd}`}</Heading>
                    {!!mainInfo.vwap24Hr && <Heading variant='h3'>{`Average price in the last 24 hours (USD): ${mainInfo.vwap24Hr}`}</Heading>}
                    <Heading variant='h4'>{`Available for trading: ${mainInfo.supply}`}</Heading>
                    <Button
                        dataTestid="add-btn"
                        onClick={() => setIsMenuVisible(true)}
                    >
                        Add To Portfolio
                    </Button>
                    <Heading variant='h3'>{`Price history (USD)`}</Heading>
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
