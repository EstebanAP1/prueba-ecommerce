describe('Place an order', () => {
  it('should place an order', () => {
    cy.visit('http://localhost:3000/')

    cy.get('button[name="product-card"]').first().click()

    cy.get('button[id="add-to-cart"]').click()

    cy.get('button[id="open-cart').click()

    cy.get('button[id="place-order').click()

    cy.get('input[id="email"]').type('prueba@americana.com')

    cy.get('input[id="password"]').type('americana')

    cy.get('button[type="submit"][id="custom-login"]').click()

    cy.url().should('include', '/')

    cy.get('button[id="place-order').click()
  })
})
