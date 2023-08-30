import { BASE_SERVER_URL } from '../../support/constants'

describe('general workflow tests (with actual client-server interaction and minimal data mocking)', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('/')
    })

    it('basic data loading tests', () => {
        cy.get('div[data-testid="loader"]').should('exist')

        // a span with something like "0.00 USD" should actually appear
        cy.get('span[data-testid="curr-price"]').should('exist')

        cy.get('li[data-testid="top-coin"]').should('exist')

        cy.get('ul[data-testid="coin-list"]').should('exist')

        // going to some coin page via link
        cy.get('li[data-testid="coin-item"] > a').first().click()

        // should be able to see at least a price history chart and a title
        cy.get('.recharts-wrapper').should('exist')
        cy.get('h2[data-testid="coin-title"]').should('exist')
    })

    it('full portfolio test (adding/removing items, price diff. refreshing, persistence between page reloads)', () => {
        // checking that item addition works as expected
        cy.get('li[data-testid="coin-item"] > button[data-testid="add-btn"]')
            .eq(0)
            .click()
        cy.get('input[type="text"]').type('22.5')
        cy.get('button[data-testid="submit-btn"]').click()

        cy.get('li[data-testid="coin-item"] > button[data-testid="add-btn"]')
            .eq(0)
            .click()
        cy.get('input[type="text"]').type('2.5')
        cy.get('button[data-testid="submit-btn"]').click()

        cy.get('li[data-testid="coin-item"] > button[data-testid="add-btn"]')
            .eq(1)
            .click()
        cy.get('input[type="text"]').type('5')
        cy.get('button[data-testid="submit-btn"]').click()

        cy.get('button[data-testid="more-info-btn"]').click()
        cy.get('span[data-testid="coin-amount"]')
            .eq(0)
            .should('contain.text', '25')
        cy.get('span[data-testid="coin-amount"]')
            .eq(1)
            .should('contain.text', '5')
        cy.get('span[data-testid="curr-diff"]').should('not.exist')

        cy.reload()

        cy.get('button[data-testid="more-info-btn"]').click()
        // item(s) should persist
        cy.get('li[data-testid="portfolio-item"]').should('have.length', 2)
        cy.get('button[data-testid="close-modal-btn"]').click()

        // refreshing the price diff (via page reload)
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getTopCoinInfo,crypto.getPageData,crypto.getUpdatedPortfolioData*`,
            (req) => {
                req.continue((res) => {
                    // the price can't really get negative, so this is only needed to check the ability to display price difference
                    // (which is not displayed when there's none (and there deffinitely will be with such a value))
                    const neededResult = res.body[2].result
                    neededResult.data.data = neededResult.data.data.map(
                        (item) => ({ ...item, priceUsd: -1 })
                    )
                })
            }
        ).as('getUpdPortfolioData')
        cy.reload()
        cy.wait('@getUpdPortfolioData')

        // so now it should exist
        cy.get('span[data-testid="curr-diff"]').should('exist')

        // this is the current price diff. format
        cy.get('span[data-testid="curr-diff"]').contains(
            /( [+,-] ([0-9]+\.[0-9]{2,2}) \(([0-9]+\.[0-9]{2,2}) %\))/
        )

        // refreshing the price diff (via 'refrsh' btn)
        cy.intercept(
            `${BASE_SERVER_URL}crypto.getUpdatedPortfolioData*`,
            (req) => {
                req.continue((res) => {
                    const neededResult = res.body[0].result
                    neededResult.data.data = neededResult.data.data.map(
                        (item) => ({
                            ...item,
                            priceUsd: -1,
                        })
                    )
                })
            }
        ).as('getUpdPortfolioData_2')
        cy.get('button[data-testid="refresh-diff-btn"]').click()
        cy.wait('@getUpdPortfolioData_2')

        // should still be able to see price diff
        cy.get('span[data-testid="curr-diff"]').should('exist')

        cy.get('button[data-testid="more-info-btn"]').click()

        cy.get('button[data-testid="remove-btn"]').eq(0).click()

        // one item removed, another one still remaining
        cy.get('li[data-testid="portfolio-item"]').should('have.length', 1)
        cy.get('button[data-testid="close-modal-btn"]').click()

        // since the item removal is considered a portfolio update (as is item addition), no price difference should be displayed this time
        cy.get('span[data-testid="curr-diff"]').should('not.exist')

        cy.get('button[data-testid="more-info-btn"]').click()
        cy.get('button[data-testid="remove-btn"]').click()
        // and, since that was the last item,
        cy.get('li[data-testid="portfolio-item"]').should('not.exist')

        cy.get('button[data-testid="close-modal-btn"]').click()
    })

    it('pagination & a bit more portfolio persistence testing', () => {
        cy.get('span[data-testid="curr-price"]').should('exist')

        // since there are no items in the portfolio yet, there can't be any price difference
        cy.get('span[data-testid="price-diff"]').should('not.exist')

        cy.get('ul[data-testid="coin-list"]').should('exist')

        cy.get('li[data-testid="coin-item"] > button[data-testid="add-btn"]')
            .eq(0)
            .click()
        cy.get('input[type="text"]').type('22.5')
        cy.get('button[data-testid="submit-btn"]').click()

        cy.get('li[data-testid="coin-item"] > button[data-testid="add-btn"]')
            .eq(0)
            .click()
        cy.get('input[type="text"]').type('2.5')
        cy.get('button[data-testid="submit-btn"]').click()

        cy.get('button[data-testid="more-info-btn"]').click()
        cy.get('span[data-testid="coin-amount"]').should('contain.text', '25')
        cy.get('button[data-testid="close-modal-btn"]').click()

        cy.get('li[data-testid="coin-item"] > button[data-testid="add-btn"]')
            .eq(1)
            .click()
        cy.get('input[type="text"]').type('5')
        cy.get('button[data-testid="submit-btn"]').click()

        // going to the coin page via link
        cy.get('li[data-testid="coin-item"] > a').eq(0).click()

        // checking that the "add" button on the coin page works simmilarly to those on the
        cy.get('button[data-testid="add-btn"]').click()
        cy.get('input[type="text"]').type('5')
        cy.get('button[data-testid="submit-btn"]').click()

        cy.get('button[data-testid="more-info-btn"]').click()
        cy.get('span[data-testid="coin-amount"]').should('contain.text', '30')
        cy.get('button[data-testid="close-modal-btn"]').click()

        cy.reload()

        // still on the coin page (so should be able to see a coin title (after data reloading))
        cy.get('h2[data-testid="coin-title"]').should('exist')

        // going back to the previous page (which was the initial page)
        cy.go('back')

        // checking portfolio one more time
        cy.get('button[data-testid="more-info-btn"]').click()
        cy.get('li[data-testid="portfolio-item"]').should('have.length', 2)
        cy.get('span[data-testid="coin-amount"]')
            .eq(0)
            .should('contain.text', '30')
        cy.get('span[data-testid="coin-amount"]')
            .eq(1)
            .should('contain.text', '5')
        cy.get('button[data-testid="close-modal-btn"]').click()

        // since we are currently on the 1st page, the "previous" button shouldn't be available
        cy.get('button[data-testid="nav-btn--previous"]').should('not.exist')

        cy.get('button[data-testid="nav-btn--next"]').click()

        cy.reload()

        // should still be on the 2nd page and be able to go back
        cy.get('button[data-testid="nav-btn--previous"]').click()
        cy.get('button[data-testid="nav-btn--previous"]').should('not.exist')
    })
})
