describe('Add to cart', () => {
  it('should add a product to the cart', () => {
    cy.visit('http://localhost:3000')
    cy.get('button[name="product-card"]').first().click()
    cy.get('button[id="add-to-cart"]').click()
    cy.get('button[id="open-cart"]').click()
    cy.get('h3').should('contain', 'Carrito de compras')
  })
})
