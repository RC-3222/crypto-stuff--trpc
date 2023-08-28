export type HistoryItem = {
    priceUsd: string
    time: number
}
export type PortfolioItem = {
    id: string
    name: string
    amount: number
    priceUsd: number
}
export type CoinInfo = {
    id: string
    rank: string
    supply: string
    symbol: string
    name: string
    priceUsd: string
    vwap24Hr: string | null
}