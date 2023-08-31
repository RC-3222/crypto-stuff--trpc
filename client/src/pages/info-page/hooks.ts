import { trpcReact } from '../../trpc'
import { PriceHistory, CoinInfo } from '../../types'

export const useDataGetters = () => {
    const trpcContext = trpcReact.useContext()

    const getFullCoinData = async (coinId: string) => {
        try {
            const [{ data: coinInfo }, { data: priceHistory }] =
                await Promise.all([
                    trpcContext.crypto.getCoinInfo.fetch(coinId),
                    trpcContext.crypto.getCoinHistory.fetch(coinId),
                ])
            return [coinInfo, priceHistory] as [CoinInfo | null, PriceHistory]
        } catch (err) {
            console.error(err)
            return [null, []] as [
                CoinInfo | null,
                PriceHistory,
            ]
        }
    }

    return {
        getFullCoinData,
    }
}
