describe('Register new user and log in', () => {
  it('should register a new user and then log in with it', () => {
    cy.visit('http://localhost:3000/register')

    cy.get('input[id="name"]').type('Prueba2')

    const random = Math.floor(Math.random() * 1000000)

    cy.get('input[id="email"]').type(`prueba${random}@americana.com`)

    cy.get('input[id="password"]').type(`americana${random}`)

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')

    cy.get('h1').should('contain', 'Iniciar sesión')

    cy.get('input[id="email"]').type(`prueba${random}@americana.com`)

    cy.get('input[id="password"]').type(`americana${random}`)

    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/')

    cy.get('h1').should('contain', 'EcommerceApp')
  })
})
