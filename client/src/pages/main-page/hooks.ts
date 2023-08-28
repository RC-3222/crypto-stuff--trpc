import { trpcReact } from '../../trpc'
import { CoinInfo } from '../../types'
import { ITEMS_PER_PAGE } from '../../constants'

export const useDataGetters = () => {
    const trpcContext = trpcReact.useContext()

    const getPageData = async (pageNumber: number) => {
        try {
            const pageData = await trpcContext.crypto.getPageData.fetch({
                pageNumber: pageNumber,
                itemsPerPage: ITEMS_PER_PAGE,
            })
            return pageData
        } catch (err) {
            console.error(err)
            return [] as CoinInfo[]
        }
    }

    return {
        getPageData,
    }
}
