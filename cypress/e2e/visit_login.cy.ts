describe('Navigate to login', () => {
  it('shold go from home page to login', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href="/login"]').click()

    cy.url().should('include', '/login')

    cy.get('h1').should('contain', 'Iniciar sesión')
  })
})
