import { BASE_SERVER_URL } from '../../support/constants'

describe('main page special tests', () => {
    beforeEach(() => {
        cy.visit('/')

        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getPageData,crypto.getUpdatedPortfolioData*`,
            {fixture: 'initial-main-page-data--empty.json' }
        ).as('getData')
    })

    it(`visiting empty page without any data on the previous page`, () => {
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getPageData*`,
            {fixture: 'page-data--filled.json' }
        ).as('getPrevPageData')

        cy.wait('@getData')
        cy.wait('@getPrevPageData')

        cy.get('div[data-testid="no-coins-message"]').should('exist')
        cy.get('button[data-testid="no-coins-btn--prev-page"]').should('exist')
    })

    it(`visiting empty page with some data on the previous page`, () => {
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getPageData*`,
            {fixture: 'page-data--empty.json' }
        ).as('getPrevPageData')

        cy.wait('@getData')
        cy.wait('@getPrevPageData')

        cy.get('div[data-testid="no-coins-message"]').should('exist')
        cy.get('button[data-testid="no-coins-btn--initial-page"]').should('exist')
    })
})

describe('coin info page special tests', () => {
    it(`visiting info page for non-existent coin`, () => {
        cy.visit('/#/coins/gffgjfgjgjhggfhjhgj')

        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getCoinInfo,crypto.getCoinHistory,crypto.getUpdatedPortfolioData*`,
            {fixture: 'initial-info-page-data--errors.json' }
        ).as('getData')

        cy.wait('@getData')

        cy.get('div[data-testid="no-coin-info-message"]').should('exist')
    })
})