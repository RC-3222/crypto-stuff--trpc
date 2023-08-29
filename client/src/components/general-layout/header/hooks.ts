import { TOP_SIZE } from '../../../constants'
import { trpcReact } from '../../../trpc'
import { CoinInfo } from '../../../types'

export const useDataGetters = () => {
    const trpcContext = trpcReact.useContext()

    const getTopCoinData = async () => {
        try {
            const { data } =
                await trpcContext.crypto.getTopCoinInfo.fetch(TOP_SIZE)
            return data as CoinInfo[]
        } catch (err) {
            console.error(err)
            return [] as CoinInfo[]
        }
    }

    return {
        getTopCoinData,
    }
}
