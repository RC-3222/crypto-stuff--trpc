import { useCallback } from "react"
import { trpcReact } from "../trpc"
import { CoinInfo, HistoryItem, PortfolioItem } from "../types"
import { coinNameStr } from "../utils"
import { ITEMS_PER_PAGE, TOP_SIZE } from "../constants"

export const useTRPC = () => {
    const trpcContext = trpcReact.useContext()

    const getCoinInfo = useCallback(async (id: string) => {
        try {
            const { data } = await trpcContext.crypto.getCoinInfo.fetch(id)
            return data as CoinInfo
        } catch (err) {
            console.error(err)
            return null
        }
    }, [trpcContext])


    const getUpdatedPortfolioData = useCallback(async (state: PortfolioItem[]) => {
        try {
            const { data } = await trpcContext.crypto.getUpdatedPortfolioData.fetch(state);
            return data as PortfolioItem[]
        } catch (err) {
            console.error(err)
            return [] as PortfolioItem[]
        }
    }, [trpcContext])
    

    const getCoinPortfolioInfo = useCallback(async (id: string, amount: number) => {
        const coinData = await getCoinInfo(id)

        if (!coinData) return null

        const newPortfolioItemInfo = {
            id: id,
            name: coinNameStr(coinData.name, coinData.symbol),
            priceUsd: +coinData.priceUsd,
            amount: amount,
        }

        return newPortfolioItemInfo
    }, [getCoinInfo])

    const getCurrState = useCallback(async (prevState: PortfolioItem[]) => {
        const currState = await getUpdatedPortfolioData(prevState)

        return currState
    }, [getUpdatedPortfolioData])


    const getPrevState = useCallback(() => {
        const prevState: PortfolioItem[] = localStorage.prevState
            ? JSON.parse(localStorage.prevState)
            : new Array<PortfolioItem>()
        return prevState
    }, [])

    
    const getFullCoinData = useCallback(async (coinId: string) => {
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

    
    const getTopCoinData = useCallback(async () => {
        try {
            const { data } = await trpcContext.crypto.getTopCoinInfo.fetch(TOP_SIZE)
            return data as CoinInfo[]
        } catch (err) {
            console.error(err)
            return [] as CoinInfo[]
        }
    }, [trpcContext])

    
    const getPageData = useCallback(async (pageNumber: number) => {
        try {
            const pageData = await trpcContext.crypto.getPageData.fetch({ pageNumber: pageNumber, itemsPerPage: ITEMS_PER_PAGE })
            return pageData
        } catch (err) {
            console.error(err)
            return [] as CoinInfo[]
        }
    }, [trpcContext])

    return {
        getCurrState,
        getPrevState,
        getCoinPortfolioInfo,
        getFullCoinData,
        getTopCoinData,
        getPageData
    }
}