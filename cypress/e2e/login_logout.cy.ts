describe('Login - Logout', () => {
  it('shold log in and then logout', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('input[id="email"]').type('prueba@americana.com')

    cy.get('input[id="password"]').type('americana')

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/')

    cy.get('h1').should('contain', 'EcommerceApp')

    cy.getCookie('AuthToken').should('exist')

    cy.get('button[id="logout"]').click()

    cy.get('h1').should('contain', 'EcommerceApp')
  })
})
