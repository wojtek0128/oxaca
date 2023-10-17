//In progress from kitchen page
describe('Test clicking on In Progress button', () => {
  it('Should navigate to the in progress page section and display orders that are in progress', () => {
    cy.visit('http://localhost:3000/kitchen');
    cy.viewport(1920, 1080);

    //in progress button
    cy.get('[href="/kitchen"] > .ml-3').click()
    cy.get('.h-14 > .font-bold').contains('In Progress')
  })
})

//cancelled orders from kitchen page
describe('Test clicking on cancelled button', () => {
  it('Should navigate to the cancelled page section and display the information of order status, table number and number of minutes', () => {
    cy.visit('http://localhost:3000/kitchen');
    cy.viewport(1920, 1080);

    //cancelled button
    cy.get('[href="/kitchen/cancelled"] > .ml-3').click()
    cy.url().should('include', '/cancelled')
    cy.get('.h-14 > .font-bold').contains('Cancelled Orders')
    cy.get('.p-5 > :nth-child(1) > :nth-child(1)').contains('Order Status')
    cy.get('.p-5 > :nth-child(1) > :nth-child(1)').contains('TABLE: #')
  })
})



