import express from 'express'
import cors from 'cors'

import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router/index.js'
import { createContext } from './context.js'

const app = express()

app.use(cors())

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
)

export type AppRouter = typeof appRouter

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})