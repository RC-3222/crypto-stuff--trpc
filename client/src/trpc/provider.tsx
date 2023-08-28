import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { PropsWithChildren, useState } from 'react'
import { trpcReact } from '.'

export function TrpcProvider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpcReact.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:4000/trpc',
                }),
            ],
        })
    )
    return (
        <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpcReact.Provider>
    )
}
