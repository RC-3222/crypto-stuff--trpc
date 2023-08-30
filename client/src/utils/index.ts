export const getValueStr = (value: number) =>
    value >= 0.01 ? value.toFixed(2) : 'less than 0.01'

export const getCoinNameStr = (name: string, symbol: string | null = null) =>
    !!symbol && symbol !== name ? `${name} (${symbol})` : `${name}`

/** Get price difference data (absolute values)
 * 
 * @param currPrice current price value
 * @param prevPrice previous price value
 * 
 * @returns price difference data (absolute values)
 */
export const getPriceDiffData = (currPrice: number, prevPrice:number) => {
    const priceDiff = Math.abs(currPrice - prevPrice)

    if (!priceDiff) return {priceDiff:0, priceDiffPercent:0}
    
    const priceDiffPercent = priceDiff / prevPrice * 100

    return {priceDiff, priceDiffPercent}
}