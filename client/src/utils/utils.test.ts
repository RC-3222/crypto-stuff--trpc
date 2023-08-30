import { getCoinNameStr, getValueStr, getPriceDiffData } from '.'

describe('testing getValueStr utility function', () => {
    test('with more than 2 decimal digits', () => {
        const val = 2344.5667
        expect(getValueStr(val)).toEqual('2344.57')
    })

    test('with less than 2 decimal digits', () => {
        const val = 2344.5
        expect(getValueStr(val)).toEqual('2344.50')
    })

    test('without any decimal digits', () => {
        const val = 2344
        expect(getValueStr(val)).toEqual('2344.00')
    })
})

describe('testing getCoinNameStr utility function', () => {
    test('without currency symbol', () => {
        const val = {
            name: 'Bitcoin',
        }

        expect(getCoinNameStr(val.name)).toEqual('Bitcoin')
    })

    test('with currency symbol', () => {
        const val = {
            name: 'Bitcoin',
            symbol: 'BTC',
        }

        expect(getCoinNameStr(val.name, val.symbol)).toEqual('Bitcoin (BTC)')
    })
})

describe('testing getPriceDiffData utility function', () => {
    test('currPrice > prevPrice', () => {
        expect(getPriceDiffData(100, 50)).toEqual({priceDiff:50, priceDiffPercent:100})
    })

    test('currPrice = prevPrice', () => {
        expect(getPriceDiffData(50, 50)).toEqual({priceDiff:0, priceDiffPercent:0})
    })
    
    test('currPrice < prevPrice', () => {
        expect(getPriceDiffData(0, 50)).toEqual({priceDiff:50, priceDiffPercent:100})
    })
})