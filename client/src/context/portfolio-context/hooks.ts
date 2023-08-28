import { trpcReact } from '../../trpc'
import { CoinInfo, PortfolioItem } from '../../types'
import { coinNameStr } from '../../utils'

export const useDataGetters = () => {
    const trpcContext = trpcReact.useContext()

    const getCoinInfo = async (id: string) => {
        try {
            const { data } = await trpcContext.crypto.getCoinInfo.fetch(id)
            return data as CoinInfo
        } catch (err) {
            console.error(err)
            return null
        }
    }

    const getCoinPortfolioInfo = async (id: string, amount: number) => {
        const coinData = await getCoinInfo(id)

        if (!coinData) return null

        const newPortfolioItemInfo = {
            id: id,
            name: coinNameStr(coinData.name, coinData.symbol),
            priceUsd: +coinData.priceUsd,
            amount: amount,
        }

        return newPortfolioItemInfo
    }

    const getCurrPortfolioState = async (prevState: PortfolioItem[]) => {
        try {
            const { data } = await trpcContext.crypto.getUpdatedPortfolioData.fetch(prevState)
            return data as PortfolioItem[]
        } catch (err) {
            console.error(err)
            return [] as PortfolioItem[]
        }
    }

    const getPrevPortfolioState = () => {
        const prevState: PortfolioItem[] = localStorage.prevState
            ? JSON.parse(localStorage.prevState)
            : new Array<PortfolioItem>()
        return prevState
    }

    return {
        getCoinPortfolioInfo,
        getCurrPortfolioState,
        getPrevPortfolioState,
    }
}
