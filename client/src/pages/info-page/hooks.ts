import { trpcReact } from '../../trpc'
import { HistoryItem, CoinInfo } from '../../types'

export const useDataGetters = () => {
    const trpcContext = trpcReact.useContext()

    const getFullCoinData = async (coinId: string) => {
        try {
            const [{ data: CoinInfo }, { data: coinHistory }] =
                await Promise.all([
                    trpcContext.crypto.getCoinInfo.fetch(coinId),
                    trpcContext.crypto.getCoinHistory.fetch(coinId),
                ])
            return [CoinInfo, coinHistory] as [
                CoinInfo | null,
                HistoryItem[],
            ]
        } catch (err) {
            console.error(err)
            return [null, new Array<HistoryItem>()] as [
                CoinInfo | null,
                HistoryItem[],
            ]
        }
    }

    return {
        getFullCoinData,
    }
}
