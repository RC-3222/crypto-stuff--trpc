import { createTRPCReact } from '@trpc/react-query'

import type { inferRouterOutputs } from '@trpc/server'

import type { AppRouter } from '../../../server/src/index'

export { TrpcProvider } from './provider'

export type RouterOutputs = inferRouterOutputs<AppRouter>

export const trpcReact = createTRPCReact<AppRouter>()
