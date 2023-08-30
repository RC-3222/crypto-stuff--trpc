import { BASE_SERVER_URL } from '../../support/constants'

describe('"visiting page without any data" tests', () => {
    beforeEach(() => {
        cy.visit('/')

        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getPageData,crypto.getUpdatedPortfolioData*`,
            {fixture: 'initial-main-page-data--empty.json' }
        ).as('getData')
    })

    it(`without any data on the previous page`, () => {
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getPageData*`,
            {fixture: 'page-data--filled.json' }
        ).as('getPrevPageData')

        cy.wait('@getData')
        cy.wait('@getPrevPageData')

        cy.get('div[data-testid="no-coins-message"]').should('exist')
        cy.get('button[data-testid="no-coins-btn--prev-page"]').should('exist')
    })

    it(`with some data on the previous page`, () => {
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