//login button from register
describe('Test clicking on Login button from register page', () => {
  it('Should navigate to the Login page and display UserName and Password', () => {
    cy.visit('http://localhost:3000/register'); 
    cy.viewport(1920, 1080);

    //login button
    cy.get('.mt-4 > .text-gray-700').click()
    cy.url().should('include', '/login')
    cy.get('label').contains('User Name')
    cy.get('label').contains('Password')
  })
})





