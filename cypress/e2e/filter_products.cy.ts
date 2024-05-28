describe('Filter products', () => {
  it('should filter products by category', () => {
    cy.visit('http://localhost:3000')
    cy.get('button[name="filter"]').last().click()
    cy.get('button[name="filter"]')
      .last()
      .should('have.attr', 'aria-disabled', 'true')

    cy.get('button[name="product-card"][aria-disabled="false"]').should(
      'have.length.lessThan',
      20
    )

    cy.get('button[name="filter"]').first().click()
    cy.get('button[name="filter"]')
      .first()
      .should('have.attr', 'aria-disabled', 'true')

    cy.get('button[name="product-card"][aria-disabled="false"]').should(
      'have.length',
      20
    )
  })
})
