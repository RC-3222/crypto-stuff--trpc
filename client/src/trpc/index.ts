import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '../../../server/src/index'

export { TrpcProvider } from './provider'

export const trpcReact = createTRPCReact<AppRouter>()
