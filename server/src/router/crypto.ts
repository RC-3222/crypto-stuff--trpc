import { z } from 'zod'
import { router, publicProcedure } from '../trpc.js'
import { TRPCError } from '@trpc/server'
import {
    getCoinInfo,
    getCoinHistory,
    getTopCoinData,
    getPageData,
    getMultipleCoinInfos,
} from '../api/index.js'
import { PortfolioItem } from '../types/index.js'

export const cryptoRouter = router({
    getTopCoinInfo: publicProcedure
    .input(z.number())
    .query(async (req) => {
        const { input } = req
        
        try {
            const res = await getTopCoinData(input)

            if (!res) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Couldn't get any info about the most popular currencies`,
                })
            }

            return res
        } catch (err) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `Couldn't get any info about the most popular currencies`,
            })
        }
    }),
    getCoinInfo: publicProcedure
        .input(z.string())
        .query(async (req) => {
            const { input } = req
            try {
                const res = await getCoinInfo(input)

                if (!res) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: `Couldn't get any data for the specified currency (ID = ${input})`,
                    })
                }

                return res
            } catch (err) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Couldn't get any data for the specified currency (ID = ${input})`,
                })
            }
        }),
    getCoinHistory: publicProcedure
        .input(z.string())
        .query(async (req) => {
            const { input } = req
            try {
                const res = await getCoinHistory(input)

                if (!res) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: `Couldn't get any history for the specified currency (ID = ${input})`,
                    })
                }

                return res
            } catch (err) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Couldn't get any history for the specified currency (ID = ${input})`,
                })
            }
        }),
    getPageData: publicProcedure
        .input(
            z.object({
                pageNumber: z.number(),
                itemsPerPage: z.number(),
            })
        )
        .query(async (req) => {
            const {input: { itemsPerPage, pageNumber }} = req

            try {
                const res = await getPageData(pageNumber, itemsPerPage)

                if (!res) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: `Couldn't get any data for the specified page (pageNum = ${pageNumber})`,
                    })
                }

                return res
            } catch (err) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Couldn't get any data for the specified page (pageNum = ${pageNumber})`,
                })
            }
        }),
    getUpdatedPortfolioData: publicProcedure
        .input(z.array(z.object({
            id:z.string(),
            amount:z.number(),
        })))
        .query(async (req) => {
            const {
                input:prevData,
            } = req

            try {
                
                const res = await getMultipleCoinInfos(prevData.map((item)=>item.id))

                if (!res?.data.length) {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: `Couldn't get any info for the specified portfolio`,
                    })
                }

                return {data: res.data.map((item, ind) => ({
                    id:item.id, 
                    name:`${item.name}${item.symbol ? ` (${item.symbol})` : ''}`, 
                    priceUsd:+item.priceUsd,
                    amount:prevData[ind].amount,
                } as PortfolioItem))}
            } catch (err) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Couldn't get any info for the specified portfolio`,
                })
            }
        }),
})
