//about us button from order
describe('Test clicking on About Us button', () => {
  it('Should navigate to the About Us page section and display the correct heading and information', () => {
    cy.visit('http://localhost:3000'); 
    cy.viewport(1920, 1080);

    //about us button
    cy.get('.items-center > :nth-child(2) > .inline-block').click()

    // The new url should include "#/aboutUs"
    cy.url().should('include', '/#aboutUs')

    // The new page should contain an h2 with heading
    cy.get('h2').contains('Fresh. Fresh. Fresh. Everything is fresh!')
  })
})

//find us button from order
describe('Test clicking on Find Us button', () => {
  it('Should navigate to the Find Us page section and display the correct heading and information', () => {
    cy.visit('http://localhost:3000'); 
    cy.viewport(1920, 1080);
    //find us button
    cy.get(':nth-child(3) > .inline-block').click()
    cy.url().should('include', '/#findUs')
    cy.get('h2').contains('Ready to dine with us?')
  })
})

//order now from order
describe('Test clicking on Order Now button', () => {
  it('Should navigate to the Order Now page and display the correct heading and information and options', () => {
    cy.visit('http://localhost:3000'); 
    cy.viewport(1920, 1080);

    //Order Now button
    cy.get('.hidden > .inline-block > .relative').click()
    cy.url().should('include', '/order')
    cy.get('h2').contains('Buy whatever you want! It\'s on you.')
  })
})

//Adding item to Total with price from order
describe('Test clicking on plus button to add item', () => {
  it('Should add the price to the total', () => {
    cy.visit('http://localhost:3000/order'); // Visit the homepage
    cy.viewport(1920, 1080);

    //plus button to add item
    cy.get('.grid > :nth-child(1) > .flex-col > :nth-child(4) > .flex > :nth-child(3)').click()
    // Get the initial total price value
    cy.get('.text-5xl').then(($totalPrice) => {
      const initialPrice = parseFloat($totalPrice.text());

      // Wait for the price to be updated
      cy.get('.text-5xl').should('not.contain', initialPrice);
      cy.get('.text-5xl').then(($newTotalPrice) => {
        const newPrice = parseFloat($newTotalPrice.text());
      });
    });
  });
});