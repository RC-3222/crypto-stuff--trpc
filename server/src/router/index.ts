import { router } from '../trpc.js'
import { cryptoRouter } from './crypto.js'

export const appRouter = router({
    crypto: cryptoRouter,
})
