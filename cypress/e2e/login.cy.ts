describe('Log in with custom', () => {
  it('should write email and password to log in', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email"]').type('prueba@americana.com')

    cy.get('input[id="password"]').type('americana')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/')

    cy.get('h1').should('contain', 'EcommerceApp')

    cy.getCookie('AuthToken').should('exist')
  })
})
