import { RouterOutputs } from '../trpc'

export type PriceHistory = RouterOutputs['crypto']['getCoinHistory']['data']

export type PortfolioItem = RouterOutputs['crypto']['getUpdatedPortfolioData']['data'][0]

export type CoinInfo = RouterOutputs['crypto']['getCoinInfo']['data']