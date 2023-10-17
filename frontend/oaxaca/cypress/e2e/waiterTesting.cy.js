//Pending orders from waiter
describe('Test clicking on Pending button', () => {
  it('Should navigate to pending orders section and display the correct information of orders', () => {
    cy.visit('http://localhost:3000/waiter');
    cy.viewport(1920, 1080);
    //pending button
    cy.get('.py-6 > .flex-col > :nth-child(4)').click()
    cy.url().should('include', '/pending')
    cy.get('.h-14 > .font-bold').contains('Pending Orders')
  })
})

//confirmed orders from waiter
describe('Test clicking on Confirmed (orders) button', () => {
  it('Should navigate to Confirmed orders section and display the correct information of orders', () => {
    cy.visit('http://localhost:3000/waiter'); 
    cy.viewport(1920, 1080);
    //confirmed button
    cy.get('.py-6 > .flex-col > :nth-child(5)').click()
    cy.url().should('include', '/confirmed')
    cy.get('.h-14 > .font-bold').contains('Confirmed Orders')
  })
})

//delivered orders from waiter
describe('Test clicking on Delivered (orders) button', () => {
  it('Should navigate to Delivered orders section and display the correct information of orders', () => {
    cy.visit('http://localhost:3000/waiter'); // Visit the homepage
    cy.viewport(1920, 1080);
    //delivered button
    cy.get('.flex-col > :nth-child(6)').click()
    cy.url().should('include', '/delivered')
    cy.get('.h-14 > .font-bold').contains('Delivered Orders')
  })
})

//assistance from waiter
describe('Test clicking on Assistance button', () => {
  it('Should navigate to Assistance required section and display the correct information', () => {
    cy.visit('http://localhost:3000/waiter'); // Visit the homepage
    cy.viewport(1920, 1080);
    //Assistance button
    cy.get('.flex-col > :nth-child(8)').click()
    cy.url().should('include', '/assistance')
    cy.get('.h-14 > .font-bold').contains('Assistance Requested')
  })
})

//editing button from waiter
describe('Test clicking on edit (pen) button', () => {
  it('Should navigate to the About Us page section and display the correct heading and information', () => {
    cy.visit('http://localhost:3000/waiter');
    cy.viewport(1920, 1080);

    //edit button
    cy.get(':nth-child(1) > .flex > :nth-child(1) > .fill-defaultText > .w-5').click()
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Allergens')
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Title')
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Price')
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Course')
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Calories')
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Ingredients')
    cy.get('.pt-5 > .sm\\:flex > .mt-3').contains('Description')
  })
})

