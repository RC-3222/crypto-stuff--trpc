import { apiRequest } from './utils.js'
import { API_BASE } from '../constant/api.js'
import { CoinInfo, HistoryItem } from '../types/index.js'

export async function getTopCoinData(topSize:number) {
    try {
        const result = await apiRequest(`${API_BASE}/assets?limit=${topSize}`) as {data:CoinInfo[]}
        return result
    } catch (err) {
        throw err
    }
}

export async function getPageData(pageNum: number, itemsPerPage: number) {
    try {
        const {data} = await apiRequest(
            `${API_BASE}/assets?limit=${itemsPerPage}&offset=${
                itemsPerPage * pageNum
            }`
        ) as {data:CoinInfo[]}
        return data
    } catch (err) {
        throw err
    }
}

export async function getCoinInfo(id: string) {
    try {
        const result = await apiRequest(`${API_BASE}/assets/${id}`) as {data:CoinInfo}
        return result
    } catch (err) {
        throw err
    }
}

export async function getMultipleCoinInfos(ids: string[]) {
    try {
        const result = (await Promise.all(
            ids.map((id) => apiRequest(`${API_BASE}/assets/${id}`))
        )) as { data: CoinInfo }[]
        return {data:result.map(({data}) => data)}
    } catch (err) {
        throw err
    }
}

export async function getCoinHistory(id: string) {
    try {
        const result = await apiRequest(
            `${API_BASE}/assets/${id}/history?interval=d1`
        ) as {data: HistoryItem[]}
        return result
    } catch (err) {
        throw err
    }
}
