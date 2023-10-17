//register button from login
describe('Test clicking on Register button from login page', () => {
  it('Should navigate to register page section and display username, password, password confirmation', () => {
    cy.visit('http://localhost:3000/login'); // Visit the homepage
    cy.viewport(1920, 1080);

    //register button
    cy.get('.flex > .text-gray-700').click()
    cy.url().should('include', '/register')
    cy.get('h2').contains('Welcome to Oaxaca')
    cy.get('label').contains('User Name')
    cy.get('label').contains('Password')
    cy.get('label').contains('Password Confirmation')
  })
})

//Remember me button from login
describe('Test clicking on Remember me button', () => {
  it('Should have a tick on the box once clicked and stored', () => {
    cy.visit('http://localhost:3000/login'); 
    cy.viewport(1920, 1080);

    //remember me button
    cy.get('.mr-2').click()

    cy.get('p').contains('Remember Me')
  })
})





