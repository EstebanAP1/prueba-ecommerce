describe('Navigate to register', () => {
  it('should go from login to register page', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('a[href="/register"]').click()

    cy.url().should('include', '/register')

    cy.get('h1').should('contain', 'Regístrate')
  })
})
