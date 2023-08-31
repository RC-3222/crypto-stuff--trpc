import { BASE_SERVER_URL } from '../../support/constants'

const localStorageData = [
    {
        id: 'tether',
        name: 'Tether (USDT)',
        priceUsd: 1.00022,
        amount: 5,
    },
    {
        id: 'bitcoin',
        name: 'Bitcoin (BTC)',
        priceUsd: 32670.22,
        amount: 18.5,
    },
    {
        id: 'dogecoin',
        name: 'Dogecoin (DOGE)',
        priceUsd: 0.56,
        amount: 35555,
    },
    {
        id: 'unus-sed-leo',
        name: 'UNUS SED LEO (LEO)',
        priceUsd: 3.66,
        amount: 234,
    },
    {
        id: 'xrp',
        name: 'XRP (XRP)',
        priceUsd: 0.5,
        amount: 15,
    },
]

const viewportDimensions = [
    {
        width: 375,
        height: 812,
    },

    {
        width: 1440,
        height: 900,
    },

    {
        width: 1920,
        height: 1080,
    },
]

describe('main page visual tests', () => {
    beforeEach(() => {
        cy.visit('/')
        window.localStorage.setItem(
            'prevState',
            JSON.stringify(localStorageData)
        )
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getPageData,crypto.getUpdatedPortfolioData*`,
            { fixture: 'initial-main-page-data--filled.json' }
        ).as('getData')

        cy.wait('@getData')
    })

    for (const { width, height } of viewportDimensions) {
        it(`${width}x${height}`, () => {

            cy.viewport(width, height)

            cy.wait(500)

            cy.screenshot({ capture: 'fullPage', overwrite: true })

            cy.get('span[data-testid="curr-diff"]').should(
                'have.css',
                'color',
                'rgb(236, 55, 19)'
            )
        })
    }
})

describe('info page visual tests', () => {
    beforeEach(() => {
        cy.visit('/#/coins/bitcoin')
        window.localStorage.setItem(
            'prevState',
            JSON.stringify(localStorageData)
        )
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getCoinInfo,crypto.getCoinHistory,crypto.getUpdatedPortfolioData*`,
            { fixture: 'initial-info-page-data--filled.json' }
        ).as('getData')

        cy.wait('@getData')
    })
    for (const { width, height } of viewportDimensions) {
        it(`${width}x${height}`, () => {
            cy.viewport(width, height)
            
            // to ensure that the chart is fully (or at least mostly) drawn (since it is actually animated)
            cy.wait(2000)
            
            cy.screenshot({ capture: 'fullPage', overwrite: true })

            cy.get('span[data-testid="curr-diff"]').should(
                'have.css',
                'color',
                'rgb(236, 55, 19)'
            )
            cy.get('button[data-testid="add-btn"]').should(
                'have.css',
                'background-color',
                'rgb(0, 128, 85)'
            )
        })
    }
})

describe('portfolio info modal tests', () => {
    beforeEach(() => {
        cy.visit('/#/coins/bitcoin')
        window.localStorage.setItem(
            'prevState',
            JSON.stringify(localStorageData)
        )
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getCoinInfo,crypto.getCoinHistory,crypto.getUpdatedPortfolioData*`,
            { fixture: 'initial-info-page-data--filled.json' }
        ).as('getData')

        cy.wait('@getData')
    })

    for (const { width, height } of viewportDimensions) {
        it(`${width}x${height}`, () => {

            cy.viewport(width, height)

            cy.get('button[data-testid="more-info-btn"]').click();

            cy.wait(300)

            cy.screenshot({ capture: 'viewport', overwrite: true })

            cy.get('button[data-testid="remove-btn"]').should(
                'have.css',
                'background-color',
                'rgb(0, 128, 85)'
            )
            
            cy.get('button[data-testid="close-modal-btn"]').should('be.visible')
        })
    }
})


describe('add coin modal tests', () => {
    beforeEach(() => {
        cy.visit('/#/coins/bitcoin')
        window.localStorage.setItem(
            'prevState',
            JSON.stringify(localStorageData)
        )
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getCoinInfo,crypto.getCoinHistory,crypto.getUpdatedPortfolioData*`,
            { fixture: 'initial-info-page-data--filled.json' }
        ).as('getData')

        cy.wait('@getData')
    })

    for (const { width, height } of viewportDimensions) {
        it(`${width}x${height}`, () => {

            cy.viewport(width, height)

            cy.get('button[data-testid="add-btn"]').click();

            cy.wait(300)

            cy.screenshot(`add coin modal tests -- ${width}x${height} - no validation error`,{ capture: 'viewport', overwrite: true })

            cy.get('button[data-testid="submit-btn"]').as('submBtn')

            cy.get('@submBtn').click()

            cy.wait(300)

            cy.screenshot(`add coin modal tests -- ${width}x${height} - validation error`,{ capture: 'viewport', overwrite: true })

            cy.get('@submBtn').should(
                'have.css',
                'background-color',
                'rgb(0, 128, 85)'
            )

            cy.get('span[data-testid="add-coin-err"]').should(
                'have.css',
                'color',
                'rgb(236, 55, 19)'
            )

            cy.get('@submBtn').should('be.visible')
            cy.get('button[data-testid="close-modal-btn"]').should('be.visible')
        })
    }
})
