import { valueStr, coinNameStr } from ".";

describe('testing valueStr utility function', () => {

    test("with more than 2 decimal digits", () => {
        const val = 2344.5667
        expect(valueStr(val)).toEqual("2344.57");
    });

    test("with less than 2 decimal digits", () => {
        const val = 2344.5
        expect(valueStr(val)).toEqual("2344.50");
    });

    test("without any decimal digits", () => {
        const val = 2344
        expect(valueStr(val)).toEqual("2344.00");
    });
})



describe('testing coinNameStr utility function', () => {

    test("without currency symbol", () => {
        const val = {
            name: "Bitcoin",
        }

        expect(coinNameStr(val.name)).toEqual("Bitcoin");
    });

    test("with currency symbol", () => {
        const val = {
            name: "Bitcoin",
            symbol: "BTC"
        }

        expect(coinNameStr(val.name, val.symbol)).toEqual("Bitcoin (BTC)");
    });
})