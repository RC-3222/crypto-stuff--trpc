import { PropsWithChildren, createContext, useCallback, useReducer, useState } from 'react'
import { ActionType, PortfolioReducer } from './reducer'
import { CoinInfo, PortfolioItem } from '../../types'
import { trpcReact } from '../../trpc'
import { coinNameStr } from '../../utils'

type InitialPortfolioState = {
    currState: PortfolioItem[]
    prevState: PortfolioItem[]
    init: () => Promise<void>
    isUpdating: boolean
    refreshPriceDiff: () => Promise<void>
    addItem: (id: string, amount: number) => Promise<void>
    removeItem: (id: string) => Promise<void>
}

const initialState: InitialPortfolioState = {
    currState: [],
    prevState: [],
    isUpdating: false,
    init: async () => { },
    refreshPriceDiff: async () => { },
    addItem: async (id: string) => { },
    removeItem: async (id: string) => { },
}

export const PortfolioContext = createContext(initialState)

export const PortfolioContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(PortfolioReducer, initialState)
    const [isUpdating, setIsUpdating] = useState(false)

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


    const init = useCallback(async () => {
        setIsUpdating(true)
        const prevState = getPrevState()
        const currState = await getCurrState(prevState)

        dispatch({ type: ActionType.Init, payload: { currState, prevState } })

        setIsUpdating(false)
    }, [getPrevState, getCurrState])


    const refreshPriceDiff = useCallback(async (wasUpdating = false) => {
        if (!wasUpdating) setIsUpdating(true)

        const currState = await getCurrState(state.prevState)
        dispatch({ type: ActionType.UpdateCurrState, payload: currState })

        if (!wasUpdating) setIsUpdating(false)
    }, [state.prevState, getCurrState])


    const addItem = useCallback(async (id: string, amount: number) => {
        setIsUpdating(true)

        const [portfolioItem] = await Promise.all([
            getCoinPortfolioInfo(id, amount),
            refreshPriceDiff(true),
        ])

        if (!portfolioItem) {
            setIsUpdating(false)
            return
        }

        dispatch({ type: ActionType.AddItem, payload: portfolioItem })

        setIsUpdating(false)
    }, [getCoinPortfolioInfo, refreshPriceDiff])


    const removeItem = useCallback(async (id: string) => {
        setIsUpdating(true)

        await refreshPriceDiff(true)

        dispatch({ type: ActionType.RemoveItem, payload: id })

        setIsUpdating(false)
    }, [refreshPriceDiff])


    return (
        <PortfolioContext.Provider
            value={{
                currState: state.currState,
                prevState: state.prevState,
                isUpdating,
                init,
                refreshPriceDiff,
                addItem,
                removeItem,
            }}
        >
            {children}
        </PortfolioContext.Provider>
    )
}
