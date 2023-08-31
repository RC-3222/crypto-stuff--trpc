
/** Get a formated price value (with 2 decimal places)
 * 
 * @param value a value to format
 * 
 * @returns string representing a number with 2 decimal places (or 'less than 0.01' if the number is less than 0.01)
 */
export const getValueStr = (value: number) =>
    value >= 0.01 ? value.toFixed(2) : 'less than 0.01'

/** Get a full coin title string (name + symbol(if it exists and is different from name))
 * 
 * @param currPrice name
 * @param prevPrice symbol
 * 
 * @returns coin title string
 */
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